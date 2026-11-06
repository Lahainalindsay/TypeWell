import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../blog/hawaiian-language-revival/article.module.css";
import { revivalLanguages } from "../../../src/features/editorial/revivalLanguages";
import { revivalExpansions } from "../../../src/features/editorial/revivalExpansions";
import { absoluteUrl } from "../../../src/lib/seo/site";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return revivalLanguages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const language = revivalLanguages.find(item => item.slug === slug);
 if (!language) return { title: "Language not found | WPMTest", robots: { index: false } };
 const title = `${language.name}: History, Revival and Typing Guide | WPMTest`;
 const description = `Explore the history of ${language.name}, community language revitalization, its writing system and ways to practice responsibly.`;
 const url = absoluteUrl(`/language-revival/${slug}/`);
 return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "article" } };
}
export default async function RevivalArticle({ params }: Props) {
 const { slug } = await params;
 const language = revivalLanguages.find(item => item.slug === slug);
 if (!language) notFound();
 const expansion = revivalExpansions[slug];
 const canonical = absoluteUrl(`/language-revival/${slug}/`);
 const sections = [
  { heading: "How did the language come under pressure?", text: language.history },
  { heading: "The language is still being used and reclaimed", text: language.today },
  { heading: "What makes writing and typing different?", text: language.writing }
 ];
 const schema = { "@context": "https://schema.org", "@type": "Article", headline: `${language.name}: History, Revival and Typing Guide`, description: language.introduction, mainEntityOfPage: canonical, datePublished: "2026-11-06", dateModified: "2026-11-06", author: { "@type": "Organization", name: "WPMTest" }, publisher: { "@type": "Organization", name: "WPMTest", url: absoluteUrl("/") } };
 return <main className={styles.page} lang="en">
 <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> › <Link href="/language-revival/">Language Revival</Link> › {language.name}</nav>
 <article><header className={styles.header}><p className={styles.eyebrow}>LANGUAGE REVIVAL · {language.region}</p>
 <h1>{language.name}: A Language Worth Using, Not Just Remembering</h1>
 <p className={styles.subtitle}>{language.introduction}</p>
 <p className={styles.date}>November 6, 2026 · History, community and digital writing</p></header>
 <div className={styles.body}>
 <p className={styles.lead}>{expansion?.opening ?? "A language lives through the people who use it. Its history deserves more than a label saying endangered."}</p>
 <p>Suppression, language shift and revitalization take different forms. Here is what makes {language.name} distinctive—and what an online typing tool can and cannot contribute.</p>
 {expansion && <section className={styles.section}><span className={styles.sectionNumber}>HISTORY · A CHANGING TIMELINE</span><h2>The turning points that shaped {language.name}</h2><p>Language suppression rarely happens in a single moment. These milestones help explain the institutions, people and movements behind the story.</p><div className={styles.resources}>{expansion.timeline.map(([year,detail])=><div className={styles.resource} key={year}><p className={styles.eyebrow}>{year}</p><p>{detail}</p></div>)}</div></section>}
 {sections.map((section,index)=><section className={styles.section} key={section.heading}>
 <span className={styles.sectionNumber}>0{index+1}</span><h2>{section.heading}</h2><p>{section.text}</p>{expansion && index===0 && <><h3>How communities pushed back</h3><p>{expansion.turningPoint}</p></>}{expansion && index===1 && <><h3>What still needs to change?</h3><p>{expansion.challenges}</p></>}{expansion && index===2 && <><h3>What good digital practice requires</h3><p>{expansion.digital}</p></>}</section>)}
 <section className={styles.section}><span className={styles.sectionNumber}>04</span><h2>Where to learn and practice</h2>
 {language.testPath ? <aside className={styles.cta}><p className={styles.eyebrow}>WPMTest · Free typing practice</p><h2>Try the {language.name} typing test</h2><p>Practice written characters with speed and accuracy feedback. This is not a language proficiency assessment.</p><Link className={styles.button} href={language.testPath}>Start the typing test →</Link></aside>
 : <p>We are preparing a dedicated typing test, but it is not live yet. A responsible test needs verified passages in the language or variety, the right keyboard input method and accurate scoring. We will not pass off English filler or unreviewed translations as genuine practice.</p>}
 {language.glossika && <div className={styles.resource}><p className={styles.eyebrow}>External learning resource</p><h3>Glossika: practice beyond typing</h3><p>Glossika currently lists {language.name} in its course catalogue. It emphasizes sentence-based language practice, which serves a different purpose from typing-speed measurement. Check course availability and terms on Glossika.</p><a href="https://ai.glossika.com/home" rel="noopener noreferrer">Explore the Glossika course catalogue ↗</a><p><small>This is a normal external link, not an affiliate-tracking link. If affiliate links are introduced, WPMTest will disclose commissions clearly.</small></p></div>}
 <h2>Sources and further reading</h2><div className={styles.sources}><ul>{[...language.sources,...(expansion?.reading ?? [])].map(source=><li key={source.url}><a href={source.url} rel="noopener noreferrer">{"name" in source ? source.name : source.label} ↗</a></li>)}</ul></div>
 <p><strong>Historical context:</strong> {expansion?.caution} This article is not a substitute for community-led language education. Terminology, regional varieties and speaker counts deserve careful treatment. <Link href="/contact/">Suggest a correction or a community resource.</Link></p>
 </section>
 <aside className={styles.finalCta}><h2>Explore the other languages</h2><p>Read their histories, learn about writing systems and see which typing tests are ready.</p><Link className={styles.button} href="/language-revival/">Back to the Language Revival collection →</Link></aside>
 </div></article>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 </main>;
}
