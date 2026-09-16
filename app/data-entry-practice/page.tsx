import type { Metadata } from "next";
import TypewellApp from "../../src/App";
import { absoluteUrl } from "../../src/lib/seo/site";

const canonical = absoluteUrl("/data-entry-practice/");

export const metadata: Metadata = {
  title: "Data Entry Practice - Job Skills & Typing Drills | WPMTest",
  description: "Practice job-specific data entry skills including alphanumeric entry, names, ZIP codes, dates, currency, invoices, orders, 10-key and KPH.",
  alternates: { canonical },
  robots: { index: true, follow: true }
};

const drills = [
  ["/data-entry-practice/alphanumeric/", "Alphanumeric Data Entry", "Names, order IDs, ZIP codes and product codes."],
  ["/data-entry-practice/names-addresses/", "Names & Addresses", "Contact-style records with names and ZIP codes."],
  ["/data-entry-practice/currency-dates/", "Currency & Dates", "Prices, decimals and date formats."],
  ["/data-entry-practice/invoices-orders/", "Invoices & Orders", "Order IDs, product codes, dates and amounts."],
  ["/10-key-typing-test/", "10-Key / Numeric Keypad", "Dedicated numeric keypad speed and accuracy."],
  ["/kph-typing-test/", "KPH Test", "Measure keystrokes per hour for data-entry work."]
] as const;

export default function DataEntryPracticePage() {
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
          <h1>Data Entry Practice</h1>
          <p className="section-intro">
            Build the exact keyboard skills used in data-entry and office work. Choose a focused drill, then combine the skills in the full Data Entry Typing Test.
          </p>
        </section>
        <section className="seo-prerender" aria-label="Data entry practice choices">
          <div className="seo-card-grid">
            {drills.map(([href, title, description]) => (
              <article key={href}>
                <h2><a href={href}>{title}</a></h2>
                <p>{description}</p>
                <p><a href={href}><strong>Start practice →</strong></a></p>
              </article>
            ))}
          </div>
        </section>
        <TypewellApp initialPath="/data-entry-practice/" />
        <section className="seo-prerender">
          <h2>Practice first, test second</h2>
          <p>
            Focused drills let you slow down and learn the patterns used in structured records. When your accuracy is consistent, use the standardized Data Entry Typing Test to combine multiple field types in one assessment.
          </p>
          <p><a href="/data-entry-typing-test/"><strong>Take the full Data Entry Typing Test →</strong></a></p>
        </section>
      </main>
    </>
  );
}
