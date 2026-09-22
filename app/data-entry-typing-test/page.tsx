import type { Metadata } from "next";
import WPMTestApp from "../../src/App";
import { dataEntryAssessment } from "../../src/features/careers/assessments/data-entry";
import { absoluteUrl } from "../../src/lib/seo/site";

const socialImage = absoluteUrl("/og-default.svg");

const canonical = absoluteUrl(dataEntryAssessment.publicPath);

export const metadata: Metadata = {
  title: "Data Entry Typing Test, Practice & Employment Prep | WPMTest",
  description: "Practice realistic data entry typing with names, addresses, dates, numbers, amounts, and codes, then take a free employment-style data entry test.",
  alternates: { canonical },
  keywords: [
    "data entry typing test",
    "data entry test",
    "data entry typing practice",
    "data entry practice test",
    "typing test for data entry jobs",
    "data entry speed test"
  ],
  openGraph: {
    title: "Data Entry Typing Test, Practice & Employment Prep | WPMTest",
    description: "Practice job-relevant structured data entry and prepare for a free employment-style data entry proficiency test.",
    url: canonical,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest Data Entry Typing Test" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Entry Typing Test, Practice & Employment Prep | WPMTest",
    description: "Practice job-relevant structured data entry and prepare for a free employment-style data entry proficiency test.",
    images: [socialImage]
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
      "@type": "WebPage",
      name: "Data Entry Typing Test, Practice & Employment Prep",
      description: metadata.description,
      url: canonical,
      isAccessibleForFree: true
    },
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What WPM do data entry jobs usually require?",
          acceptedAnswer: { "@type": "Answer", text: "Many postings ask for 40–60+ WPM at 95%+ accuracy. Requirements vary, so follow the specific job posting." }
        },
        {
          "@type": "Question",
          name: "What is the difference between this and the regular typing test?",
          acceptedAnswer: { "@type": "Answer", text: "This test emphasizes numeric sequences and structured data-entry patterns rather than natural-language prose." }
        },
        {
          "@type": "Question",
          name: "What is KPH and do I need it?",
          acceptedAnswer: { "@type": "Answer", text: "Keystrokes Per Hour measures 10-key numeric entry speed specifically and is common in accounting and bookkeeping postings. Use the KPH Test when a posting asks for it." }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: practiceSkills.map(([href, name], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: absoluteUrl(href)
      }))
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
          <h1>Data Entry Typing Test</h1>
          <p className="section-intro">
            Practice the exact mix of names, dates, numbers, amounts, and codes used in data entry jobs, then measure your speed and accuracy with a free employment-style assessment.
          </p>
          <p>
            Data-entry work has different demands than general typing: it is often numeric-heavy, repetitive, and
            accuracy-critical in a way prose typing is not.
          </p>
          <p><strong>Designed for:</strong> {dataEntryAssessment.audience.join(" · ")}</p>
        </section>

        <WPMTestApp initialPath="/data-entry-typing-test/" />

        <section className="seo-prerender" aria-label="Data entry practice and assessment guide">
          <h2>Measure the skills data-entry roles actually use</h2>
          <p>
            A single transposed digit in a data-entry job can matter far more than a typo in an email. This test is
            structured around that reality, mixing numeric sequences with structured text rather than pure prose
            paragraphs, so your result better reflects real data-entry performance than a standard prose-based typing
            test would.
          </p>
          <p>
            Most data-entry job postings specify a minimum WPM, commonly 40–60, and a separate accuracy threshold,
            often 95–98%, sometimes alongside a 10-key numeric-keypad speed requirement measured in KPH rather than
            WPM. See the <a href="/kph-typing-test/">KPH Test</a> if a posting asks for that specifically. If you are
            applying to roles with both requirements, run both tests and report whichever the posting actually asks for.
          </p>

          <h2>What this data entry typing test measures</h2>
          <ul>
            <li>Structured record accuracy across names, IDs, dates, and amounts</li>
            <li>Typing speed while switching between letters, numbers, and punctuation</li>
            <li>Field-by-field precision rather than prose-only words per minute</li>
            <li>Readiness for office, billing, records, and order-entry workflows</li>
          </ul>

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

          <h2>What is a good data entry typing speed?</h2>
          <p>
            Many entry-level and office postings ask for roughly 40 to 60 WPM, but speed alone is not enough. Employers often care just as much about exact dates, correct ZIP codes, accurate amounts, and clean record entry. For data entry, a slightly slower test with fewer field errors is usually more valuable than a faster test with preventable mistakes.
          </p>

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

          <h2>How to improve your data entry typing test score</h2>
          <ol>
            <li>Practice the exact field type you miss most often, such as dates, amounts, or codes.</li>
            <li>Use the focused <a href="/data-entry-practice/">Data Entry Practice</a> drills before retaking the full test.</li>
            <li>Train 10-key separately if the role asks for a keypad or KPH score.</li>
            <li>Retake the full assessment only after your structured-entry accuracy becomes consistent.</li>
          </ol>

          <h2>Data entry typing test FAQ</h2>
          <div className="seo-faq">
            <article>
              <h3>What WPM do data entry jobs usually require?</h3>
              <p>Many postings ask for 40–60+ WPM at 95%+ accuracy. See the <a href="/average-typing-speed/">Average Typing Speed</a> guide for broader ranges.</p>
            </article>
            <article>
              <h3>What is the difference between this and the regular typing test?</h3>
              <p>This test emphasizes numeric sequences and structured data-entry patterns rather than natural-language prose.</p>
            </article>
            <article>
              <h3>What is KPH and do I need it?</h3>
              <p>Keystrokes Per Hour measures 10-key numeric entry speed specifically and is common in accounting and bookkeeping postings. See the <a href="/kph-typing-test/">KPH Test</a>.</p>
            </article>
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
