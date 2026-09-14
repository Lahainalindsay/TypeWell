import type { Metadata } from "next";
import TypewellApp from "../../src/App";

const SITE_URL = "https://wpmtest.app";
const canonical = `${SITE_URL}/typing-test-with-punctuation/`;

export const metadata: Metadata = {
  title: "Punctuation Typing Test - Speed & Accuracy | WPMTest",
  description: "Free punctuation typing test with commas, quotes, capitals and questions. Measure WPM, accuracy and errors with instant results.",
  alternates: { canonical },
  openGraph: { title: "Punctuation Typing Test | WPMTest", description: "Test typing speed and accuracy with punctuation, capitalization, quotes and sentence patterns.", url: canonical, type: "website" },
  twitter: { card: "summary", title: "Punctuation Typing Test | WPMTest", description: "Test typing speed and accuracy with punctuation, capitalization, quotes and sentence patterns." },
  robots: { index: true, follow: true }
};

export default function PunctuationTypingTestPage() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "WPMTest Punctuation Typing Test", url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Typing Tests", item: `${SITE_URL}/typing-test/` },
      { "@type": "ListItem", position: 3, name: "Punctuation Typing Test", item: canonical }
    ] }
  ];
  return <>
    <main>
      <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">›</span> <a href="/typing-test/">Typing Tests</a> <span aria-hidden="true">›</span> <span>Punctuation Test</span></nav>
      <section className="seo-mode-intro"><p className="eyebrow">Free punctuation typing test</p><h1>Punctuation Typing Test</h1><p>Measure typing speed when the text includes the characters real writing requires: commas, periods, quotes, apostrophes, questions, capitalization and other punctuation that simple word tests often avoid.</p></section>
      <TypewellApp initialPath="/typing-test-with-punctuation/" />
      <section className="seo-prerender" aria-label="Punctuation typing test guide">
        <h2>Why test typing with punctuation?</h2>
        <p>Word-only typing tests are useful for measuring basic speed, but everyday writing rarely consists of lowercase words separated by spaces. Email, reports, schoolwork, messages and documents require capitals, commas, periods, apostrophes, quotation marks, questions and other punctuation. Those extra reaches can reveal errors that a simple word list does not.</p>
        <p>A punctuation test therefore gives you a different benchmark. It asks whether your speed remains controlled when your hands must move away from common letter patterns and when Shift becomes part of the sequence.</p>
        <h2>How to improve punctuation typing</h2>
        <p>Pay attention to the specific characters that interrupt your rhythm. If quotation marks or capitals repeatedly create errors, practice those combinations deliberately instead of simply repeating longer tests. Keep your eyes on the source text and aim for a smooth, accurate pace before increasing speed.</p>
        <p>Consistency matters because punctuation often creates brief pauses. With practice, common patterns such as comma-space, period-space, apostrophes and capitalized sentence openings become more automatic. Retest after targeted practice and compare both WPM and accuracy.</p>
        <h2>Related typing tests</h2><nav aria-label="Related typing tests"><a href="/typing-test/code/">Code Typing Test</a><a href="/typing-test-with-numbers/">Typing Test With Numbers</a><a href="/data-entry-typing-test/">Data Entry Typing Test</a><a href="/5-minute-typing-test/">5 Minute Typing Test</a></nav>
        <h2>Use the result as a practical benchmark</h2><p>If your punctuation score is lower than your standard typing score, focus on the characters that create the largest slowdown rather than treating the difference as a failure. The purpose of the specialized test is to expose a practice target that ordinary prose can hide.</p>
      </section>
    </main>
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
  </>;
}
