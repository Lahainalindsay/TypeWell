import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const title = "About WPMTest | Free Typing Tests & Practice";
const description = "Learn about WPMTest, a free typing platform for WPM tests, targeted practice, data entry skills, employment assessments, and local progress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/about/") },
  openGraph: { title, description, url: absoluteUrl("/about/"), type: "website", images: [{ url: absoluteUrl("/og-default.svg"), width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-default.svg")] }
};

export default function AboutPage() {
  return (
    <main className="legal-page">
      <h1>About WPMTest</h1>
      <p>WPMTest is a free typing platform built around useful, focused tools: typing speed tests, accuracy practice, 10-key and data-entry practice, career-focused proficiency assessments, and printable results.</p>
      <h2>Built by Lindsay Johnson</h2><p>WPMTest is an independent project created by Lindsay Johnson, a Maui-based developer. The goal is accessible keyboard practice without a subscription or account, particularly for people preparing for office and data-entry work.</p><p>The public <a href="https://github.com/Lahainalindsay/TypeWell">TypeWell repository</a> contains the site’s source. <a href="/contact/">Report an issue or suggest an improvement</a> when a tool does not work as expected.</p><h2>Practice without an account</h2>
      <p>Core typing tools can be used without signing up. Progress and preferences for the core trainer are stored locally in your browser so you can practice while keeping the experience simple.</p>
      <h2>Typing for work</h2>
      <p>WPMTest combines prose typing, numeric keypad practice and exact-match structured records. These are self-administered practice tools. They help you identify errors before an application or assessment; they do not verify identity or replace an employer’s required test.</p>
      <h2>How we explain scores</h2><p>Our <a href="/blog/wpm-vs-kph/">scoring guide</a> explains this site’s formulas. Guides use fictional examples, explain measurement limits and link to practice tools. A practice target is not a universal employer requirement. Use the contact page to report calculation or editorial errors.</p><h2>What results mean</h2>
      <p>WPMTest reports speed, accuracy, consistency, and other task-specific measurements. Results and certificates document performance on a WPMTest assessment; they are not accredited credentials or guarantees of employment.</p>
    </main>
  );
}
