import type { Metadata } from "next";
import Link from "next/link";
import styles from "../blog/hawaiian-language-revival/article.module.css";
import { revivalLanguages } from "../../src/features/editorial/revivalLanguages";
import { absoluteUrl } from "../../src/lib/seo/site";
const title = "Language Revival: Every Language Deserves a Place Online";
const description = "Explore Hawaiian, Welsh, Manx, Scottish Gaelic, Irish and other minoritized languages, their histories, writing systems and available typing practice.";
export const metadata: Metadata = {
 title: `${title} | WPMTest`, description,
 alternates: { canonical: absoluteUrl("/language-revival/") },
 openGraph: { title, description, url: absoluteUrl("/language-revival/"), type: "article" }
};
export default function LanguageRevivalHome() {
 return <main className={styles.page}>
 <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link> › Language Revival</nav>
 <article>
 <header className={styles.header}><p className={styles.eyebrow}>LANGUAGE REVIVAL · WORDS WORTH KEEPING</p>
 <h1>Every language deserves a place online.</h1>
 <p className={styles.subtitle}>A typing website cannot save a language. But it can help make room for one.</p>
 <p className={styles.date}>November 6, 2026 · WPMTest editorial project</p></header>
 <div className={styles.body}>
 <p className={styles.lead}>Imagine being told the language you speak at home does not belong in school. Then imagine the next generation growing up without it.</p>
 <p>That story has played out in very different ways around the world. Some languages were punished in classrooms; others were pushed aside by government policy, migration, stigma or economic pressure. Communities did not simply forget their languages. Many were denied the ordinary places where a language survives: childhood, school, work and public life.</p>
 <p>We started with <Link href="/blog/hawaiian-language-revival/">ʻŌlelo Hawaiʻi</Link>. Its modern revitalization shows what families, educators and community leadership can achieve. We are extending that attention to other languages and language varieties—not because they all share the same history, but because their distinct stories deserve to be told accurately.</p>
 <section className={styles.section}><span className={styles.sectionNumber}>01 · OUR PURPOSE</span><h2>Why a typing website?</h2>
 <p>Written language needs to work on actual devices. Correct characters, diacritics, scripts and keyboard layouts matter in messages, schoolwork and everyday communication. Typing is only one small skill among listening, speaking, reading and cultural learning; it is not a measure of fluency or a substitute for teachers.</p>
 <p>We will publish historical explainers, practical keyboard guidance and typing exercises where appropriate passages and writing systems can be responsibly checked. We will not publish invented translations or call an English-language test a Welsh, Manx or Sorani test just to fill a page.</p></section>
 <section className={styles.section}><span className={styles.sectionNumber}>02 · THE LANGUAGES</span><h2>Explore the collection</h2>
 <p>These are not all endangered in the same way. Some are widely spoken yet historically suppressed; others experienced severe interruptions in native-speaker transmission. Each article explains that difference.</p>
 <div className={styles.resources}>{revivalLanguages.map(language=><div className={styles.resource} key={language.slug}>
 <p className={styles.eyebrow}>{language.region} · {language.status}</p><h3>{language.name}</h3>
 <p>{language.introduction}</p><p><Link href={`/language-revival/${language.slug}/`}>Read the language story and writing guide →</Link></p>
 {language.testPath ? <p><Link href={language.testPath}>Take the {language.name} typing test →</Link></p> : <p><em>Dedicated WPMTest typing test in preparation; native-language passages and keyboard support must be verified first.</em></p>}
 </div>)}</div></section>
 <section className={styles.section}><span className={styles.sectionNumber}>03 · LEARNING RESOURCES</span><h2>Where Glossika fits in</h2>
 <p>Glossika offers courses for several languages featured here, including nine free minoritized-language courses: Welsh, Manx, Scottish Gaelic, Catalan, Taiwanese Taigi, Hakka Sixian, Hakka Hailu, Wenzhounese and Sorani Kurdish. It also lists Irish among its wider language catalogue. Hawaiian is not currently listed. Course availability may change.</p>
 <p><a href="https://ai.glossika.com/home" rel="noopener noreferrer">See Glossika's current course catalogue ↗</a>. Glossika focuses on language practice; WPMTest focuses on keyboard accuracy and typing. They are different tools, not substitutes.</p>
 <p><strong>Affiliate transparency:</strong> No affiliate tracking link is installed on this page. If we add one, we will clearly disclose any potential commission without extra cost to the learner.</p>
 <p>Sources: <a href="https://help.glossika.com/en/articles/1245181-which-courses-are-free-do-free-courses-require-a-subscription-or-always-available">Glossika's free course list</a> and <a href="https://ai.glossika.com/home">current language catalogue</a>.</p></section>
 <section className={styles.section}><span className={styles.sectionNumber}>04 · ACCOUNTABILITY</span><h2>Accuracy matters more than a dramatic headline</h2>
 <p>We distinguish an endangered language from a historically marginalized one, and distinguish fluent speakers from people reporting some knowledge of a language. Where there are contested statistics, dialect differences or multiple writing systems, we say so. We credit language communities and link to further reading.</p>
 <p>Our aim is to create genuinely useful practice and encourage visitors to seek community-led instruction. If you are a speaker, teacher or researcher who spots an error, <Link href="/contact/">please tell us</Link>. A correction is more valuable than a confident mistake.</p></section>
 </div></article></main>;
}
