import type { Metadata } from "next";
import TypewellApp from "../../src/App";
import { dataEntryAssessment } from "../../src/features/careers/assessments/data-entry";
import { absoluteUrl } from "../../src/lib/seo/site";

const canonical = absoluteUrl(dataEntryAssessment.publicPath);

export const metadata: Metadata = {
  title: "Data Entry Typing Test & Practice for Employment | WPMTest",
  description: "Practice realistic data entry with names, addresses, dates, numbers, amounts and codes, then take a free standardized data entry proficiency test.",
  alternates: { canonical },
  openGraph: {
    title: "Data Entry Typing Test & Practice | WPMTest",
    description: "Practice job-relevant structured data entry and prepare for a standardized data entry proficiency test.",
    url: canonical,
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Data Entry Typing Test & Practice | WPMTest",
    description: "Practice job-relevant structured data entry and prepare for a standardized data entry proficiency test."
  },
  robots: { index: true, follow: true }
};

const practiceSkills = [
  ["General Data Entry", "Complete realistic records containing names, addresses, dates, numbers and codes."],
  ["Alphanumeric Entry", "Practice account numbers, IDs and mixed letter-number codes."],
  ["Names & Addresses", "Build accuracy with contact and address records."],
  ["Numbers", "Practice numeric entry in common business formats."],
  ["10-Key / Numeric Keypad", "Build dedicated keypad speed measured with keystroke-based metrics."],
  ["Currency & Decimals", "Enter prices, balances and decimal values accurately."],
  ["Dates & Times", "Practice common date and time formats."],
  ["Phone Numbers", "Enter telephone numbers without losing formatting accuracy."],
  ["Invoices & Orders", "Practice invoice IDs, quantities, SKUs and amounts."],
  ["Data Verification", "Compare records and identify mismatched values."]
] as const;

export default function DataEntryTypingTestPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "WPMTest Data Entry Typing Test",
      url: canonical,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Typing Test for Employment", item: absoluteUrl("/typing-test-for-employment/") },
        { "@type": "ListItem", position: 3, name: "Data Entry Typing Test", item: canonical }
      ]
    }
  ];

  return (
    <>
      <main>
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span>{" "}
          <a href="/typing-test-for-employment/">Employment Tests</a> <span aria-hidden="true">›</span>{" "}
          <span>Data Entry</span>
        </nav>

        <section className="seo-mode-intro">
          <p className="eyebrow">Free employment skills assessment</p>
          <h1>Data Entry Typing Test &amp; Practice</h1>
          <p>
            Practice the keyboard skills used in professional data-entry work. Enter realistic records containing names,
            addresses, dates, numbers, amounts and codes, then take the standardized Data Entry Proficiency Test.
          </p>
          <p><strong>Designed for:</strong> {dataEntryAssessment.audience.join(" · ")}</p>
        </section>

        <TypewellApp initialPath="/data-entry-typing-test/" />

        <section className="seo-prerender" aria-label="Data entry practice and assessment guide">
          <h2>Practice data entry skills</h2>
          <p>
            Data entry is different from ordinary paragraph typing. Job-related entry often requires moving between
            structured fields while preserving exact spelling, digits, punctuation, leading zeroes and formatting.
            Practice should therefore target the individual kinds of information you will actually enter.
          </p>
          <div className="seo-card-grid">
            {practiceSkills.map(([name, description]) => (
              <article key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <h2>Standardized Data Entry Proficiency Test</h2>
          <p>
            The free assessment uses a consistent set of job-relevant tasks so results can be compared under the same
            conditions. It is not a custom employer test and does not claim professional accreditation.
          </p>
          <ol>
            {dataEntryAssessment.sections.map((section) => (
              <li key={section.id}>
                <strong>{section.title}</strong> — {section.description}
              </li>
            ))}
          </ol>

          <h2>What your results should measure</h2>
          <p>
            A useful data-entry result goes beyond ordinary WPM. The complete assessment is designed to support metrics
            such as data accuracy, numeric keystroke rate, records completed, fields entered, correct fields, entry
            errors and verification accuracy as the new assessment interface is rolled out.
          </p>

          <h2>Practice before taking the assessment</h2>
          <p>
            Start with accuracy. Repeated errors in account numbers, amounts or dates matter more in structured data than
            a small difference in raw speed. Once individual field types feel comfortable, combine them into complete
            records and then take the standardized assessment.
          </p>
          <nav aria-label="Related data entry tools">
            <a href="/10-key-typing-test/">10-Key Typing Test</a>
            <a href="/numeric-keypad-test/">Numeric Keypad Test</a>
            <a href="/kph-typing-test/">KPH Typing Test</a>
            <a href="/typing-test-with-numbers/">Typing Test With Numbers</a>
            <a href="/typing-test-for-employment/">Typing Test for Employment</a>
          </nav>

          <h2>Certificate</h2>
          <p>
            The completed career assessment will use a Data Entry Proficiency certificate that reports the skills
            measured by WPMTest. WPMTest certificates are site-generated records of an online assessment, not accredited
            professional certifications.
          </p>
        </section>
      </main>

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
