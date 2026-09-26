import type { Metadata } from "next";
import WPMTestApp from "../../src/App";
import { dataEntryAssessment } from "../../src/features/careers/assessments/data-entry";
import { absoluteUrl } from "../../src/lib/seo/site";

const socialImage = absoluteUrl("/og-default.svg");

const canonical = absoluteUrl(dataEntryAssessment.publicPath);

export const metadata: Metadata = {
  title: "Data Entry Typing Test & Practice for Employment | WPMTest",
  description: "Practice job-style data entry with fictional names, dates, amounts and codes. Get exact field accuracy, mistake review and targeted drills. Free, no signup.",
  alternates: { canonical },
  openGraph: {
    title: "Data Entry Typing Test & Practice | WPMTest",
    description: "Take a free structured-record practice test with field accuracy, mistake review and targeted data-entry drills.",
    url: canonical,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest Data Entry Typing Test" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Entry Typing Test & Practice | WPMTest",
    description: "Take a free structured-record practice test with field accuracy, mistake review and targeted data-entry drills.",
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
          <p className="eyebrow">Free data entry practice test</p>
          <p className="section-intro">
            Data-entry work has different demands than general typing: it is often numeric-heavy, repetitive, and
            accuracy-critical in a way prose typing is not.
          </p>
          <p>Learn how data-entry assessments work, what job-specific keyboard skills employers may measure, and how to practice before a test.</p>
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

          <h2>What this practice test measures</h2>
          <p>
            Enter four fictional records with six fields each. Exact matches count as correct; an empty field counts as an
            error. Your result shows field accuracy, complete records, fields per minute and mistakes by field type.
            This self-administered practice test is not proctored or approved by any employer.
          </p>
          <p>If an employer requires a certified or proctored typing result, follow that employer’s instructions. A
            self-administered practice result cannot replace a required proctored test.</p>

          <h2>Practice before taking the assessment</h2>
          <p>
            Start with accuracy. Repeated errors in account numbers, amounts or dates matter more in structured data than
            a small difference in raw speed. Once individual field types feel comfortable, combine them into complete
            records and then take the standardized assessment.
          </p>
          <p><a href="/data-entry-practice/"><strong>Browse all Data Entry Practice →</strong></a></p>
          <h2>Practice job-specific typing skills</h2>
          <nav aria-label="Employment typing tools">
            <a href="/10-key-typing-test/">10-Key Typing Test</a>
            <a href="/numeric-keypad-test/">Numeric Keypad Test</a>
            <a href="/kph-typing-test/">KPH Typing Test</a>
            <a href="/typing-test-with-numbers/">Typing Test With Numbers</a>
            <a href="/typing-test-for-employment/">Typing Test for Employment</a>
            <a href="/professionals/">Professional Typing Tests</a>
          </nav>

          <h2>Save your practice result</h2>
          <p>
            Print or save your result after the test. It includes the date, task, speed and exact field accuracy.
            It is a personal record of unproctored practice, not an accredited or nationally recognized certification.
          </p>
        </section>
      </div>

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
