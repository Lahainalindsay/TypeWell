import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const title = "Privacy Policy | WPMTest";
const description = "Read how WPMTest handles locally stored typing progress, advertising, cookies, and information entered into typing exercises.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/privacy/") },
  openGraph: { title, description, url: absoluteUrl("/privacy/"), type: "website" },
  twitter: { card: "summary", title, description }
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <h1>Privacy Policy</h1>
      <p>WPMTest is designed so core typing tests and practice can be used without creating an account. Typing progress, settings, and practice history used by the core trainer are stored locally in your browser on this device.</p>

      <h2>Local browser storage</h2>
      <p>Your browser stores progress and preferences so they remain available when you return. You can export a JSON backup, import a previously exported backup, or reset local progress from the Progress page.</p>

      <h2>Typing content</h2>
      <p>Core typing practice does not require sending individual keystrokes or custom typing text to a WPMTest account. Avoid entering passwords, financial information, health information, or other sensitive material into custom exercises.</p>

      <h2>Advertising and cookies</h2>
      <p>WPMTest uses Google AdSense to display advertising. Google and its partners may use cookies or similar technologies for ad delivery, measurement, fraud prevention, and consent where applicable. Advertising is separate from the browser storage used for core typing progress.</p>

      <h2>Changes to this policy</h2>
      <p>This policy may be updated as WPMTest adds or changes features, analytics, advertising, or other services. Material changes should be reflected on this page.</p>
    </main>
  );
}
