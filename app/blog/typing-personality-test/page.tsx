import type { Metadata } from "next";
import styles from "../hawaiian-language-revival/article.module.css";
import { absoluteUrl } from "../../../src/lib/seo/site";
import { articleBlocks, articleHeadings } from "../../../src/features/editorial/personalityArticle";
const title = articleBlocks[0];
const description = "Your keyboard has an opinion. Discover your typing alter ego with the Typing Personality Test.";
const url = absoluteUrl("/blog/typing-personality-test/");
const image = absoluteUrl("/images/typing-personality.webp");
export const metadata: Metadata = { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:"article",images:[image]},twitter:{card:"summary_large_image",title,description,images:[image]} };
export default function Article() {
return <main className={styles.page}>
<nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Articles</a> › <span>Typing personality</span></nav>
<article><header className={styles.header}><h1>{title}</h1><p className={styles.date}>October 28, 2026 · By the WPMTest team</p></header>
<figure className={styles.hero}><img src="/images/typing-personality.webp" width="1672" height="941" alt="A mischievous keyboard judging a typing scorecard" fetchPriority="high" /></figure>
<div className={styles.body}>{articleBlocks.slice(1).map((block,index) => articleHeadings.includes(block) ? <h2 key={index} style={{marginTop:"3rem"}}>{block}</h2> : block.startsWith("1. ") ? <ol key={index}>{block.split("\n").map(line=><li key={line}>{line.slice(3)}</li>)}</ol> : <p key={index}>{block.includes("WPMTest.app") || block === "Go on. Take the test. Unless you’re scared of being judged by a website." ? <a href="/typing-personality-test/">{block}</a> : block}</p>)}</div></article>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:title,description,image,mainEntityOfPage:url,datePublished:"2026-10-28",author:{"@type":"Organization",name:"WPMTest"}})}} />
</main>;
}
