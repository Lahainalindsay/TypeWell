import type { Metadata } from "next";
import "../src/styles.css";
import "../src/refresh.css";
import "../src/homepage-v2.css";
import "../src/homepage-v3.css";
import "../src/certificate.css";
import "../src/site-upgrade.css";
import "../src/stable-typing.css";
import { SITE_NAME, SITE_ORIGIN } from "../src/lib/seo/site";

const adsenseClient = "ca-pub-2169009102905035";

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
    type: "website"
  },
  twitter: {
    card: "summary"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
        <script defer src="/certificate-flow.js" />
        <script defer src="/site-upgrade.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
