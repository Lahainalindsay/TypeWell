import type { Metadata } from 'next';
import { Breadcrumbs } from '../../src/components/Breadcrumbs';
import { absoluteUrl } from '../../src/lib/seo/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Living Language Typing Tests & Keyboard Guides | WPMTest',
  description: 'Explore living-language keyboard layouts, character drills, typing tests and downloadable practice certificates. Discover the stories of language revival on our companion blog.',
  alternates: { canonical: absoluteUrl('/language-revival/') }
};

const stories = 'https://wpmtest-language-revival.lahainalindsay9111.chatgpt.site/';
type Entry = { name: string; native: string; region: string; layout: string; test?: string; detail: string };
const featured: Entry[] = [
 {name:'Hawaiian',native:'ʻŌlelo Hawaiʻi',region:'Hawaiʻi',layout:'Hawaiian QWERTY with ʻokina and kahakō',test:'/haw/hawaiian-typing-test/',detail:'Dedicated passages, 1-, 3- and 5-minute tests, and keyboard instructions.'},
 {name:'Māori',native:'Te reo Māori',region:'Aotearoa New Zealand',layout:'Māori keyboard with macrons ā ē ī ō ū',detail:'Full passages and certificate coming after language review.'},
 {name:'Cherokee',native:'ᏣᎳᎩ',region:'United States',layout:'Cherokee syllabary keyboard/input method',detail:'Syllabary test coming after native-speaker review and input-method testing.'},
 {name:'Basque',native:'Euskara',region:'Basque Country',layout:'Latin keyboard, including ñ and accented vowels',detail:'Verified Basque passages and full test coming soon.'},
 {name:'Welsh',native:'Cymraeg',region:'Wales',layout:'Welsh accented vowels â ê î ô û ŵ ŷ',test:'/language-revival/welsh/typing-test/',detail:'Character-copy drill available; full passages pending review.'},
 {name:'Irish',native:'Gaeilge',region:'Ireland',layout:'Irish keyboard with fada á é í ó ú',test:'/language-revival/irish/typing-test/',detail:'Character-copy drill available; full passages pending review.'},
 {name:'Scottish Gaelic',native:'Gàidhlig',region:'Scotland',layout:'Grave accents à è ì ò ù',test:'/language-revival/scottish-gaelic/typing-test/',detail:'Character-copy drill available; full passages pending review.'},
 {name:'Manx',native:'Gaelg',region:'Isle of Man',layout:'Latin-script keyboard',test:'/language-revival/manx/typing-test/',detail:'Name-copy drill available; full passages pending review.'},
 {name:'Taiwanese Taigi',native:'Tâi-gí',region:'Taiwan',layout:'Taiwanese Latin input with diacritics; other writing systems use separate input methods',test:'/language-revival/taiwanese-taigi/typing-test/',detail:'Character-copy drill available; full passages pending review.'},
 {name:'Sorani Kurdish',native:'کوردیی سۆرانی',region:'Kurdistan region',layout:'Central Kurdish (Sorani) right-to-left keyboard',test:'/language-revival/sorani-kurdish/typing-test/',detail:'Right-to-left character-copy drill available; full passages pending review.'}
];
export default function Page() {
 return <main id="main-content" tabIndex={-1} className={styles.page}>
  <Breadcrumbs items={[{name:'Language Revival',url:'/language-revival/'}]}/>
  <header className={styles.hero}><p className={styles.eyebrow}>WPMTEST · LIVING LANGUAGES</p><h1>Make room for every language on the keyboard.</h1><p>Find a keyboard layout, practice written characters or full passages, and record your typing progress. Stories about language suppression, preservation and renewal live on our separate Language Revival blog.</p><a className={styles.storyLink} href={stories} target="_blank" rel="noopener noreferrer">Read the Language Revival stories ↗</a></header>
  <section className={styles.instructions} aria-label="How it works"><div><b>01 · Set up</b><p>Enable your language's input method on your device before testing.</p></div><div><b>02 · Practice</b><p>Choose a supported test or introductory copy drill. Full tests and drills are clearly distinguished.</p></div><div><b>03 · Celebrate</b><p>Where certificates are supported, save your typing result. WPM is not a measure of language fluency.</p></div></section>
  <section aria-labelledby="language-heading"><h2 id="language-heading">Explore the 10 featured languages</h2><p>We add full-language tests only after checking passage accuracy, written forms and keyboard behavior. An established keyboard does not by itself mean a reviewed test is ready.</p>
  <div className={styles.grid}>{featured.map(item=><article className={styles.card} key={item.name}><p className={styles.region}>{item.region}</p><h3>{item.native}</h3><p className={styles.english}>{item.name}</p><div className={styles.layout}><b>Keyboard / input method</b><p>{item.layout}</p></div><p>{item.detail}</p><div className={styles.actions}>{item.test?<a href={item.test}>{item.name==='Hawaiian'?'Take the typing test →':'Open character practice →'}</a>:<span>Full typing test in preparation</span>}</div></article>)}</div></section>
  <section className={styles.footer}><h2>Beyond the keyboard</h2><p>Every language belongs to people and communities, not to a typing score. Visit the companion site for language histories and ongoing community-led revival efforts.</p><a href={stories} target="_blank" rel="noopener noreferrer">Visit the Language Revival blog ↗</a><p className={styles.note}>Story links currently open the blog's homepage until individual article URLs are published and verified.</p></section>
 </main>;
}
