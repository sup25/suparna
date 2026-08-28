export const body = `
When I built the app for a connected toolbox, the feature list looked ordinary. Pair to a box. Read its battery and temperature. Unlock it. Let the owner decide who else can.

The last one is where it stopped being ordinary, and the reason is the transport.

The phone talks to the box over Bluetooth Low Energy. BLE is a **proximity** protocol: the phone speaks to the hardware directly, with nothing in between. No server sees the exchange. No network is required for it to happen. That is exactly why it is right for a steel box on a site with no signal, and it is also what makes access control hard.

Because the box has no idea who you are. It only knows you are nearby.

---

## What the hardware actually checks

Worth being precise about this, because everything else follows from it.

The firmware exposes one service with a write characteristic and a notify characteristic. Every command is a byte frame: a sync byte, an opcode, the box's **four-digit code**, then arguments. Toggling the lock looks like \`[85, 4, ...code, state]\`.

So the only thing the box verifies is that the frame carries the right four digits. There is no session, no handshake, no notion of a user. **The four-digit code is the entire hardware-level security model**, and it is the same model as the keypad on the outside of the box.

That is fine for one person with one box. It stops being fine the moment a crew shares four boxes and someone leaves on Friday, because a shared secret cannot be revoked from one person. It can only be changed for everybody, which means physically visiting four boxes and re-telling seven people.

---

## Two channels doing two different jobs

The model that holds up is to stop treating this as one problem.

**BLE is transport.** It carries frames to the hardware. It works with no internet. It has no idea who anyone is.

**Firestore is authority.** It holds the relationship between people and boxes: who owns what, who has been granted access, who has been cut off.

In the app that is not a diagram, it is the first thing \`connectToDevice\` does. Before any radio work happens at all:

\`\`\`javascript
const deviceFromDb = await checkIfUserHasPermissionToConnect(
  currentUser.uid,
  deviceSerialNumber
);

if (!deviceFromDb) {
  Toast.show("You don't have permission to connect to this device");
  throw new Error("You don't have permission to connect to this device");
}

// Only now do we touch BLE.
const deviceConnection = await bleManager.connectToDevice(device.id);
\`\`\`

And that check is a membership query, not a role flag:

\`\`\`javascript
export const checkIfUserHasPermissionToConnect = async (
  userId,
  deviceSerialNumber
) => {
  const query = firestore()
    .collection("devices")
    .where("usersIds", "array-contains", userId)
    .where("combinedSerialNum", "==", deviceSerialNumber);

  const snapshot = await query.get();
  return snapshot.size > 0 ? snapshot.docs[0].data() : false;
};
\`\`\`

That shape is the whole point. Access is an array on the device document. Granting is adding a uid, revoking is removing one, and **neither touches anybody else's access to that box.** That is the thing a shared code cannot do.

The document that comes back also carries \`fourDigitCode\`, which becomes the code embedded in every subsequent BLE frame. So authority does not just gate the connection, it is where the phone learns the secret in the first place.

---

## Be honest about what this is and is not

Here is where I think most write-ups of this pattern go soft, so let me not.

**The check is client-side.** The app asks Firestore for permission and then obeys the answer. The box does not participate in that decision. It cannot: it has no network, no clock it trusts, no identity for the phone in front of it. Anyone holding the four digits can drive that box from any generic BLE client and never touch this app.

So the Firestore layer is a **product and operations control**, not a cryptographic one. It is genuinely valuable, because it solves the problem the business actually has, which is bookkeeping over a crew: who should have this, who no longer should, and can I change that without driving to a site. It is not a defence against an attacker with a BLE sniffer, and it should not be sold as one.

**And it needs a network.** Because the permission check runs before every connection, no signal means no connection, even though the radio would work perfectly. That is the sharp trade in this design and it is worth stating plainly: authorisation is always current, and it is online-only.

You could invert that. Cache the grant so the box opens in a dead zone, and accept that a phone can then act on a permission that may no longer be true. That is a real option, and if you take it the cached grant belongs in the Keychain or Keystore rather than \`AsyncStorage\`, with a deliberate expiry. What you cannot do is have both. Either authority is live, or the box works offline.

---

## Revocation, in three tiers

Given all that, revoking access is layered, and each tier covers what the one above cannot.

1. **Remove the uid from \`usersIds\`.** Immediate, per person, and it takes effect on that user's next connection attempt. This is the everyday case and it is the one the design is good at.
2. **Rotate the four-digit code.** Opcode 1 writes a new code to the hardware, and the new value goes to Firestore. This is what actually invalidates a code somebody has memorised or written down.
3. **Physical access.** The keypad on the box is a parallel entrance that the app does not mediate at all.

Tier one is what an owner does when a contractor's engagement ends. Tier two is what they need when someone leaves under bad circumstances and might already know the digits. Building only the first and describing it as revocation would be overselling it.

---

## What I would carry forward

**Name your channels.** Writing down "BLE is transport, Firestore is authority" turns "should this work offline?" from a preference into a question with a principled answer, and stops the offline case being discovered late.

**Know which layer is enforcing.** A client-side check that the user cannot see or bypass in normal use is worth building. A client-side check described as security is a problem. The difference is entirely in what you claim for it.

**Assume proximity is free.** Anyone who can stand next to the hardware can talk to it. Every guarantee has to come from something other than distance, and if the only thing the firmware validates is four digits, then four digits is your real security boundary no matter what the app does above it.
`;
