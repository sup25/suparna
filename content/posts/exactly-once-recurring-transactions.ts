export const body = `
[Pura Hisab](https://purahisab.com) is a personal finance app I built and run: a private rupee ledger connected to no bank, no wallet and no payment service, so every figure on every screen is something somebody typed. An app like that is only worth opening if the ledger is true, and the ledger is only true if entering things is cheap.

Which is why it has a feature that lets you describe money once, as *NPR 18,000 rent, every month on the 1st*, and then writes it for you, every month, whether or not you ever open the app again.

That sounds like a cron job and a date library. It is not. There are five questions buried in it, and every one has a wrong answer that looks right:

- **Which days does the rule land on?** "Every month on the 31st" has an obvious meaning in January and no meaning at all in February.
- **When does a day become "today"?** Servers are rented wherever is cheapest. A server in London thinks it is still yesterday for the first 5 hours and 45 minutes of every day in Nepal.
- **What stops the same transaction being written twice?** The work runs in two places at once. If they overlap, the rent gets paid twice.
- **What happens when the user deletes one?** If the engine notices the gap and helpfully fills it back in, the user cannot delete anything, and will never work out why.
- **What happens to history when the rule changes?** The rent went up. Do you rewrite last year, only the future, or ask?

Here is what I settled on, and why. The reasoning is the interesting part; the code is twenty minutes of typing once the decisions are made.

---

## The one decision everything else follows from

**A due occurrence is an ordinary transaction.** Not a special one, not a second kind of row, not something the rest of the app has to know about.

When the 1st of April arrives, the engine writes a perfectly normal ledger row: date, amount, category, account, note. The only difference from a row somebody typed by hand is one extra column, \`recurring_id\`, recording which schedule produced it.

The obvious alternative is to keep schedules in their own tables and expand them into occurrences whenever the ledger is read. Nothing is ever written until you ask for it, which sounds strictly cheaper. It is a trap:

- **Every read becomes a merge.** The dashboard, the monthly totals, the per-account balances, the goal tracker, the PDF export: each would need to know what a schedule is and how to expand one. Six places to get right, and six places to forget when a seventh arrives.
- **Nobody can touch a projection.** Deleting or editing a single occurrence means writing an exception record somewhere, which is a second system with its own bugs.
- **Totals become opinions.** "How much did I spend in March?" gets a different answer depending on which code path asked.

Writing real rows makes all of that disappear. Nothing downstream changed when I added the feature, which is the measure of the decision being right.

**The price, stated honestly:** the write has to happen *exactly once*. Never zero times, or the rent is missing. Never twice, or the rent is doubled. Everything below is about paying that price.

---

## The watermark

If you take one thing from this post, take this one.

Each schedule carries a column, \`last_run_on\`. It is **the last calendar day that schedule has been generated through**, not the date of the last occurrence posted. It is a high-water mark on the calendar, and the next run starts from the day *after* it.

That distinction sounds pedantic. It is the difference between an engine that works and an engine that fights its user.

### The bug it prevents

Consider the implementation almost everybody writes first: each night, work out every date the rule has landed on since it started, and create any transaction that is missing.

That is self-healing. It sounds better. Now watch what it does.

A daily coffee schedule has been running a fortnight. On the 7th the user did not buy a coffee, so they delete that row. Tonight the job runs, walks the rule from its start date, notices nothing exists for the 7th, and puts it back. Tomorrow night, the same. And every night after.

**A row the user deleted and a row the engine failed to write are identical in the database.** A system that only inspects current state cannot tell them apart, so it restores deliberate deletions forever, with nothing on screen to explain it.

Resuming from the watermark is what makes a delete mean what the user meant. The 7th is simply never looked at again.

And you do not lose the recovery you were after. If the engine is down for three days, the watermark is three days behind, so the next window is three days wide and posts all of it. **Catch-up is automatic because the watermark records work done, not time passed.**

> Anything that repairs gaps needs to distinguish absence-by-intent from absence-by-failure. Current state alone cannot tell you. You need a record of what you have already done.

---

## Why a unique index as well

The watermark and the database constraint get confused for two solutions to one problem. They solve two different problems, and neither covers the other.

| | The watermark | The unique index |
|---|---|---|
| What it is | A column saying how far generation has got | A constraint on \`(recurring_id, date)\` |
| What it expresses | Intent: days up to here have been dealt with, whatever the ledger looks like now | Enforcement: this occurrence may exist at most once, no matter who is writing |
| What it cannot do | Nothing, if two processes read the same value at the same moment and both act on it | Nothing about days in the past the user deliberately changed |

The watermark cannot arbitrate a race, because both processes read it *before* either writes it. Both see the same value and both correctly conclude the same day is due. Solving that with the watermark alone would mean holding a row lock across an entire generation run, inside a user's page load.

\`UNIQUE (recurring_id, date)\` pushes the arbitration into the database, where it costs nothing and blocks nobody. The losing insert is dropped rather than erroring. I confirmed it does real work by removing the graceful \`skipDuplicates\` flag and watching Postgres refuse the second row outright. **The flag is the polite behaviour, the index is the guarantee.**

One detail makes it apply only where it is meant to: Postgres treats two \`NULL\`s as distinct, so the thousands of hand-typed rows, which have no \`recurring_id\`, never collide with each other.

The two are written **in a single database transaction**. Rows inserted without the watermark moving would be written again on the next run. The watermark moving without the rows would lose them forever. They are one fact, so they are one write.

---

## Two triggers, and why the nightly one polls

Generation starts in two completely different ways, and neither is allowed to assume the other ran.

**A nightly sweep** inside the API process covers everybody, including every user who has not opened the app today. Without it, a user's schedules would exist only from that user's own point of view, and the database would be a wrong answer to any question asked from outside a request.

**A lazy catch-up** runs generation for one user before the API answers their transaction list or summary. This covers the gap the sweep cannot: a fresh deploy, a restarted container, a machine that was asleep. It is deliberately non-fatal: if it throws, the error is logged and the dashboard is served anyway. Throwing would cost the user their entire dashboard in exchange for a few rows the sweep will post regardless.

Each one's weakness is the other's strength. The sweep runs once a day, so a schedule created this afternoon would show nothing until tomorrow. The catch-up only makes the ledger true for whoever is looking.

### The sweep is a poll, not a scheduled time

The obvious implementation is "run at 00:10 Asia/Kathmandu every night". To schedule that, a program has to know what that zone's offset from UTC will be at some future instant, which means a time zone library and its database, or hand-rolled offset arithmetic that daylight saving somewhere eventually breaks.

Instead the job wakes every fifteen minutes and asks a much simpler question:

\`\`\`ts
const today = appToday();            // "2026-10-05", in Asia/Kathmandu
if (today === lastRunDay) return;    // already done this calendar day

await run(today);
lastRunDay = today;                  // claimed only AFTER success
\`\`\`

One string comparison, and exactly one run per calendar day whatever the offset turns out to be. Clock changes, a laptop waking from sleep and a container restarting at 3am all resolve correctly, because the question is *"has the day changed?"* and not *"have twenty-four hours passed?"* A stopwatch loses its count when the process dies. A date comparison does not.

Two details in those five lines are deliberate. The day is claimed **only after a successful run**, so a throw means the next tick retries rather than writing the day off. And re-entry is blocked **before the first \`await\`**, so a slow run cannot be started twice by an overlapping tick.

---

## What "today" means

This gets its own section because it is the one question a date alone cannot answer.

A date in the database is a calendar day, "1 October 2026", with no time and no zone attached. That is correct. But deciding *which calendar day it is right now* does require a zone, and the server's own zone is an accident of whichever data centre was cheapest this year.

Nepal is UTC+05:45. Read the clock as UTC and every occurrence is held back until 05:45 local time on the day it falls due. So there is one setting, \`APP_TIME_ZONE\`, checked at boot by asking the system whether it recognises the name, and exactly one small function that reads it:

\`\`\`ts
export const appToday = (now: Date = new Date()): string => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: config.timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  // ... assembled into "YYYY-MM-DD"
};
\`\`\`

I read the individual parts rather than the formatted string, because a formatted date is a locale convention and conventions change. The parts cannot be misread.

### Dates are strings

Throughout the engine a calendar date is the text \`"2026-10-05"\`, and two dates are compared as text. This looks primitive and is deliberate.

The project had already been bitten. A \`DATE\` column arrives from the ORM as a date-and-time value pinned to midnight UTC. Any code that asks it for "the month" gets the month in the server's local zone, and anywhere west of UTC that is the previous day, which quietly filed every transaction dated the 1st or the 31st into the wrong month. Every total derived from those rows was wrong, and nothing looked broken.

Text in \`YYYY-MM-DD\` form sorts correctly, compares correctly, and has no zone to misread. Exactly two functions convert between text and a database date, and nothing above the data layer ever holds the other form.

---

## The arithmetic

Given a rule and a window, which calendar days does it land on? This is the only genuinely hard part, and it is deliberately the simplest code in the project: one function, \`occurrencesBetween(rule, from, to)\`, with **no database import at all**.

### Short months: clamp, never skip

"Every month on the 31st" is a rule half the year cannot satisfy. There are two possible answers and one of them is much worse.

Skipping means a whole month of rent silently missing from the ledger, with no error and nothing on screen. Clamping means February posts on the 28th. **A date three days off is a far smaller failure than a month that is not there**, and clamping is what banks and landlords actually do, which matters: the app is modelling their behaviour, so matching it means the ledger agrees with the bank statement.

The subtle part is that **the clamp does not stick**. February pulls that one occurrence back to the 28th; it does not drag the schedule onto the 28th permanently. March returns to the 31st. The rule is still "the 31st". February simply cannot express it.

### What an interval steps

"Every 2 weeks on Monday and Wednesday" has two readings, and only one of them is what anybody means.

**The week is what steps.** Both days post together, then a whole week is skipped. The alternative, giving each weekday its own fortnightly rhythm, puts Monday and Wednesday in alternating weeks and never once in the same one, which is nobody's idea of a fortnightly schedule. It is also how the iCalendar recurrence standard reads it, and how every calendar app has trained people to expect it to behave.

The rhythm is anchored to **the week containing the first occurrence**, not the week containing the start date. Those differ in exactly one case: when every selected weekday falls before the start date within its own week, like a Monday-only rule starting on a Wednesday. Anchoring to that empty week shifts the whole schedule by one interval. There is a named regression test for it.

---

## Three bugs worth repeating

### The test that passed with the bug put back

I verified the watermark rule by deliberately reintroducing the bug and checking the test failed.

It did not. The test passed with the bug present, because the query that selects due schedules excluded that schedule before the resumption logic ever ran. The test was proving something, just not the thing it was named after.

**A test for a subtle rule is worth nothing until you have watched it fail.**

### A dropdown that could switch a paused schedule back on

An HTML select sends text. The obvious way to handle that is to ask the validation library to coerce the value to a boolean. That is a trap, and a dangerous one: coercing a string to a boolean asks *"is this non-empty?"*, so \`"false"\` becomes \`true\`.

The exact string a paused schedule sends would have switched it back on, and it would have started posting money the user had just told it not to. The accepted spellings are now listed explicitly rather than coerced.

The same family of mistake lives one level down, where coercing an empty text box to a number gives \`0\`, a perfectly valid weekday meaning Sunday. **An unanswered question would have become an answer.**

### The next date that had already happened

The API tells the client when a schedule will next post. The first implementation searched from today, which is the obvious thing to do.

It is wrong, and the reason is the watermark: everything up to and including \`last_run_on\` has already been posted. A daily schedule read immediately after its own catch-up reported "next on 5 October" while 5 October's transaction sat in the ledger directly below it.

Neither test suite would have caught this. The arithmetic was right, the data shape was right, every test was green. I found it by reading the sentence the panel actually printed, in a browser, against a real database. **A feature is not finished because the tests pass.**

---

## Why the arithmetic has no database access

That purity is not an aesthetic preference. It is economic.

The hard cases in a recurrence engine are short months, leap days, the turn of the year, and an interval that steps clean over the window being asked about. Written against a database, testing each one means creating a user, an account and a schedule, running something, reading it back and cleaning up: twenty lines, and a slow test. Written as a pure function, each is two:

\`\`\`ts
expect(occurrencesBetween(monthly31, "2026-01-01", "2026-04-30"))
  .toEqual(["2026-01-31", "2026-02-28", "2026-03-31", "2026-04-30"]);
\`\`\`

So there are 45 of them, rather than the four somebody would have had the patience for. **The cost of a test determines how many get written, and how many get written determines what the code is worth.**

It has a second payoff. The composer previews a rule before anything is saved, and that preview is a server endpoint reaching into the same function, not a second implementation of clamping and leap years living in the browser, in a different language, maintained by whoever touches the form next. This project had already been burnt by exactly that: the password policy was written once in the browser and once in the API, they drifted, and users ended up with passwords the form accepted and the server rejected.

A footnote worth repeating to anyone learning to test: two of the first expectations I wrote for that layer turned out to be wrong, and the engine was right. I re-derived both independently before changing them, which is the whole reason to keep the arithmetic somewhere cheap to interrogate. **A test you cannot easily argue with is a test you will edit until it passes.**

---

## What it does not do

A straight answer is worth more than a feature list.

| Limit | Why |
|---|---|
| Four frequencies only | "The second Tuesday of every month" and "the last working day" are real patterns, but nobody has asked, and each adds a column and a branch |
| 500 occurrences per schedule per run, 1,000 overall | A deliberate ceiling on work done inside a user's own request. Nothing is lost: the watermark parks on the last date written, so a backlog arrives over several runs |
| Editing applies to the future, with an opt-in cap of 24 past rows | Rewriting years of history is a different operation and should be asked for explicitly, not reached by leaving a field blank |
| A skip cannot be applied to a day already generated | That day has a real transaction. Marking it "skipped" would be a statement the ledger contradicts; the honest way out is to delete the row, which the watermark then respects |
| One time zone for the whole application | Per-user zones would move "which day is it" from a setting to a column, and every date comparison would have to carry it |

---

## The five-minute version

If somebody asks what this is:

**The feature.** You describe money that repeats, and the app records it on the right days, forever, without you opening it.

**The key decision.** A due occurrence becomes an ordinary transaction. No second kind of row, no special case downstream, so the dashboard, the totals, the goals and the export needed no changes at all.

**The price.** The write must happen exactly once. A watermark records how far generation has got; a unique index makes a duplicate write a no-op. The watermark is the intent, the index is what holds when two processes act on that intent at the same moment.

**What people get wrong.** Resuming from the start date each night instead of from the watermark. It looks self-healing. What it actually does is undo the user's deletions, every night, silently.

**The part that is harder than it looks.** Which days a rule lands on. That arithmetic is a pure function with no database access, which is why there are 45 tests of it instead of four.

Or in one sentence: it turns a sentence about money into money in a ledger, exactly once, in the right time zone, without ever undoing something you did on purpose.

---

Pura Hisab is live at [purahisab.com](https://purahisab.com). The rest of the system, from the single-origin arrangement the three properties share to the session design underneath it, is written up in [the case study](/work/pura-hisab).
`;
