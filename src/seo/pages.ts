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
    intro: "WPMTest times your typing the moment you press the first key and scores three things most typing tools blur together: raw speed, accuracy, and consistency.",
    content: [
      "Pick a 1, 3, 5, or 10 minute test depending on whether you want a quick pulse-check or a stable benchmark — longer tests smooth out the effect of a rough start or a lucky streak, so they're the better choice if you're recording a score for a job application or a class requirement.",
      "Every result breaks down your weak keys on a visual keyboard heatmap, so instead of just seeing “62 WPM” you can see exactly which fingers or letter combinations are costing you speed. No account or signup is required to test; your progress stays in your browser, and you can create a printable site-generated certificate from a completed result."
    ],
    related: [
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/wpm-calculator/", label: "WPM Calculator" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" }
    ],
    faqs: [
      { question: "Is this typing test really free?", answer: "Yes — every test length, the WPM calculator, and basic certificates are free with no signup." },
      { question: "What's a good WPM?", answer: "See our Average Typing Speed guide for ranges by skill level and profession." },
      { question: "How is WPM calculated?", answer: "One word equals five characters including spaces — see the WPM Calculator for the full formula." }
    ]
  },
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
    intro: "A one-minute test is the fastest way to check in on your typing speed — short enough to run between tasks, long enough to catch your real average once you're past the first few words.",
    content: [
      "Because the sample is small, a single missed word or a slow start can move your score by several WPM, so treat a one-minute result as a quick snapshot rather than your definitive number.",
      "Use it for frequent progress checks — for example, running it once a day for a week gives you a much clearer trend line than one long test. For a number you'd put on a résumé or use to compare against a job requirement, run the 5 minute test or 10 minute test instead, since longer samples are harder to game with a lucky burst and are what most employers expect."
    ],
    related: [
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" },
      { href: "/10-minute-typing-test/", label: "10 Minute Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" }
    ],
    faqs: [
      { question: "Why did my score jump around between attempts?", answer: "Short tests amplify the effect of a slow start or one missed word — run 3–5 attempts and look at the median, not any single score." },
      { question: "Can I use a 1-minute score for a job application?", answer: "Most employers prefer a 3- or 5-minute result — see Average Typing Speed." }
    ]
  },
  {
    path: "/3-minute-typing-test/",
    title: "3 Minute Typing Test - Free Typing Speed Test | WPMTest",
    description: "Take a free 3 minute typing test to measure WPM, accuracy, mistakes, and consistency with no account required.",
    h1: "3 Minute Typing Test",
    intro: "Three minutes is the sweet spot between a quick check and a full benchmark — long enough that a rough opening line barely moves your final number, short enough to run a few times in a row without fatigue skewing your accuracy.",
    content: [
      "It's the length most typing certification programs and typing classes default to, which makes it a good choice if you want a score that's directly comparable to a course requirement.",
      "If you're tracking improvement over weeks, run the 3-minute test at the same time of day under similar conditions — same keyboard, same posture, minimal distractions — so the number you're comparing against is actually measuring your typing, not your environment. Pair it with the weak-key heatmap on your results page to turn a plateaued score into a specific practice target."
    ],
    related: [
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/1-minute-typing-test/", label: "1 Minute Typing Test" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" }
    ],
    faqs: [
      { question: "Is 3 minutes long enough to be accurate?", answer: "Yes for most purposes — it's long enough to average out a slow start while staying short enough to repeat several times per session." },
      { question: "How does this compare to the 1-minute test?", answer: "Expect your 3-minute WPM to land a few points below your best 1-minute burst, since sustained accuracy is harder over a longer sample." }
    ]
  },
  {
    path: "/5-minute-typing-test/",
    title: "5 Minute Typing Test - Check WPM & Accuracy | WPMTest",
    description: "Take a free 5 minute typing test to check sustained WPM, accuracy, consistency, and weak keys. No signup required.",
    h1: "5 Minute Typing Test",
    intro: "Five minutes is the standard length used for many professional typing certifications, data-entry screenings, and administrative job requirements.",
    content: [
      "If a posting says “minimum 45 WPM,” it commonly means a sustained result rather than a short burst. This length is long enough that fatigue and accuracy start to matter as much as raw speed, which is what most employers are trying to measure.",
      "Because the sample is larger, your gross WPM and error-adjusted WPM will typically be closer together than on a 1-minute test — a large gap between the two on a 5-minute run is a sign accuracy, not speed, is your real limiting factor. Use the WPM Calculator to see exactly how errors are affecting your adjusted score, and generate a certificate once you have a result you're happy submitting."
    ],
    related: [
      { href: "/wpm-calculator/", label: "WPM Calculator" },
      { href: "/data-entry-typing-test/", label: "Data Entry Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/typing-practice/", label: "Typing Practice" }
    ],
    faqs: [
      { question: "Is the 5-minute test what employers usually want?", answer: "It is a commonly requested length for data-entry and administrative roles. Always follow the exact duration and scoring rules in the posting, and see Data Entry Typing Test for a role-specific version." },
      { question: "What's a competitive 5-minute WPM for an office job?", answer: "Many administrative postings look for 40–60+ WPM at 95%+ accuracy — see Average Typing Speed for the full ranges." }
    ]
  },
  {
    path: "/10-minute-typing-test/",
    title: "10 Minute Typing Test - Free WPM Test | WPMTest",
    description: "Take a free 10 minute typing test for typing endurance, sustained WPM, accuracy, and consistency tracking.",
    h1: "10 Minute Typing Test",
    intro: "Ten minutes is the longest standard test on WPMTest and the closest simulation of real sustained typing work — the kind of stretch you'd actually spend transcribing notes, entering data, or drafting a long document.",
    content: [
      "It's the test to use if you want a result that reflects your real-world stamina rather than a short-burst peak, since fatigue and attention drift both become measurable factors over ten minutes in a way they simply aren't over one or three.",
      "If your WPM drops noticeably in the second half of a 10-minute test, that's a useful signal in itself — it usually points to hand fatigue or concentration lapses rather than a skill ceiling, and is worth training separately from raw speed. Compare your 10-minute result against your 5-minute score to see how much your accuracy and pace hold up under sustained effort."
    ],
    related: [
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" }
    ],
    faqs: [
      { question: "Should I take the 10-minute test every time?", answer: "Not necessary for daily practice — use it periodically, weekly or monthly, as a stamina check alongside shorter daily tests." },
      { question: "My WPM drops in the last few minutes — is that normal?", answer: "Yes, this is common and usually reflects fatigue rather than skill; see Typing Practice for drills that build endurance." }
    ]
  },
  {
    path: "/typing-practice/",
    title: "Typing Practice - Targeted Drills to Improve Weak Keys | WPMTest",
    description: "Practice typing with targeted drills for weak keys, accuracy, rhythm, numbers, punctuation, code-style text, and custom text. Free and no signup required.",
    h1: "Typing Practice — Targeted Drills to Fix Your Weak Keys",
    intro: "Generic typing practice — just typing random paragraphs repeatedly — improves speed slowly because it treats every key the same, when in reality most typists have three to five specific letter combinations or fingers that are quietly capping their whole score.",
    content: [
      "Take a test first so WPMTest can generate your weak-key heatmap, then use that map to focus practice where it actually moves your number.",
      "How to structure a practice session: 1. Take a baseline test for three or five minutes to establish your current WPM and identify weak keys. 2. Spend 5–10 minutes on targeted drills for your two or three weakest keys specifically — short, repetitive, focused, not a full paragraph. 3. Retest to see if the specific weak-key errors dropped. 4. Repeat three or four times per week rather than one long weekly session — short, frequent practice builds muscle memory faster than infrequent long sessions.",
      "Most plateaus happen because typists keep practicing generally instead of specifically — if your WPM has stalled for a few weeks, it's very likely one or two specific keys are your actual bottleneck, not a general speed ceiling."
    ],
    related: [
      { href: "/", label: "Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/touch-typing-practice/", label: "Touch Typing Practice" },
      { href: "/typing-test-with-numbers/", label: "Numbers Typing Test" }
    ],
    faqs: [
      { question: "How often should I practice to see improvement?", answer: "Short daily or near-daily sessions of 10–15 minutes outperform infrequent long sessions for building typing muscle memory." },
      { question: "My WPM has plateaued — what should I do?", answer: "Check your weak-key heatmap from your last few tests — a plateau is usually one or two specific keys, not a general limit. See Average Typing Speed for realistic improvement timelines." }
    ]
  },
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
    h1: "Data Entry Typing Test — Measure Speed for Data-Entry Roles",
    intro: "Data-entry work has different demands than general typing: it's often numeric-heavy, repetitive, and accuracy-critical in a way prose typing isn't.",
    content: [
      "A single transposed digit in a data-entry job can matter far more than a typo in an email. This test is structured around that reality, mixing numeric sequences with structured text rather than pure prose paragraphs, so your result better reflects real data-entry performance than a standard prose-based typing test would.",
      "Most data-entry job postings specify a minimum WPM, commonly 40–60, and a separate accuracy threshold, often 95–98%, sometimes alongside a 10-key numeric-keypad speed requirement measured in KPH rather than WPM. See the KPH Test if a posting asks for that specifically. If you're applying to roles with both requirements, run both tests and report whichever the posting actually asks for."
    ],
    related: [
      { href: "/10-key-typing-test/", label: "10-Key Test" },
      { href: "/numeric-keypad-test/", label: "Numeric Keypad Test" },
      { href: "/kph-typing-test/", label: "KPH Test" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" }
    ],
    faqs: [
      { question: "What WPM do data entry jobs usually require?", answer: "Many postings ask for 40–60+ WPM at 95%+ accuracy — see exact ranges in Average Typing Speed." },
      { question: "What's the difference between this and the regular typing test?", answer: "This test emphasizes numeric sequences and structured data-entry patterns rather than natural-language prose." },
      { question: "What is KPH and do I need it?", answer: "Keystrokes Per Hour measures 10-key numeric entry speed specifically and is common in accounting and bookkeeping postings. See the KPH Test." }
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
    intro: "KPH, or Keystrokes Per Hour, is the standard metric for numeric keypad speed used in accounting, bookkeeping, banking, and high-volume numeric data-entry roles.",
    content: [
      "It measures something meaningfully different from WPM, since 10-key entry uses a completely different motor pattern — one hand on the numeric pad — than full-keyboard typing.",
      "If a job posting specifically asks for a “10-key speed” or “KPH” figure rather than WPM, this is the test to run — a strong WPM score doesn't reliably predict a strong KPH score, since the two use different muscle memory. A common benchmark is 8,000–10,000+ KPH for entry-level roles, climbing higher for experienced numeric-entry specialists, though requirements vary significantly by industry and volume expectations."
    ],
    related: [
      { href: "/data-entry-typing-test/", label: "Data Entry Typing Test" },
      { href: "/10-key-typing-test/", label: "10-Key Typing Test" },
      { href: "/numeric-keypad-test/", label: "Numeric Keypad Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" }
    ],
    faqs: [
      { question: "What's a good KPH score?", answer: "Roughly 8,000–10,000 KPH is a common entry-level benchmark; experienced 10-key specialists often exceed 12,000+." },
      { question: "Is KPH the same as WPM?", answer: "No — they measure different skills, numeric keypad versus full keyboard, and don't reliably predict each other." },
      { question: "Do I need both a WPM and KPH score?", answer: "Check the specific job posting — many data-entry roles ask for both. See Data Entry Typing Test." }
    ]
  },
  {
    path: "/wpm-calculator/",
    title: "WPM Calculator - Calculate Words Per Minute | WPMTest",
    description: "Calculate typing WPM from characters, time, and errors using the standard five-character word convention.",
    h1: "WPM Calculator — Convert Characters and Time to Words Per Minute",
    intro: "Use this calculator when you already have raw typing data — characters typed, time elapsed, and error count — from a source outside WPMTest, like a school assignment, workplace typing log, or transcription timesheet, and need to convert it into a standard WPM figure.",
    content: [
      "The calculation uses the industry-standard convention that five characters, including spaces, equal one “word,” regardless of the actual words in the text — this keeps scores comparable across different pieces of text, since counting real words would unfairly reward short, simple-word passages. Gross WPM counts every character typed; error-adjusted, or net, WPM subtracts a penalty for mistakes, which is the number most employers and typing certifications actually care about.",
      "Worked example: 1,500 correct characters typed in 5 minutes = (1,500 ÷ 5) ÷ 5 = 60 gross WPM. If 30 of those characters were errors, net WPM drops to roughly 54, depending on the exact penalty formula used.",
      "For a live, timed measurement instead of a manual calculation, use the typing test directly — it calculates gross and net WPM automatically along with accuracy and a weak-key breakdown."
    ],
    related: [
      { href: "/", label: "Free Typing Test" },
      { href: "/average-typing-speed/", label: "Average Typing Speed" },
      { href: "/5-minute-typing-test/", label: "5 Minute Typing Test" }
    ],
    faqs: [
      { question: "Why 5 characters per word and not real words?", answer: "It standardizes scoring across texts of different difficulty — “cat” and “extraordinary” would otherwise count as equally fast." },
      { question: "What's the difference between gross and net WPM?", answer: "Gross counts all keystrokes; net subtracts errors and is the number most certifications and job postings mean by “WPM.”" }
    ]
  },
  {
    path: "/average-typing-speed/",
    title: "Average Typing Speed by Experience - What's a Good WPM? | WPMTest",
    description: "Learn how to interpret typing speed by experience and work context, including WPM ranges, accuracy, consistency, and job-related typing.",
    h1: "Average Typing Speed by Age and Experience — What's a Good WPM?",
    intro: "There's no single “average” typing speed, because the number depends heavily on who's typing and what they're typing.",
    content: [
      "A useful way to think about it is in bands: beginners with zero to two years of regular typing typically land in the 20–30 WPM range while still locating keys visually; intermediate typists — most adults who type daily for work or school — settle into 40–60 WPM with solid accuracy; advanced typists in customer support, transcription, and data entry often reach 70–90+ WPM; and elite or competitive typists can exceed 120 WPM, though sustained accuracy at that speed is rare even among professionals.",
      "Accuracy matters more than raw speed in most real-world contexts — a 70 WPM typist making frequent errors that require correction is often slower in practice than a careful 55 WPM typist. If you're benchmarking against a job requirement, check whether the posting specifies gross or net WPM and at what accuracy threshold, since a “50 WPM minimum” usually implicitly assumes 95%+ accuracy.",
      "Typing speed by context, as rough benchmarks: general office and administrative work, 40–60 WPM; data entry roles, 50–70+ WPM, often with heavy numeric-keypad emphasis; transcription, 60–80+ WPM with very high accuracy requirements; customer support and live chat, 40–55 WPM, prioritizing accuracy over raw speed; and programmers, often lower prose WPM of 30–50 because code isn't typed like natural language."
    ],
    related: [
      { href: "/", label: "Typing Test" },
      { href: "/wpm-calculator/", label: "WPM Calculator" },
      { href: "/typing-practice/", label: "Typing Practice" },
      { href: "/data-entry-typing-test/", label: "Data Entry Typing Test" }
    ],
    faqs: [
      { question: "Is 40 WPM good?", answer: "It's solidly average for adult typists and meets many general office job requirements." },
      { question: "How can I improve from 40 to 60 WPM?", answer: "Consistent short daily practice sessions targeting your specific weak keys beat occasional long sessions — see Typing Practice." }
    ]
  },
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
