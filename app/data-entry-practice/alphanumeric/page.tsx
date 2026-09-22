import type { Metadata } from "next";
import WPMTestApp from "../../../src/App";
import { absoluteUrl } from "../../../src/lib/seo/site";

const canonical = absoluteUrl("/data-entry-practice/alphanumeric/");
const socialImage = absoluteUrl("/og-default.svg");

const faqItems = [
  {
    question: "What is alphanumeric data entry?",
    answer:
      "Alphanumeric data entry means typing records that mix letters, numbers, and symbols, such as order IDs, ZIP codes, account codes, and product identifiers."
  },
  {
    question: "Why is alphanumeric practice harder than prose typing?",
    answer:
      "Alphanumeric records force you to switch between letter patterns, digits, punctuation, and capitalization more often than a normal paragraph, so accuracy usually drops first."
  }
] as const;

export const metadata: Metadata = {
  title: "Alphanumeric Data Entry Practice Test | WPMTest",
  description:
    "Practice alphanumeric data entry with names, ZIP codes, order IDs, and mixed product codes for office, records, and order-entry work.",
  alternates: { canonical },
  keywords: [
    "alphanumeric data entry practice",
    "alphanumeric typing test",
    "data entry codes practice",
    "order id typing practice"
  ],
  openGraph: {
    title: "Alphanumeric Data Entry Practice Test | WPMTest",
    description: "Practice names, ZIP codes, order IDs, and mixed codes with a focused alphanumeric data entry drill.",
    url: canonical,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest alphanumeric data entry practice" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Alphanumeric Data Entry Practice Test | WPMTest",
    description: "Practice names, ZIP codes, order IDs, and mixed codes with a focused alphanumeric data entry drill.",
    images: [socialImage]
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Alphanumeric Data Entry Practice Test",
      description: metadata.description,
      url: canonical,
      isAccessibleForFree: true
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Data Entry Practice", item: absoluteUrl("/data-entry-practice/") },
        { "@type": "ListItem", position: 3, name: "Alphanumeric Data Entry Practice", item: canonical }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    }
  ];

  return (
    <>
      <main className="data-entry-page">
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span>{" "}
          <a href="/data-entry-practice/">Data Entry Practice</a> <span aria-hidden="true">›</span>{" "}
          <span>Alphanumeric</span>
        </nav>
        <section className="seo-mode-intro">
          <p className="eyebrow">Focused data entry drill</p>
          <h1>Alphanumeric Data Entry Practice</h1>
          <p>
            Practice switching between letters and numbers while entering names, order IDs, ZIP codes, and product codes.
          </p>
        </section>
        <WPMTestApp initialPath="/data-entry-practice/alphanumeric/" embedded />
        <section className="seo-prerender">
          <h2>Why practice alphanumeric entry?</h2>
          <p>
            Many office and records systems mix words, digits, and identifiers in the same workflow. Practicing those transitions separately helps you build cleaner data entry accuracy before a full mixed-record typing test.
          </p>

          <h2>Best for these data entry tasks</h2>
          <ul>
            <li>Order entry and product catalog updates</li>
            <li>Customer records with IDs and ZIP codes</li>
            <li>Inventory systems that mix letters and numbers</li>
            <li>Billing or claims work with account identifiers</li>
          </ul>

          <h2>How to improve alphanumeric typing accuracy</h2>
          <p>
            Slow down when you move from letters to digits, keep leading zeroes intact, and check capitalization only after your base accuracy is stable. Once mixed-code entry feels reliable, move to the full <a href="/data-entry-typing-test/">Data Entry Typing Test</a>.
          </p>

          <h2>Related data entry practice</h2>
          <nav aria-label="Related alphanumeric drills">
            <a href="/data-entry-practice/names-addresses/">Names & Addresses</a>
            <a href="/data-entry-practice/invoices-orders/">Invoices & Orders</a>
            <a href="/typing-test-with-numbers/">Typing Test With Numbers</a>
            <a href="/data-entry-typing-test/">Full Data Entry Typing Test</a>
          </nav>

          <h2>FAQ</h2>
          <div className="seo-faq">
            {faqItems.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
