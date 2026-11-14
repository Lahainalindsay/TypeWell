import ReviewCopy from '../../src/features/revival/ReviewCopy';
import review from '../../src/features/revival/overview-review.json';
import type {Metadata} from 'next';
import {languages,articlePath,practicePath} from '../../src/features/revival/content';
import copy from '../../src/features/revival/overview.json';
import GlossikaCard from '../../src/features/partners/GlossikaCard';
import photos from '../../src/features/revival/photos.json';
import {Photo} from '../../src/features/revival/Photo';
import {absoluteUrl} from '../../src/lib/seo/site';
import styles from '../blog/hawaiian-language-revival/article.module.css';
const url=absoluteUrl('/language-revival/');
const description='Eleven language pathways, stories of resilience, community-led revival, and practical ways to support living languages through written practice.';
export const metadata:Metadata={title:copy.title+' | WPMTest',description,alternates:{canonical:url},openGraph:{title:copy.title,description,url,type:'website',images:[absoluteUrl('/images/revival/hawaiian.webp')]},twitter:{card:'summary_large_image',title:copy.title,description,images:[absoluteUrl('/images/revival/hawaiian.webp')]}};
export default function Page(){return <main className={styles.page}>
 <header className={styles.header}><p className={styles.eyebrow}>{copy.eyebrow}</p><h1>{copy.title}</h1><p className={styles.subtitle}>{review.deck}</p></header>
 <div className={styles.collectionMosaic}>{(['hawaiian','welsh','catalan'] as const).map(id=><Photo key={id} photo={photos[id]} sizes="(max-width:600px) 100vw, 400px"/>)}</div>
 <div className={styles.body}>{review.sections.map(section => <section key={section.heading} className={styles.section}><h2>{section.heading}</h2><ReviewCopy body={section.body}/></section>)}</div>
 <section className={styles.languageDirectory} id="directory" aria-label="Eleven language pathways">{languages.map(l=>{const entry=copy.languages[l.id as keyof typeof copy.languages];const photo=photos[l.id as keyof typeof photos];return <article key={l.id} className={styles.directoryCard}><Photo photo={photo} sizes="(max-width:600px) 100vw, 500px"/><p className={styles.eyebrow}>{l.region}</p><h2><a href={articlePath(l.id)}>{entry.heading}</a></h2><div className={styles.directoryActions}><a href={articlePath(l.id)}>Read the history →</a><a href={practicePath(l.id)}>{entry.practice}</a></div></article>;})}</section>
 <div className={styles.body}><GlossikaCard/></div>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'CollectionPage',name:copy.title,description,url,dateModified:'2026-11-10',hasPart:languages.map(l=>({'@type':'Article',name:copy.languages[l.id as keyof typeof copy.languages].heading,url:absoluteUrl(articlePath(l.id))}))})}}/>
 </main>;}
