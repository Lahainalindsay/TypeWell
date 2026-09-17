export interface SeoPage {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  content: string[];
  related: Array<{ href: string; label: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wpmtest.app";

export const seoPages: SeoPage[] = [
  {
    path: "/",
    title: "Free Typing Test - Check Your WPM & Accuracy | WPMTest",
    description: "Take a free typing test and check your WPM, accuracy, consistency, and weak keys instantly. Choose a 1, 3, 5, or 10 minute test. No signup required.",
    h1: "Free Typing Test — Measure Your Speed and Accuracy Instantly",
    intro: "WPMTest starts timing on your first keystroke and measures speed, accuracy, consistency, and weak keys without requiring an account.",
    content: [
      "Choose a 1, 3, 5, or 10 minute test depending on whether you want a quick check or a steadier benchmark. Longer tests reduce the effect of a rough start or a short lucky burst, so they are useful when you want a more repeatable result.",
      "Every result can help you identify weak keys and patterns that are costing you speed. Instead of treating one WPM number as the whole story, compare speed with accuracy and consistency, then use targeted typing practice to work on the keys that need attention.",
      "WPMTest stores progress locally in your browser. No account or signup is required to take a test, use the WPM calculator, practice, or create a site-generated typing certificate."
    ],
    related: [
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/wpm-calculator/", label: "WPM Calculator" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" }
    ],
    faqs: [
      { question: "Is this typing test really free?", answer: "Yes. The typing tests, WPM calculator, practice tools, and basic site-generated certificates are free to use with no signup." },
      { question: "What's a good WPM?", answer: "Typing speed depends on the task and test conditions. Use the Average Typing Speed guide to compare practical ranges and remember that accuracy matters alongside speed." },
      { question: "How is WPM calculated?", answer: "Standard typing WPM treats five characters, including spaces, as one word. The WPM Calculator explains the formula and the difference between gross and error-adjusted speed." }
    ]
  }
  {
    path: "/typing-test/",
    title: "Free Typing Speed Test - Check Your WPM | WPMTest",
    description: "Take a free typing speed test with WPM, raw WPM, accuracy, consistency, errors, and local progress. No signup required.",
    h1: "Free Typing Speed Test",
    intro: "Use this general typing test to measure your current speed and accuracy with standard scoring.",
    content: [
      "The timer begins when you type the first character, not when the page loads.",
      "After the test, WPMTest recommends weak-key practice or rhythm training based on your local result.",
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
    title: "1 Minute Typing Test - Check Your WPM | WPMTest",
    description: "Take a free 1 minute typing test and instantly see your WPM, accuracy, mistakes, and local progress. No signup required.",
    h1: "1 Minute Typing Test",
    intro: "A one-minute test is the fastest way to check your typing speed: short enough to repeat often, but long enough to give you a useful snapshot.",
    content: [
      "Because the sample is small, a missed word or slow start can move your score by several WPM. Treat a one-minute result as a quick check rather than your definitive typing speed.",
      "Use it for frequent progress checks under similar conditions. If you want a steadier benchmark for a résumé, job requirement, or longer comparison, use the 5 minute or 10 minute typing test instead."
    ],
    related: [
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" },
      { href: "/10-minute-typing-test/", label: "10 Minute Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" }
    ],
    faqs: [
      { question: "Why does my score jump around between attempts?", answer: "Short tests amplify the effect of a slow start, one missed word, or a brief speed burst. Compare several attempts instead of relying on a single score." },
      { question: "Can I use a 1-minute score for a job application?", answer: "Check the employer's instructions first. When no duration is specified, a longer test gives a more sustained sample than a one-minute burst." }
    ]
  }
  {
    path: "/3-minute-typing-test/",
    title: "3 Minute Typing Test - Free Typing Speed Test | WPMTest",
    description: "Take a free 3 minute typing test to measure WPM, accuracy, mistakes, and consistency with no account required.",
    h1: "3 Minute Typing Test",
    intro: "Three minutes balances a quick speed check with a longer sample of sustained typing.",
    content: [
      "A three-minute test gives you enough time to settle into a repeatable pace while remaining short enough to run more than once in a practice session. A rough opening line has less influence on the final result than it does in a one-minute test.",
      "For useful progress comparisons, test under similar conditions: use the same keyboard, similar posture, and minimal distractions. Then use your weak-key results to choose a specific typing-practice target instead of simply repeating random paragraphs."
    ],
    related: [
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/1-minute-typing-test/", label: "1 Minute Typing Test" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" }
    ],
    faqs: [
      { question: "Is 3 minutes long enough to be useful?", answer: "For many practice and benchmarking purposes, three minutes provides a more stable sample than a one-minute burst while staying easy to repeat." },
      { question: "How does this compare with the 1-minute test?", answer: "A longer test places more weight on sustained pace and accuracy, so it may differ from your best one-minute burst." }
    ]
  }
  {
    path: "/5-minute-typing-test/",
    title: "5 Minute Typing Test - Check WPM & Accuracy | WPMTest",
    description: "Take a free 5 minute typing test to check sustained WPM, accuracy, consistency, and weak keys. No signup required.",
    h1: "5 Minute Typing Test",
    intro: "Five minutes provides a sustained typing sample in which both pace and accuracy have time to matter.",
    content: [
      "A five-minute test reduces the effect of a brief fast burst and makes repeated errors, missed spaces, and loss of rhythm easier to see. It is a useful format when you want a more stable benchmark for work, school, or regular progress tracking.",
      "Compare gross speed with error-adjusted performance and accuracy rather than focusing on WPM alone. If mistakes are creating a large gap, use the WPM Calculator to understand the scoring and targeted Typing Practice to work on the patterns causing errors."
    ],
    related: [
      { href: "/wpm-calculator/", label: "WPM Calculator" },
      { href: "/data-entry-typing-test/", label: "Data Entry Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/typing-practice/", label: "Typing Practice" }
    ],
    faqs: [
      { question: "Is a 5-minute test useful for employment practice?", answer: "Yes. It provides a sustained sample that is useful for employment practice, but always follow the exact duration and scoring rules requested by a specific employer." },
      { question: "What WPM should I aim for?", answer: "Requirements vary by role. Use the Average Typing Speed guide for context and prioritize meeting any stated accuracy requirement as well as speed." }
    ]
  }
  {
    path: "/10-minute-typing-test/",
    title: "10 Minute Typing Test - Free WPM Test | WPMTest",
    description: "Take a free 10 minute typing test for typing endurance, sustained WPM, accuracy, and consistency tracking.",
    h1: "10 Minute Typing Test",
    intro: "Ten minutes is WPMTest's longest standard test and is designed to measure sustained typing pace, accuracy, and concentration.",
    content: [
      "A ten-minute test is closer to a sustained real-world typing session than a short speed burst. Fatigue and attention drift have more time to affect the result, making this format useful when you want to see whether your technique holds up.",
      "If your WPM or accuracy drops in the second half, compare the result with your 5 minute score and use shorter targeted practice sessions to work on the weak keys, punctuation, or rhythm issues that appear."
    ],
    related: [
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" }
    ],
    faqs: [
      { question: "Should I take the 10-minute test every time?", answer: "No. Shorter tests are convenient for frequent practice. Use the ten-minute format periodically when you want an endurance check." },
      { question: "Why does my WPM drop near the end?", answer: "Longer sessions can expose fatigue, concentration changes, and technique issues that may not appear during a short test." }
    ]
  }
  {
    path: "/typing-practice/",
    title: "Typing Practice - Targeted Drills to Improve Weak Keys | WPMTest",
    description: "Practice typing with targeted drills for weak keys, accuracy, rhythm, numbers, punctuation, code-style text, and custom text. Free and no signup required.",
    h1: "Typing Practice — Targeted Drills to Fix Your Weak Keys",
    intro: "Typing practice is most useful when it targets the keys and patterns that are actually limiting your speed or accuracy.",
    content: [
      "Start with a baseline test to identify weak keys, then spend a short focused session on the two or three patterns causing the most errors. Retest afterward to see whether the targeted mistakes decreased instead of simply repeating random paragraphs.",
      "Short, frequent practice is easier to repeat consistently than occasional long sessions. Begin below your maximum speed, keep errors low, and increase pace gradually as the movement becomes reliable. WPMTest stores your practice history locally so you can return without creating an account."
    ],
    related: [
      { href: "/", label: "Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/touch-typing-practice/", label: "Touch Typing Practice" },
      { href: "/typing-test-with-numbers/", label: "Numbers Typing Test" }
    ],
    faqs: [
      { question: "How often should I practice typing?", answer: "Short, regular sessions are a practical way to build repeatable keyboard movement. Consistency matters more than making any one session very long." },
      { question: "What should I do if my WPM plateaus?", answer: "Review weak keys and repeated error patterns, isolate them in focused drills, then retest under the same conditions to see whether the change transfers to normal text." }
    ]
  }
  {
    path: "/touch-typing-practice/",
    title: "Free Touch Typing Practice | WPMTest",
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
    title: "Typing Test With Numbers - Free Number WPM Test | WPMTest",
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
    title: "Typing Test With Punctuation - Free WPM Test | WPMTest",
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
    title: "Free Data Entry Typing Test - Check Your Speed | WPMTest",
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
    title: "10 Key Typing Test - Numeric Keypad Speed Test | WPMTest",
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
    title: "Numeric Keypad Test - Free Number Typing Test | WPMTest",
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
    title: "KPH Typing Test - Measure 10-Key Numeric Entry Speed | WPMTest",
    description: "Take a KPH typing test to measure keystrokes per hour for 10-key, numeric keypad, accounting, bookkeeping, and data-entry practice.",
    h1: "KPH Typing Test — Measure Your 10-Key Numeric Entry Speed",
    intro: "KPH means keystrokes per hour and is a useful rate for numeric keypad and data-entry work where individual keystrokes matter more than prose word count.",
    content: [
      "A KPH test measures a different skill from ordinary WPM. Numeric keypad entry uses a different movement pattern from full-keyboard prose, so a strong WPM score does not automatically mean the same level of 10-key speed.",
      "KPH is calculated from keystrokes per minute multiplied by 60. Compare the rate with accuracy and keep the test duration and correction policy consistent when tracking improvement. If a job posting asks for a specific 10-key or KPH requirement, follow that employer's exact test rules."
    ],
    related: [
      { href: "/data-entry-typing-test/", label: "Data Entry Typing Test" },
      { href: "/10-key-typing-test/", label: "10-Key Typing Test" },
      { href: "/numeric-keypad-test/", label: "Numeric Keypad Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" }
    ],
    faqs: [
      { question: "What's a good KPH score?", answer: "There is no single KPH requirement for every job. Use the requirement in the specific posting or assessment and compare scores only when the duration and correction rules are similar." },
      { question: "Is KPH the same as WPM?", answer: "No. WPM standardizes prose typing into five-character word units, while KPH counts individual keystrokes over time." },
      { question: "Do I need both WPM and KPH?", answer: "Some roles emphasize prose typing, some emphasize numeric entry, and some may ask for both. Follow the metrics named in the job posting." }
    ]
  }
  {
    path: "/wpm-calculator/",
    title: "WPM Calculator - Convert Characters and Time to Words Per Minute | WPMTest",
    description: "Calculate typing WPM from characters, time, and errors using the standard five-character word convention.",
    h1: "WPM Calculator — Convert Characters and Time to Words Per Minute",
    intro: "Use the WPM calculator when you already have typing data such as characters typed, elapsed time, and errors and want to convert it to words per minute.",
    content: [
      "The standard typing convention treats five characters, including spaces, as one word. This makes results more comparable across passages because actual words vary greatly in length. Gross WPM uses all typed characters, while an error-adjusted result accounts for mistakes.",
      "Worked example: 1,500 characters typed in 5 minutes equals (1,500 ÷ 5) ÷ 5 = 60 gross WPM. An error-adjusted result will be lower when mistakes are included. For a live timed measurement, use the free typing test instead."
    ],
    related: [
      { href: "/", label: "Free Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" }
    ],
    faqs: [
      { question: "Why are five characters counted as one word?", answer: "Using a fixed five-character unit standardizes WPM across text with different word lengths." },
      { question: "What's the difference between gross and net WPM?", answer: "Gross WPM measures total typing rate. Error-adjusted or net WPM applies an error penalty so inaccurate typing does not receive the same score as accurate typing." }
    ]
  }
  {
    path: "/average-typing-speed/",
    title: "Average Typing Speed by Experience - What's a Good WPM? | WPMTest",
    description: "Learn how to interpret typing speed by experience and work context, including WPM ranges, accuracy, consistency, and job-related typing.",
    h1: "Average Typing Speed by Experience — What's a Good WPM?",
    intro: "There is no single typing-speed benchmark that fits every person or task. Test length, device, text difficulty, accuracy, and work context all affect the result.",
    content: [
      "As a practical orientation, people who are still locating keys often type more slowly, everyday computer users commonly settle into moderate speeds, and experienced typists in writing-heavy roles may sustain substantially higher rates. These are broad ranges rather than universal standards, and a specific job requirement should always take priority.",
      "Accuracy matters as much as raw speed in real work. A faster result with frequent corrections can be less useful than a slightly slower, repeatable result with high accuracy. When comparing scores, keep the test duration, keyboard, correction rules, and text type consistent.",
      "Different roles emphasize different skills. General office work uses prose and mixed business text; data entry adds structured records and numbers; transcription places a premium on sustained accuracy; customer support combines speed with clear written communication; and programming involves symbols and code patterns that do not behave like ordinary prose."
    ],
    related: [
      { href: "/", label: "Typing Test" },
      { href: "/wpm-calculator/", label: "WPM Calculator" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/data-entry-typing-test/", label: "Data Entry Typing Test" }
    ],
    faqs: [
      { question: "Is 40 WPM good?", answer: "Forty WPM can be a practical everyday typing speed, but whether it is sufficient depends on the task or job requirement and the accuracy of the result." },
      { question: "How can I improve my WPM?", answer: "Use short, consistent practice sessions, identify weak keys and repeated error patterns, and increase speed only after the movement is accurate and repeatable." }
    ]
  }
  {
    path: "/typing-certificate/",
    title: "Free Typing Certificate - Test Your Typing Speed | WPMTest",
    description: "Create a printable WPMTest typing result certificate from your most recent local typing test result.",
    h1: "Typing Certificate",
    intro: "After completing a typing test, create a simple printable certificate from your local result.",
    content: [
      "WPMTest certificates are site-generated practice records, not accredited professional certifications.",
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
    title: "Typing Games - Free Accuracy and Speed Drills | WPMTest",
    description: "Play lightweight typing games that reinforce real keyboard accuracy, speed bursts, and repeat practice.",
    h1: "Typing Games",
    intro: "Typing games should reinforce real typing skill, not distract from accuracy.",
    content: [
      "WPMTest's first typing game is a short speed-burst drill that records local practice results.",
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
