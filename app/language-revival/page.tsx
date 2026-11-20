import type { Metadata } from 'next';
import { Breadcrumbs } from '../../src/components/Breadcrumbs';
import { absoluteUrl } from '../../src/lib/seo/site';
import styles from './page.module.css';
import { languagePathways, revivalStoryUrl } from '../../src/features/revival/pathways';

export const metadata: Metadata = {
  title: 'Living Language Typing Tests & Keyboard Guides | WPMTest',
  description: 'Explore ten languages and language varieties through keyboard guides, writing resources and typing practice. Discover the communities sustaining their futures.',
  openGraph: { title: 'Language Revival | WPMTest', description: 'Living languages. A place in the digital world. Explore ten language pathways through keyboard guides and thoughtful typing practice.', url: absoluteUrl('/language-revival/'), type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Language Revival | WPMTest', description: 'Ten languages. Ten distinct stories. Explore keyboard guides and thoughtful typing practice.' },
  alternates: { canonical: absoluteUrl('/language-revival/') }
};

const stories = 'https://wpmtest-language-revival.lahainalindsay9111.chatgpt.site/';
export default function Page() {
 return <main id="main-content" tabIndex={-1} className={styles.page}>
  <Breadcrumbs items={[{name:'Language Revival',url:'/language-revival/'}]}/>
  <header className={styles.hero}>
   <p className={styles.eyebrow}>WPMTEST · THE LANGUAGE REVIVAL COLLECTION</p>
   <h1>Language Revival</h1>
   <h2>Living languages. A place in the digital world.</h2>
   <p>Language is more than something we speak. It's how we share knowledge, express identity, connect generations, and carry culture forward.</p>
   <p>Around the world, communities are sustaining and revitalizing languages that have faced suppression, displacement, and generations of unequal access to education and public life.</p>
   <p>Their stories are different. Their futures are being shaped by the people who speak them.</p>
   <p><strong>The Language Revival Collection at WPMTest brings ten languages and language varieties into focus through practical keyboard guides, writing resources, and dedicated typing exercises.</strong></p>
   <p>Whether you're reconnecting with a heritage language, learning something new, or simply exploring an unfamiliar writing system, this is a place to begin.</p>
  </header>
  <section aria-labelledby="language-heading" className={styles.collection}>
   <h2 id="language-heading">Explore the Collection</h2>
   <p><strong>Ten languages. Ten distinct stories. One simple starting point.</strong></p>
   <p>Each language has its own writing conventions, keyboard requirements, and cultural history. Explore the language, learn how to type its characters, and build familiarity through guided practice.</p>
   <p>Every language pathway includes:</p>
   <ul className={styles.pathways}>
    <li><strong>Discover the Language</strong> — A concise introduction to its origins, writing system, and place in the world today.</li>
    <li><strong>Keyboard &amp; Setup Guide</strong> — Practical instructions for enabling the language's keyboard, entering special characters, and typing accurately.</li>
    <li><strong>Typing Practice</strong> — Dedicated exercises designed to build familiarity, accuracy, and confidence.</li>
    <li><strong>The Revival Story</strong> — A deeper look at the language's history and the communities sustaining its future.</li>
   </ul>
  <div className={styles.grid}>{languagePathways.map(item=><article className={styles.card} key={item.name}><p className={styles.region}>{item.region}</p><h3>{item.native}</h3><p className={styles.english}>{item.name}</p><div className={styles.layout}><b>Written input</b><p>{item.layout}</p></div><p>{item.detail}</p><nav className={styles.actions} aria-label={`${item.name} pathway`}>
   <a href={`/language-revival/${item.id}/`}>Discover the Language →</a>
   <a href={`/language-revival/${item.id}/#keyboard-setup`}>Keyboard &amp; Setup Guide →</a>
   <a href={item.test}>Typing Practice →</a>
   <a href={revivalStoryUrl(item.id)} target="_blank" rel="noopener noreferrer">The Revival Story ↗</a>
  </nav></article>)}</div></section>
  <div className={styles.editorial}>
   <section aria-labelledby="digital-heading">
    <h2 id="digital-heading">From Written Language to Digital Fluency</h2>
    <p>A language's place in the modern world extends beyond books and classrooms.</p>
    <p>It's present in messages between friends, school assignments, family conversations, creative work, and the countless everyday moments that now happen on screens.</p>
    <p>Being able to type accurately—whether that means entering an ʻokina in Hawaiian, a fada in Irish, or writing in the right-to-left Kurdish script—is one small but meaningful part of making a language usable in digital life.</p>
    <p>Some languages in this collection have established typing passages. Others begin with carefully selected characters, names, and introductory exercises.</p>
    <p>The emphasis is on <strong>correct written forms, accessible tools, and thoughtful practice</strong>, not speed alone.</p>
   </section>
   <section aria-labelledby="began-heading">
    <h2 id="began-heading">Where This Began</h2>
    <p>The collection began with Hawaiian.</p>
    <p>Growing up on Maui, I rarely encountered people my age speaking Hawaiian beyond the familiar words woven into everyday life.</p>
    <p>Today, I'm watching a new generation experience something different. Three little girls in my life are growing up surrounded by ʻōlelo Hawaiʻi, and the two oldest, who attend Hawaiian immersion school, already understand far more than I do.</p>
    <p>I'm learning alongside the youngest.</p>
    <p>That experience changed the way I thought about the languages we choose to support online.</p>
    <p>While developing WPMTest, creating a Hawaiian typing test felt like a natural step. The question that followed was simple:</p>
    <blockquote>If we're building tools for the way people communicate today, why shouldn't more languages have a place in them?</blockquote>
    <p>That question became this collection.</p>
   </section>
   <section aria-labelledby="larger-heading">
    <h2 id="larger-heading">A Small Part of Something Larger</h2>
    <p>Language revitalization happens through people.</p>
    <p>Through parents teaching children, educators developing new resources, speakers sharing knowledge, and communities creating places where their languages can be used naturally and confidently.</p>
    <p>A typing test cannot replace that work.</p>
    <p>But technology can help make room for it.</p>
    <p>Our aim is to provide practical, accessible tools that respect each language's writing conventions and give learners another opportunity to use them.</p>
    <p>Not every language has the same history. Not every community faces the same challenges. And no single tool can meet every need.</p>
    <p>What we can do is approach each language with care, make its written form more accessible, and continue improving the resources available here.</p>
    <p><strong>Because a language's future belongs to its speakers. Its place in the digital world should be theirs, too.</strong></p>
   </section>
  </div>
  <section className={styles.footer} aria-labelledby="begin-heading">
   <h2 id="begin-heading">Choose a Language. Begin Typing.</h2>
   <p>Explore a language introduction, set up your keyboard, and practice at your own pace.</p>
   <p><strong>Ten languages. Ten pathways to written practice.</strong></p>
   <p><em>Start with the language. Learn the keyboard. Make every character count.</em></p>
   <a href="#language-heading">Explore the Collection ↑</a>
   <a className={styles.companionLink} href={stories} target="_blank" rel="noopener noreferrer">Read the Revival Stories ↗</a>
  </section>
  <details className={styles.archive}>
   <summary>Additional character-practice resources</summary>
   <p>These existing introductory drills remain available outside the ten featured pathways.</p>
   <ul>
    <li><a href="/language-revival/catalan/typing-test/">Catalan character practice</a></li>
    <li><a href="/language-revival/hakka-sixian/typing-test/">Sixian Hakka character practice</a></li>
    <li><a href="/language-revival/hakka-hailu/typing-test/">Hailu Hakka character practice</a></li>
    <li><a href="/language-revival/wenzhounese/typing-test/">Wenzhounese character practice</a></li>
   </ul>
  </details>
 </main>;
}
