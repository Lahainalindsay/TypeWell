import type { Metadata } from "next";
import { Suspense } from "react";
import { CertificateVerifyResult } from "../../../src/components/CertificateVerifyResult";
import { absoluteUrl } from "../../../src/lib/seo/site";

const canonical = absoluteUrl("/certificate/verify/");
const socialImage = absoluteUrl("/og-default.svg");
const description = "Check a WPMTest typing certificate link's public checksum. This checks link consistency, not authenticity or identity. Free, no signup required.";

export const metadata: Metadata = {
  title: "Verify a WPMTest Certificate | WPMTest", description,
  alternates: { canonical },
  openGraph: {
    title: "Verify a WPMTest Certificate", description,
    url: canonical, type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest certificate verification" }]
  },
  twitter: { card: "summary_large_image", title: "Verify a WPMTest Certificate", description, images: [socialImage] },
  robots: { index: true, follow: true },
  referrer: "no-referrer"
};

const faqs = [
  { question: "How does WPMTest certificate verification work?", answer: "Each verification link carries the name, test type, date, measured scores and a public checksum. This page recalculates the checksum to check link consistency. Anyone can recalculate it, so a match does not prove the result was issued by WPMTest or has never been edited." },
  { question: "Does verification prove who completed the test?", answer: "No. It does not verify identity, test completion or certificate authenticity. This is a self-administered test record, not a proctored or accredited certification." },
  { question: "I only have a Verification ID, not a link — can I check it?", answer: "Not on its own. There is no central result database to look up an ID. Ask the certificate holder for the full link generated with the Copy Verification Link button." }
];

export default function CertificateVerifyPage() {
  const schemas = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: "WPMTest Certificate Verification", url: canonical, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", isAccessibleForFree: true },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Certificate", item: absoluteUrl("/typing-certificate/") },
      { "@type": "ListItem", position: 3, name: "Verify", item: canonical }
    ] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }
  ];
  return <>
    <main className="seo-prerender">
      <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> <span aria-hidden="true">›</span>{" "}
        <a href="/typing-certificate/">Certificate</a> <span aria-hidden="true">›</span>{" "}<span>Verify</span>
      </nav>
      <p className="eyebrow">Certificate verification</p>
      <h1>Verify a WPMTest Certificate</h1>
      <p>Open the full verification link from a WPMTest typing certificate to check whether its result fields match its public checksum.</p>
      <Suspense fallback={<div className="cert-verify-card cert-verify-empty"><p>Checking link…</p></div>}>
        <CertificateVerifyResult />
      </Suspense>
      <h2>How this works</h2>
      <p>WPMTest is a free tool with no account system and no central database of typing results. Each certificate&rsquo;s verification link carries the result itself — name, test type, date, time taken and the scores measured by that test — along with a checksum. Opening the link recalculates that checksum from the values in the link and checks whether they match.</p>
      <p>This detects accidental changes when the checksum is left unchanged. The checksum algorithm and its fixed salt are public, so anyone can change the data and generate a matching checksum. A match <strong>does not prove that WPMTest issued the result or that the data has never been edited</strong>.</p>
      <p>It also does not confirm who typed the test, whether a test was completed, or whether an employer has accepted the result. Use it as a self-reported test record; follow an employer&rsquo;s instructions if they require a supervised assessment.</p>
      <h2>Checking a certificate you received</h2>
      <p>Ask the certificate holder to use the &ldquo;Copy Verification Link&rdquo; button when they generate their certificate, and send you that link directly. A Verification ID printed on a paper copy cannot be checked on its own because there is no server-side record to look up.</p>
      <p>The full link includes the holder&rsquo;s name and test results. Share it only with intended recipients. WPMTest does not maintain a result database, but a shared URL may appear in browser history or hosting request logs.</p>
      <h2>Verification FAQ</h2>
      <div className="seo-faq">{faqs.map(faq => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div>
      <p><a href="/certificate/sample/">See a sample certificate</a> · <a href="/typing-certificate/">Learn about WPMTest certificates</a></p>
    </main>
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
  </>;
}
