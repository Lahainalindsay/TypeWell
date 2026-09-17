import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "../../src/lib/seo/site";

const canonical = absoluteUrl("/blog/");

export const metadata: Metadata = {
  title: "Typing & Career Guides | WPMTest",
  description: "Practical guides for typing tests, data entry, employment assessments, 10-key practice and job-specific keyboard skills.",
  alternates: { canonical },
  openGraph: { title: "Typing & Career Guides | WPMTest",
    description: "Practical guides for typing tests, data entry, employment assessments and job-specific keyboard skills.",
    url: canonical,
    type: "website", images: [{ url: absoluteUrl("/og-default.svg"), width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image",
    title: "Typing & Career Guides | WPMTest",
    description: "Practical guides for typing tests, data entry, employment assessments and job-specific keyboard skills.", images: [absoluteUrl("/og-default.svg")] },
  robots: { index: true, follow: true }
};

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WPMTest Typing & Career Guides",
    url: canonical,
    publisher: { "@type": "Organization", name: SITE_NAME },
    inLanguage: "en-US"
  };

  return (
    <>
      <main className="seo-prerender">
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span> <span>Guides</span>
        </nav>

        <p className="eyebrow">Typing & career guides</p>
        <h1>Typing, Data Entry & Employment Test Guides</h1>
        <p>
          Learn how different typing and data-entry assessments work, what job-specific keyboard skills employers may
          measure, and how to practice before taking a test.
        </p>

        <div className="seo-card-grid">
          <article>
            <p className="eyebrow">Data Entry</p>
            <h2><a href="/blog/data-entry-typing-test-for-employment/">Data Entry Typing Test for Employment: What to Expect</a></h2>
            <p>
              Learn how data entry differs from ordinary typing, what employers may measure, how WPM and KPH differ,
              and which skills to practice.
            </p>
            <p><a href="/blog/data-entry-typing-test-for-employment/">Read the guide →</a></p>
            <p><a href="/data-entry-typing-test/"><strong>Take the Data Entry Typing Test →</strong></a></p>
          </article>
        </div>

        <h2>Practice job-specific typing skills</h2>
        <nav aria-label="Employment typing tools">
          <a href="/data-entry-typing-test/">Data Entry Typing Test</a>
          <a href="/10-key-typing-test/">10-Key Typing Test</a>
          <a href="/kph-typing-test/">KPH Typing Test</a>
          <a href="/typing-test-for-employment/">Typing Test for Employment</a>
          <a href="/professionals/">Professional Typing Tests</a>
        </nav>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
