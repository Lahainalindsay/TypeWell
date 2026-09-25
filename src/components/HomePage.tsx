"use client";
import React, { useEffect, useState } from "react";
import { typingTestLanguagePaths } from "../lib/seo/localized";
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
      <p>Measure WPM, accuracy and consistency instantly. No signup required.</p>
    </div></section>
    <BrowserLanguageSuggestion />
    {test}
    <section className="home-pathways" aria-labelledby="pathways-heading">
      <h2 id="pathways-heading">Choose your path</h2>
      <div className="home-pathway-grid">
        <a href="/typing-test/"><span>01 / TEST</span><h3>Test Your Speed</h3><p>Standard typing tests for measuring WPM and accuracy.</p><strong>View Typing Tests →</strong></a>
        <a href="/professionals/"><span>02 / WORK</span><h3>Professional Skills</h3><p>Practice workplace typing, data entry, numbers, 10-key and employment assessments.</p><strong>Explore Professional Tests →</strong></a>
        <a href="/typing-practice/"><span>03 / IMPROVE</span><h3>Improve Your Typing</h3><p>Build accuracy, rhythm, technique and weak-key control.</p><strong>Start Practicing →</strong></a>
      </div>
    </section>
    <AdSlot placement="afterHomeTest" />
    <section className="home-popular" aria-labelledby="popular-heading"><div className="home-section-heading"><h2 id="popular-heading">Popular tests</h2><a href="/typing-test/">All tests →</a></div><div className="home-popular-grid">{popular.map(([href, label]) => <a href={href} key={href}>{label}<span aria-hidden="true">↗</span></a>)}</div></section>
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
      <p>For steady improvement, practice a few minutes at a time. Start with <a href="/learn/">touch typing lessons</a>, work on <a href="/practice/weak-keys/">weak keys</a>, then repeat a <a href="/5-minute-typing-test/">five minute test</a>. Explore <a href="/average-typing-speed/">average typing speeds</a> or use the <a href="/wpm-calculator/">WPM calculator</a> to interpret your result.</p>
      <details className="home-additional-links"><summary>Explore more typing formats and lessons</summary><nav aria-label="More tests and practice"><a href="/10-minute-typing-test/">10 Minute Test</a><a href="/1-page-typing-test/">1 Page Test</a><a href="/2-page-typing-test/">2 Page Test</a><a href="/3-page-typing-test/">3 Page Test</a><a href="/typing-test-with-punctuation/">Punctuation Test</a><a href="/touch-typing-practice/">Touch Typing</a><a href="/rhythm/">Rhythm Trainer</a><a href="/typing-games/">Typing Games</a></nav></details>
    </section>
    <section className="home-faq seo-section" aria-labelledby="home-faq-heading"><h2 id="home-faq-heading">Frequently asked questions</h2>
      {["What is a good typing speed?", "How is WPM calculated?", "What is considered fast typing?", "How can I improve my typing speed?", "Is this typing test free?", "Do I need an account?", "Does my progress stay private?", "Can I practice typing with numbers?", "Can I practice on my phone?"].map((question) => <details key={question}><summary>{question}</summary><p>{faqAnswer(question)}</p></details>)}
    </section>
  </div>;
}

type SupportedLocalizedLanguage = Exclude<keyof typeof typingTestLanguagePaths, "en">;
const languageNames: Record<SupportedLocalizedLanguage, string> = {
  fr: "French", it: "Italian", hi: "Hindi", es: "Spanish", de: "German", pt: "Brazilian Portuguese", ru: "Russian"
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

function faqAnswer(question: string) {
  const answers: Record<string, string> = {
    "What is a good typing speed?": "Around 40 WPM is a useful everyday baseline. Faster professional typing depends on accuracy, consistency, and the kind of work you do.",
    "How is WPM calculated?": "WPM is calculated as correct characters divided by five, then divided by elapsed minutes. This makes results comparable across tests.",
    "What is considered fast typing?": "Typing above 60 WPM is often considered fast for general work, but reliable accuracy is more useful than chasing a single number.",
    "How can I improve my typing speed?": "Practice regularly, keep your eyes on the screen, use the correct fingers, fix weak keys, and increase speed only after accuracy is stable.",
    "Is this typing test free?": "Yes. WPMTest's typing test and practice tools are free with no subscription, paywall, or account requirement.",
    "Do I need an account?": "No. You can start an online typing test immediately. Preferences and progress are saved locally in your browser.",
    "Does my progress stay private?": "Your local progress stays on this device unless you choose to export it. Core typing sessions do not require an account or email.",
    "Can I practice typing with numbers?": "Yes. Use the numbers practice and typing test with numbers to work on dates, prices, measurements, percentages, and other number patterns.",
    "Can I practice on my phone?": "Yes. You can take a typing test with your phone's on-screen keyboard. To develop ten-finger touch typing for a computer keyboard, practice with a physical keyboard when you can."
  };
  return answers[question];
}

