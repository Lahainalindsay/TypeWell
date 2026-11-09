import type {Metadata} from 'next';
import {languages,articlePath,practicePath,glossikaSource} from '../../src/features/revival/content';
import copy from '../../src/features/revival/overview.json';
import GlossikaCard from '../../src/features/partners/GlossikaCard';
import {absoluteUrl} from '../../src/lib/seo/site';
import styles from '../blog/hawaiian-language-revival/article.module.css';
const url=absoluteUrl('/language-revival/');
const description='Eleven language pathways, stories of resilience, community-led revival, and practical ways to support living languages through written practice.';
export const metadata:Metadata={title:copy.title+' | WPMTest',description,alternates:{canonical:url},openGraph:{title:copy.title,description,url,type:'website',images:[absoluteUrl('/images/revival/hawaiian.webp')]},twitter:{card:'summary_large_image',title:copy.title,description,images:[absoluteUrl('/images/revival/hawaiian.webp')]}};
function Prose({section}:{section:{heading:string;paragraphs:string[]}}){return <section className={styles.section}><h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}</section>;}
export default function Page(){return <main className={styles.page}>
 <header className={styles.header}><p className={styles.eyebrow}>The Language Revival collection</p><h1>{copy.title}</h1><p className={styles.subtitle}>{copy.subtitle}</p></header>
 <div className={styles.body}><Prose section={copy.opening}/>{copy.beforeDirectory.map(s=><Prose key={s.heading} section={s}/>)}<Prose section={copy.directory}/></div>
 <div className="seo-card-grid" id="directory">{languages.map(l=>{const entry=copy.languages[l.id as keyof typeof copy.languages];return <article key={l.id} className={styles.resource}><p className={styles.characters} dir={l.id==='sorani-kurdish'?'rtl':undefined}>{l.native}</p><h2><a href={articlePath(l.id)}>{entry.heading}</a></h2><p className={styles.eyebrow}>{entry.subtitle}</p>{entry.paragraphs.map(p=><p key={p}>{p}</p>)}<p><a href={articlePath(l.id)}>Read the history and timeline →</a></p><p><a href={practicePath(l.id)}>{entry.practice}</a></p></article>;})}</div>
 <div className={styles.body}><Prose section={copy.participation}/><section className={styles.section}><h2>{copy.support.heading}</h2>{copy.support.paragraphs.map(p=><p key={p}>{p}</p>)}<ol>{copy.support.items.map(p=><li key={p}><p>{p}</p></li>)}</ol><p>{copy.support.closing}</p></section>
 <section className={styles.cta}><h2>{copy.resources.heading}</h2>{copy.resources.paragraphs.map(p=><p key={p}>{p}</p>)}<p><a href={glossikaSource}>Review Glossika’s course-access information →</a></p></section><GlossikaCard/>
 <section className={styles.section}><h2>{copy.commitment.heading}</h2>{copy.commitment.paragraphs.map(p=><p key={p}>{p}</p>)}<ul>{copy.commitment.items.map(p=><li key={p}>{p}</li>)}</ul>{copy.commitment.closing.map(p=><p key={p}>{p}</p>)}</section><Prose section={copy.future}/>
 <aside className={styles.finalCta}><h2>{copy.title}</h2><p>{copy.closing}</p><p><a className={styles.button} href="#directory">Explore the 11 language pathways →</a></p><p><a href="/contact/">Send a correction or offer language review →</a></p><p><a href="/blog/">Read more WPMTest articles →</a></p></aside></div>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'CollectionPage',name:copy.title,description,url,dateModified:'2026-11-09',hasPart:languages.map(l=>({'@type':'Article',name:copy.languages[l.id as keyof typeof copy.languages].heading,url:absoluteUrl(articlePath(l.id))}))})}}/>
 </main>;}
