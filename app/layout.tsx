import type { Metadata } from "next";
import "../src/styles.css";
import "../src/refresh.css";
import "../src/homepage-v2.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wpmtest.app"),
  applicationName: "Typewell",
  icons: {
    icon: "/favicon.svg"
  },
  openGraph: {
    siteName: "Typewell",
    type: "website"
  },
  twitter: {
    card: "summary"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
