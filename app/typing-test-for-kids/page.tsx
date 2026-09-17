import type { Metadata } from "next";
import WPMTestApp from "../../src/App";

const SITE_URL = "https://wpmtest.app";
const canonical = `${SITE_URL}/typing-test-for-kids/`;

export const metadata: Metadata = {
  title: "Typing Test for Kids - Free WPM & Accuracy Test | WPMTest",
  description: "Free typing test for kids with clear, age-friendly text. Check WPM and accuracy, practice keyboard skills and get instant results.",
  alternates: { canonical },
  openGraph: { title: "Free Typing Test for Kids | WPMTest", description: "A simple free typing speed and accuracy test for young typists, students and classrooms.", url: canonical, type: "website", images: [{ url: `${SITE_URL}/og-default.svg`, width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image", title: "Free Typing Test for Kids | WPMTest", description: "A simple free typing speed and accuracy test for young typists and students.", images: [`${SITE_URL}/og-default.svg`] },
  robots: { index: true, follow: true }
};

export default function KidsTypingTestPage() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "WPMTest Typing Test for Kids", url: canonical, applicationCategory: "EducationalApplication", operatingSystem: "Any", audience: { "@type": "EducationalAudience", educationalRole: "student" }, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Typing Tests", item: `${SITE_URL}/typing-test/` },
      { "@type": "ListItem", position: 3, name: "Typing Test for Kids", item: canonical }
    ] }
  ];
  return <>
    <main>
      <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">›</span> <a href="/typing-test/">Typing Tests</a> <span aria-hidden="true">›</span> <span>Typing Test for Kids</span></nav>
      <section className="seo-mode-intro"><p className="eyebrow">Free • no signup</p><h1>Typing Test for Kids</h1><p>A simple typing test for kids and students who want to check keyboard speed and accuracy without an account. Start with a comfortable pace, focus on correct keys, and use the result as a starting point for practice.</p></section>
      <WPMTestApp initialPath="/1-minute-typing-test/" />
      <section className="seo-prerender" aria-label="Typing test for kids guide">
        <h2>A typing score should help kids improve</h2><p>For a young typist, the useful question is not whether a score beats an adult benchmark. A first test creates a personal baseline. Future tests can show whether keyboard familiarity, accuracy and confidence are improving over time.</p><p>Accuracy should come before speed. Rushing can reinforce incorrect reaches and create frustration. A slower clean result gives a student something reliable to build on, while repeated short sessions make it easier to notice progress.</p>
        <h2>Using the test at home or in a classroom</h2><p>Keep the first attempt low-pressure. Use the same keyboard when comparing progress, allow time to become familiar with the passage, and encourage comfortable posture and relaxed hands. Teachers can use a short test as a benchmark before choosing lessons or targeted practice.</p><p>WPM is only one measurement. Accuracy and consistency help explain the score, and practice is more useful when it targets the patterns a student actually finds difficult.</p>
        <h2>What to try next</h2><nav aria-label="Related typing activities"><a href="/typing-practice/">Free Typing Practice</a><a href="/learn/">Typing Lessons</a><a href="/1-minute-typing-test/">1 Minute Typing Test</a><a href="/typing-certificate/">Typing Certificate</a></nav>
        <h2>For parents and teachers</h2><p>Use repeated results to look for progress rather than treating one WPM number as a grade. A student who types more accurately and comfortably is building a stronger foundation even when speed increases gradually.</p>
      </section>
    </main>
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
  </>;
}
