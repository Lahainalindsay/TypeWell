import type {Metadata} from 'next';
import {languages,articlePath,practicePath,glossikaSource} from '../../src/features/revival/content';
import copy from '../../src/features/revival/overview.json';
import GlossikaCard from '../../src/features/partners/GlossikaCard';
import photos from '../../src/features/revival/photos.json';
import {Photo} from '../../src/features/revival/Photo';
import {absoluteUrl} from '../../src/lib/seo/site';
import styles from '../blog/hawaiian-language-revival/article.module.css';
const url=absoluteUrl('/language-revival/');
const description='Eleven language pathways, stories of resilience, community-led revival, and practical ways to support living languages through written practice.';
export const metadata:Metadata={title:copy.title+' | WPMTest',description,alternates:{canonical:url},openGraph:{title:copy.title,description,url,type:'website',images:[absoluteUrl('/images/revival/hawaiian.webp')]},twitter:{card:'summary_large_image',title:copy.title,description,images:[absoluteUrl('/images/revival/hawaiian.webp')]}};
function InlineCopy({text}:{text:string}){return <>{text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part,index)=>part.startsWith('**')?<strong key={index}>{part.slice(2,-2)}</strong>:part.startsWith('*')?<em key={index}>{part.slice(1,-1)}</em>:part)}</>;}
function Prose({section}:{section:{heading:string;paragraphs:string[]}}){return <section className={styles.section}>{section.heading&&<h2>{section.heading}</h2>}{section.paragraphs.map(p=><p key={p}><InlineCopy text={p}/></p>)}</section>;}
export default function Page(){return <main className={styles.page}>
 <header className={styles.header}><p className={styles.eyebrow}>{copy.eyebrow}</p><h1>{copy.title}</h1><p className={styles.subtitle}>{copy.subtitle}</p></header>
 <div className={styles.collectionMosaic}>{(['hawaiian','welsh','catalan'] as const).map(id=><Photo key={id} photo={photos[id]} sizes="(max-width:600px) 100vw, 400px"/>)}</div>
 <div className={styles.body}>{copy.sections.map((section,index)=><Prose key={section.heading||index} section={section}/>)}</div>
 <section className={styles.languageDirectory} id="directory" aria-label="Eleven language pathways">{languages.map(l=>{const entry=copy.languages[l.id as keyof typeof copy.languages];const photo=photos[l.id as keyof typeof photos];return <article key={l.id} className={styles.directoryCard}><Photo photo={photo} sizes="(max-width:600px) 100vw, 500px"/><p className={styles.eyebrow}>{l.region}</p><h2><a href={articlePath(l.id)}>{entry.heading}</a></h2><p>{entry.paragraphs[0]}</p><details><summary>About this language pathway</summary>{entry.paragraphs.slice(1).map(p=><p key={p}>{p}</p>)}</details><div className={styles.directoryActions}><a href={articlePath(l.id)}>Read the history →</a><a href={practicePath(l.id)}>{entry.practice}</a></div></article>;})}</section>
 <div className={styles.body}><section className={styles.cta}><h2>{copy.resources.heading}</h2>{copy.resources.paragraphs.map(p=><p key={p}>{p}</p>)}<p><a href={glossikaSource}>Review Glossika’s course-access information →</a></p></section><GlossikaCard/>
 <aside className={styles.finalCta}><h2>Explore the 11 language pathways</h2><p><a className={styles.button} href="#directory">Discover the histories and practice pathways →</a></p><p><a href="/contact/">Send a correction or offer language review →</a></p><p><a href="/blog/">Read more WPMTest articles →</a></p></aside></div>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'CollectionPage',name:copy.title,description,url,dateModified:'2026-11-10',hasPart:languages.map(l=>({'@type':'Article',name:copy.languages[l.id as keyof typeof copy.languages].heading,url:absoluteUrl(articlePath(l.id))}))})}}/>
 </main>;}
