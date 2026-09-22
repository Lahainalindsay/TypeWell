import type { Metadata } from "next";
import WPMTestApp from "../../src/App";
import JsonLd from "../../src/components/JsonLd";
import { absoluteUrl } from "../../src/lib/seo/site";

const canonical = absoluteUrl("/data-entry-practice/");
const socialImage = absoluteUrl("/og-default.svg");

export const metadata: Metadata = {
  title: "Data Entry Practice Tests & Typing Drills | WPMTest",
  description:
    "Practice data entry typing with focused drills for alphanumeric entry, names and addresses, dates, currency, invoices, order entry, 10-key, and KPH.",
  alternates: { canonical },
  keywords: [
    "data entry practice test",
    "data entry practice",
    "data entry typing practice",
    "data entry drills",
    "10 key practice",
    "kph test"
  ],
  openGraph: {
    title: "Data Entry Practice Tests & Typing Drills | WPMTest",
    description:
      "Choose focused data entry practice drills for names, numbers, dates, amounts, invoices, orders, 10-key, and KPH preparation.",
    url: canonical,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest data entry practice tests" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Entry Practice Tests & Typing Drills | WPMTest",
    description:
      "Choose focused data entry practice drills for names, numbers, dates, amounts, invoices, orders, 10-key, and KPH preparation.",
    images: [socialImage]
  },
  robots: { index: true, follow: true }
};

const drills = [
  ["/data-entry-practice/alphanumeric/", "Alphanumeric Data Entry Practice", "Practice names, order IDs, ZIP codes, and mixed product codes."],
  ["/data-entry-practice/names-addresses/", "Names & Addresses Practice", "Improve spelling accuracy, address entry, and ZIP-code handling."],
  ["/data-entry-practice/currency-dates/", "Currency & Dates Practice", "Train date formats, decimals, dollar amounts, and exact punctuation."],
  ["/data-entry-practice/invoices-orders/", "Invoices & Orders Practice", "Combine codes, dates, quantities, and amounts in job-style records."],
  ["/10-key-typing-test/", "10-Key / Numeric Keypad Test", "Build dedicated numeric keypad speed and accuracy for office work."],
  ["/kph-typing-test/", "KPH Typing Test", "Measure keystrokes per hour for bookkeeping, billing, and data-entry roles."]
] as const;

const faqItems = [
  {
    question: "What should I practice for a data entry test?",
    answer:
      "Most data entry roles mix names, addresses, dates, numbers, identifiers, and amounts. Practice each pattern separately first, then combine them in a full mixed-record assessment."
  },
  {
    question: "Is data entry practice different from a normal typing test?",
    answer:
      "Yes. A normal typing test focuses on continuous text, while data entry practice focuses on exact structured values such as codes, ZIP codes, dates, and currency."
  },
  {
    question: "Should I practice 10-key separately?",
    answer:
      "Yes when the job posting mentions a numeric keypad, 10-key, or KPH requirement. Those jobs often evaluate numeric entry separately from general WPM."
  }
] as const;

export default function DataEntryPracticePage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Data Entry Practice Tests & Typing Drills",
      description: metadata.description,
      url: canonical,
      isAccessibleForFree: true
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Data Entry Typing Test", item: absoluteUrl("/data-entry-typing-test/") },
        { "@type": "ListItem", position: 3, name: "Data Entry Practice", item: canonical }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: drills.map(([href, title], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: title,
        url: absoluteUrl(href)
      }))
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
          <a href="/data-entry-typing-test/">Data Entry</a> <span aria-hidden="true">›</span>{" "}
          <span>Practice</span>
        </nav>
        <section className="seo-mode-intro">
          <p className="eyebrow">Job-specific practice</p>
          <h1>Data Entry Practice Tests</h1>
          <p className="section-intro">
            Practice the exact formats used in data entry work: names, addresses, ZIP codes, dates, dollar amounts, invoice IDs, order codes, and numeric keypad entry.
          </p>
        </section>
        <section className="seo-prerender" aria-label="Data entry practice choices">
          <h2>Choose the data entry drill that matches your work</h2>
          <p>
            The fastest way to improve a data entry typing test score is to practice the formats that slow you down most. Use a focused drill for the field type you miss most often, then return to the full assessment once your accuracy is stable.
          </p>
          <div className="seo-card-grid">
            {drills.map(([href, title, description]) => (
              <article key={href}>
                <h3><a href={href}>{title}</a></h3>
                <p>{description}</p>
                <p><a href={href}><strong>Start practice →</strong></a></p>
              </article>
            ))}
          </div>
        </section>
        <WPMTestApp initialPath="/data-entry-practice/" embedded />
        <section className="seo-prerender">
          <h2>How to use data entry practice effectively</h2>
          <ol>
            <li>Start with the single format that causes the most errors.</li>
            <li>Slow down enough to keep dates, codes, and punctuation exact.</li>
            <li>Repeat the drill until your accuracy is consistent.</li>
            <li>Move to the full Data Entry Typing Test to combine multiple field types.</li>
          </ol>

          <h2>Practice first, test second</h2>
          <p>
            Focused data entry drills help you isolate letter-number transitions, structured record entry, numeric keypad work, and exact formatting. Once those pieces feel reliable, use the full assessment to measure mixed-record speed and accuracy under a timer.
          </p>
          <p><a href="/data-entry-typing-test/"><strong>Take the full Data Entry Typing Test →</strong></a></p>

          <h2>Data entry practice FAQ</h2>
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
