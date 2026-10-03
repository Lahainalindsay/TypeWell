import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const title = "Contact WPMTest | Typing Test Support";
const description = "Find guidance for reporting WPMTest typing-test issues, accessibility problems, calculation errors, or other product feedback.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/contact/") },
  openGraph: { title, description, url: absoluteUrl("/contact/"), type: "website", images: [{ url: absoluteUrl("/og-default.svg"), width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-default.svg")] }
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <h1>Contact WPMTest</h1>
      <p>Report a bug, request an accessibility improvement, or suggest a practice exercise through the WPMTest project’s public issue tracker.</p>
      <p><a className="button primary" href="https://github.com/Lahainalindsay/TypeWell/issues/new">Submit a support report →</a></p>
      <p>A free GitHub account is required to submit a report. Reports are public: share device and browser details, but never private information. You can <a href="https://github.com/Lahainalindsay/TypeWell/issues">read existing reports</a> without signing in. The project maintainer reviews reports; response times vary.</p>
      <h2>Helpful report details</h2>
      <p>When reporting a broken route, accessibility issue, calculation problem, or confusing assessment, include the page URL, browser, device type, and a short description of what happened.</p>
      <h2>Protect your information</h2>
      <p>Do not post passwords, your certificate name, email address, private typing content, or exported progress data. Hide personal information in screenshots before posting a public report.</p>
    </main>
  );
}
