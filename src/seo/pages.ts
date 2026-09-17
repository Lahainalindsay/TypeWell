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
    intro: "A one-minute test is the fastest way to check your typing speed: short enough to repeat often, but long enough to give you a useful snapshot.",
    content: [
      "Because the sample is small, a missed word or slow start can move your score by several WPM. Treat a one-minute result as a quick check rather than your definitive typing speed.",
      "Use it for frequent progress checks under similar conditions. If you want a steadier benchmark for a résumé, job requirement, or longer comparison, use the 5 minute or 10 minute typing test instead.",
      "One minute is especially useful when you are warming up or checking whether a recent practice change is helping. Run the test after a short warm-up, keep your correction behavior consistent, and compare several attempts rather than selecting only the highest score. A repeatable result is more informative than a single unusually fast run.",
      "To improve a one-minute score, avoid sprinting through the opening sentence. Begin at a controlled pace, protect accuracy, and let speed build naturally. If the result shows recurring errors on specific letters, punctuation, or number reaches, move to targeted typing practice before testing again. That creates a clearer practice-to-test loop than repeatedly chasing a new personal best.",
      "The one-minute format is also convenient for checking different practice conditions without committing to a long session. You can compare a cold start with a warmed-up attempt, or compare normal prose with a focused drill afterward. Keep those comparisons separate from formal employment requirements: if another site, school, or employer specifies a particular test length or scoring method, use its instructions rather than converting a short WPMTest result into a different credential.",
      "When comparing one-minute attempts, use the same kind of passage and decide in advance how you will handle mistakes. Backspacing to correct errors can reduce speed but may improve final accuracy, while leaving errors uncorrected changes the relationship between raw and adjusted performance. Neither approach should be mixed casually across comparisons. The most useful record is a series of tests taken under similar rules. If your fastest attempt is much higher than the rest, treat the middle of your recent results as a better description of your current repeatable pace."
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
  },
  {
    path: "/3-minute-typing-test/",
    title: "3 Minute Typing Test - Free Typing Speed Test | WPMTest",
    description: "Take a free 3 minute typing test to measure WPM, accuracy, mistakes, and consistency with no account required.",
    h1: "3 Minute Typing Test",
    intro: "Three minutes balances a quick speed check with a longer sample of sustained typing.",
    content: [
      "A three-minute test gives you enough time to settle into a repeatable pace while remaining short enough to run more than once in a practice session. A rough opening line has less influence on the final result than it does in a one-minute test.",
      "For useful progress comparisons, test under similar conditions: use the same keyboard, similar posture, and minimal distractions. Then use your weak-key results to choose a specific typing-practice target instead of simply repeating random paragraphs.",
      "Three minutes is long enough for early nerves or a slow first line to matter less, while still fitting easily into a short practice session. Watch whether your pace settles after the first minute and whether accuracy remains stable as the passage changes. Those patterns can tell you more than the final WPM number by itself.",
      "A useful three-minute routine is baseline, practice, retest. Complete one clean attempt, review the keys or combinations causing errors, spend a few minutes on a focused drill, and then repeat the same test length. Keep the keyboard and correction rules consistent so the comparison reflects your typing rather than a change in testing conditions.",
      "Use the result page to look beyond the headline speed. Accuracy shows how much of the passage was entered correctly, consistency helps reveal whether your pace was steady, and weak-key information can point toward the next drill. When all three improve together, the gain is more likely to represent better keyboard control than a brief burst of speed.",
      "A three-minute test can also help separate vocabulary familiarity from keyboard control. Familiar words may feel easier, while punctuation, capitalization, uncommon letter combinations, and longer words can interrupt rhythm. Do not restart every time a difficult section appears; completing the full timer gives you a more representative sample. Afterward, review the mistakes that repeated. If the same key combination appears several times, practice that pattern directly. If errors are scattered, work on a slightly slower, steadier pace before trying to increase speed."
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
  },
  {
    path: "/5-minute-typing-test/",
    title: "5 Minute Typing Test - Check WPM & Accuracy | WPMTest",
    description: "Take a free 5 minute typing test to check sustained WPM, accuracy, consistency, and weak keys. No signup required.",
    h1: "5 Minute Typing Test",
    intro: "Five minutes provides a sustained typing sample in which both pace and accuracy have time to matter.",
    content: [
      "A five-minute test reduces the effect of a brief fast burst and makes repeated errors, missed spaces, and loss of rhythm easier to see. It is a useful format when you want a more stable benchmark for work, school, or regular progress tracking.",
      "Compare gross speed with error-adjusted performance and accuracy rather than focusing on WPM alone. If mistakes are creating a large gap, use the WPM Calculator to understand the scoring and targeted Typing Practice to work on the patterns causing errors.",
      "Five minutes also gives consistency more room to show. If your first minute is much faster than the rest, the final score can reveal that the opening pace was difficult to sustain. If speed stays steady but accuracy declines, the better next step may be accuracy practice rather than trying to type faster.",
      "For employment preparation, use the test as a general benchmark unless an employer specifies its own platform, passage, duration, or scoring method. Practice with the same type of keyboard you expect to use when possible, and include numbers, punctuation, or structured data entry when those skills are part of the role. A prose WPM score does not measure every keyboard task.",
      "A five-minute result is also useful as a periodic checkpoint while you are training. You do not need to repeat a long test after every drill. Instead, practice specific weaknesses in shorter sessions and return to the five-minute benchmark after several sessions. That keeps practice focused while still giving you a sustained measurement that can reveal whether the improvement transfers to normal continuous typing.",
      "For a cleaner comparison, avoid changing several variables at once. Switching keyboards, changing from a laptop to an external keyboard, altering correction behavior, or using unusually easy text can all move the result even when your underlying skill has not changed. Record the conditions that matter to you and look for trends across multiple sessions. The five-minute format is long enough to make those trends useful without requiring a large time commitment, which is why it works well as a weekly or periodic benchmark alongside shorter daily practice."
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
  },
  {
    path: "/10-minute-typing-test/",
    title: "10 Minute Typing Test - Free WPM Test | WPMTest",
    description: "Take a free 10 minute typing test for typing endurance, sustained WPM, accuracy, and consistency tracking.",
    h1: "10 Minute Typing Test",
    intro: "Ten minutes is WPMTest's longest standard test and is designed to measure sustained typing pace, accuracy, and concentration.",
    content: [
      "A ten-minute test is closer to a sustained real-world typing session than a short speed burst. Fatigue and attention drift have more time to affect the result, making this format useful when you want to see whether your technique holds up.",
      "If your WPM or accuracy drops in the second half, compare the result with your 5 minute score and use shorter targeted practice sessions to work on the weak keys, punctuation, or rhythm issues that appear.",
      "Use the longer format when you want to evaluate endurance rather than peak speed. Ten minutes creates enough repetition for posture, tension, concentration, and correction habits to become noticeable. If your hands tighten or you begin reaching inaccurately, note when the change starts instead of forcing a faster finish.",
      "After the test, compare the overall result with a shorter benchmark. A similar 5-minute and 10-minute pace suggests your speed is reasonably sustainable under these test conditions. A large drop can point toward endurance, rhythm, or accuracy work. Practice the specific weakness in shorter sessions, then return to the ten-minute test periodically rather than using it for every daily drill.",
      "Because this test is longer, comfort matters. Sit in a position you can maintain, keep your wrists and shoulders relaxed, and avoid changing technique simply to protect a high early score. The purpose is not to force maximum speed for ten minutes; it is to observe a pace you can sustain while continuing to enter the passage accurately. That makes the result more useful for comparing endurance over time.",
      "The ten-minute format can also reveal whether corrections become more frequent as attention fades. Review the result for patterns rather than treating every error as identical. Repeated mistakes on the same keys suggest a movement problem; errors clustered late in the session may point toward fatigue or loss of concentration; punctuation errors may need a specialized drill. Use that information to choose the next practice session. A long test is most valuable when it produces a specific training decision instead of simply another score to beat."
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
  },
  {
    path: "/typing-practice/",
    title: "Typing Practice - Targeted Drills to Improve Weak Keys | WPMTest",
    description: "Practice typing with targeted drills for weak keys, accuracy, rhythm, numbers, punctuation, code-style text, and custom text. Free and no signup required.",
    h1: "Typing Practice — Targeted Drills to Fix Your Weak Keys",
    intro: "Typing practice is most useful when it targets the keys and patterns that are actually limiting your speed or accuracy.",
    content: [
      "Start with a baseline test to identify weak keys, then spend a short focused session on the two or three patterns causing the most errors. Retest afterward to see whether the targeted mistakes decreased instead of simply repeating random paragraphs.",
      "Short, frequent practice is easier to repeat consistently than occasional long sessions. Begin below your maximum speed, keep errors low, and increase pace gradually as the movement becomes reliable. WPMTest stores your practice history locally so you can return without creating an account.",
      "Choose practice material that matches the skill you actually need. General sentence drills build everyday keyboard fluency, number practice helps with mixed business text, punctuation drills improve Shift and symbol reaches, and code-style practice emphasizes brackets, operators, and other characters that ordinary prose rarely uses. Data-entry practice is better when your goal involves structured records rather than paragraphs.",
      "Measure improvement with comparable tests instead of judging a practice session by how fast it felt. A short baseline before practice and another test afterward can show whether errors decreased without sacrificing pace. If accuracy falls as speed rises, reduce the target speed temporarily and rebuild the movement cleanly. The goal is reliable typing that transfers to real work, school, and communication.",
      "Use custom text when you need vocabulary or formats that the standard drills do not cover, but avoid practicing sensitive information. WPMTest is designed so practice can run locally without requiring an account. For general improvement, rotate between focused drills and normal sentences: isolated practice helps correct a specific movement, while continuous text shows whether the improvement survives when your attention returns to meaning, spacing, capitalization, and rhythm.",
      "A practical weekly routine can combine several types of work without becoming complicated. Start with one timed baseline, choose one weakness from the result, and practice it for several short sessions during the week. Finish with another comparable test. If the weakness improves but overall WPM does not change immediately, that is still useful progress because cleaner movement can support later speed gains. Avoid changing drills constantly just because a single score fluctuates. Give a focused skill enough repetitions to become comfortable before deciding whether the practice method is helping."
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
      "KPH is calculated from keystrokes per minute multiplied by 60. Compare the rate with accuracy and keep the test duration and correction policy consistent when tracking improvement. If a job posting asks for a specific 10-key or KPH requirement, follow that employer's exact test rules.",
      "For a consistent KPH benchmark, keep the same keypad layout, test length, and correction policy between attempts. Numeric-entry performance can change substantially when you switch from the number row to a dedicated keypad because the hand position and movement pattern are different. Record accuracy beside KPH so faster entry does not hide costly digit errors.",
      "Practice should resemble the work you are preparing for. Accounting and bookkeeping tasks may emphasize amounts and decimals, order entry may mix identifiers with quantities, and administrative work may require both prose WPM and numeric KPH. WPMTest separates these measurements so you can practice the relevant input pattern instead of treating every keyboard skill as one score.",
      "Numeric entry should be judged by both throughput and correctness because a transposed digit, missing decimal, or incorrect amount can change the meaning of a record. During practice, prioritize a consistent hand position and deliberate entry before pushing the rate higher. If your keyboard has a dedicated numeric keypad, practice on that keypad when the target job or assessment uses one. Laptop number rows and external 10-key pads require different movement patterns, so scores from those setups should not automatically be treated as interchangeable. Use repeated tests on the same setup to establish your own reliable baseline."
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
  },
  {
    path: "/wpm-calculator/",
    title: "WPM Calculator - Convert Characters and Time to Words Per Minute | WPMTest",
    description: "Calculate typing WPM from characters, time, and errors using the standard five-character word convention.",
    h1: "WPM Calculator — Convert Characters and Time to Words Per Minute",
    intro: "Use the WPM calculator when you already have typing data such as characters typed, elapsed time, and errors and want to convert it to words per minute.",
    content: [
      "The standard typing convention treats five characters, including spaces, as one word. This makes results more comparable across passages because actual words vary greatly in length. Gross WPM uses all typed characters, while an error-adjusted result accounts for mistakes.",
      "Worked example: 1,500 characters typed in 5 minutes equals (1,500 ÷ 5) ÷ 5 = 60 gross WPM. An error-adjusted result will be lower when mistakes are included. For a live timed measurement, use the free typing test instead.",
      "To calculate gross WPM manually, divide the number of typed characters by five and then divide by elapsed minutes. For example, 900 characters in three minutes equals 60 gross WPM: 900 ÷ 5 = 180 standard words, and 180 ÷ 3 = 60. Keep the elapsed time in minutes when using the formula.",
      "Error handling varies between typing systems, so compare net or adjusted WPM only when you understand the scoring rule being used. WPMTest reports accuracy separately so you can see whether a fast result was also clean. When comparing progress over time, use the same duration and similar text difficulty; changing those conditions can make two mathematically correct WPM scores poor comparisons.",
      "The calculator is most useful when the source data is trustworthy. Character count should include the same types of characters used by the scoring system you are comparing against, and elapsed time should represent actual typing time rather than an unrelated session length. If you only know a final score from another typing site, do not reverse-engineer it unless that site's scoring rules are documented; different error penalties can produce different net WPM values.",
      "WPM is a standardized rate, not a count of literal dictionary words. That distinction matters because a passage full of short words would otherwise appear faster than a passage containing long technical terms even if both required the same number of keystrokes. The five-character convention reduces that distortion. It does not make every typing test identical, however: punctuation, capitalization, unfamiliar vocabulary, correction rules, and input method still affect difficulty. Use the calculator for transparent arithmetic, then use a live timed test when you need a result produced under consistent test conditions."
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
  },
  {
    path: "/average-typing-speed/",
    title: "Average Typing Speed by Experience - What's a Good WPM? | WPMTest",
    description: "Learn how to interpret typing speed by experience and work context, including WPM ranges, accuracy, consistency, and job-related typing.",
    h1: "Average Typing Speed by Experience — What's a Good WPM?",
    intro: "There is no single typing-speed benchmark that fits every person or task. Test length, device, text difficulty, accuracy, and work context all affect the result.",
    content: [
      "As a practical orientation, people who are still locating keys often type more slowly, everyday computer users commonly settle into moderate speeds, and experienced typists in writing-heavy roles may sustain substantially higher rates. These are broad ranges rather than universal standards, and a specific job requirement should always take priority.",
      "Accuracy matters as much as raw speed in real work. A faster result with frequent corrections can be less useful than a slightly slower, repeatable result with high accuracy. When comparing scores, keep the test duration, keyboard, correction rules, and text type consistent.",
      "Different roles emphasize different skills. General office work uses prose and mixed business text; data entry adds structured records and numbers; transcription places a premium on sustained accuracy; customer support combines speed with clear written communication; and programming involves symbols and code patterns that do not behave like ordinary prose.",
      "Instead of treating one number as a universal definition of good typing, establish your own repeatable baseline. Take a timed test long enough to settle into a normal rhythm, record both WPM and accuracy, and retest under similar conditions. Improvement is easier to interpret when the keyboard, duration, text type, and correction behavior stay consistent.",
      "For job preparation, use published requirements from the employer or assessment provider whenever they are available. A role that involves transcription, numeric entry, coding, or structured records may measure a different keyboard skill from ordinary prose. If no requirement is given, practice the material closest to the work and use WPM as one part of the picture rather than a stand-alone qualification.",
      "When you compare your result with other people, make sure the comparison actually describes the same task. A short burst on common lowercase words is not equivalent to sustained business text, punctuation-heavy writing, code, transcription, or numeric entry. Device differences matter too: a familiar desktop keyboard, laptop keyboard, tablet, and phone can produce very different speeds. For that reason, WPMTest emphasizes repeatable testing and accuracy rather than promising that one broad average defines every typist. Your most useful benchmark is the one that matches the keyboard task you are trying to improve."
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
