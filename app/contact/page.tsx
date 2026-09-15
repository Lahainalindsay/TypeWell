import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const title = "Contact WPMTest | Typing Test Support";
const description = "Find guidance for reporting WPMTest typing-test issues, accessibility problems, calculation errors, or other product feedback.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/contact/") },
  openGraph: { title, description, url: absoluteUrl("/contact/"), type: "website" },
  twitter: { card: "summary", title, description }
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <h1>Contact WPMTest</h1>
      <p>Support contact information will be published here when the WPMTest support address is ready.</p>
      <h2>Helpful report details</h2>
      <p>When reporting a broken route, accessibility issue, calculation problem, or confusing assessment, include the page URL, browser, device type, and a short description of what happened.</p>
      <h2>Protect your information</h2>
      <p>Do not include passwords, private typing content, or exported progress data in a support report unless you have reviewed the material and intentionally chosen to share it.</p>
    </main>
  );
}
