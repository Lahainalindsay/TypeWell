import type { Metadata } from "next";
import WPMTestApp from "../../src/App";

const SITE_URL = "https://wpmtest.app";
const canonical = `${SITE_URL}/typing-test-with-numbers/`;

export const metadata: Metadata = {
  title: "Typing Test With Numbers - Test Number Speed | WPMTest",
  description: "Free typing test with numbers, dates, prices and percentages. Measure WPM, accuracy and errors with instant results and no signup.",
  alternates: { canonical },
  openGraph: { title: "Typing Test With Numbers | WPMTest", description: "Test number-row typing speed and accuracy with realistic mixed text and digits.", url: canonical, type: "website" },
  twitter: { card: "summary", title: "Typing Test With Numbers | WPMTest", description: "Test number-row typing speed and accuracy with realistic mixed text and digits." },
  robots: { index: true, follow: true }
};

export default function NumbersTypingTestPage() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "WPMTest Numbers Typing Test", url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Typing Tests", item: `${SITE_URL}/typing-test/` },
      { "@type": "ListItem", position: 3, name: "Typing Test With Numbers", item: canonical }
    ] }
  ];
  return <>
    <main>
      <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">›</span> <a href="/typing-test/">Typing Tests</a> <span aria-hidden="true">›</span> <span>Numbers Test</span></nav>
      <section className="seo-mode-intro"><p className="eyebrow">Free number typing test</p><h1>Typing Test With Numbers</h1><p>Test how quickly and accurately you type numbers mixed with everyday text. Practice dates, prices, percentages, measurements, phone-style numbers and IDs while tracking WPM and accuracy.</p></section>
      <WPMTestApp initialPath="/typing-test-with-numbers/" />
      <section className="seo-prerender" aria-label="Number typing test guide">
        <h2>Why typing numbers feels different</h2>
        <p>Ordinary typing tests contain many familiar words that your hands learn as repeated patterns. Numbers interrupt those patterns. Reaching to the number row while maintaining your place in surrounding text can reduce both speed and accuracy, especially when a passage mixes dates, prices, percentages and identifiers.</p>
        <p>This test is designed for mixed keyboard work rather than dedicated numeric-keypad entry. That makes it useful for people who regularly type invoices, product information, measurements, schedules, forms, reports and other material where words and digits appear together.</p>
        <h2>How to improve number-row accuracy</h2>
        <p>Accuracy is the best place to start. Slow down enough to enter each digit correctly and notice which reaches repeatedly cause mistakes. Avoid chasing a higher WPM score if it creates extra corrections. Once the number-row movements become reliable, increase pace gradually and retest under similar conditions.</p>
        <p>If most of your work is numeric rather than mixed text, compare this test with the dedicated 10-key and numeric keypad tests. Those tools focus on number-heavy entry and can use keystroke-based measurements that are more meaningful than ordinary prose WPM.</p>
        <h2>Related typing tests</h2><nav aria-label="Related typing tests"><a href="/data-entry-typing-test/">Data Entry Typing Test</a><a href="/10-key-typing-test/">10-Key Typing Test</a><a href="/typing-test-with-punctuation/">Punctuation Typing Test</a><a href="/typing-test/code/">Code Typing Test</a></nav>
        <h2>About your number typing score</h2><p>Use your result as a benchmark for the same kind of mixed number-and-text task. A clean, repeatable score is more useful than a single fast attempt with many errors. Retaking the same mode after targeted practice gives you a clearer view of whether your number-row control is improving.</p>
      </section>
    </main>
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
  </>;
}
