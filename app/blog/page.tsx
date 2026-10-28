import { guides } from "../../src/features/editorial/guides";
import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "../../src/lib/seo/site";

const canonical = absoluteUrl("/blog/");

export const metadata: Metadata = {
  title: "Typing Blog & Articles | WPMTest",
  description: "Read articles about typing tests, practice methods, keyboard skills, and employment assessments.",
  alternates: { canonical },
  openGraph: { title: "Typing Blog & Articles | WPMTest",
    description: "Articles about typing tests, practice methods, keyboard skills, and employment assessments.",
    url: canonical,
    type: "website", images: [{ url: absoluteUrl("/og-default.png"), width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image",
    title: "Typing Blog & Articles | WPMTest",
    description: "Articles about typing tests, practice methods, keyboard skills, and employment assessments.", images: [absoluteUrl("/og-default.png")] },
  robots: { index: true, follow: true }
};

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WPMTest Typing Blog & Articles",
    url: canonical,
    publisher: { "@type": "Organization", name: SITE_NAME },
    inLanguage: "en-US"
  };

  return (
    <>
      <main className="seo-prerender">
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span> <span>Blog</span>
        </nav>

        <p className="eyebrow">Blog & articles</p>
        <h1>Typing Blog & Articles</h1>
        <p>Explore typing test comparisons, practice advice, and articles about keyboard skills.</p>

        <div className="seo-card-grid"><article><p className="eyebrow">Your keyboard alter ego</p><h2><a href="/blog/typing-personality-test/">Your Typing Test Results Are Judging You. Find Out What They Think. 👀</a></h2><p>Your keyboard has been keeping score. Find out what it thinks of you.</p><a href="/blog/typing-personality-test/">Read the article →</a></article><article><p className="eyebrow">Typing experiments · A little ridiculous</p><h2><a href="/blog/typing-test-on-phone-vs-keyboard/">Phone vs Keyboard Typing Speed: How to Compare Your WPM</a></h2><p>Compare WPM, accuracy and input settings across a phone and a physical keyboard, with a repeatable one-minute test.</p><p><a href="/blog/typing-test-on-phone-vs-keyboard/">Read the showdown →</a></p></article><article><p className="eyebrow">ʻŌlelo Hawaiʻi</p><h2><a href="/blog/hawaiian-language-revival/">Hawaiian Language Revival: Speakers, Schools &amp; Typing Practice</a></h2><p>How Hawaiian survived suppression, the growth of Hawaiian-medium schools, and ways to practice the language online.</p><p><a href="/blog/hawaiian-language-revival/">Read the article →</a></p></article>{guides.map(guide => <article key={guide.slug}><p className="eyebrow">Practical guide</p><h2><a href={`/blog/${guide.slug}/`}>{guide.title}</a></h2><p>{guide.description}</p><p><a href={`/blog/${guide.slug}/`}>Read and practice →</a></p></article>)}
          <article>
            <p className="eyebrow">Comparison</p>
            <h2><a href="/blog/best-typing-test-websites/">The 9 Best Free Typing Test Websites (2026), Compared</a></h2>
            <p>
              A side-by-side look at 10FastFingers, Typing.com, Monkeytype and more, including which tools fit
              data-entry and employment-test practice.
            </p>
            <p><a href="/blog/best-typing-test-websites/">Read the comparison →</a></p>
          </article>
          <article>
            <p className="eyebrow">Data Entry</p>
            <h2><a href="/blog/data-entry-typing-test-for-employment/">Data Entry Typing Test for Employment: What to Expect</a></h2>
            <p>
              Learn how data entry differs from ordinary typing, what employers may measure, how WPM and KPH differ,
              and which skills to practice.
            </p>
            <p><a href="/blog/data-entry-typing-test-for-employment/">Read the guide →</a></p>
          </article>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
