export type Finger =
  | "Left pinky"
  | "Left ring"
  | "Left middle"
  | "Left index"
  | "Right index"
  | "Right middle"
  | "Right ring"
  | "Right pinky"
  | "Thumbs";

export interface KeyInfo {
  key: string;
  finger: Finger;
  home: string;
}

export const rows = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
  ["space"]
];

const leftPinky = "`1qaz";
const leftRing = "2wsx";
const leftMiddle = "3edc";
const leftIndex = "45rtfgvb";
const rightIndex = "67yuhjnm";
const rightMiddle = "8ik,";
const rightRing = "9ol.";
const rightPinky = "0p;'/[]-=";

export function keyInfo(key: string): KeyInfo {
  const lower = key === " " ? "space" : key.toLowerCase();
  if (lower === "space") return { key: "space", finger: "Thumbs", home: "space" };
  if (leftPinky.includes(lower)) return { key: lower, finger: "Left pinky", home: "a" };
  if (leftRing.includes(lower)) return { key: lower, finger: "Left ring", home: "s" };
  if (leftMiddle.includes(lower)) return { key: lower, finger: "Left middle", home: "d" };
  if (leftIndex.includes(lower)) return { key: lower, finger: "Left index", home: "f" };
  if (rightIndex.includes(lower)) return { key: lower, finger: "Right index", home: "j" };
  if (rightMiddle.includes(lower)) return { key: lower, finger: "Right middle", home: "k" };
  if (rightRing.includes(lower)) return { key: lower, finger: "Right ring", home: "l" };
  return { key: lower, finger: "Right pinky", home: ";" };
}

export function fingerClass(finger: Finger): string {
  return finger.toLowerCase().replace(/\s+/g, "-");
}
