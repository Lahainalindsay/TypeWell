import type { Metadata } from "next";
import WPMTestApp from "../../../src/App";
import JsonLd from "../../../src/components/JsonLd";
import { absoluteUrl } from "../../../src/lib/seo/site";

const canonical = absoluteUrl("/data-entry-practice/currency-dates/");
const socialImage = absoluteUrl("/og-default.svg");

const faqItems = [
  {
    question: "Why practice currency and date entry separately?",
    answer:
      "Amounts and dates are error-sensitive fields where one wrong digit, decimal point, or separator can change the meaning of a record."
  },
  {
    question: "What work uses this type of typing?",
    answer:
      "Billing, bookkeeping, accounting support, order processing, scheduling, and office administration all rely on clean entry of dates, prices, totals, and balances."
  }
] as const;

export const metadata: Metadata = {
  title: "Currency & Dates Data Entry Practice | WPMTest",
  description:
    "Practice currency and date data entry with dollar amounts, decimals, and business date formats for billing, accounting, and office work.",
  alternates: { canonical },
  keywords: [
    "currency data entry practice",
    "date typing practice",
    "billing typing test",
    "decimal typing practice"
  ],
  openGraph: {
    title: "Currency & Dates Data Entry Practice | WPMTest",
    description: "Practice dollar amounts, decimals, and date formats with a focused data entry drill.",
    url: canonical,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest currency and dates practice" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency & Dates Data Entry Practice | WPMTest",
    description: "Practice dollar amounts, decimals, and date formats with a focused data entry drill.",
    images: [socialImage]
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Currency & Dates Data Entry Practice",
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
        { "@type": "ListItem", position: 3, name: "Currency & Dates", item: canonical }
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
          <span>Currency & Dates</span>
        </nav>
        <section className="seo-mode-intro">
          <p className="eyebrow">Focused data entry drill</p>
          <h1>Currency & Dates Data Entry Practice</h1>
          <p>Practice dates, dollar amounts, and decimal values where punctuation and digit accuracy are critical.</p>
        </section>
        <WPMTestApp initialPath="/data-entry-practice/currency-dates/" embedded />
        <section className="seo-prerender">
          <h2>Accuracy matters more than raw speed</h2>
          <p>
            A misplaced decimal point or incorrect date can change the meaning of a business record, invoice, balance, or appointment. This drill isolates those formats before you combine them with other record types in a full mixed-field assessment.
          </p>

          <h2>Best for these data entry skills</h2>
          <ul>
            <li>Date entry with separators and exact ordering</li>
            <li>Dollar amounts, balances, and decimals</li>
            <li>Careful punctuation under time pressure</li>
            <li>Billing and bookkeeping preparation</li>
          </ul>

          <h2>Related data entry practice</h2>
          <nav aria-label="Related currency and dates drills">
            <a href="/data-entry-practice/invoices-orders/">Invoices & Orders</a>
            <a href="/typing-test-with-numbers/">Typing Test With Numbers</a>
            <a href="/kph-typing-test/">KPH Typing Test</a>
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
      {schemas.map((schema, index) => <JsonLd key={index} data={schema} />)}
    </>
  );
}
