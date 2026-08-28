export const body = `
I built the mobile app for a connected toolbox: a steel box with a heater, a lock, LED lightbars and a battery, which opens either from a keypad on the box or from a phone. The phone half is [Expo](https://expo.dev/) 50 with [react-native-ble-plx](https://github.com/dotintent/react-native-ble-plx).

Most Bluetooth Low Energy writing assumes bare React Native, or assumes native Swift and Kotlin. Very little of it assumes Expo, and very little of it deals with the shape of firmware you actually get handed. This is what I ran into.

Almost everything here has the same character: **it does not throw.** BLE fails quietly. You get an empty callback, a value that decodes to nonsense, or a write that returns fine and does nothing.

---

## 1. Expo Go cannot run BLE

BLE needs native code. Expo Go ships a fixed set of native modules and \`react-native-ble-plx\` is not among them, so there is no version of this where you scan a QR code and carry on.

The move is to a [development build](https://docs.expo.dev/develop/development-builds/introduction/), and the BLE library is a config plugin:

\`\`\`json
{
  "expo": {
    "plugins": [
      "react-native-ble-plx",
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      [
        "expo-build-properties",
        {
          "ios": { "deploymentTarget": "13.4", "useFrameworks": "static" }
        }
      ]
    ]
  }
}
\`\`\`

You stay in the managed workflow and you keep config plugins. You just stop being able to pretend the native layer is not there, and every dependency that touches native code now means another build.

---

## 2. The simulator cannot run BLE either

There is no Bluetooth radio in the iOS Simulator or the standard Android emulator. Not a limited one. None.

Every scan, every connect, every write has to happen on a physical device with the real hardware in the room. That is why the packager host is pinned in the start script:

\`\`\`json
"start": "REACT_NATIVE_PACKAGER_HOSTNAME=192.168.0.141 expo start --dev-client"
\`\`\`

The phone has to reach the dev server across the LAN, because the phone is the only place the app can meaningfully run.

The consequence worth planning for: **put the BLE layer behind one provider on day one.** Mine is a single \`BleProvider\` exposing \`scanForPeripherals\`, \`connectToDevice\`, and the write functions. Everything above it is screens calling into those. If your components reach for \`bleManager\` directly, none of your UI can be worked on without the hardware in front of you.

---

## 3. Android permissions are version-dependent

The failure mode here is a scan that returns nothing. No error, no rejected promise, no dialog. Just an empty callback.

Below API 31, scanning is gated on **location**, not Bluetooth, because scan results can be used to infer position. From API 31 there are dedicated \`BLUETOOTH_SCAN\` and \`BLUETOOTH_CONNECT\` permissions. So the request branches on the API level, which \`expo-device\` gives you:

\`\`\`javascript
import * as ExpoDevice from "expo-device";
import { PermissionsAndroid, Platform } from "react-native";

const requestPermissions = async () => {
  if (Platform.OS !== "android") return true;

  if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return await requestAndroid31Permissions();
};
\`\`\`

One thing I would flag about my own implementation, since it is the kind of thing worth being honest about: on API 31 and above I request \`BLUETOOTH_SCAN\`, \`BLUETOOTH_CONNECT\` **and** \`ACCESS_FINE_LOCATION\`, and require all three. That is the belt-and-braces version, and it works. But if you never derive location from scan results you can declare \`android:usesPermissionFlags="neverForLocation"\` on the scan permission and drop the location request on modern Android entirely. Asking for location you do not need is a prompt you are making users read for nothing.

Adapter state is also separate from permission. The scan error you will see most is \`"Bluetooth is powered off"\`, which is not a code problem and belongs in a prompt rather than an error toast.

---

## 4. You probably get one characteristic, not one per value

This is the part I had wrong in my head going in. I expected a battery characteristic, a temperature characteristic, a lock characteristic. What the firmware actually exposes is a **serial-port style service**: one service, one TX characteristic you write to, one RX characteristic you subscribe to.

\`\`\`javascript
const SPS_SERVICE_UUID = "19b10000-e8f2-537e-4f6c-d104768a1214";
const SPS_SERVER_TX_UUID = "19B10001-E8F2-537E-4F6C-D104768A1214";
const SPS_SERVER_RX_UUID = "19B10002-E8F2-537E-4F6C-D104768A1214";
\`\`\`

Which means there is no BLE-level API to lean on. There is a **byte protocol** you implement, and every command shares one frame: a sync byte, an opcode, the box's four-digit code, then arguments.

\`\`\`javascript
// [85, opcode, ...fourDigitCode, ...args]
//
//  85 = 0x55, the sync byte the firmware looks for
//   1  set the four-digit code
//   2  set the clock
//   3  set temperature, unit and lights
//   4  toggle the lock
//   5  request a status frame

const writeLockToggleToDevice = async (data) => {
  const prefix = [85, 4];
  const payload = getBase64Data(prefix.concat(password, data));

  return connectedDevice?.device?.writeCharacteristicWithoutResponseForService(
    SPS_SERVICE_UUID,
    SPS_SERVER_TX_UUID,
    payload
  );
};
\`\`\`

Note what that implies: **the four-digit code goes out with every single command.** There is no session and no handshake. Each frame carries its own authorisation and the firmware validates it frame by frame.

Get the firmware's frame table before writing a line of client code. Every bug in this layer looks identical from the outside: the write succeeds and nothing happens.

---

## 5. Everything on the wire is base64

\`react-native-ble-plx\` does not hand you bytes. Every characteristic value, in and out, is a base64 string, because that is what survives the bridge. So you need conversion both ways:

\`\`\`javascript
import { Buffer } from "buffer";

const getBase64Data = (data) => Buffer.from(data).toString("base64");

const getDataFromArray = (base64Data) =>
  Array.from(Buffer.from(base64Data, "base64"));
\`\`\`

The decode side is positional. The device pushes a status frame and you read it by index:

\`\`\`javascript
const getStatusFromBase64AndSetToState = async (statusData) => {
  const bytes = getDataFromArray(statusData);

  // Short frames are partial. Do not try to parse them.
  if (bytes.length < 16) return false;

  const temperature = parseInt(bytes[6]);
  const temperatureMode = parseInt(bytes[7]);
  const lightStatus = parseInt(bytes[8]);
  const batteryLevel = parseInt(bytes[9]);
  const chargerStatus = parseInt(bytes[10]);
  const deviceStatus = parseInt(bytes[11]);
  const deviceLidOpen = parseInt(bytes[12]);
  // ...
};
\`\`\`

That length guard matters more than it looks. You will receive short and partial frames, and without it you are indexing into \`undefined\` and writing \`NaN\` into state. A battery gauge reading \`NaN\` is how this surfaces.

---

## 6. Writes are fire-and-forget, and the answer arrives somewhere else

Every command here uses \`writeCharacteristicWithoutResponseForService\`. The write resolves whether or not the box did anything with it.

Confirmation is not in the return value. It comes back asynchronously on the RX characteristic, as a status frame, through a subscription set up at connection time:

\`\`\`javascript
currentDevice.monitorCharacteristicForService(
  SPS_SERVICE_UUID,
  SPS_SERVER_RX_UUID,
  async (error, characteristic) => {
    if (error) throw error;
    await getStatusFromBase64AndSetToState(characteristic.value);
  }
);
\`\`\`

That inverts how you write the UI. Toggling the lock does not mean the box is locked. It means you asked. The interface has to reflect the last status frame you actually received, not the command you last sent, or you will show someone a closed padlock for a box standing open.

If you do want the write acknowledged, \`writeCharacteristicWithResponseForService\` exists and waits on the device. I use it only for the status request.

---

## 7. Connections drop, and hang, and both need handling

A phone in a pocket walks out of range. The screen locks. On a job site this is constant. Three things earned their place.

**Time-box the connection attempt.** \`connectToDevice\` can hang indefinitely. A timeout that actively cancels beats a spinner that never resolves:

\`\`\`javascript
const timeout = setTimeout(async () => {
  await bleManager.cancelDeviceConnection(device.id);
  throw new Error("Connection timeout");
}, 15000);
\`\`\`

**Time-box the scan.** Scanning holds the radio and drains battery. Mine stops at 18 seconds and dedupes by \`device.id\` on the way in, since \`startDeviceScan\` fires per advertisement rather than per device. Filtering by service UUID in the scan itself is cheaper than filtering by name afterwards:

\`\`\`javascript
bleManager.startDeviceScan(
  [SPS_SERVICE_UUID],
  { allowDuplicates: false },
  (error, device) => { /* ... */ }
);
\`\`\`

**Reconnect on foreground.** The single most valuable thing I added. Persist which device was connected, then reconnect on app start and on every \`AppState\` change back to \`active\`:

\`\`\`javascript
useEffect(() => {
  connectToDeviceOnStart();
  const subscription = AppState.addEventListener("change", handleAppStateChange);
  return () => subscription.remove();
}, []);
\`\`\`

Without it, every glance at another app returns you to a disconnected box and a fresh scan. With it, the connection reads as though it simply persisted.

---

## The short version

- Move to a dev client first. There is no path where Expo Go runs BLE.
- Put the BLE layer behind one provider, so the rest of the app is workable without hardware.
- When a scan returns nothing, check the API-level permission branch and the adapter state before you look at your scan code.
- Expect a byte protocol over one TX and one RX characteristic, not a tidy characteristic per value.
- Guard every decode on frame length. Short frames are normal and \`NaN\` propagates quietly.
- Render the last status frame you received, never the command you sent.
`;
