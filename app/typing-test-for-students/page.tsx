import type { Metadata } from "next";
import TypewellApp from "../../src/App";

const SITE_URL = "https://wpmtest.app";
const canonical = `${SITE_URL}/typing-test-for-students/`;

export const metadata: Metadata = {
  title: "Typing Test for Students - Free WPM & Accuracy Test | WPMTest",
  description: "Free typing test for students. Check WPM, accuracy and consistency for schoolwork, essays and computer assignments with no signup.",
  alternates: { canonical },
  openGraph: { title: "Typing Test for Students | WPMTest", description: "Measure student typing speed and accuracy with a free online WPM test.", url: canonical, type: "website" },
  twitter: { card: "summary", title: "Typing Test for Students | WPMTest", description: "Measure student typing speed and accuracy with a free online WPM test." },
  robots: { index: true, follow: true }
};

export default function StudentTypingTestPage() {
  const schemas = [
    { "@context":"https://schema.org", "@type":"WebApplication", name:"WPMTest Typing Test for Students", url:canonical, applicationCategory:"EducationalApplication", operatingSystem:"Any", audience:{"@type":"EducationalAudience", educationalRole:"student"}, offers:{"@type":"Offer", price:"0", priceCurrency:"USD"} },
    { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[
      {"@type":"ListItem",position:1,name:"Home",item:`${SITE_URL}/`},
      {"@type":"ListItem",position:2,name:"Typing Tests",item:`${SITE_URL}/typing-test/`},
      {"@type":"ListItem",position:3,name:"Typing Test for Students",item:canonical}
    ]}
  ];
  return <><main>
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span aria-hidden="true">›</span> <a href="/typing-test/">Typing Tests</a> <span aria-hidden="true">›</span> <span>Students</span></nav>
    <section className="seo-mode-intro"><p className="eyebrow">Free • no signup</p><h1>Typing Test for Students</h1><p>Check your typing speed, accuracy and consistency with a free student typing test. Use your result as a practical benchmark for essays, research, online assignments and everyday school computer work.</p></section>
    <TypewellApp initialPath="/3-minute-typing-test/" />
    <section className="seo-prerender" aria-label="Student typing test guide">
      <h2>Typing speed for real schoolwork</h2><p>Students type under different conditions than a short word-list challenge. Essays, notes and assignments require sustained attention, capitalization, punctuation and corrections. A timed test gives you a repeatable baseline you can compare after practice.</p><p>WPM is useful, but accuracy matters just as much. A faster score that creates more corrections may not save time when writing an actual assignment. Aim for controlled speed and clean text first, then build pace.</p>
      <h2>How students can improve their typing</h2><p>Practice regularly in short sessions and pay attention to recurring mistakes. Keep your hands relaxed, return to consistent finger positions, and practice difficult keys or combinations instead of repeatedly racing through the same test. Retest under similar conditions so your results are easier to compare.</p>
      <h2>Choose another student typing activity</h2><nav aria-label="Student typing activities"><a href="/typing-test-for-kids/">Typing Test for Kids</a><a href="/typing-practice/">Typing Practice</a><a href="/typing-test-with-punctuation/">Punctuation Typing Test</a><a href="/typing-certificate/">Typing Certificate</a></nav>
      <h2>Using results in class</h2><p>A typing score works best as a benchmark, not a judgment. Teachers and students can compare repeated attempts to identify improvement in speed, accuracy and consistency. Different devices, keyboards, passage difficulty and test lengths can affect results, so use comparable conditions when tracking progress.</p>
    </section>
  </main>{schemas.map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />)}</>;
}
