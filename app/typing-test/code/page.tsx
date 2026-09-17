import type { Metadata } from "next";
import WPMTestApp from "../../../src/App";

const SITE_URL = "https://wpmtest.app";
const canonical = `${SITE_URL}/typing-test/code/`;

export const metadata: Metadata = {
  title: "Code Typing Test - Programming Speed & Accuracy | WPMTest",
  description: "Free code typing test for developers. Practice programming syntax, brackets, punctuation, and symbols while measuring WPM and accuracy.",
  alternates: { canonical },
  openGraph: {
    title: "Code Typing Test for Developers | WPMTest",
    description: "Practice programming syntax and measure code typing speed, accuracy, and errors.",
    url: canonical,
    type: "website"
  },
  twitter: { card: "summary", title: "Code Typing Test for Developers | WPMTest", description: "Practice programming syntax and measure code typing speed and accuracy." },
  robots: { index: true, follow: true }
};

const faqs = [
  ["What is a code typing test?", "A code typing test measures how accurately and quickly you reproduce programming syntax instead of ordinary prose. It includes punctuation, brackets, operators, quotes, identifiers, and other patterns developers type every day."],
  ["Is code typing WPM comparable to normal typing WPM?", "Not exactly. Code contains more symbols, capitalization, punctuation, and uncommon character sequences than prose, so code WPM is best compared with your own previous code-typing results."],
  ["What should developers practice first?", "Prioritize accuracy around brackets, quotes, operators, indentation-related characters, and symbol combinations. Speed becomes more useful after those movements are reliable."],
  ["Does this test require an account?", "No. The programming typing test runs in your browser and does not require signup."]
] as const;

export default function CodeTypingTestPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "WPMTest Code Typing Test",
      url: canonical,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Typing Tests", item: `${SITE_URL}/typing-test/` },
        { "@type": "ListItem", position: 3, name: "Code Typing Test", item: canonical }
      ]
    }
  ];

  return (
    <>
      <main>
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span> <a href="/typing-test/">Typing Tests</a> <span aria-hidden="true">›</span> <span>Code Typing Test</span>
        </nav>
        <section className="seo-mode-intro">
          <p className="eyebrow">Free developer typing test</p>
          <h1>Code Typing Test for Developers</h1>
          <p>Test programming typing speed with real code-style syntax instead of ordinary prose. Measure WPM and accuracy while practicing the punctuation, brackets, operators, quotes, and symbols developers use constantly.</p>
        </section>
        <WPMTestApp initialPath="/practice/code/" />
        <section className="seo-prerender" aria-label="Programming typing test guide">
          <h2>Why code typing is different from prose</h2>
          <p>Programming makes your hands solve a different problem from paragraph typing. Source code mixes short identifiers with brackets, parentheses, quotes, semicolons, commas, periods, comparison operators, assignment operators, and capitalization. Those characters interrupt the familiar word patterns that make ordinary prose fast.</p>
          <p>A developer can therefore have a strong general WPM score while slowing down noticeably on syntax. That does not mean the general score is wrong. It means code is a more specialized keyboard task. Use this test as its own benchmark and compare code sessions with other code sessions.</p>
          <h2>How to improve programming typing speed</h2>
          <p>Start with accuracy. Repeated corrections around braces, brackets, quotes, and operators cost more time than typing those characters slightly slower on the first attempt. Keep your hands relaxed, learn the symbol positions on your keyboard layout, and notice which combinations repeatedly cause errors.</p>
          <p>Retest after focused practice rather than chasing one unusually fast run. A useful improvement is one you can repeat with clean syntax. Developers who work across several languages can also vary the snippets they practice so one familiar pattern does not dominate the score.</p>
          <h2>Related typing tests</h2>
          <nav aria-label="Related typing tests">
            <a href="/typing-test-with-punctuation/">Typing Test With Punctuation</a>
            <a href="/typing-test-with-numbers/">Typing Test With Numbers</a>
            <a href="/data-entry-typing-test/">Data Entry Typing Test</a>
            <a href="/typing-practice/">Free Typing Practice</a>
          </nav>
          <h2>Code typing test FAQ</h2>
          {faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
        </section>
      </main>
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </>
  );
}
