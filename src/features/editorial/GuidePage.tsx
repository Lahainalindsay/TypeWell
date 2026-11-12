import type { Metadata } from "next";
import { absoluteUrl } from "../../lib/seo/site";
import { guides } from "./guides";
import { ErrorCheck } from "./ErrorCheck";
import { ArticleVisual, AuthorByline, GuideTakeaways, PracticeCard, RelatedGuides, type ArticleTopic } from "./ArticleVisual";
import { author, breadcrumbList, publisher } from "../../lib/seo/structured";
import styles from "./editorial.module.css";
const dateModified = "2026-11-12";
type GuideTopic = Exclude<ArticleTopic, "best-typing-test-websites" | "data-entry-typing-test-for-employment">;
const introductions: Record<GuideTopic, string> = {
 "wpm-vs-kph": "Use WPM for prose and KPH for numeric entry. WPMTest divides correct prose characters by five and by elapsed minutes, while KPH scales the numeric characters entered to an hourly rate.",
 "data-entry-accuracy": "Data-entry field accuracy counts exact matches, and complete-record accuracy counts rows with every field correct. One wrong value in four six-field records leaves you with 95.8% field accuracy and 75% record accuracy.",
 "avoid-data-entry-errors": "Check identifiers for swapped digits and leading zeroes, then compare amounts on both sides of the decimal. WPMTest’s record drills count an entry as correct only when it exactly matches the source.",
 "prepare-employment-typing-test": "Start with the job posting’s test duration, input format, speed metric and accuracy requirement. Rehearse on the same kind of device and use the assessment provider specified by the employer."
};
const relatedTopics: Record<GuideTopic, ArticleTopic[]> = {
 "wpm-vs-kph": ["data-entry-accuracy", "prepare-employment-typing-test"],
 "data-entry-accuracy": ["wpm-vs-kph", "avoid-data-entry-errors"],
 "avoid-data-entry-errors": ["data-entry-accuracy", "data-entry-typing-test-for-employment"],
 "prepare-employment-typing-test": ["data-entry-typing-test-for-employment", "best-typing-test-websites"]
};

export function guideMetadata(slug: GuideTopic): Metadata {
 const guide = guides.find(item => item.slug === slug)!;
 const url = absoluteUrl(`/blog/${slug}/`);
 const image = absoluteUrl(`/images/guides/${slug}.jpg`);
 return { title: `${guide.title} | WPMTest`, description: guide.description, alternates: { canonical:url }, robots: {index:true,follow:true}, openGraph: { title:guide.title, description:guide.description, type:"article", url, images:[{url:image,width:1200,height:630,alt:guide.title}] }, twitter: {card:"summary_large_image",title:guide.title,description:guide.description,images:[image]} };
}
export function GuidePage({slug}: {slug:GuideTopic}) {
 const guide=guides.find(item => item.slug===slug)!;
 const canonical=absoluteUrl(`/blog/${slug}/`);
 const schema = {
  "@context": "https://schema.org",
  "@graph": [
   { "@type": "Article", headline: guide.title, description: guide.description,
     mainEntityOfPage: canonical, author, publisher, datePublished: "2026-10-03", dateModified,
     image: absoluteUrl(`/images/guides/${slug}.jpg`) },
   breadcrumbList([{ name: "Home", url: "/" }, { name: "Articles", url: "/blog/" }, { name: guide.title, url: `/blog/${slug}/` }])
  ]
 };
 return <main className={styles.page}>
  <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Articles</a> › <span>{guide.title}</span></nav>
  <article>
   <header className={styles.header}><p className="eyebrow">Practical keyboard skills</p><h1>{guide.title}</h1><p>{introductions[slug]}</p><AuthorByline date={dateModified} /></header>
   <ArticleVisual topic={slug} />
   <div className={styles.body}>
    <nav className={styles.toc} aria-label="In this guide"><strong>In this guide</strong>{guide.sections.map((section,index) => <a key={section.heading} href={`#section-${index}`}>{String(index+1).padStart(2,"0")} · {section.heading}</a>)}</nav>
    {guide.sections.map((section,index) => <section key={section.heading} id={`section-${index}`}><span className={styles.number} aria-hidden="true">{String(index+1).padStart(2,"0")}</span><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
    {slug === "wpm-vs-kph" && <section aria-labelledby="sample-result">
     <h2 id="sample-result">Read a WPMTest result</h2>
     <p>This demonstration run shows where WPMTest puts speed, accuracy, consistency and errors. The result records 47.8 WPM and 100% accuracy. Use the detailed breakdown when you want to see which keys to practice next.</p>
     <figure className={styles.figure}>
      <img src="/images/guides/wpmtest-result.webp"
       srcSet="/images/guides/wpmtest-result-600.webp 600w, /images/guides/wpmtest-result.webp 760w"
       sizes="(max-width: 800px) 100vw, 760px" width={760} height={736}
       alt="Actual WPMTest results screen from a demonstration run, showing 47.8 WPM, 100% accuracy, 79.3% consistency and zero errors"
       loading="lazy" decoding="async" />
      <figcaption>Screenshot from a local demonstration run. These figures describe this attempt only.</figcaption>
     </figure>
    </section>}
    {slug === "avoid-data-entry-errors" && <ErrorCheck />}
    <GuideTakeaways topic={slug} />
    <RelatedGuides topics={relatedTopics[slug]} />
    <PracticeCard href={guide.practice} label={guide.practiceLabel} />
   </div>
  </article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
 </main>;
}
