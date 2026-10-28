import { dataEntryFields, fictionalDataEntryRecords } from "../engine/dataEntry";

export type PracticeMode = "Words" | "Sentences" | "Quotes" | "Custom Text" | "Weak Keys" | "Numbers" | "Data Entry" | "Numeric Keypad" | "Punctuation" | "Symbols" | "Endurance" | "Speed Burst" | "Accuracy" | "Code" | "Fun Facts" | "Tiny Dramas";

export const practiceModes: PracticeMode[] = ["Words", "Sentences", "Quotes", "Custom Text", "Weak Keys", "Numbers", "Data Entry", "Numeric Keypad", "Punctuation", "Symbols", "Endurance", "Speed Burst", "Accuracy", "Code", "Fun Facts", "Tiny Dramas"];

export const durations = [15, 30, 60, 120, 300, 600];
export const testDurations = [15, 30, 60, 120, 300, 600];
export const wordCounts = [10, 25, 50, 100];

export const library: Record<string, string[]> = {
  "Fun Facts": [
    "Octopuses have three hearts. Somehow, they still manage to avoid sending three separate breakup texts.",
    "A group of flamingos is called a flamboyance. Honestly, any other name would be insulting.",
    "Bananas are berries, but strawberries are not. Botany clearly hired the person who names printer errors.",
    "Wombats produce cube shaped droppings. Nature invented the building block before the toy industry.",
    "Some turtles absorb oxygen through specialized tissues near their tails. Biology does not care about your dignity.",
    "Sharks existed before trees. They have had plenty of time to develop a strong opinion about beaches.",
    "A day on Venus lasts longer than its year. Imagine waiting for Friday on that planet.",
    "Honey can remain edible for an incredibly long time when properly sealed. Your leftovers could never.",
    "Sea otters sometimes hold hands while resting so they do not drift apart. Finally, a relationship with clear boundaries.",
    "The Eiffel Tower expands slightly in hot weather. Even famous landmarks need room to breathe.",
    "Crows can recognize individual human faces. That awkward moment with a crow may not be forgotten.",
    "Butterflies taste with their feet. A buffet must be an absolute logistical nightmare."
  ],
  "Tiny Dramas": [
    "The printer waited until the final minute before the deadline to announce it was out of paper. It had one job and chose violence.",
    "She opened one tab to check the weather. Forty minutes later, she knew how to raise alpacas but not whether it would rain.",
    "His phone corrected a polite thank you into a declaration of love. The office holiday party was never the same.",
    "The meeting could have been an email. Instead, twelve adults watched a loading icon for an hour.",
    "Maya made a fresh coffee and sat down to work. The coffee went cold while she searched for the perfect productivity playlist.",
    "He confidently clicked Reply All. Somewhere in the office, an entire department stopped breathing.",
    "The WiFi went out for six minutes. The family was forced to make eye contact and discuss the weather.",
    "She finally reached inbox zero. Then her manager discovered the Send button.",
    "He bought an expensive planner to organize his life. The planner is now missing, along with his keys.",
    "The recipe said preparation would take ten minutes. Apparently that estimate assumed the vegetables had already chopped themselves.",
    "She promised to go to bed early. At midnight, she was researching whether penguins have knees.",
    "The laptop requested an update moments before the presentation. It had been waiting for this opportunity all week."
  ],
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
      if (items.length > 1 && parts.length && item === parts[parts.length - 1]) continue;
      parts.push(item);
      size += item.length + 1;
      if (size >= length) break;
    }
  }
  return parts.join(" ");
}

// Keep each standard passage on one subject instead of shuffling unrelated
// sentences from business, fiction, science, and nature together.
const coherentPassages = [
  "The morning started with a clean desk and a simple plan. Maya opened her notebook and wrote down the work she wanted to finish. She answered the most important message first. Then she spent a quiet hour working without switching between tasks. By lunchtime she had made steady progress. A short walk helped her return with fresh attention. She finished the afternoon by reviewing her work and preparing for tomorrow.",
  "Rain moved slowly across the coastline as the afternoon breeze cooled the air. Small waves reached the sand and slipped back toward the ocean. A few people walked along the shore while others watched from the shade. Farther down the beach a bird searched for food near the water. As the clouds began to clear the sunlight returned to the hills. The evening felt peaceful and unhurried.",
  "Learning to type well begins with comfortable posture and a steady rhythm. Place your hands gently on the keyboard and focus on the next word rather than the clock. Accuracy matters because correcting mistakes takes time. With regular practice your fingers become more familiar with the keys. Your speed may change from day to day but progress becomes easier to notice over time. A few focused minutes can be more useful than a long distracted session.",
  "The small bookshop opened just after sunrise. Its owner arranged fresh titles in the front window and made coffee behind the counter. A customer arrived looking for a mystery novel to read over the weekend. They talked about favorite stories and the pleasure of discovering a new author. Before leaving the customer picked up a second book for a friend. By the time the street grew busy the shop was full of quiet conversations."
];

// Select at passage level. Sentence order is authored, never randomized.
// Longer sessions repeat the complete selected passage rather than splicing
// in unrelated material or getting stuck in the no-adjacent-duplicates loop.
export const categoryPassages: Record<"Sentences" | "Fun Facts" | "Tiny Dramas", readonly string[]> = {
  Sentences: coherentPassages,
  "Fun Facts": [
    "An octopus has three hearts, which sounds excessive until you consider the plumbing. Two hearts move blood through the gills, while the third sends it around the rest of the body. Each heart has a particular job. This arrangement helps the animal move oxygen through its unusual circulatory system. Having three hearts does not mean an octopus spends its afternoon writing emotional poetry. It means the animal has a different solution to the practical problem of staying alive underwater. The surprises do not stop with its hearts. An octopus also has eight flexible arms lined with suckers. Those suckers help it explore objects and find food. Much of its nervous system extends through its arms, allowing them to process information as they move. Picture trying to check eight cupboards at once while keeping track of what each hand discovered. An octopus makes that sort of coordination look ordinary. Its soft body also allows it to squeeze through narrow openings, provided its hard beak can fit. That makes an aquarium lid more of a serious engineering decision than a decorative accessory. Octopuses can change their appearance using specialized cells in their skin. Color and texture help them blend into their surroundings or communicate. A rocky patch of seabed can therefore contain a very convincing animal pretending to be part of the scenery. Three hearts, eight arms, and a talent for disappearing make a remarkable combination. The ocean apparently decided that an ordinary body plan would have been far too boring.",
    "Crows can recognize individual human faces. For a bird that spends time near people, remembering who caused trouble can be useful. Researchers have studied this ability by observing how crows respond to people wearing particular masks. The birds can learn that one face signals a threat and react differently when they see it again. A crow does not need your name or a profile picture to remember an uncomfortable encounter. Its own observations can be enough. Crows are social birds, so information about danger can also spread through a group. Calls and behavior alert other birds to something worth watching. That does not mean every crow in town is maintaining a formal file on your afternoon walk. It means a social animal benefits from paying attention to the experiences of its neighbors. Their ability to learn also appears in the ways they search for food and solve problems. Some members of the crow family use tools, and many adapt well to changing surroundings. Streets, parks, and gardens provide opportunities for animals willing to investigate. What looks like a bird idly watching from a fence may actually be careful observation. Intelligence does not require a desk, a calendar, or an expensive notebook. Sometimes it comes with feathers and a habit of inspecting whatever you dropped near the picnic table. The next time a crow tilts its head toward you, there is no need to invent a secret conspiracy. It may simply be deciding whether you are interesting, troublesome, or likely to leave a snack. That is already a fairly demanding social assessment for a weekday morning."
  ],
  "Tiny Dramas": [
    "Maya made a fresh coffee and sat down to work. Before opening her report, she decided she needed the perfect productivity playlist. The first playlist contained rain sounds. Unfortunately, the rain reminded her that she had left a towel outside. She rescued the towel, noticed the empty laundry basket, and decided that folding a few shirts would only take a minute. The shirts led her to the bedroom, where she found the headphones she had been looking for all week. This was excellent news for the playlist project. Back at her desk, she tried a collection of quiet piano music. The second track sounded familiar, so she searched for the name of the film that had used it. The search produced an interview with the composer. The interview mentioned a small village with beautiful walking trails. Maya opened a map. She had no intention of planning a holiday, but she felt it was important to understand the geography. A notification interrupted her research. Her colleague wanted to know whether the report was ready. Maya looked at the blank document, then at the growing row of browser tabs. Somewhere between the laundry and the walking trails, the morning had disappeared. She reached for her coffee and discovered that it had become a cold monument to her ambition. For a moment, she considered reheating it. Then she recognized the opening scene of another unnecessary adventure. She closed the map, stopped the music, and wrote the first sentence of the report. It was not a brilliant sentence, but it existed. The next sentence came more easily. By lunchtime, the report was finished. Her colleague thanked her for the clear explanation. Maya smiled, saved the file, and finally made another coffee. This time, she drank it before organizing anything.",
    "The printer waited until the final minute before the deadline to announce that it was out of paper. Nora opened the tray and found a perfectly respectable stack already inside. She adjusted the stack. The printer considered this gesture and repeated its complaint. Across the room, Ben suggested turning it off and on again. Nora had already done that, but she appreciated the traditional office blessing. She tried a different tray. The machine woke with a promising hum, pulled in one sheet, and stopped halfway through. Now it claimed there was a paper jam. Nora removed the sheet with the care of someone handling an ancient manuscript. The paper was unharmed. Her patience was less fortunate. Ben checked the print queue and discovered several copies of the same document waiting behind one another. Every time the printer had appeared to ignore Nora, it had quietly accepted another assignment. They cancelled the extra copies and tried again. This time, the printer produced a page containing only the title. Nora stared at it. Ben stared at it. The machine made a cheerful noise that neither of them felt it had earned. Their manager arrived to ask whether the handouts were ready. Nora explained the situation and held up the lonely title page as evidence. The manager looked at the document on her laptop and asked whether everyone could read it on screen instead. A brief silence settled over the room. Nora sent the file to the meeting group. Ben carried the unused paper back to the cupboard. The meeting began on time, and everyone could read the report clearly. Halfway through the discussion, a distant mechanical hum rose from the empty office. The printer had finally decided to print every page."
  ]
};

function coherentText(mode: keyof typeof categoryPassages, length: number): string {
  const passages = categoryPassages[mode];
  const passage = passages[Math.floor(Math.random() * passages.length)];
  return Array(Math.max(1, Math.ceil(length / (passage.length + 1)))).fill(passage).join(" ");
}

export function buildPracticeText(mode: PracticeMode, count = 50, customText = ""): string {
  if (mode === "Custom Text") return customText || "Paste custom text in the field above, then begin typing here.";
  if (mode === "Numbers") return variedText(library.Numbers, count * 6);
  if (mode === "Data Entry") return variedText(fictionalDataEntryRecords.map((record) => dataEntryFields(record).join(" ")), count * 8);
  if (mode === "Numeric Keypad") return variedText(numericGroups, count * 5);
  if (mode === "Punctuation") return variedText(library.Punctuation, count * 6);
  if (mode === "Symbols") return variedText(["email@domain.dev", "#issue-42", "$19.95", "+ 8%", "total_value", "/ [draft]", "{ready}", "&& checked"], count * 6);
  if (mode === "Code") return variedText(library.Programming, count * 7);
  if (mode === "Fun Facts" || mode === "Tiny Dramas") return coherentText(mode, count * 6);
  if (mode === "Accuracy") return variedText(["accurate", "steady", "clear", "exact", "clean", "calm", "deliberate", "return", "home", "row"], count * 6);
  if (mode === "Speed Burst") return variedText(["the", "and", "you", "that", "with", "have", "type", "fast", "calm", "flow"], count * 6);
  if (mode === "Endurance") return coherentText("Sentences", count * 10);
  if (mode === "Words") return variedText(["time", "form", "hand", "type", "clean", "steady", "rhythm", "focus", "reach", "return", "index", "finger", "screen", "practice", "improve"], count * 6);
  if (mode === "Quotes") return variedText(library.Quotes, count * 6);
  return coherentText("Sentences", count * 6);
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
  const cycle = pageTestSentences;
  for (let index = 0; words < targetWords; index += 1) {
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
