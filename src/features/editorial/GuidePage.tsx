import type { Metadata } from "next";
import { absoluteUrl } from "../../lib/seo/site";
import { guides } from "./guides";
import { ErrorCheck } from "./ErrorCheck";
export function guideMetadata(slug: string): Metadata {
 const guide = guides.find(item => item.slug === slug)!;
 const url = absoluteUrl(`/blog/${slug}/`);
 return { title: `${guide.title} | WPMTest`, description: guide.description, alternates: { canonical:url }, openGraph: { title:guide.title, description:guide.description, type:"article", url, images:[absoluteUrl("/og-default.svg")] } };
}
export function GuidePage({slug}: {slug:string}) {
 const guide=guides.find(item => item.slug===slug)!;
 const canonical=absoluteUrl(`/blog/${slug}/`);
 const schema={"@context":"https://schema.org","@type":"Article",headline:guide.title,description:guide.description,mainEntityOfPage:canonical,author:{"@type":"Person",name:"Lindsay Johnson",url:absoluteUrl("/about/")},publisher:{"@type":"Organization",name:"WPMTest",url:absoluteUrl("/")},datePublished:"2026-10-03",dateModified:"2026-10-03"};
 return <main className="seo-prerender editorial-guide"><nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Articles</a> › <span>{guide.title}</span></nav><p className="eyebrow">Practical keyboard skills</p><h1>{guide.title}</h1><p>{guide.description}</p><p className="hint">By <a href="/about/">Lindsay Johnson</a> · October 3, 2026 · Fictional examples; formulas describe WPMTest.</p><nav aria-label="In this guide">{guide.sections.map((section,index) => <a key={section.heading} href={`#section-${index}`}>{section.heading}</a>)}</nav>{guide.sections.map((section,index) => <section key={section.heading} id={`section-${index}`}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}{slug === "avoid-data-entry-errors" && <ErrorCheck />}<section><h2>Put this into practice</h2><p><a className="button primary" href={guide.practice}>{guide.practiceLabel} →</a></p><p><a href="/blog/">Browse related guides</a> or <a href="/contact/">report a content or calculation issue</a>.</p></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} /></main>;
}
