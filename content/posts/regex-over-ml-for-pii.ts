export const body = `
I built a proxy that sits between an application and an LLM provider and strips PII out of requests before they leave the building. The interesting decision in it was not the proxying. It was choosing **not** to use a model to find the PII.

That feels like the wrong way round in 2026. There is an obvious, well-supported answer here: run a named-entity-recognition model, let it find the personal data, redact what it flags. It is the answer most people reach for, and for a category of problem it is the only answer that works.

I used regular expressions instead. Here is the reasoning, and then, because it is the more useful half, here is where my own regexes are wrong.

---

## The constraint that decides it

The redactor sits **in the request path**. Every chat completion a customer makes waits on it. That single fact does most of the work in this decision.

A regex pass over a chat message is sub-millisecond and needs nothing: no inference call, no GPU, no model server, no cold start. An NER model on that same path means either loading weights into the process or making a network hop to a model service, on every single request, before the request the user is actually waiting for even begins.

There is a version of this problem where that cost is worth paying. This was not it.

**Determinism is worth more than recall here.** A regex either matches an input or it does not, identically, every time. That matters twice over. It is trivially unit-testable:

\`\`\`go
{"email", "contact me at foo@bar.com please", "email",
  "contact me at [EMAIL_REDACTED] please"},
{"ssn", "ssn: 123-45-6789", "ssn", "ssn: [SSN_REDACTED]"},
\`\`\`

And it is explainable. The audit log says \`field_type: email, occurrences: 2\`, and that is the complete truth of what happened. When a customer asks "why was this redacted?", a pattern name is an answer. A confidence score of 0.87 is the beginning of an argument.

**Self-hosting kills the remaining options.** The product's premise is that no PII leaves your infrastructure. That rules out calling a third-party NLP API to find the PII, which would send the exact data you are trying to protect to one more vendor. And bundling model weights means a large image and slow cold starts for the self-hosters who are the whole audience.

**Teams need their own patterns anyway.** A clinic wants \`PATIENT-\\d{6}\` redacted. That is a regex somebody adds in seconds. The model equivalent is fine-tuning.

---

## Where my regexes are wrong

This is the part I would want to read, so here it is. All of these are real, and I checked them rather than reasoning about them.

### The credit card pattern is a false-positive machine

\`\`\`go
{
  Name:    "credit_card",
  Regex:   regexp.MustCompile(\`\\b(?:\\d[ -]?){13,16}\\b\`),
  Replace: "[CREDIT_CARD_REDACTED]",
},
\`\`\`

That matches any run of 13 to 16 digits with optional spaces or dashes. Which is a great many things that are not cards:

\`\`\`
"my card is 4242 4242 4242 4242"   -> ["4242 4242 4242 4242"]   correct
"IMEI 490154203237518"             -> ["490154203237518"]       wrong
"order number 1234567890123456"    -> ["1234567890123456"]      wrong
"invoice 9876543210987"            -> ["9876543210987"]         wrong
"4242424242424241"                 -> ["4242424242424241"]      wrong
\`\`\`

An IMEI is exactly 15 digits. Plenty of order and invoice numbers land in the range. All of them get redacted as payment data.

The last line is the interesting one. \`4242424242424241\` is the well-known test card with its final digit changed, so it fails the [Luhn checksum](https://en.wikipedia.org/wiki/Luhn_algorithm) and is not a valid card number. My pattern takes it anyway, because **there is no Luhn check**. Adding one would eliminate most of the false positives above at a cost of a few lines and no measurable latency. It is the clearest gap in the pattern set and it is not defensible on the "regex is fast" argument, because the check is also fast.

### The patterns are US-shaped

\`\`\`go
{Name: "ssn",   Regex: regexp.MustCompile(\`\\b\\d{3}-\\d{2}-\\d{4}\\b\`)},
{Name: "phone", Regex: regexp.MustCompile(\`\\b(\\+\\d{1,3}[\\s.-])?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}\\b\`)},
\`\`\`

The SSN pattern is only a US Social Security Number in the dashed format. A UK National Insurance number, an Indian Aadhaar, a Nepali citizenship number: none of them. The phone pattern is a North American shape. A number written \`+977 9801234567\` does not match.

This is not a bug so much as an unstated assumption, and unstated assumptions in a redaction tool are the dangerous kind. Anyone deploying this outside the US would be running with most of their national identifiers unprotected while a dashboard reassures them that PII is being scrubbed.

### Formatting variance defeats it entirely

An SSN written \`123 45 6789\` with spaces does not match the dashed pattern. A card number split by a sentence boundary does not match. Someone writing "my ssn is one two three, four five..." obviously does not match.

Regex catches PII in the format you predicted. That is the deal.

### And the whole unstructured category is simply gone

> "my manager Sarah Chen lives on Maple Street"

No pattern in this set fires. There is no regex for a name, because a name is not a format, it is a fact about the world. This is exactly what NER is good at and regex structurally cannot do. A deployment that needs this needs a model, and no amount of pattern tuning substitutes.

---

## Two implementation details worth knowing

**Redaction is sequential, and order matters.** Each pattern runs against the output of the previous one:

\`\`\`go
for _, p := range patterns {
    matches := p.Regex.FindAllString(result.CleanedText, -1)
    if len(matches) > 0 {
        result.RedactedFields[p.Name] += len(matches)
        result.CleanedText = p.Regex.ReplaceAllString(result.CleanedText, p.Replace)
        result.WasRedacted = true
    }
}
\`\`\`

So an earlier pattern can consume text a later one would have matched, and a replacement token becomes part of the text later patterns scan. My placeholders are all alphabetic (\`[EMAIL_REDACTED]\`), so nothing re-matches today, but that is a property to preserve deliberately rather than notice later. If a replacement ever contained digits, the credit card pattern above would happily eat it.

**And one latent multi-tenant hazard.** Custom team rules are appended to the builtins:

\`\`\`go
func (s *Scanner) ScanMessagesWithCustomRules(messages []string, extra []Pattern) ScanResult {
    patterns := append(s.patterns, extra...)
    // ...
}
\`\`\`

\`s.patterns\` is the package-level \`BuiltinPatterns\`. Because that is declared as a composite literal, its length equals its capacity, so \`append\` allocates a fresh array every time and each team's rules stay their own. Correct, but correct **by accident**. If anyone ever gives \`BuiltinPatterns\` spare capacity, \`append\` starts writing into the shared backing array, and one team's custom patterns leak into the next team's scan. In a tool whose entire job is tenant-scoped redaction, that is the kind of bug that does not announce itself. \`slices.Clone\` first would make the safety intentional.

---

## What I actually believe about this

Regex is the right default for structured PII and I would make the same call again. Sub-millisecond, deterministic, testable, explainable in an audit log, and self-hostable without shipping a model. For emails, cards, tokens and keys, that is the correct set of properties.

But the honest framing is not "regex instead of a model." It is **regex first, and a model as a second pass if you need the unstructured cases.** Regex will always be faster and cheaper for the formats it already handles, so a model never replaces it. It layers on top, for names and addresses and the things that have no shape.

What I would not do is claim the fast path is the complete path. A redaction tool that quietly misses your country's national ID format, or flags every invoice number as a credit card, is worse than one that tells you plainly what it does and does not catch. That is why my project's README has a Known Limitations section, and why this post has the section above.
`;
