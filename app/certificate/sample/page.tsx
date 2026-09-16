import type { Metadata } from "next";
import { absoluteUrl } from "../../../src/lib/seo/site";

const canonical = absoluteUrl("/certificate/sample/");

export const metadata: Metadata = {
  title: "Sample Typing Certificate | WPMTest",
  description: "Preview the WPMTest typing certificate awarded after a completed typing test, including WPM, accuracy, test type and completion date.",
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Sample Typing Certificate | WPMTest",
    description: "See the WPMTest typing certificate before taking a test.",
    url: canonical,
    type: "website"
  }
};

export default function SampleCertificatePage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Typing Certificate", item: absoluteUrl("/typing-certificate/") },
      { "@type": "ListItem", position: 3, name: "Sample Certificate", item: canonical }
    ]
  };

  return (
    <>
      <main className="tw-standalone">
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span>{" "}
          <a href="/typing-certificate/">Typing Certificate</a> <span aria-hidden="true">›</span>{" "}
          <span>Sample</span>
        </nav>

        <p className="tw-kicker">Preview before you test</p>
        <h1>Sample WPMTest Typing Certificate</h1>
        <p className="lead">
          This is the style of certificate users can generate after completing a qualifying WPMTest typing test.
          The name and scores below are examples only.
        </p>

        <article className="tw-certificate" aria-label="Sample WPMTest typing certificate">
          <div className="tw-cert-inner">
            <div className="tw-corner tl"></div><div className="tw-corner tr"></div>
            <div className="tw-corner bl"></div><div className="tw-corner br"></div>

            <header className="tw-cert-brand">
              <div><strong>WPM<span>Test</span></strong><small>PRACTICE TODAY · GO FURTHER TOMORROW</small></div>
              <div className="tw-medallion"><span>⌨</span></div>
              <small>TYPING SKILLS<br />OPEN DOORS</small>
            </header>

            <div className="tw-cert-title">
              <span>CERTIFICATE OF</span>
              <h2>TYPING PROFICIENCY</h2>
              <p>THIS CERTIFIES THAT</p>
            </div>

            <div className="tw-cert-name">Sample Typist</div>
            <p className="tw-cert-copy">
              has demonstrated typing proficiency by completing a typing test on <b>WPM<span>Test</span></b><br />
              and has achieved the following results:
            </p>

            <div className="tw-cert-stats">
              <div><b>62</b><span>WORDS PER MINUTE<br />(WPM)</span></div>
              <div><b>97%</b><span>ACCURACY</span></div>
              <div><b>5 Minute Typing Test</b><span>TEST TAKEN</span></div>
              <div><b>Sample</b><span>DATE COMPLETED</span></div>
            </div>

            <div className="tw-cert-motto"><i></i><span>PRACTICE BUILDS PROGRESS</span><i></i></div>

            <footer className="tw-cert-footer">
              <div className="tw-signature">WPMTest Team<small>THE WPMTEST TEAM</small></div>
              <div className="tw-gold-seal"><b>★</b><span>SAMPLE<br />CERTIFICATE</span></div>
              <div className="tw-signature right">Keep Typing<small>BRIGHTER TOMORROWS</small></div>
            </footer>

            <small className="tw-cert-disclaimer">
              SAMPLE — NOT A VERIFIED TEST RESULT. WPMTest certificates are site-generated records of online typing-test results and are not accredited professional certifications.
            </small>
          </div>
        </article>

        <section style={{ marginTop: "2rem" }}>
          <h2>Earn your own typing certificate</h2>
          <p>
            Complete a timed WPMTest typing test to generate your certificate with your own name, WPM, accuracy,
            test type and completion date.
          </p>
          <p>
            <a href="/5-minute-typing-test/"><strong>Take a 5 minute typing test →</strong></a>{" "}
            · <a href="/typing-certificate/">Typing certificate details</a>
          </p>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
