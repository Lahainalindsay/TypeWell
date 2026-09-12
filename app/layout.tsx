import type { Metadata } from "next";
import "../src/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://typewell.app"),
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
