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

// Shuffle without replacement within each cycle, so a new session has fresh material.
function shuffled<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function variedText(items: readonly string[], length: number): string {
  if (!items.length) return "";
  const parts: string[] = [];
  let size = 0;
  while (size < length) {
    const cycle = shuffled(items);
    for (const item of cycle) {
      if (parts.length && item === parts[parts.length - 1]) continue;
      parts.push(item);
      size += item.length + 1;
      if (size >= length) break;
    }
  }
  return parts.join(" ");
}

// Standard WPM passages use prose only. Numbers, code, and advanced punctuation
// belong to their dedicated assessments rather than the general typing test.
const standardSentencePool = [
  ...library["Everyday English"],
  ...library["Short Sentences"],
  ...library.Literature,
  ...library.Business,
  ...library.Technology,
  ...library.Science,
  ...library.History,
  ...library.Nature,
  ...library["Creative Writing"]
].filter((sentence) => /^[A-Za-z ,.'!?-]+$/.test(sentence));

export function buildPracticeText(mode: PracticeMode, count = 50, customText = ""): string {
  if (mode === "Custom Text") return customText || "Paste custom text in the field above, then begin typing here.";
  if (mode === "Numbers") return variedText(library.Numbers, count * 6);
  if (mode === "Data Entry") return variedText(fictionalDataEntryRecords.map((record) => dataEntryFields(record).join(" ")), count * 8);
  if (mode === "Numeric Keypad") return variedText(numericGroups, count * 5);
  if (mode === "Punctuation") return variedText(library.Punctuation, count * 6);
  if (mode === "Symbols") return variedText(["email@domain.dev", "#issue-42", "$19.95", "+ 8%", "total_value", "/ [draft]", "{ready}", "&& checked"], count * 6);
  if (mode === "Code") return variedText(library.Programming, count * 7);
  if (mode === "Accuracy") return variedText(["accurate", "steady", "clear", "exact", "clean", "calm", "deliberate", "return", "home", "row"], count * 6);
  if (mode === "Speed Burst") return variedText(["the", "and", "you", "that", "with", "have", "type", "fast", "calm", "flow"], count * 6);
  if (mode === "Endurance") return variedText(standardSentencePool, count * 10);
  if (mode === "Words") return variedText(["time", "form", "hand", "type", "clean", "steady", "rhythm", "focus", "reach", "return", "index", "finger", "screen", "practice", "improve"], count * 6);
  return variedText(standardSentencePool, count * 6);
}

// A page test has a fixed amount of text and no countdown. Keep sentence
// boundaries intact so the final prompt never stops in the middle of a word.
const pageTestSentences = [
  "The morning light reached the kitchen table as Maya opened her notebook and planned the day ahead.",
  "She wanted to finish a letter, organize her files, and take a short walk before the afternoon rain.",
  "Outside, the neighborhood was waking up slowly, with buses passing the corner and neighbors greeting one another.",
  "At the library, she found a quiet desk near a window and began to write with careful attention.",
  "A steady pace helped her avoid small mistakes that would have taken extra time to correct later.",
  "When a sentence felt difficult, she paused, breathed, and returned to the next word without rushing.",
  "Across the room, someone turned a page while the librarian arranged new books on a low shelf.",
  "By lunchtime, the letter was complete and the remaining tasks looked much easier to manage.",
  "Maya saved her work, checked the details one last time, and stepped outside into the fresh air.",
  "The walk home gave her a chance to notice the trees, the storefronts, and the changing sky.",
  "Near the corner, a gardener watered a row of flowers and brushed loose soil from the stone path.",
  "A friend waved from the café and asked whether they could meet later in the week.",
  "Maya checked her calendar, suggested Thursday, and promised to bring the book they had discussed.",
  "The conversation was brief, but it made the rest of the afternoon feel a little brighter.",
  "At home, she put away her coat and opened a window to let the cool breeze into the room.",
  "There was still enough time to prepare dinner without hurrying through the small tasks along the way.",
  "She rinsed the vegetables, set a pot on the stove, and listened to the rain begin outside.",
  "While the water warmed, she read over tomorrow's schedule and made a short list of priorities.",
  "The list helped her separate urgent work from the things that could wait until another day.",
  "When dinner was ready, the kitchen smelled warm and the rain had become a gentle background sound.",
  "She shared the meal with her family and asked everyone to name one good thing from the day.",
  "Afterward, the dishes were washed, the table was cleared, and the house grew quiet again.",
  "Maya returned to her notebook and wrote a few lines about what she had learned from the day.",
  "She noticed that patient work had made the difficult letter easier than she expected.",
  "Before bed, she placed the notebook by the door so it would be ready for the next morning."
];

export function buildPageTestText(pages: 1 | 2 | 3): string {
  const targetWords = pages * 250;
  const sentences: string[] = [];
  let words = 0;
  let cycle = shuffled(pageTestSentences);
  for (let index = 0; words < targetWords; index += 1) {
    if (index > 0 && index % cycle.length === 0) cycle = shuffled(pageTestSentences);
    const sentence = cycle[index % cycle.length];
    sentences.push(sentence);
    words += sentence.split(/\s+/).length;
  }
  return sentences.join(" ");
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
