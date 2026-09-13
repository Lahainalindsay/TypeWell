import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Typing Tests – Data Entry, 10-Key & Job Skills | Typewell",
  description: "Practice job-specific typing skills with free professional typing tests for data entry, 10-key, numeric keypad, numbers, punctuation, office work and more.",
  alternates: { canonical: "/professionals/" },
  openGraph: {
    title: "Professional Typing Tests | Typewell",
    description: "Free job-specific typing tests and practice for data entry, 10-key, numeric work and professional keyboard skills.",
    url: "/professionals/"
  }
};

const tests = [
  ["/data-entry-typing-test/", "Data Entry Typing Test", "Practice realistic mixed records with names, dates, IDs, amounts and other accuracy-sensitive data."],
  ["/10-key-typing-test/", "10-Key Typing Test", "Build numeric keypad speed and accuracy for accounting, bookkeeping, billing and data-entry work."],
  ["/numeric-keypad-test/", "Numeric Keypad Test", "Practice number groups, decimals and repeated numeric patterns with KPM and KPH feedback."],
  ["/kph-typing-test/", "KPH Typing Test", "Measure keystrokes per hour for number-heavy and data-entry work where WPM is not the best metric."],
  ["/typing-test-with-numbers/", "Numbers & Symbols Typing", "Practice dates, prices, percentages, measurements and mixed text-and-number entry."],
  ["/typing-test-with-punctuation/", "Punctuation Typing Test", "Build accuracy with capitalization, commas, quotes, questions and document-style text."],
  ["/typing-practice/", "Office & Administrative Practice", "Use flexible practice for emails, business text, custom material and everyday keyboard accuracy."],
  ["/practice/code", "Coding Typing Practice", "Practice brackets, punctuation, symbols and technical text used in software and technical work."],
  ["/typing-practice/", "Transcription Practice", "Use longer custom passages to build sustained, accurate copy typing and transcription rhythm."]
];

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
    <p className="lead">Prepare for real keyboard work with specialized typing tests and practice for data entry, 10-key, numeric keypad work, office tasks, transcription and technical typing. Choose the skill that matches the work you actually need to do.</p>
    <div className="tw-standalone-grid">
      {tests.map(([href,title,text]) => <a className="tw-standalone-card" href={href} key={title}><h2>{title}</h2><p>{text}</p></a>)}
    </div>
    <section className="tw-coming"><h2>More industry-specific tests are coming</h2><p>We're expanding professional practice for medical terminology, legal typing, accounting and bookkeeping, customer support, claims and insurance, and other job-specific keyboard tasks. Each test will use relevant formats and measurements rather than relabeling the same generic paragraph.</p></section>
  </main>;
}
