import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

export const metadata: Metadata = {
  title: "Professional Typing Tests & Job Skills | WPMTest",
  description: "Practice job-specific typing skills with free professional typing tests for data entry, 10-key, numeric keypad, numbers, punctuation, office work and more.",
  alternates: { canonical: "/professionals/" },
  openGraph: {
    title: "Professional Typing Tests | WPMTest",
    description: "Free job-specific typing tests and practice for data entry, 10-key, numeric work and professional keyboard skills.",
    url: "/professionals/",
    images: [{ url: absoluteUrl("/og-default.svg"), width: 1200, height: 630, alt: "WPMTest professional typing tests" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Typing Tests & Job Skills | WPMTest",
    description: "Free job-specific typing tests and practice for data entry, 10-key, numeric work and professional keyboard skills.",
    images: [absoluteUrl("/og-default.svg")]
  }
};

const categories = [
  { heading: "General employment", description: "Build and document reliable speed for common workplace assessments.", links: [
    ["/typing-test-for-employment/", "Employment Typing Test", "A longer prose assessment for job preparation."],
    ["/5-minute-typing-test/", "5 Minute Typing Test", "Check sustained WPM, accuracy and consistency."],
    ["/typing-certificate/", "Typing Certificate", "Create a certificate after finishing a test."]
  ] },
  { heading: "Data entry", description: "Train exact field entry across realistic fictional records.", links: [
    ["/data-entry-typing-test/", "Data Entry Typing Test", "Combine names, IDs, dates, amounts and ZIP codes."],
    ["/data-entry-practice/alphanumeric/", "Alphanumeric", "Work across letters, digits and codes."],
    ["/data-entry-practice/names-addresses/", "Names & Addresses", "Focus on exact contact records."],
    ["/data-entry-practice/currency-dates/", "Currency & Dates", "Practice amounts, decimals and dates."],
    ["/data-entry-practice/invoices-orders/", "Invoices & Orders", "Train order details and identifiers."]
  ] },
  { heading: "Numeric", description: "Measure keypad fluency with metrics that suit number-heavy work.", links: [
    ["/10-key-typing-test/", "10-Key Test", "Practice number groups on a physical or on-screen keypad."],
    ["/numeric-keypad-test/", "Numeric Keypad Test", "Build speed and accuracy across numeric groups."],
    ["/kph-typing-test/", "KPH Test", "See keystrokes per hour and accuracy."],
    ["/typing-test-with-numbers/", "Numbers Typing Test", "Enter numbers inside realistic text."]
  ] }
] as const;

export default function ProfessionalsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Professional Typing Tests",
    description: "Job-specific typing tests and practice for professional keyboard skills.",
    url: "https://wpmtest.app/professionals/",
    isAccessibleForFree: true,
    inLanguage: "en-US"
  };
  return <main className="tw-standalone">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <span className="tw-kicker">Professional keyboard skills</span>
    <h1>Professional Typing Tests</h1>
    <p className="lead">Prepare for workplace typing and data-entry assessments. Choose prose typing, structured records, or numeric keypad work based on the job you want.</p>
    <div className="professional-categories">{categories.map((category) => <section className="professional-category" key={category.heading}>
      <div><h2>{category.heading}</h2><p>{category.description}</p></div>
      <div className="professional-links">{category.links.map(([href, title, description]) => <a href={href} key={href}><strong>{title}</strong><span>{description}</span><span aria-hidden="true">↗</span></a>)}</div>
    </section>)}</div>
    <nav className="professional-other" aria-label="More workplace typing skills"><span>More workplace skills</span><a href="/typing-test/code/">Coding symbols</a><a href="/typing-test-with-punctuation/">Punctuation</a><a href="/typing-practice/">Office and transcription practice</a></nav>
    <section className="professional-explainer"><h2>Which score matters?</h2><p><strong>WPM</strong> measures prose typing in five-character words. <strong>KPM</strong> counts keystrokes per minute; <strong>KPH</strong> projects that rate across an hour. For data entry, field accuracy matters alongside speed because an incorrect date or amount can change a record.</p><a href="/data-entry-practice/">Explore all data entry practice →</a></section>
  </main>;
}
