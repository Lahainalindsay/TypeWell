import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../../src/components/Breadcrumbs';
import { absoluteUrl } from '../../../src/lib/seo/site';
import { languagePathways, revivalStoryUrl, writingNotes } from '../../../src/features/revival/pathways';
import styles from '../page.module.css';
export const dynamicParams = false;
export function generateStaticParams() { return languagePathways.map(({id}) => ({language: id})); }
export async function generateMetadata({params}: {params: Promise<{language: string}>}): Promise<Metadata> {
 const {language} = await params; const item = languagePathways.find(l => l.id === language); if (!item) return {};
 const url = absoluteUrl(`/language-revival/${item.id}/`);
 return {title: `${item.name} Keyboard Guide & Typing Practice | WPMTest`, description: `Explore ${item.name} keyboard setup and character practice. Learn written forms and follow the dedicated language history on our companion site.`, alternates: {canonical: url}, openGraph: {url}};
}
export default async function Page({params}: {params: Promise<{language: string}>}) {
 const {language} = await params; const item = languagePathways.find(l => l.id === language); if (!item) notFound();
 const writing = writingNotes[item.id];
 return <main id="main-content" tabIndex={-1} className={styles.page}>
  <Breadcrumbs items={[{name:'Language Revival',url:'/language-revival/'},{name:item.name,url:`/language-revival/${item.id}/`}]}/>
  <header className={styles.hero}><p className={styles.eyebrow}>{item.region}</p><h1>{item.name}: a place on your keyboard</h1><p>{item.native}</p><p>Discover the written language, prepare your keyboard, and build familiarity one character at a time.</p></header>
  <nav className={styles.pathwayNav} aria-label={`${item.name} pathway`}><a href="#discover">Discover the Language</a><a href="#keyboard-setup">Keyboard &amp; Setup Guide</a><a href={item.test}>Typing Practice</a><a href={revivalStoryUrl(item.id)} target="_blank" rel="noopener noreferrer">The Revival Story ↗</a></nav>
  <div className={styles.editorial}>
   <section id="discover"><h2>Discover the Language</h2><p>{writing.introduction}</p><p>For origins, cultural context, and community-led revitalization, read <a href={revivalStoryUrl(item.id)} target="_blank" rel="noopener noreferrer">the {item.name} language history article ↗</a>.</p></section>
   <section id="keyboard-setup"><h2>Keyboard &amp; Setup Guide</h2><p>{item.layout}.</p><ol><li>Open your device’s language and keyboard settings. Add a keyboard or input method that supports {item.name}; available names and layouts vary by device.</li><li>Switch to that input method using your keyboard’s language selector. Open its layout preview or character options to locate the required characters.</li><li>Check these written forms before starting: <span dir={item.id === 'sorani-kurdish' ? 'rtl' : 'ltr'}>{writing.sample}</span>. On a touchscreen, accented vowels may be available by holding the base letter. Syllabary and right-to-left input require a suitable input method.</li><li>Try a short copy exercise, checking each character rather than substituting a visually similar symbol. Keyboard shortcuts differ across operating systems.</li></ol><p>{writing.note}</p><p>For scripts or layouts unavailable on your device, install a supported input method from a trusted provider before beginning.</p></section>
   <section><h2>Typing Practice</h2><p>{item.detail}</p><p>These activities measure copying accuracy and keyboard familiarity, not speaking ability or language fluency.</p><a href={item.test}>Begin {item.name} typing practice →</a></section>
   <section><h2>The Revival Story</h2><p>Explore the language’s history and the people sustaining its future on our companion Language Revival site.</p><a href={revivalStoryUrl(item.id)} target="_blank" rel="noopener noreferrer">Read the {item.name} language history article ↗</a></section>
  </div>
 </main>;
}
