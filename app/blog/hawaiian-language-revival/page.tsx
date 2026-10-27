import type { Metadata } from "next";
import styles from "./article.module.css";
import { absoluteUrl } from "../../../src/lib/seo/site";

const path = "/blog/hawaiian-language-revival/";
const title = "ʻŌlelo Hawaiʻi Is Growing Again, and Everyday Use Matters";
const description = "Hawaiian language use is growing again through families, educators, immersion schools, and everyday practice. Learn why accurate Hawaiian typing with ʻokina and kahakō matters online.";
const canonical = absoluteUrl(path);
export const metadata: Metadata = {
 title: `${title} | WPMTest`, description,
 alternates: { canonical }, robots: { index: true, follow: true },
 openGraph: { title, description, type: "article", url: canonical, publishedTime: "2026-10-27", modifiedTime: "2026-10-27", images: [absoluteUrl("/images/hawaiian-language-desk.webp")] },
 twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/images/hawaiian-language-desk.webp")] }
};
const sections = [
  {
    "heading": "How Hawaiian came close to losing a generation of speakers",
    "paragraphs": [
      "Hawaiian did not simply fall out of use. Its decline was accelerated by deliberate suppression of the language and Hawaiian cultural expression. In 1896, following the overthrow of the Hawaiian Kingdom, the Republic of Hawaiʻi required English as the medium of instruction in public and private schools. Children were punished for speaking Hawaiian at school, helping break the transmission of the language between generations. Hawaiʻi’s Legislature formally acknowledged that harm in a 2022 apology resolution. Cultural expression had also faced earlier prohibitions, including an 1830 ban on public hula performances under Queen Regent Kaʻahumanu, influenced by Christian missionaries.",
      "The school law and punishment for speaking Hawaiian must be understood together. The law did not criminalize every Hawaiian conversation everywhere, but its enforcement and the treatment of children made the consequences deeply personal for families.",
      "The University of Hawaiʻi Foundation recounts that, by 1985, only 32 children younger than 18 spoke Hawaiian. Hawaiian-speaking families and communities, including those connected to Niʻihau, remained essential to its continuity. The language survived, but the generation of children growing up speaking it had become dangerously small."
    ],
    "sources": [
      [
        "University of Hawaiʻi: Act 57, Section 30",
        "https://coe.hawaii.edu/territorial-history-of-schools/document/act-57-section-30-1896-english-made-the-medium-and-basis-of-instruction-for-all-schools/"
      ],
      [
        "Hawaiʻi Legislature: 2022 apology resolution",
        "https://data.capitol.hawaii.gov/sessions/session2022/bills/HCR130_.htm"
      ],
      [
        "University of Hawaiʻi: hula history",
        "https://guides.library.manoa.hawaii.edu/c.php?g=105252&p=687126"
      ],
      [
        "UH Foundation: Saving the Hawaiian Language",
        "https://uhfoundation.org/saving-hawaiian-language"
      ]
    ]
  },
  {
    "heading": "Families and educators built a way forward",
    "paragraphs": [
      "The response came from the community. In 1983, Hawaiian-language educators gathered to develop a plan centered on children using Hawaiian as an ordinary language of daily life. The first Pūnana Leo preschool opened in Kekaha, Kauaʻi, in 1984. In 1987, collaboration with the state Department of Education helped establish the first Kaiapuni elementary programs at Keaukaha and Waiau.",
      "This was about more than adding vocabulary lessons. Hawaiian-medium education created places where children could learn, ask questions, build relationships, and understand the world through Hawaiian language and culture."
    ],
    "sources": [
      [
        "ʻAha Pūnana Leo: Our History",
        "https://www.ahapunanaleo.org/history-hl-1"
      ]
    ]
  },
  {
    "heading": "How many people speak Hawaiian today?",
    "paragraphs": [
      "There is no single number that captures every fluent speaker, learner, or person who uses Hawaiian occasionally. A useful measure is language use at home.",
      "An April 2026 report in Ka Wai Ola, the Office of Hawaiian Affairs’ publication, reported that the number of Hawaiʻi residents age five and older speaking Hawaiian at home rose from 18,400 in 2016 to 27,338 in 2024—approximately 48% growth. These are home-use figures, not a count of people certified as fluent.",
      "That distinction matters. It keeps the progress meaningful without overstating what the numbers prove."
    ],
    "sources": [
      [
        "Ka Wai Ola: April 2026 news briefs",
        "https://kawaiola.news/nuhou/pokenuhou/news-briefs-april-2026/"
      ]
    ]
  },
  {
    "heading": "Hawaiian is a language of education again",
    "paragraphs": [
      "Today, Hawaiian-medium schooling gives children opportunities that earlier generations were denied. In December 2025, Hawaiʻi Public Radio reported that Kaiapuni education was offered at 33 schools: 26 designated Department of Education schools and seven public charter schools. Classes use Hawaiian as a language of instruction, rather than treating it only as a separate subject.",
      "The growth also brings challenges. Schools need qualified teachers, resources, and pathways that allow students to continue their education in Hawaiian as they get older. Increased interest is encouraging, but sustaining the language requires continued support."
    ],
    "sources": [
      [
        "Hawaiʻi Public Radio: funding and staffing for immersion education",
        "https://www.hawaiipublicradio.org/local-news/2025-12-17/hawaiian-immersion-education-leaders-need-more-funding-staff-to-grow-the-program"
      ],
      [
        "Civil Beat: growth and teacher shortages",
        "https://www.civilbeat.org/2026/01/hawaiian-language-schools-grow-as-doe-shrinks-theres-one-big-problem/"
      ]
    ]
  },
  {
    "heading": "Why Hawaiian typing practice belongs online",
    "paragraphs": [
      "Speaking and listening remain essential. Typing practice supports a different skill: becoming comfortable writing the language on a device.",
      "Correct characters matter. The ʻokina (ʻ) is a letter, not an ordinary apostrophe. Kahakō mark long vowels: ā, ē, ī, ō, ū. Learning to enter these characters helps people write Hawaiian accurately in messages, assignments, and everyday digital communication.",
      "Our Hawaiian test provides short passages, timed practice, and accuracy feedback. It is typing practice—not a Hawaiian-language course or a measure of fluency."
    ],
    "sources": [
      [
        "University of Hawaiʻi: Hawaiian keyboard and diacritic guidance",
        "https://www.hawaii.edu/askus/1767"
      ]
    ]
  }
];

export default function HawaiianLanguageArticle() {
 const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "Article", headline: title, description, mainEntityOfPage: canonical, inLanguage: "en-US", datePublished: "2026-10-27", dateModified: "2026-10-27", author: { "@type": "Organization", name: "WPMTest", url: absoluteUrl("/about/") }, publisher: { "@type": "Organization", name: "WPMTest", url: absoluteUrl("/") }, image: absoluteUrl("/images/hawaiian-language-desk.webp") },
  { "@type": "BreadcrumbList", itemListElement: [
   { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
   { "@type": "ListItem", position: 2, name: "Articles", item: absoluteUrl("/blog/") },
   { "@type": "ListItem", position: 3, name: title, item: canonical }
  ] }
 ] };
 return <main className={styles.page} lang="en">
  <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Articles</a> › <span>Hawaiian language revival</span></nav>
  <article>
   <header className={styles.header}>
    <p className={styles.eyebrow}>ʻŌlelo Hawaiʻi · Language &amp; everyday life</p>
    <h1>ʻŌlelo Hawaiʻi Is Growing Again, and Everyday Use Matters</h1>
    <p className={styles.subtitle}>A look at Hawaiian language revitalization, why everyday use matters, and how typing practice can support accurate digital writing.</p>
    <p className={styles.date}><time dateTime="2026-10-27">October 27, 2026</time> · Language &amp; learning</p>
   </header>
   <figure className={styles.hero}>
    <img src="/images/hawaiian-language-desk.webp" width="1536" height="1024" alt="A keyboard, open notebook, and pencil on a warm wooden desk beside a garden" fetchPriority="high" />
    <figcaption>A space for everyday learning. AI-generated editorial illustration.</figcaption>
   </figure>
   <div className={styles.body}>
    <p className={styles.lead}>A language grows stronger when people have places to use it.</p>
    <p>That can mean a classroom. A kitchen table. A conversation with a grandparent. A text message to a friend. A song, a lesson, a school assignment, or a few minutes of typing practice online.</p>
    <p>For ʻŌlelo Hawaiʻi, the Hawaiian language, those everyday spaces were deliberately narrowed for generations. Its renewed presence today reflects decades of work by Native Hawaiian families, kūpuna, educators, and community leaders who refused to let that connection disappear.</p>
    <p>At WPMTest, we recently added a <a href="/haw/hawaiian-typing-test/">Hawaiian typing test</a> to create one more place where learners and speakers can practice writing Hawaiian accurately online. It is a small contribution. The real credit for the language’s revitalization belongs to the communities carrying it forward.</p>
    <aside className={styles.cta}><p className={styles.eyebrow}>A little practice, every day</p><h2>Practice typing in ʻŌlelo Hawaiʻi</h2><p>Try short Hawaiian passages with ʻokina, kahakō, WPM tracking, and accuracy feedback.</p><a className={styles.button} href="/haw/hawaiian-typing-test/">Start the Hawaiian Typing Test →</a></aside>
   {sections.map((section, index) => <section className={styles.section} key={section.heading}>
    <span className={styles.sectionNumber} aria-hidden="true">0{index + 1}</span><h2>{section.heading}</h2>
    {index === 2 && <div className={styles.statGrid}>
     {[['18,400', 'Hawaiʻi residents age 5+ speaking Hawaiian at home in 2016'], ['27,338', 'Hawaiʻi residents age 5+ speaking Hawaiian at home in 2024'], ['48%', 'Approximate growth in home use, 2016–2024']].map(([value, label]) => <div className={styles.stat} key={value}><strong>{value}</strong><span>{label}</span></div>)}
    </div>}
    {index === 4 && <div className={styles.diacritics} lang="haw"><span>ʻ</span><span>ā</span><span>ē</span><span>ī</span><span>ō</span><span>ū</span></div>}
    {section.paragraphs.map(p => <p key={p}>{p}</p>)}
    <div className={styles.sources}><strong>Sources &amp; further reading</strong><ul>{section.sources.map(([label, href]) => <li key={href}><a href={href}>{label} ↗</a></li>)}</ul></div>
   </section>)}
   <section className={styles.section}><h2>Where to practice Hawaiian typing</h2>
    <p>Dedicated Hawaiian typing tests appeared uncommon in our search on October 27, 2026. We found one other dedicated test. This is not a claim that no others exist. These recommendations describe each resource’s purpose, not independent performance ratings.</p>
    <div className={styles.resources}>
     <div className={styles.resource}><p className={styles.eyebrow}>Timed practice</p><h3>WPMTest Hawaiian Typing Test</h3><p>For straightforward timed practice with Hawaiian passages, ʻokina, kahakō, WPM tracking, and accuracy feedback.</p><a href="/haw/hawaiian-typing-test/">Practice on WPMTest →</a></div>
     <div className={styles.resource}><p className={styles.eyebrow}>More settings</p><h3>India Typing Test: Hawaiian</h3><p>Offers duration, paragraph options, word limits, and certificates. We reviewed its listed features but have not independently benchmarked its scoring.</p><a href="https://www.indiatypingtest.com/typing-test/hawaiian-typing">Visit India Typing Test ↗</a></div>
     <div className={styles.resource}><p className={styles.eyebrow}>Keyboard setup</p><h3>University of Hawaiʻi Keyboard Guidance</h3><p>Helpful for setting up Hawaiian character input before practicing. This is setup guidance, not a timed typing test.</p><a href="https://www.hawaii.edu/askus/1767">Read UH keyboard guidance ↗</a></div>
    </div>
    <p><strong>Disclosure:</strong> WPMTest publishes this article and operates the first tool listed.</p>
   </section>
   <section className={styles.section}><h2>A small contribution to a much larger movement</h2>
    <p>A typing website cannot replace a kumu, a conversation with ʻohana, or education rooted in Hawaiian community and culture.</p>
    <p>What we can offer is another practical opportunity to use the language online. We hope our Hawaiian typing test supports learners as they become more comfortable writing—and encourages them to keep learning from Hawaiian-led resources such as <a href="https://www.ahapunanaleo.org/">ʻAha Pūnana Leo</a>.</p>
    <p>ʻŌlelo Hawaiʻi’s renewed growth is the result of sustained commitment. Every additional space for its respectful, accurate use can support that work.</p>
    <aside className={styles.finalCta}><h2>Practice typing in ʻŌlelo Hawaiʻi</h2><p>Build comfort with Hawaiian words, ʻokina, kahakō, and accurate digital writing.</p><a className={styles.button} href="/haw/hawaiian-typing-test/">Start Practicing →</a></aside>
    <p><a href="/contact/">Suggest a correction or share a Hawaiian learning resource</a>.</p>
   </section>
   </div>
  </article>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 </main>;
}
