import type { Metadata } from "next";
import WPMTestApp from "../../src/App";
import { customerServiceAssessment } from "../../src/features/careers/assessments/customer-service";
import { absoluteUrl } from "../../src/lib/seo/site";

const socialImage = absoluteUrl("/og-default.svg");
const canonical = absoluteUrl(customerServiceAssessment.publicPath);

export const metadata: Metadata = {
  title: "Customer Service Typing Test & Practice | WPMTest",
  description: "Practice the sustained typing speed and accuracy live-chat and support roles require. Free 5-minute practice test, instant WPM and accuracy, no signup.",
  alternates: { canonical },
  openGraph: {
    title: "Customer Service Typing Test | WPMTest",
    description: "Free practice test for live-chat, help-desk and customer-support typing speed and accuracy.",
    url: canonical, type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "WPMTest Customer Service Typing Test" }]
  },
  twitter: {
    card: "summary_large_image", title: "Customer Service Typing Test | WPMTest",
    description: "Free practice test for live-chat, help-desk and customer-support typing speed and accuracy.",
    images: [socialImage]
  },
  robots: { index: true, follow: true }
};

export default function CustomerServiceTypingTestPage() {
  const schemas = [
    {
      "@context": "https://schema.org", "@type": "WebApplication",
      name: "WPMTest Customer Service Typing Test", url: canonical,
      applicationCategory: "EducationalApplication", operatingSystem: "Any",
      isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Typing Test for Employment", item: absoluteUrl("/typing-test-for-employment/") },
        { "@type": "ListItem", position: 3, name: "Customer Service Typing Test", item: canonical }
      ]
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What WPM do customer service and live chat roles usually require?", acceptedAnswer: { "@type": "Answer", text: "Requirements vary by employer. Follow the specific job posting's duration and accuracy threshold, and practice sustained prose typing rather than a short burst." } },
        { "@type": "Question", name: "Why is this different from a general typing test?", acceptedAnswer: { "@type": "Answer", text: "This uses a 5-minute general prose test to practice sustained speed and accuracy. Support work also requires reading, composing replies and switching conversations, which this baseline does not measure." } },
        { "@type": "Question", name: "Does this test measure chat or ticket software skills?", acceptedAnswer: { "@type": "Answer", text: "No. It measures prose typing speed and accuracy only, as a general practice baseline. It does not simulate multi-chat queues, macros, or specific support software." } }
      ]
    }
  ];

  return <>
    <main>
      <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> <span aria-hidden="true">›</span>{" "}
        <a href="/typing-test-for-employment/">Employment Tests</a> <span aria-hidden="true">›</span>{" "}
        <span>Customer Service</span>
      </nav>
      <section className="seo-mode-intro">
        <p className="eyebrow">Free customer service typing practice</p>
        <h1>Customer Service Typing Test</h1>
        <p>Practice the sustained typing speed and accuracy that live-chat, help-desk and customer-support roles depend on. Get an instant WPM and accuracy benchmark before a job application or employer assessment.</p>
        <p><strong>Designed for:</strong> {customerServiceAssessment.audience.join(" · ")}</p>
      </section>
      <WPMTestApp initialPath="/customer-service-typing-test/" embedded />
      <section className="seo-prerender" aria-label="Customer service typing test guide">
        <h2>Why customer service typing is different</h2>
        <p>A customer-support reply is rarely typed in one uninterrupted burst. You read a message, decide on tone, sometimes check a policy or order, then type a clear, professional response — often while another conversation is waiting. Practicing over several minutes helps you observe whether your accuracy holds as you continue typing.</p>
        <p>This practice test uses a 5-minute sustained general prose sample for that reason. If a posting also mentions a specific queue or multi-chat requirement, that is a separate skill this typing practice does not simulate. The test measures copying speed and accuracy, not your ability to compose a support reply.</p>
        <h2>What employers may look for</h2>
        <p>Read the employer&rsquo;s requirements for typing speed, accuracy under a timer, and clear, professional writing. A written communication or tone assessment may be separate from typing speed. A good practice score does not guarantee that you meet a particular employer&rsquo;s scoring rules.</p>
        <h2>How to practice</h2>
        <p>Focus on accuracy first — in written support work, a typo in a sent message is harder to walk back than a slow sentence. Practice the 5-minute test at a pace you can sustain cleanly, then gradually increase speed once accuracy holds above roughly 97%, a practice target rather than an employer standard. If the role also involves order numbers, account IDs, or structured information, practice that separately with the <a href="/data-entry-typing-test/">Data Entry Typing Test</a>.</p>
        <p><a href="/blog/prepare-employment-typing-test/"><strong>Use the employment-test preparation checklist →</strong></a></p>
        <h2>Customer service typing test FAQ</h2>
        <div className="seo-faq">
          <article><h3>What WPM do customer service and live chat roles usually require?</h3><p>Requirements vary by employer. Follow the specific posting&rsquo;s duration and accuracy threshold, and practice sustained prose typing rather than a short burst.</p></article>
          <article><h3>Why is this different from a general typing test?</h3><p>This uses a 5-minute general prose test to practice sustained speed and accuracy. Support work also requires reading, composing replies and switching conversations, which this baseline does not measure.</p></article>
          <article><h3>Does this test measure chat or ticket software skills?</h3><p>No — it measures general prose typing speed and accuracy as a practice baseline, not specific support-software or multi-chat handling.</p></article>
        </div>
        <h2>Practice job-specific typing skills</h2>
        <nav aria-label="Related typing tools">
          <a href="/typing-test-for-employment/">Typing Test for Employment</a>
          <a href="/data-entry-typing-test/">Data Entry Typing Test</a>
          <a href="/typing-test-with-punctuation/">Punctuation Typing Test</a>
          <a href="/average-typing-speed/">Average Typing Speed</a>
          <a href="/professionals/">Professional Typing Tests</a>
        </nav>
        <h2>About WPMTest results and certificates</h2>
        <p>WPMTest results and site-generated certificates are self-administered practice records, not accredited professional certifications and not proof that a particular employer has administered or accepted a test. If an employer specifies a required test provider, duration or scoring method, follow that employer&rsquo;s instructions.</p>
      </section>
    </main>
    {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
  </>;
}
