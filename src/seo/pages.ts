export interface SeoPage {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  content: string[];
  related: Array<{ href: string; label: string }>;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://typewell.app";

export const seoPages: SeoPage[] = [
  {
    path: "/",
    title: "Free Typing Test - Check Your WPM & Accuracy",
    description: "Take a free typing test and check your WPM, accuracy, and consistency instantly. Choose a 1, 3, 5, or 10 minute test. No signup required.",
    h1: "Free Typing Test - Check Your WPM & Accuracy",
    intro: "Test your typing speed instantly with a free WPM test that starts on your first keystroke.",
    content: [
      "Typewell measures speed, accuracy, consistency, and weak keys so you can retest with a clear practice target.",
      "WPM uses the standard convention that five characters equals one typing word. Accuracy is based on correct keystrokes compared with total keystrokes."
    ],
    related: [
      { href: "/1-minute-typing-test/", label: "1 Minute Typing Test" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/wpm-calculator/", label: "WPM Calculator" }
    ]
  },
  {
    path: "/typing-test/",
    title: "Free Typing Speed Test - Check Your WPM | Typewell",
    description: "Take a free typing speed test with WPM, raw WPM, accuracy, consistency, errors, and local progress. No signup required.",
    h1: "Free Typing Speed Test",
    intro: "Use this general typing test to measure your current speed and accuracy with standard scoring.",
    content: [
      "The timer begins when you type the first character, not when the page loads.",
      "After the test, Typewell recommends weak-key practice or rhythm training based on your local result.",
      "WPM is a useful comparison point, but a fast score with frequent mistakes is less useful than a slightly slower score you can repeat. Review accuracy and consistency together before changing your practice routine.",
      "Choose a shorter test for a quick check or a longer test for a steadier sample. Your local history makes it easier to compare like-for-like sessions."
    ],
    related: [
      { href: "/1-minute-typing-test/", label: "1 Minute Test" },
      { href: "/3-minute-typing-test/", label: "3 Minute Test" },
      { href: "/typing-test-with-numbers/", label: "Numbers Test" },
      { href: "/typing-test-with-punctuation/", label: "Punctuation Test" }
    ]
  },
  {
    path: "/1-minute-typing-test/",
    title: "1 Minute Typing Test - Check Your WPM | Typewell",
    description: "Take a free 1 minute typing test and instantly see your WPM, accuracy, mistakes, and local progress. No signup required.",
    h1: "1 Minute Typing Test",
    intro: "A 1 minute typing test is useful for quick benchmarking and frequent progress checks.",
    content: [
      "Short tests are convenient, but they can be more sensitive to short bursts and early mistakes.",
      "Use a 3 or 5 minute test when you want a more stable typing-speed sample.",
      "A one-minute result is best treated as a quick benchmark rather than a permanent label. Warm-up, a single missed word, or a brief burst can move the score noticeably.",
      "Take the test under similar conditions when checking progress: use the same keyboard, keep your attention on the text, and prioritize clean keystrokes."
    ],
    related: [
      { href: "/3-minute-typing-test/", label: "Try 3 Minutes" },
      { href: "/5-minute-typing-test/", label: "Try 5 Minutes" },
      { href: "/typing-practice/", label: "Practice Typing" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" }
    ]
  },
  {
    path: "/3-minute-typing-test/",
    title: "3 Minute Typing Test - Free Typing Speed Test | Typewell",
    description: "Take a free 3 minute typing test to measure WPM, accuracy, mistakes, and consistency with no account required.",
    h1: "3 Minute Typing Test",
    intro: "A 3 minute typing test balances quick feedback with a better sample of sustained typing.",
    content: [
      "Three minutes is long enough to reveal rhythm and accuracy patterns without feeling like an endurance session.",
      "If your score varies a lot, compare it with your 1 minute and 5 minute results.",
      "This middle length is useful when a one-minute test feels too volatile but a five-minute session is inconvenient. It gives you enough time to settle into a repeatable pace.",
      "Use the result to decide what to practice next. A stable score with low accuracy points to technique work; a clean but uneven score may benefit from rhythm drills."
    ],
    related: [
      { href: "/1-minute-typing-test/", label: "1 Minute Test" },
      { href: "/5-minute-typing-test/", label: "5 Minute Test" },
      { href: "/rhythm", label: "Rhythm Trainer" },
      { href: "/typing-practice/", label: "Typing Practice" }
    ]
  },
  {
    path: "/5-minute-typing-test/",
    title: "5 Minute Typing Test - Check WPM & Accuracy | Typewell",
    description: "Take a free 5 minute typing test to check sustained WPM, accuracy, consistency, and weak keys. No signup required.",
    h1: "5 Minute Typing Test",
    intro: "A 5 minute typing test is a strong general benchmark for sustained speed and accuracy.",
    content: [
      "Five minutes reduces the effect of brief bursts and gives a clearer view of your normal typing pace.",
      "Use this test when you want a practical benchmark for school, work, or regular practice.",
      "Maintaining accuracy for five minutes requires more than a fast opening burst. Watch for missed spaces, punctuation errors, and repeated reaches as the session continues.",
      "For meaningful comparisons, retake the same duration periodically and look for improvement in both WPM and accuracy rather than chasing one unusually high result."
    ],
    related: [
      { href: "/1-minute-typing-test/", label: "1 Minute Test" },
      { href: "/10-minute-typing-test/", label: "10 Minute Test" },
      { href: "/typing-certificate/", label: "Typing Certificate" },
      { href: "/average-typing-speed/", label: "Speed Guide" }
    ]
  },
  {
    path: "/10-minute-typing-test/",
    title: "10 Minute Typing Test - Free WPM Test | Typewell",
    description: "Take a free 10 minute typing test for typing endurance, sustained WPM, accuracy, and consistency tracking.",
    h1: "10 Minute Typing Test",
    intro: "A 10 minute typing test measures endurance, concentration, and long-form consistency.",
    content: [
      "Longer tests are less affected by lucky bursts and provide a more stable average speed.",
      "Watch accuracy closely. Fatigue often appears first as punctuation errors, missed capitals, or uneven rhythm.",
      "Ten minutes is an endurance check. It measures whether your technique remains controlled when concentration and hand comfort matter over a longer session.",
      "Use this format occasionally rather than for every practice session. Shorter targeted drills are usually easier to repeat, while the long test helps confirm whether those gains hold up."
    ],
    related: [
      { href: "/5-minute-typing-test/", label: "5 Minute Test" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/rhythm", label: "Rhythm Trainer" },
      { href: "/typing-certificate/", label: "Typing Certificate" }
    ]
  },
  {
    path: "/typing-practice/",
    title: "Free Typing Practice - Improve Speed & Accuracy | Typewell",
    description: "Practice typing online with words, sentences, weak keys, numbers, punctuation, code-style text, and custom text. Free and local.",
    h1: "Free Typing Practice",
    intro: "Practice typing without pressure using flexible modes for speed, accuracy, weak keys, and custom text.",
    content: [
      "Typing practice is most effective when it targets the keys and patterns that slow you down.",
      "Typewell stores practice history locally so you can return later without creating an account.",
      "A test measures your current performance under a fixed condition. Practice gives you room to slow down, repeat a difficult pattern, use a custom passage, or focus on accuracy without treating every session as a score.",
      "Start below your maximum speed and keep errors low. Once the movement feels reliable, increase pace gradually and retest to see whether the change transfers to normal text."
    ],
    related: [
      { href: "/typing-test/", label: "Typing Test" },
      { href: "/touch-typing-practice/", label: "Touch Typing" },
      { href: "/typing-test-with-numbers/", label: "Numbers Test" },
      { href: "/typing-test-with-punctuation/", label: "Punctuation Test" }
    ]
  },
  {
    path: "/touch-typing-practice/",
    title: "Free Touch Typing Practice | Typewell",
    description: "Build touch typing technique with keyboard guidance, finger placement, WPM feedback, and accuracy tracking.",
    h1: "Touch Typing Practice",
    intro: "Touch typing practice helps you type without looking at the keyboard by using consistent finger placement.",
    content: [
      "Start with home row control, then gradually add top row, bottom row, capitals, numbers, and punctuation.",
      "Accuracy matters first. Speed improves as correct movement becomes automatic."
    ],
    related: [
      { href: "/learn/home-row", label: "Home Row Lesson" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/1-minute-typing-test/", label: "Check WPM" },
      { href: "/rhythm", label: "Rhythm Trainer" }
    ]
  },
  {
    path: "/typing-test-with-numbers/",
    title: "Typing Test With Numbers - Free Number WPM Test | Typewell",
    description: "Practice a free typing test with numbers, dates, prices, measurements, and percentages while tracking WPM and accuracy.",
    h1: "Typing Test With Numbers",
    intro: "Number typing tests help with dates, prices, product IDs, measurements, and work that mixes text with digits.",
    content: [
      "Numbers often reduce accuracy because they require longer reaches and more attention than common words.",
      "Practice slowly first, then increase speed once number-row accuracy is stable."
    ],
    related: [
      { href: "/data-entry-typing-test/", label: "Data Entry Test" },
      { href: "/10-key-typing-test/", label: "10-Key Test" },
      { href: "/kph-typing-test/", label: "KPH Test" },
      { href: "/wpm-calculator/", label: "WPM Calculator" }
    ]
  },
  {
    path: "/typing-test-with-punctuation/",
    title: "Typing Test With Punctuation - Free WPM Test | Typewell",
    description: "Practice punctuation, capitalization, commas, quotes, and sentence patterns while measuring WPM and accuracy.",
    h1: "Typing Test With Punctuation",
    intro: "Punctuation tests show how well your typing holds up when text includes commas, quotes, questions, and capitals.",
    content: [
      "Punctuation-heavy text often reveals technique issues that simple word tests hide.",
      "Use this test when your everyday writing includes email, documents, notes, or formatted text."
    ],
    related: [
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/5-minute-typing-test/", label: "5 Minute Test" },
      { href: "/touch-typing-practice/", label: "Touch Typing" },
      { href: "/average-typing-speed/", label: "Speed Guide" }
    ]
  },
  {
    path: "/data-entry-typing-test/",
    title: "Free Data Entry Typing Test - Check Your Speed | Typewell",
    description: "Practice data-entry style typing with fictional records, numbers, dates, order IDs, and accuracy feedback.",
    h1: "Data Entry Typing Test",
    intro: "Data-entry typing depends on accuracy, sustained attention, and clean handling of mixed text and numbers.",
    content: [
      "Data-entry work often includes names, dates, amounts, invoice IDs, product codes, and address fragments.",
      "Unlike a paragraph test, data-entry practice should reward correct records as well as overall typing speed.",
      "Structured data changes the task: the goal is to reproduce each value exactly, including leading zeroes, decimal points, hyphens, and capitalization. A fluent paragraph score does not automatically predict accurate record entry.",
      "Use this page to build familiarity with mixed fields, then compare numeric performance with the dedicated 10-key and KPH tests."
    ],
    related: [
      { href: "/10-key-typing-test/", label: "10-Key Test" },
      { href: "/numeric-keypad-test/", label: "Numeric Keypad Test" },
      { href: "/kph-typing-test/", label: "KPH Test" },
      { href: "/typing-certificate/", label: "Typing Certificate" }
    ]
  },
  {
    path: "/10-key-typing-test/",
    title: "10 Key Typing Test - Numeric Keypad Speed Test | Typewell",
    description: "Practice 10-key and numeric keypad typing with realistic number groups, KPM, KPH, accuracy, and errors.",
    h1: "10 Key Typing Test",
    intro: "A 10-key typing test focuses on numeric keypad speed and accuracy for number-heavy work.",
    content: [
      "10-key practice uses grouped numbers, decimals, and repeated numeric patterns rather than ordinary prose.",
      "KPH is calculated from keystrokes per minute multiplied by 60.",
      "The 10-key layout lets experienced users enter numbers without moving their eyes between the main keyboard and the screen. Correct finger placement and a consistent return to the home position help reduce searching.",
      "Compare KPM and KPH with accuracy. A higher keystroke rate is only useful when the numbers, decimal points, and separators are correct."
    ],
    related: [
      { href: "/numeric-keypad-test/", label: "Numeric Keypad Test" },
      { href: "/kph-typing-test/", label: "KPH Test" },
      { href: "/data-entry-typing-test/", label: "Data Entry Test" },
      { href: "/wpm-calculator/", label: "WPM Calculator" }
    ]
  },
  {
    path: "/numeric-keypad-test/",
    title: "Numeric Keypad Test - Free Number Typing Test | Typewell",
    description: "Test numeric keypad accuracy and speed with realistic number groups, decimals, KPM, KPH, and local results.",
    h1: "Numeric Keypad Test",
    intro: "Numeric keypad tests are useful for people who enter totals, dates, IDs, prices, and measurements.",
    content: [
      "A dedicated keypad test is different from a WPM paragraph because every keystroke matters.",
      "Watch both accuracy and KPH. Fast numeric entry with many corrections is not useful in real data work."
    ],
    related: [
      { href: "/10-key-typing-test/", label: "10-Key Test" },
      { href: "/kph-typing-test/", label: "KPH Test" },
      { href: "/typing-test-with-numbers/", label: "Numbers Test" },
      { href: "/data-entry-typing-test/", label: "Data Entry Test" }
    ]
  },
  {
    path: "/kph-typing-test/",
    title: "KPH Typing Test - Test Keystrokes Per Hour | Typewell",
    description: "Take a KPH typing test and learn how keystrokes per hour differs from WPM for data-entry and numeric typing.",
    h1: "KPH Typing Test - Test Keystrokes Per Hour",
    intro: "KPH means keystrokes per hour. It is commonly used for number-heavy and data-entry style typing.",
    content: [
      "KPH is calculated as keystrokes per minute multiplied by 60. It focuses on individual keystrokes rather than five-character word units.",
      "WPM is useful for prose. KPH is often more relevant when typing records, invoice numbers, product codes, and numeric keypad entries.",
      "For example, 120 correct keystrokes in one minute is 120 KPM and 7,200 KPH. The calculation describes a rate, not a guarantee of job performance.",
      "When comparing KPH results, keep the test duration and correction policy consistent. Accuracy and error recovery are important context for any numeric-entry score."
    ],
    related: [
      { href: "/data-entry-typing-test/", label: "Data Entry Test" },
      { href: "/10-key-typing-test/", label: "10-Key Test" },
      { href: "/numeric-keypad-test/", label: "Numeric Keypad Test" },
      { href: "/wpm-calculator/", label: "WPM Calculator" }
    ]
  },
  {
    path: "/wpm-calculator/",
    title: "WPM Calculator - Calculate Words Per Minute | Typewell",
    description: "Calculate typing WPM from characters, words, time, and errors using the standard five-character word convention.",
    h1: "WPM Calculator",
    intro: "Use the WPM calculator to convert typed characters, time, and errors into words per minute.",
    content: [
      "One standardized typing word equals five characters, including spaces.",
      "Gross WPM uses all typed characters. Error-adjusted WPM subtracts mistakes so the score does not reward inaccurate typing.",
      "For a worked example, 1,500 correct characters in five minutes equals (1,500 / 5) / 5 = 60 WPM. If the same session contains errors, an error-adjusted score will be lower depending on the formula used.",
      "Use the calculator as a reference and use the live test when you want a measured result with timing, consistency, and weak-key information."
    ],
    related: [
      { href: "/1-minute-typing-test/", label: "1 Minute Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/kph-typing-test/", label: "KPH Test" },
      { href: "/typing-practice/", label: "Typing Practice" }
    ]
  },
  {
    path: "/average-typing-speed/",
    title: "Average Typing Speed - What's a Good WPM? | Typewell",
    description: "Learn how to interpret average typing speed, WPM ranges, accuracy, consistency, and when typing speed matters.",
    h1: "Average Typing Speed - What's a Good WPM?",
    intro: "A good typing speed depends on context. Accuracy and consistency matter as much as the WPM number.",
    content: [
      "Beginners often focus on finding the keys. Intermediate typists usually type everyday text comfortably. Strong typists combine speed with high accuracy.",
      "Typing speed is especially relevant for data entry, administrative work, transcription, support roles, and jobs with heavy written communication.",
      "There is no single universal average. Results vary with age, keyboard familiarity, language, test length, device, and whether the task is prose, numbers, or structured records.",
      "Treat qualitative ranges as orientation rather than a ranking. A repeatable score around your normal work conditions is more useful than a short burst that cannot be sustained accurately."
    ],
    related: [
      { href: "/typing-test/", label: "Take a Typing Test" },
      { href: "/wpm-calculator/", label: "WPM Calculator" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/data-entry-typing-test/", label: "Data Entry Test" }
    ]
  },
  {
    path: "/typing-certificate/",
    title: "Free Typing Certificate - Test Your Typing Speed | Typewell",
    description: "Create a printable Typewell typing result certificate from your most recent local typing test result.",
    h1: "Typing Certificate",
    intro: "After completing a typing test, create a simple printable certificate from your local result.",
    content: [
      "Typewell certificates are site-generated practice records, not accredited professional certifications.",
      "Use the certificate as a personal record of a completed online typing test."
    ],
    related: [
      { href: "/5-minute-typing-test/", label: "5 Minute Test" },
      { href: "/10-minute-typing-test/", label: "10 Minute Test" },
      { href: "/typing-test/", label: "Typing Test" },
      { href: "/average-typing-speed/", label: "Speed Guide" }
    ]
  },
  {
    path: "/typing-games/",
    title: "Typing Games - Free Accuracy and Speed Drills | Typewell",
    description: "Play lightweight typing games that reinforce real keyboard accuracy, speed bursts, and repeat practice.",
    h1: "Typing Games",
    intro: "Typing games should reinforce real typing skill, not distract from accuracy.",
    content: [
      "Typewell's first typing game is a short speed-burst drill that records local practice results.",
      "More games can be added later without fake leaderboards or account requirements."
    ],
    related: [
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/1-minute-typing-test/", label: "1 Minute Test" },
      { href: "/rhythm", label: "Rhythm Trainer" },
      { href: "/progress", label: "Progress" }
    ]
  }
];

export const seoPageMap = new Map(seoPages.map((page) => [page.path.replace(/\/$/, "") || "/", page]));

export function normalizePath(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

export function getSeoPage(path: string): SeoPage | undefined {
  return seoPageMap.get(normalizePath(path));
}
