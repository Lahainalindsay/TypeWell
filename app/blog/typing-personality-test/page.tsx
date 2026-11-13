import { AuthorByline, RelatedGuides } from "../../../src/features/editorial/ArticleVisual";
import { author, publisher } from "../../../src/lib/seo/structured";
import { personalities } from "../../../src/features/typingPersonality";
import type { Metadata } from "next";
import styles from "../hawaiian-language-revival/article.module.css";
import { absoluteUrl } from "../../../src/lib/seo/site";
import { articleBlocks, articleHeadings, personalityArticleTitle } from "../../../src/features/editorial/personalityArticle";
const title = personalityArticleTitle;
const description = "See how the WPMTest Typing Personality Test uses speed, accuracy and consistency to match your result to one of nine illustrated profiles.";
const url = absoluteUrl("/blog/typing-personality-test/");
const image = absoluteUrl("/images/typing-personality.webp");
export const metadata: Metadata = { title, description, alternates:{canonical:url}, openGraph:{title,description,url,type:"article",images:[image]},twitter:{card:"summary_large_image",title,description,images:[image]} };
export default function Article() {
return <main className={styles.page}>
<nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Articles</a> › <span>Typing personality</span></nav>
<article><header className={styles.header}><h1>{title}</h1><p>{description} Each profile explains the score pattern and suggests a way to practice.</p><AuthorByline date="2026-11-12" /></header>
<figure className={styles.hero}><img src="/images/typing-personality.webp" srcSet="/images/typing-personality-600.webp 600w, /images/typing-personality-1000.webp 1000w, /images/typing-personality.webp 1672w" sizes="(max-width: 700px) 100vw, 1050px" width="1672" height="941" alt="A mischievous keyboard judging a typing scorecard" fetchPriority="high" /></figure>
<div className={styles.body}>{articleBlocks.slice(1).map((block,index) => articleHeadings.includes(block) ? <h2 key={index} style={{marginTop:"3rem"}}>{block}</h2> : block.startsWith("1. ") ? <ol key={index}>{block.split("\n").map(line=><li key={line}>{line.slice(3)}</li>)}</ol> : <p key={index}>{block.includes("WPMTest.app") || block === "Go on. Take the test. Unless you’re scared of being judged by a website." ? <a href="/typing-personality-test/">{block}</a> : block}</p>)}<aside className={styles.perspective}><h2>Key takeaway</h2><p>Read the score breakdown to see which rule matched your attempt. Use the weak-key exercise to choose what to practice before your next run.</p></aside></div><nav aria-labelledby="personality-profiles">
  <h2 id="personality-profiles">Meet all nine typing personalities</h2>
  <ul>{personalities.map(({ slug, name }) => <li key={slug}><a href={`/typing-personality-test/profile/${slug}/`}>{name}</a></li>)}</ul>
</nav><RelatedGuides topics={["wpm-vs-kph", "best-typing-test-websites"]} /></article>
<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:title,description,image,mainEntityOfPage:url,datePublished:"2026-10-28",dateModified:"2026-11-12",author,publisher})}} />
</main>;
}
