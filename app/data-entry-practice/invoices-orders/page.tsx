import type { Metadata } from "next";
import WPMTestApp from "../../../src/App";
import JsonLd from "../../../src/components/JsonLd";
import { absoluteUrl } from "../../../src/lib/seo/site";

const canonical = absoluteUrl("/data-entry-practice/invoices-orders/");
const socialImage = absoluteUrl("/og-default.svg");

const faqItems = [
  {
    question: "Why practice invoices and orders together?",
    answer:
      "Invoice and order-entry work combines several field types at once: IDs, dates, quantities, product codes, and amounts. Practicing them together is closer to real business records."
  },
  {
    question: "Who should use this order-entry drill?",
    answer:
      "This drill is useful for order-entry clerks, billing teams, administrative staff, e-commerce support, records clerks, and job applicants preparing for data entry tests."
  }
] as const;

export const metadata: Metadata = {
  title: "Invoice & Order Data Entry Practice | WPMTest",
  description:
    "Practice invoice and order-entry typing with IDs, dates, product codes, quantities, and amounts in realistic business-record drills.",
  alternates: { canonical },
  keywords: [
    "invoice data entry practice",
    "order entry typing test",
    "order entry practice",
    "invoice typing practice"
  ],
  openGraph: {
    title: "Invoice & Order Data Entry Practice | WPMTest",
    description: "Practice realistic invoice and order-entry records with IDs, dates, codes, and amounts.",
    url: canonical,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest invoice and order-entry practice" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice & Order Data Entry Practice | WPMTest",
    description: "Practice realistic invoice and order-entry records with IDs, dates, codes, and amounts.",
    images: [socialImage]
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Invoice & Order Data Entry Practice",
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
        { "@type": "ListItem", position: 3, name: "Invoices & Orders", item: canonical }
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
          <span>Invoices & Orders</span>
        </nav>
        <section className="seo-mode-intro">
          <p className="eyebrow">Focused data entry drill</p>
          <h1>Invoice & Order Data Entry Practice</h1>
          <p>Practice order IDs, product codes, dates, quantities, and amounts together in an order-entry style workflow.</p>
        </section>
        <WPMTestApp initialPath="/data-entry-practice/invoices-orders/" embedded />
        <section className="seo-prerender">
          <h2>Practice realistic business records</h2>
          <p>
            Order-entry work often mixes identifiers, dates, product codes, quantities, and financial values in the same screen. This drill focuses on that combination before you move into a broader employment-style data entry assessment.
          </p>

          <h2>What this drill helps you train</h2>
          <ul>
            <li>Switching between item codes, counts, and amounts</li>
            <li>Exact order and invoice identifier entry</li>
            <li>Amount accuracy with decimals and punctuation</li>
            <li>Realistic business-record pacing</li>
          </ul>

          <h2>Related data entry practice</h2>
          <nav aria-label="Related invoice and order drills">
            <a href="/data-entry-practice/alphanumeric/">Alphanumeric Practice</a>
            <a href="/data-entry-practice/currency-dates/">Currency & Dates</a>
            <a href="/10-key-typing-test/">10-Key Typing Test</a>
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
