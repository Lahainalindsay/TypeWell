import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const title = "About WPMTest | Free Typing Tests & Practice";
const description = "Learn about WPMTest, a free typing platform for WPM tests, targeted practice, data entry skills, employment assessments, and local progress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/about/") },
  openGraph: { title, description, url: absoluteUrl("/about/"), type: "website" },
  twitter: { card: "summary", title, description }
};

export default function AboutPage() {
  return (
    <main className="legal-page">
      <h1>About WPMTest</h1>
      <p>WPMTest is a free typing platform built around useful, focused tools: typing speed tests, accuracy practice, 10-key and data-entry practice, career-focused proficiency assessments, and printable results.</p>
      <h2>Practice without an account</h2>
      <p>Core typing tools can be used without signing up. Progress and preferences for the core trainer are stored locally in your browser so you can practice while keeping the experience simple.</p>
      <h2>Typing for work</h2>
      <p>WPMTest is expanding beyond general WPM practice into standardized assessments for real workplace skills. These assessments are designed to help job seekers practice relevant typing tasks and give employers a consistent way to evaluate typing proficiency.</p>
      <h2>What results mean</h2>
      <p>WPMTest reports speed, accuracy, consistency, and other task-specific measurements. Results and certificates document performance on a WPMTest assessment; they are not accredited credentials or guarantees of employment.</p>
    </main>
  );
}
