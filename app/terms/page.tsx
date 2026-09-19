import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const title = "Terms & Disclaimer | WPMTest";
const description = "Read the WPMTest terms and disclaimer for typing tests, practice tools, proficiency assessments, results, and certificates.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/terms/") },
  openGraph: { title, description, url: absoluteUrl("/terms/"), type: "website", images: [{ url: absoluteUrl("/og-default.svg"), width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-default.svg")] }
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <h1>WPMTest Terms and Disclaimer</h1>
      <p>WPMTest provides typing tests, practice tools, lessons, workplace-skill assessments, and locally stored performance summaries for informational, practice, and evaluation purposes.</p>
      <h2>Results and certificates</h2>
      <p>WPM, accuracy, consistency, task-specific scores, and generated certificates describe performance under the conditions of a particular WPMTest session. They are not accredited professional certifications, promises of job readiness, or guarantees of employment.</p>
      <h2>Employer use</h2>
      <p>Employers may use standardized WPMTest assessments as one source of information when evaluating typing proficiency. Employers remain responsible for their own hiring criteria, decisions, accessibility obligations, and compliance with applicable law.</p>
      <h2>Use of the site</h2>
      <p>Use WPMTest lawfully and responsibly. Features, exercises, assessment content, scoring methods, and site availability may change as the product develops.</p>
    </main>
  );
}
