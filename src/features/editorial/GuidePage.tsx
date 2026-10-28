import type { Metadata } from "next";
import { absoluteUrl } from "../../lib/seo/site";
import { guides } from "./guides";
import { ErrorCheck } from "./ErrorCheck";
import { ArticleVisual, PracticeCard, type ArticleTopic } from "./ArticleVisual";
import styles from "./editorial.module.css";
export function guideMetadata(slug: string): Metadata {
 const guide = guides.find(item => item.slug === slug)!;
 const url = absoluteUrl(`/blog/${slug}/`);
 const image = absoluteUrl("/images/typing-editorial-desk.webp");
 return { title: `${guide.title} | WPMTest`, description: guide.description, alternates: { canonical:url }, robots: {index:true,follow:true}, openGraph: { title:guide.title, description:guide.description, type:"article", url, images:[image] }, twitter: {card:"summary_large_image",title:guide.title,description:guide.description,images:[image]} };
}
export function GuidePage({slug}: {slug:string}) {
 const guide=guides.find(item => item.slug===slug)!;
 const canonical=absoluteUrl(`/blog/${slug}/`);
 const schema={"@context":"https://schema.org","@type":"Article",headline:guide.title,description:guide.description,mainEntityOfPage:canonical,author:{"@type":"Organization",name:"WPMTest",url:absoluteUrl("/about/")},publisher:{"@type":"Organization",name:"WPMTest",url:absoluteUrl("/")},datePublished:"2026-10-03",dateModified:"2026-10-28",image:absoluteUrl("/images/typing-editorial-desk.webp")};
 return <main className={styles.page}>
  <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Articles</a> › <span>{guide.title}</span></nav>
  <article>
   <header className={styles.header}><p className="eyebrow">Practical keyboard skills</p><h1>{guide.title}</h1><p>{guide.description}</p><p className={styles.note}>Practical guide · Updated October 28, 2026 · By the WPMTest team.</p></header>
   <ArticleVisual topic={slug as ArticleTopic} />
   <div className={styles.body}>
    <nav className={styles.toc} aria-label="In this guide"><strong>In this guide</strong>{guide.sections.map((section,index) => <a key={section.heading} href={`#section-${index}`}>{String(index+1).padStart(2,"0")} · {section.heading}</a>)}</nav>
    {guide.sections.map((section,index) => <section key={section.heading} id={`section-${index}`}><span className={styles.number} aria-hidden="true">{String(index+1).padStart(2,"0")}</span><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
    {slug === "avoid-data-entry-errors" && <ErrorCheck />}
    <section aria-labelledby="guide-method"><h2 id="guide-method">How to use this guide</h2><p>The worked examples use fictional records and WPMTest’s scoring rules. Compare the same duration, passage format and input method when tracking progress. For an employment assessment, use the provider and requirements in the job instructions.</p><p><a href="/about/">About WPMTest and our scoring approach</a> · <a href="/blog/wpm-vs-kph/">WPM and KPH formulas</a> · <a href="/blog/data-entry-accuracy/">Field and record accuracy explained</a></p></section>
    <PracticeCard href={guide.practice} label={guide.practiceLabel} />
   </div>
  </article><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
 </main>;
}
