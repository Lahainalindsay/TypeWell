import { dataEntryFields, fictionalDataEntryRecords } from "../engine/dataEntry";

export type PracticeMode = "Words" | "Sentences" | "Quotes" | "Custom Text" | "Weak Keys" | "Numbers" | "Data Entry" | "Numeric Keypad" | "Punctuation" | "Symbols" | "Endurance" | "Speed Burst" | "Accuracy" | "Code";

export const practiceModes: PracticeMode[] = ["Words", "Sentences", "Quotes", "Custom Text", "Weak Keys", "Numbers", "Data Entry", "Numeric Keypad", "Punctuation", "Symbols", "Endurance", "Speed Burst", "Accuracy", "Code"];

export const durations = [15, 30, 60, 120, 300, 600];
export const testDurations = [15, 30, 60, 120, 300, 600];
export const wordCounts = [10, 25, 50, 100];

export const library: Record<string, string[]> = {
  "Everyday English": [
    "The window is open, the desk is clear, and the next sentence is ready.",
    "A short walk after lunch can reset your attention for the afternoon."
  ],
  "Short Sentences": [
    "Clean form comes first. Speed arrives later.",
    "Return to home row after every reach."
  ],
  Quotes: [
    "Well begun is half done.",
    "The secret of getting ahead is getting started."
  ],
  Literature: [
    "It was a bright cold day in April, and the clocks were striking thirteen.",
    "The old house stood quiet in the morning light while the road curved beyond the trees."
  ],
  Business: [
    "Please review the proposal, confirm the timeline, and send any budget changes by Friday.",
    "The team reduced response time by documenting common questions and improving internal handoffs."
  ],
  Technology: [
    "Reliable software depends on clear contracts, observable systems, and careful handling of edge cases.",
    "A small cache can improve perceived performance when invalidation rules are explicit."
  ],
  Science: [
    "Careful observation, repeated measurement, and transparent methods make results easier to trust.",
    "The sample cooled slowly as pressure changed inside the sealed chamber."
  ],
  History: [
    "Public roads, printed maps, and shared calendars changed how people planned long journeys.",
    "Archives preserve letters, records, and ordinary details that help explain larger events."
  ],
  Nature: [
    "Rain collected on the leaves before sliding into the dark soil below.",
    "The coastline changed shape where steady waves met patient stone."
  ],
  "Creative Writing": [
    "Mara folded the note, counted three breaths, and stepped into the station.",
    "The city sounded different at dawn, softer around the edges and full of small beginnings."
  ],
  Programming: [
    "const result = items.filter(Boolean).map(item => item.name).join(', ');",
    "function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }"
  ],
  Numbers: [
    "Order 4821 shipped at 09:45 with 18 units, 3 returns, and 97.4% accuracy.",
    "Call 808-555-0142 before 5:30 PM and reference invoice 2026-09-18."
  ],
  Punctuation: [
    "Wait, listen, then answer: is the file ready, reviewed, and approved?",
    "She wrote, \"Accuracy first; speed second; confidence third.\""
  ]
};

export function buildPracticeText(mode: PracticeMode, count = 50, customText = ""): string {
  if (mode === "Custom Text") return customText || "Paste custom text in the field above, then begin typing here.";
  if (mode === "Numbers") return repeatToLength(library.Numbers.join(" "), count * 6);
  if (mode === "Data Entry") return repeatToLength(fictionalDataEntryRecords.map((record) => dataEntryFields(record).join(" ")).join(" "), count * 8);
  if (mode === "Numeric Keypad") return repeatToLength(numericGroups.join(" "), count * 5);
  if (mode === "Punctuation") return repeatToLength(library.Punctuation.join(" "), count * 6);
  if (mode === "Symbols") return "email@domain.dev #issue-42 $19.95 + 8% = total_value / [draft] {ready} && checked";
  if (mode === "Code") return repeatToLength(library.Programming.join(" "), count * 7);
  if (mode === "Accuracy") return repeatToLength("accurate steady clear exact clean calm deliberate return home row ", count * 6);
  if (mode === "Speed Burst") return repeatToLength("the and you that with have type fast calm flow ", count * 6);
  if (mode === "Endurance") return repeatToLength(Object.values(library).flat().join(" "), count * 10);
  const pool = mode === "Words"
    ? "time form hand type clean steady rhythm focus reach return index finger screen practice improve "
    : Object.values(library).flat().join(" ");
  return repeatToLength(pool, count * 6);
}

const numericGroups = [
  "48291 10577 63.42 921004 782.15 34008 19.76 55021",
  "71420 88.03 602911 147.28 90017 30556 42.10 781009",
  "12004 97531 26.84 401772 63.19 80045 51902 7.25"
];

function repeatToLength(text: string, length: number): string {
  let output = "";
  while (output.length < length) output += `${text} `;
  return output.trim().slice(0, length).trim();
}
