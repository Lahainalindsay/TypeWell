import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../../src/components/Breadcrumbs';
import { absoluteUrl } from '../../../src/lib/seo/site';
import { languagePathways, revivalStoryUrl, writingNotes } from '../../../src/features/revival/pathways';
import { guideDetails, setupSources } from '../../../src/features/revival/guideDetails';
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
 const guide = guideDetails[item.id];
 return <main id="main-content" tabIndex={-1} className={styles.page}>
  <Breadcrumbs items={[{name:'Language Revival',url:'/language-revival/'},{name:item.name,url:`/language-revival/${item.id}/`}]}/>
  <header className={styles.hero}><p className={styles.eyebrow}>{item.region}</p><h1>{item.name} Keyboard &amp; Typing Guide</h1><p>{item.native}</p><p>Discover the written language, prepare your keyboard, and build familiarity one character at a time.</p></header>
  <nav className={styles.pathwayNav} aria-label={`${item.name} pathway`}>
   <a href="#discover">01 · Discover</a><a href="#keyboard-setup">02 · Set Up</a><a href="#characters">03 · Learn the Characters</a><a href="#practice">04 · Practice</a><a href="#story">05 · Explore the Story</a>
  </nav>
  <div className={styles.editorial}>
   <section id="discover"><p className={styles.sectionNumber}>01 / DISCOVER</p><h2>Discover the Language</h2><p>{writing.introduction}</p><p>For origins, cultural context, and community-led revitalization, read <a href={revivalStoryUrl(item.id)} target="_blank" rel="noopener noreferrer">the {item.name} language history article ↗</a>.</p></section>
   <section id="writing-system"><h2>The Writing System</h2><p>{guide.script}</p><p>{writing.note}</p></section>
   <section id="keyboard-setup"><p className={styles.sectionNumber}>02 / SET UP</p><h2>Set Up Your Keyboard</h2><p><strong>Look for:</strong> {guide.keyboard}.</p><p>{guide.method}</p>
    <div className={styles.deviceGuides}>
     <details open><summary>Windows 11</summary><p>Open Settings → Time &amp; language → Language &amp; region. Use Language options to add a keyboard for an installed language; add the language first if needed. Switch installed layouts with Windows + Space.</p><p>If the required layout is absent, follow a documented provider’s installation instructions or use Character Map for individual characters. Adding a layout does not require a new physical keyboard.</p></details>
     <details><summary>Mac</summary><p>Open System Settings → Keyboard → Text Input → Edit. Add an appropriate input source, then select it from the Input menu. Use Keyboard Viewer to inspect its keys and modifier combinations.</p><p>For occasional characters, open Character Viewer with Control + Command + Space. A key’s accent menu can help where the needed character is offered.</p></details>
     <details><summary>iPhone &amp; iPad</summary><p>Open Settings → General → Keyboard → Keyboards → Add New Keyboard. Select the language if offered, then use the globe key to switch.</p><p>Long-press a letter to inspect available accented forms. If the required characters are absent, use a documented supporting keyboard app or a character picker; built-in coverage varies.</p></details>
     <details><summary>Android / Gboard</summary><p>Open Gboard settings → Languages → Add keyboard. Choose the available language and layout, then select Done. Hold the space bar to switch languages.</p><p>Check long-press choices for accented letters. If the language or writing convention is absent, choose a documented compatible input method rather than a layout for a different script.</p></details>
    </div><p className={styles.note}>Menu labels and keyboard availability vary by device and software version. The provider references below document the relevant setup paths.</p>
   </section>
   <section id="characters"><p className={styles.sectionNumber}>03 / LEARN THE CHARACTERS</p><h2>Enter the Characters Correctly</h2>
    <div className={styles.tableScroll}><table className={styles.characterTable}><caption>{item.name} written-form reference</caption><thead><tr><th scope="col">Characters</th><th scope="col">What to notice</th><th scope="col">How to enter them</th></tr></thead><tbody>{guide.characters.map(row => <tr key={row.forms}><th scope="row" dir={item.id === 'sorani-kurdish' ? 'rtl' : 'ltr'}>{row.forms}</th><td>{row.meaning}</td><td>{row.entry}</td></tr>)}</tbody></table></div>
    <aside className={styles.example}><strong>Check your setup with this example</strong><p dir={item.id === 'sorani-kurdish' ? 'rtl' : 'ltr'}>{guide.example}</p><p className={styles.note}>Select and copy a character if you need to configure your device. For a meaningful typing score, enter the test text yourself.</p></aside>
    {item.id === 'hawaiian' && <aside className={styles.fallback}><h3>No Hawaiian keyboard listed?</h3><p>You can still enter ʻokina and kahakō. On Windows, search for Character Map, choose a Unicode font, select the needed character and copy it into your document. On Mac, use Character Viewer. The reference above supplies correct forms you can select and copy during setup.</p><p>ʻOkina: <strong>ʻ</strong> · lower-case kahakō: <strong>ā ē ī ō ū</strong> · upper-case: <strong>Ā Ē Ī Ō Ū</strong>.</p><p>This fallback works for occasional writing. For regular typing, a supporting input method avoids repeatedly copying marks.</p></aside>}
   </section>
   <section id="practice"><p className={styles.sectionNumber}>04 / PRACTICE</p><h2>Put Your Setup Into Practice</h2><p>{item.detail}</p><h3>Before you start</h3><ul>{guide.checklist.map(check => <li key={check}>{check}</li>)}</ul><p>These activities measure copying accuracy and keyboard familiarity, not speaking ability or language fluency.</p><a href={item.test}>Begin {item.name} typing practice →</a></section>
   <section id="story"><p className={styles.sectionNumber}>05 / EXPLORE THE STORY</p><h2>Explore the Revival Story</h2><p>Explore the language’s history and the people sustaining its future on our companion Language Revival site.</p><a href={revivalStoryUrl(item.id)} target="_blank" rel="noopener noreferrer">Read the {item.name} language history article ↗</a></section>
   <section aria-labelledby="sources-heading"><h2 id="sources-heading">Keyboard References &amp; Further Help</h2><p>Use the current provider instructions when your device differs from the examples above.</p><ul>{guide.resource && <li><a href={guide.resource.url} target="_blank" rel="noopener noreferrer">{guide.resource.title} ↗</a></li>}{setupSources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a></li>)}</ul></section>
  </div>
 </main>;
}
