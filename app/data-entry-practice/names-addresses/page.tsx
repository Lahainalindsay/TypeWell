import type { Metadata } from "next";
import WPMTestApp from "../../../src/App";
import JsonLd from "../../../src/components/JsonLd";
import { absoluteUrl } from "../../../src/lib/seo/site";

const canonical = absoluteUrl("/data-entry-practice/names-addresses/");
const socialImage = absoluteUrl("/og-default.svg");

const faqItems = [
  {
    question: "Why practice names and addresses separately?",
    answer:
      "Names and addresses depend on exact spelling, spacing, capitalization, and ZIP-code accuracy. A single wrong character can attach a record to the wrong person or location."
  },
  {
    question: "What jobs use this kind of data entry?",
    answer:
      "Customer service, records management, order entry, medical office support, billing, legal support, and administrative work commonly require accurate name and address entry."
  }
] as const;

export const metadata: Metadata = {
  title: "Names & Addresses Data Entry Practice | WPMTest",
  description:
    "Practice name and address data entry with ZIP codes, contact-style records, and office-ready typing drills for administrative and customer-data work.",
  alternates: { canonical },
  keywords: [
    "name and address typing practice",
    "address data entry practice",
    "zip code typing test",
    "customer record typing practice"
  ],
  openGraph: {
    title: "Names & Addresses Data Entry Practice | WPMTest",
    description: "Practice names, addresses, and ZIP codes with a focused data entry drill for office and records work.",
    url: canonical,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest names and addresses practice" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Names & Addresses Data Entry Practice | WPMTest",
    description: "Practice names, addresses, and ZIP codes with a focused data entry drill for office and records work.",
    images: [socialImage]
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Names & Addresses Data Entry Practice",
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
        { "@type": "ListItem", position: 3, name: "Names & Addresses", item: canonical }
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
          <span>Names & Addresses</span>
        </nav>
        <section className="seo-mode-intro">
          <p className="eyebrow">Focused data entry drill</p>
          <h1>Names & Addresses Data Entry Practice</h1>
          <p>Practice contact-style records where spelling, spacing, and ZIP-code accuracy matter.</p>
        </section>
        <WPMTestApp initialPath="/data-entry-practice/names-addresses/" embedded />
        <section className="seo-prerender">
          <h2>Useful for customer and records work</h2>
          <p>
            Name and location fields appear across administrative, records, billing, customer-service, and order-entry systems. Exact spelling matters because a small error can attach information to the wrong record or route a shipment incorrectly.
          </p>

          <h2>Skills this drill helps you build</h2>
          <ul>
            <li>Exact name spelling with capitals and spacing</li>
            <li>Address-line accuracy under a timer</li>
            <li>ZIP-code entry without dropped or transposed digits</li>
            <li>Cleaner transitions between words and number fields</li>
          </ul>

          <h2>Related data entry practice</h2>
          <nav aria-label="Related names and addresses drills">
            <a href="/data-entry-practice/alphanumeric/">Alphanumeric Practice</a>
            <a href="/data-entry-practice/currency-dates/">Currency & Dates</a>
            <a href="/data-entry-practice/invoices-orders/">Invoices & Orders</a>
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
