"use client";
import React, { useEffect, useState } from "react";
import { typingTestLanguagePaths } from "../lib/seo/localized";
import { TypingPreviews } from "./TypingPreviews";
import { typingStudies } from "./TypingBenchmarks";
import { AdSlot } from "./AdSlot";

export function HomePage({ test }: { test: React.ReactNode }) {
  const popular = [
    ["/1-minute-typing-test/", "1 Minute Test"], ["/3-minute-typing-test/", "3 Minute Test"],
    ["/5-minute-typing-test/", "5 Minute Test"], ["/data-entry-typing-test/", "Data Entry Test"],
    ["/10-key-typing-test/", "10-Key Test"], ["/typing-test-with-numbers/", "Numbers Test"]
  ];
  return <div className="home tw-wpm-test-home">
    <section className="hero"><div className="hero-copy">
      <h1>Free Typing Test — Measure Your Speed and Accuracy Instantly</h1>
      <p>Take a free 1-, 3-, 5-, or 10-minute typing test to measure your words per minute, accuracy and consistency. Choose a time and start typing the passage to begin.</p>
    </div></section>
    <BrowserLanguageSuggestion />
    {test}
    <section className="home-pathways" aria-labelledby="pathways-heading">
      <h2 id="pathways-heading">Choose your path</h2>
      <div className="home-pathway-grid">
        <a href="#popular-heading"><span>01 / TEST</span><h3>Test Your Speed</h3><p>Explore timed tests and specialized formats.</p><strong>View popular tests →</strong></a>
        <a href="/professionals/"><span>02 / WORK</span><h3>Professional Skills</h3><p>Practice workplace typing, data entry, numbers, 10-key and employment assessments.</p><strong>Explore Professional Tests →</strong></a>
        <a href="/typing-practice/"><span>03 / IMPROVE</span><h3>Improve Your Typing</h3><p>Build accuracy, rhythm, technique and weak-key control.</p><strong>Start Practicing →</strong></a>
      </div>
    </section>
    <AdSlot placement="afterHomeTest" />
    <section className="home-popular" aria-labelledby="popular-heading"><div className="home-section-heading"><h2 id="popular-heading">Popular tests</h2><a href="/10-minute-typing-test/">10-minute test →</a></div><div className="home-popular-grid">{popular.map(([href, label]) => <a href={href} key={href}>{label}<span aria-hidden="true">↗</span></a>)}</div></section>
    <section className="home-professional" aria-labelledby="professional-heading"><div>
      <p className="eyebrow">For work and job preparation</p><h2 id="professional-heading">Typing skills that translate to the workplace.</h2>
      <p>Practice alphanumeric records, names and addresses, invoices and orders, currency and dates, and numeric keypad entry. Measure WPM for prose and KPM or KPH for numeric work.</p>
      <a className="button primary" href="/professionals/">Explore Professional Tests →</a>
    </div></section>
    <section className="home-learning" aria-labelledby="learning-heading"><div><p className="eyebrow">Build the habit</p><h2 id="learning-heading">Improve one skill at a time.</h2><p>Use guided lessons, focused practice, weak-key drills and rhythm training to build accuracy before speed.</p></div><a className="button" href="/typing-practice/">Start Practicing →</a></section>
    <AdSlot placement="contentMiddle" />
    <section className="home-guide seo-section" aria-labelledby="guide-heading"><h2 id="guide-heading">Understanding your typing speed</h2>
      <p>WPM means words per minute. WPMTest counts five characters, including spaces, as one word. Accuracy measures correct input; consistency shows whether your pace holds through the test. A short test gives a quick baseline, while longer tests show how well you maintain your speed.</p>
      <p>If you are preparing for a job, compare the test format with the work. Numeric keypad assessments often measure keystrokes per hour (KPH), while structured record entry also demands exact field accuracy. <a href="/data-entry-typing-test/">Try the data entry test</a> or <a href="/10-key-typing-test/">measure 10-key speed</a>.</p>
      <p>For example, 250 correct characters in one minute equals 50 WPM. Corrections can lower keystroke accuracy even when the final text is correct. <a href="/blog/wpm-vs-kph/">See worked scoring examples</a>.</p><p>For steady improvement, practice a few minutes at a time. Start with <a href="/learn/">touch typing lessons</a>, work on <a href="/practice/weak-keys/">weak keys</a>, then repeat a <a href="/5-minute-typing-test/">five minute test</a>. Explore <a href="/average-typing-speed/">average typing speeds</a> or use the <a href="/wpm-calculator/">WPM calculator</a> to interpret your result.</p>
      <TypingPreviews />
      <details className="home-additional-links"><summary>Explore more typing formats and lessons</summary><nav aria-label="More tests and practice"><a href="/10-minute-typing-test/">10 Minute Test</a><a href="/1-page-typing-test/">1 Page Test</a><a href="/2-page-typing-test/">2 Page Test</a><a href="/3-page-typing-test/">3 Page Test</a><a href="/typing-test-with-punctuation/">Punctuation Test</a><a href="/touch-typing-practice/">Touch Typing</a><a href="/rhythm/">Rhythm Trainer</a><a href="/typing-games/">Typing Games</a><a href="/typing-personality-test/#how-personalities-work">Typing Personality Profiles</a><a href="/typing-test-for-kids/">Typing Test for Kids</a></nav></details>
    </section>
    <section className="home-faq seo-section" aria-labelledby="home-faq-heading"><h2 id="home-faq-heading">Frequently asked questions</h2>
      {Object.entries(faqAnswers).map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}{benchmarkQuestions.has(question) && <> Sources: <a href={typingStudies[0].href}>Dhakal et al. (2018)</a> and <a href={typingStudies[1].href}>Palin et al. (2019)</a>.</>}</p></details>)}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: Object.entries(faqAnswers).map(([name, text]) => ({
          "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text }
        }))
      }) }} />
    </section>
  </div>;
}

type SupportedLocalizedLanguage = Exclude<keyof typeof typingTestLanguagePaths, "en">;
const languageNames: Record<SupportedLocalizedLanguage, string> = {
  fr: "French", it: "Italian", hi: "Hindi", es: "Spanish", de: "German", pt: "Brazilian Portuguese", ru: "Russian", fil: "Filipino", haw: "Hawaiian"
};

function BrowserLanguageSuggestion() {
  const [language, setLanguage] = useState<SupportedLocalizedLanguage | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("typing-language-suggestion-dismissed")) return;
    } catch { /* Private browsing can restrict storage. */ }
    const preferred = (navigator.languages?.[0] ?? navigator.language ?? "en").split("-")[0].toLowerCase() as SupportedLocalizedLanguage;
    if (preferred in languageNames) setLanguage(preferred);
  }, []);

  if (!language) return null;
  return <aside className="language-suggestion" aria-label="Suggested typing test language">
    <span>Your browser is set to {languageNames[language]}. Try the test in your language.</span>
    <a href={typingTestLanguagePaths[language]}>Open {languageNames[language]} test</a>
    <button type="button" onClick={() => {
      try { sessionStorage.setItem("typing-language-suggestion-dismissed", "1"); } catch { /* Dismiss for this page. */ }
      setLanguage(null);
    }} aria-label="Dismiss language suggestion">×</button>
  </aside>;
}

const faqAnswers = {
    "What is a good typing speed?": "About 52 WPM on a physical keyboard and 36.2 WPM on a touchscreen were the averages in two large volunteer studies. Use the figure for your device as a reference and compare accuracy on similar passages. For employment, follow the posting’s requirements.",
    "How is WPM calculated?": "WPM is calculated as correct characters divided by five, then divided by elapsed minutes. This makes results comparable across tests.",
    "What is considered fast typing?": "WPMTest’s physical-keyboard practice bands start at 65 WPM for fast and 85 WPM for advanced. These are site reference labels. For context, volunteers averaged about 52 WPM on physical keyboards and 36.2 WPM on touchscreens. Compare scores on the same device and check accuracy.",
    "How can I improve my typing speed?": "Practice regularly, keep your eyes on the screen, use the correct fingers, fix weak keys, and increase speed only after accuracy is stable.",
    "Is this typing test free?": "Yes. WPMTest's typing test and practice tools are free with no subscription, paywall, or account requirement.",
    "Do I need an account?": "No. You can start an online typing test immediately. Preferences and progress are saved locally in your browser.",
    "Does my progress stay private?": "Your local progress stays on this device unless you choose to export it. Core typing sessions do not require an account or email.",
    "Can I practice typing with numbers?": "Yes. Use the numbers practice and typing test with numbers to work on dates, prices, measurements, percentages, and other number patterns.",
    "Can I practice on my phone?": "Yes. You can take a typing test with your phone's on-screen keyboard. To develop ten-finger touch typing for a computer keyboard, practice with a physical keyboard when you can."
};

const benchmarkQuestions = new Set(["What is a good typing speed?", "What is considered fast typing?"]);

