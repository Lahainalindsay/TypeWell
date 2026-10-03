import type { Metadata } from "next";
import { absoluteUrl } from "../../src/lib/seo/site";

const title = "Privacy Policy | WPMTest";
const description = "Read how WPMTest handles locally stored typing progress, advertising, cookies, and information entered into typing exercises.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/privacy/") },
  openGraph: { title, description, url: absoluteUrl("/privacy/"), type: "website", images: [{ url: absoluteUrl("/og-default.svg"), width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-default.svg")] }
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <h1>Privacy Policy</h1><p>Updated October 3, 2026</p>
      <p>WPMTest is designed so core typing tests and practice can be used without creating an account. Typing progress, settings, and practice history used by the core trainer are stored locally in your browser on this device.</p>

      <h2>Local browser storage</h2>
      <p>Your browser stores progress and preferences so they remain available when you return. You can export a JSON backup, import a previously exported backup, or reset local progress from the Progress page.</p>

      <h2>Typing content</h2>
      <p>Core typing practice does not require sending individual keystrokes or custom typing text to a WPMTest account. Avoid entering passwords, financial information, health information, or other sensitive material into custom exercises.</p>

      <h2>Advertising and cookies</h2>
      <p>WPMTest integrates Google AdSense for advertising. When ads are served, third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google’s advertising cookies enable Google and its partners to serve ads based on those visits. Advertising storage is separate from local typing-progress storage.</p>

      <p>Manage or opt out of personalized Google advertising in <a href="https://myadcenter.google.com/">My Ad Center</a>. You can also manage participating vendors through <a href="https://optout.aboutads.info/">the Digital Advertising Alliance opt-out tool</a>. Opting out of personalization does not remove all ads. Browser cookie controls can restrict storage and may affect saved preferences.</p><p>Read <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from partner sites</a> and <a href="https://support.google.com/adsense/answer/1348695">Google’s advertising-cookie disclosure guidance</a>.</p><h2>Questions and reports</h2><p>Use the <a href="/contact/">contact page</a> for product and privacy feedback. The issue tracker is public; do not post personal information. Remove local progress through the Progress page or browser site-data controls.</p><h2>Changes to this policy</h2>
      <p>This policy may be updated as WPMTest adds or changes features, analytics, advertising, or other services. Material changes should be reflected on this page.</p>
    </main>
  );
}
