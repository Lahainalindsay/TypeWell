export interface Lesson {
  id: string;
  level: number;
  title: string;
  summary: string;
  keys: string[];
  targetWpm: number;
  targetAccuracy: number;
  exercise: string;
}

export const lessons: Lesson[] = [
  {
    id: "first-fj",
    level: 1,
    title: "First Keys: F and J",
    summary: "Find the tactile bumps. Left index rests on F, right index rests on J. Keep your eyes on the screen and return to home after each key.",
    keys: ["f", "j"],
    targetWpm: 8,
    targetAccuracy: 92,
    exercise: "fff jjj fjf jfj ffj jjf fj fj jf jf fff jjj fjf jfj"
  },
  {
    id: "home-asdf-jkl",
    level: 1,
    title: "Home Row Posture",
    summary: "Place left fingers on A S D F and right fingers on J K L ;. Curve your fingers and use a light touch.",
    keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
    targetWpm: 10,
    targetAccuracy: 94,
    exercise: "asdf jkl; sad fad lad flask ask fall; jaffa; ask dad; all fall"
  },
  {
    id: "home-gh",
    level: 2,
    title: "Reach to G and H",
    summary: "Use left index for G and right index for H. Reach, strike, then return to F and J.",
    keys: ["g", "h"],
    targetWpm: 14,
    targetAccuracy: 94,
    exercise: "fgf jhj gfg hjh had hag flash dash shall glad half"
  },
  {
    id: "top-ei",
    level: 3,
    title: "Top Row: E and I",
    summary: "Left middle reaches to E. Right middle reaches to I. Keep wrists quiet and move from the fingers.",
    keys: ["e", "i"],
    targetWpm: 16,
    targetAccuracy: 95,
    exercise: "deed idle field dislike slide inside ideal skilled"
  },
  {
    id: "top-ru",
    level: 3,
    title: "Top Row: R and U",
    summary: "R belongs to the left index. U belongs to the right index. Return to F and J after each reach.",
    keys: ["r", "u"],
    targetWpm: 18,
    targetAccuracy: 95,
    exercise: "fur jar ruler usual rural sure read rule guard"
  },
  {
    id: "top-wo-qp-ty",
    level: 3,
    title: "Complete the Top Row",
    summary: "Add W O, Q P, and T Y gradually. Watch finger responsibility more than speed.",
    keys: ["w", "o", "q", "p", "t", "y"],
    targetWpm: 20,
    targetAccuracy: 95,
    exercise: "quiet power type wrote point story quality yesterday"
  },
  {
    id: "bottom-cm-vn-xz-b",
    level: 4,
    title: "Bottom Row Control",
    summary: "Reach down cleanly for C M, V N, X comma, Z period, and B. Keep hands anchored around home row.",
    keys: ["c", "m", "v", "n", "x", ",", "z", ".", "b"],
    targetWpm: 22,
    targetAccuracy: 95,
    exercise: "common vivid next zebra, calm value, mixed number, brave motion."
  },
  {
    id: "shift-capitals",
    level: 5,
    title: "Shift and Capitals",
    summary: "Use the opposite hand's Shift key for capitals. Left Shift helps with right-hand letters; right Shift helps with left-hand letters.",
    keys: ["Shift", "A", "J"],
    targetWpm: 22,
    targetAccuracy: 96,
    exercise: "Ada and Jules met in June. Fine Work Starts With Clean Form."
  },
  {
    id: "punctuation",
    level: 6,
    title: "Punctuation",
    summary: "Practice punctuation as part of phrasing, not as interruptions. Keep accuracy high.",
    keys: [".", ",", "?", "'", "\"", ":", ";", "-", "(", ")"],
    targetWpm: 24,
    targetAccuracy: 96,
    exercise: "Ready, steady, type. What's next? She said, \"Use calm rhythm; avoid force.\""
  },
  {
    id: "numbers",
    level: 7,
    title: "Numbers in Real Patterns",
    summary: "Use number-row finger zones for dates, prices, measurements, percentages, and phone-number patterns.",
    keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    targetWpm: 24,
    targetAccuracy: 96,
    exercise: "On 04/18/2026, 42 users saved $19.95 and improved 18% in 3 weeks."
  },
  {
    id: "symbols",
    level: 8,
    title: "Symbols",
    summary: "Treat symbols as controlled reaches. Slow down first, then smooth the sequence.",
    keys: ["@", "#", "$", "%", "&", "*", "+", "=", "/", "_", "[", "]", "{", "}"],
    targetWpm: 20,
    targetAccuracy: 95,
    exercise: "email@site.dev #42 costs $20 + tax = 100%; use [keys] and {braces}."
  },
  {
    id: "real-text",
    level: 9,
    title: "Real Text",
    summary: "Practice sentence flow, capitalization, punctuation, and paragraph rhythm.",
    keys: ["text"],
    targetWpm: 32,
    targetAccuracy: 96,
    exercise: "Clear typing is built through repetition. Speed grows when accurate movement becomes steady and relaxed."
  },
  {
    id: "advanced",
    level: 10,
    title: "Advanced Mixed Typing",
    summary: "Combine technical vocabulary, long words, numbers, symbols, and endurance without losing form.",
    keys: ["advanced"],
    targetWpm: 40,
    targetAccuracy: 96,
    exercise: "Configure requestTimeout = 2500ms, validate JSON payloads, and document edge-case behavior before release."
  }
];
