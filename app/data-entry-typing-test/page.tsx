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
  ["/data-entry-practice/", "General Data Entry", "Complete realistic records containing names, dates, numbers and codes."],
  ["/data-entry-practice/alphanumeric/", "Alphanumeric Entry", "Practice names, order IDs, ZIP codes and mixed letter-number product codes."],
  ["/data-entry-practice/names-addresses/", "Names & Addresses", "Build accuracy with contact-style records and ZIP codes."],
  ["/typing-test-with-numbers/", "Numbers", "Practice numeric entry in common business formats."],
  ["/10-key-typing-test/", "10-Key / Numeric Keypad", "Build dedicated keypad speed measured with keystroke-based metrics."],
  ["/data-entry-practice/currency-dates/", "Currency & Dates", "Enter prices, balances, decimals and dates accurately."],
  ["/data-entry-practice/invoices-orders/", "Invoices & Orders", "Practice order IDs, product codes, dates and amounts."],
  ["/kph-typing-test/", "KPH Test", "Measure keystrokes per hour for data-entry work."]
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
      <div className="data-entry-page">
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span>{" "}
          <a href="/typing-test-for-employment/">Employment Tests</a> <span aria-hidden="true">›</span>{" "}
          <span>Data Entry</span>
        </nav>

        <section className="seo-mode-intro" aria-label="Data entry assessment introduction">
          <p className="eyebrow">Free employment skills assessment</p>
          <p className="section-intro">
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
            {practiceSkills.map(([href, name, description]) => (
              <article key={href}>
                <h3><a href={href}>{name}</a></h3>
                <p>{description}</p>
                <p><a href={href}><strong>Start practice →</strong></a></p>
              </article>
            ))}
          </div>

          <h2>How data entry differs from a regular typing test</h2>
          <p>
            A regular typing test mainly measures how quickly and accurately you can reproduce continuous text.
            Data entry work is more fragmented: you may move between names, addresses, dates, prices, account numbers,
            product codes and other fields where a single wrong character can change the meaning of a record. That is why
            data-entry practice should measure exact field accuracy and structured entry, not only WPM.
          </p>

          <h2>Jobs that use data entry skills</h2>
          <p>
            These skills are useful for data entry clerks, administrative assistants, records clerks, order-entry staff,
            billing and accounting support, customer-service teams, medical-office staff, legal support roles and other
            jobs that require accurate entry of structured business information.
          </p>

          <h2>What employers may look for</h2>
          <p>
            Employers may care about a combination of accuracy, speed, consistency and the ability to handle the specific
            formats used in the role. Depending on the position, that can include alphanumeric entry, numeric keypad or
            10-key work, dates, currency, identifiers, names and addresses, and verification of entered records.
          </p>
          <p>
            <a href="/blog/data-entry-typing-test-for-employment/"><strong>Read the full guide: Data Entry Typing Test for Employment →</strong></a>
          </p>

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
          <p><a href="/data-entry-practice/"><strong>Browse all Data Entry Practice →</strong></a></p>
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
      </div>

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
