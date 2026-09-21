import type { Metadata } from "next";
import Script from "next/script";
import "../src/styles.css";
import "../src/refresh.css";
import "../src/homepage-v2.css";
import "../src/homepage-v3.css";
import "../src/certificate.css";
import "../src/site-upgrade.css";
import "../src/stable-typing.css";
import { SITE_NAME, SITE_ORIGIN } from "../src/lib/seo/site";

const adsenseClient = "ca-pub-2169009102905035";
const socialImage = "/og-default.svg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  other: {
    "google-adsense-account": adsenseClient
  },
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest free typing test" }]
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage]
  }
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_ORIGIN,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires a modern web browser",
  isAccessibleForFree: true,
  description: "Free online typing tests, typing practice, WPM and accuracy tools, data-entry practice, and job-specific typing assessments."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <script defer src="/certificate-flow.js" />
        <script defer src="/site-upgrade.js" />
      </head>
      <body>{children}</body>
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </html>
  );
}
