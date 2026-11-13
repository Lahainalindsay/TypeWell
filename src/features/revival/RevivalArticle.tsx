import ReviewCopy, { reviewSectionClass, reviewSectionId } from './ReviewCopy';
import hawaiianReview from './hawaiian-review.json';
import catalanReview from './catalan-review.json';
import welshReview from './welsh-review.json';
import gaelicReview from './scottish-gaelic-review.json';
import type { Metadata } from 'next';
import { Fragment } from 'react';
import GlossikaCard from '../partners/GlossikaCard';
import { languages, articles, articlePath, practicePath } from './content';
import photoData from './photos.json';
import editorial from './editorial.json';
import { Photo, PhotoCredit, responsivePhoto } from './Photo';
import HawaiianPhotoEssay from './HawaiianPhotoEssay';
import { absoluteUrl } from '../../lib/seo/site';
import { author, breadcrumbList, publisher } from '../../lib/seo/structured';
import styles from '../../../app/blog/hawaiian-language-revival/article.module.css';

export function revivalMetadata(id: string): Metadata {
  const language = languages.find(item => item.id === id)!;
  const photo = photoData[id as keyof typeof photoData];
  const topic = language.name.replace(/Hakka \((.+)\)/, '$1 Hakka');
  const title = `${topic} Language Revival | WPMTest`;
  const image = absoluteUrl(`/images/revival/${id}-social.jpg`);
  const url = absoluteUrl(articlePath(id));
  return { title, description: language.desc, alternates: { canonical: url },
    openGraph: { title, description: language.desc, url, type: 'article', images: [{ url: image, width: 1200, height: 630, alt: photo.alt }] },
    twitter: { card: 'summary_large_image', title, description: language.desc, images: [image] }
  };
}

export default function RevivalArticle({ id }: { id: string }) {
  const language = languages.find(item => item.id === id)!;
  const article = articles[id];
  const photo = photoData[id as keyof typeof photoData];
  const story = editorial[id as keyof typeof editorial];
  const review = id === 'hawaiian' ? hawaiianReview : id === 'scottish-gaelic' ? gaelicReview : id === 'welsh' ? welshReview : id === 'catalan' ? catalanReview : undefined;
  const url = absoluteUrl(articlePath(id));
  const wordCount = (review ? review.sections.map(section => section.body) : [story.lead, ...article.sections.flatMap(section => section.paragraphs)]).join(' ').split(/\s+/).length;
  const readingMinutes = Math.max(3, Math.ceil(wordCount / 200));
  const related = languages.filter(item => item.id !== id).slice(0, 3);
  const datePublished = id === 'hawaiian' ? '2026-10-27' : '2026-11-08';
  const dateModified = '2026-11-12';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', headline: review?.title ?? story.headline, description: language.desc,
        image: [absoluteUrl(`/images/revival/${id}-social.jpg`), absoluteUrl(photo.src)],
        mainEntityOfPage: url, datePublished, dateModified, author, publisher,
        citation: article.sources.map(source => source.url)
      },
      breadcrumbList([
        { name: 'Home', url: '/' },
        { name: 'Language Revival', url: '/language-revival/' },
        { name: language.name, url: articlePath(id) }
      ])
    ]
  };
  const direction = id === 'sorani-kurdish' ? 'rtl' : 'ltr';

  return <main className={`${styles.page} ${styles.storyPage}`}>
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> › </span><a href="/language-revival/">Language Revival</a><span aria-hidden="true"> › </span><span>{language.name}</span></nav>
    <article>
      <header className={styles.storyHeader}>
        <p className={styles.eyebrow}>{story.kicker}</p>
        <h1>{review?.title ?? story.headline}</h1>
        <p className={styles.storyDeck}>{review?.deck ?? language.desc}</p>
        <div className={styles.storyMeta}><a href="/about/#lindsay-johnson">Lindsay Johnson</a><span>{readingMinutes} min read</span><time dateTime={dateModified}>Updated November 12, 2026</time></div>
      </header>
      <Photo photo={photo} priority className={styles.storyHero} />
      <div className={styles.storyIntro}>
        {!review && <p className={styles.storyLead}>{story.lead}</p>}
        <dl className={styles.storyFacts}><div><dt>The language</dt><dd dir={direction}>{language.native}</dd></div><div><dt>The place</dt><dd>{language.region}</dd></div><div><dt>Continue the story</dt><dd><a href="#timeline">Explore the timeline ↓</a></dd></div></dl>
      </div>
      <div className={styles.articleLayout}>
        <aside className={styles.storyRail}><nav className={styles.chapterNav} aria-label="In this article"><p className={styles.eyebrow}>Inside this story</p><ol>{(review?.sections ?? article.sections).map((section, index) => <li key={section.heading}><a href={`#${review ? reviewSectionId(section.heading, index) : `history-${index}`}`}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.heading}</a></li>)}</ol><div className={styles.railLinks}><a href="#timeline">Turning points</a><a href="#practice">Written practice</a><a href="#sources">Sources & credits</a></div></nav></aside>
        <div className={styles.storyBody}>
          {review ? review.sections.map((section, index) => <Fragment key={section.heading}>
            <section className={reviewSectionClass(section.heading)} id={reviewSectionId(section.heading, index)}>
              <h2>{section.heading}</h2>
              <ReviewCopy body={section.body} />
              {id === 'hawaiian' && reviewSectionId(section.heading, index) === 'sources' && <>
                <ul>{article.sources.map(source => <li key={source.url}><a href={source.url}>{source.title}</a></li>)}</ul>
                <PhotoCredit photo={photo} />
              </>}
            </section>
            {id === 'hawaiian' && <HawaiianPhotoEssay chapter={index - 1} />}
          </Fragment>) : <>
          {article.sections.map((section, index) => <Fragment key={section.heading}>
            <section className={styles.storyChapter} id={`history-${index}`}>
              <p className={styles.chapterLabel}>Chapter {String(index + 1).padStart(2, '0')}</p><h2>{section.heading}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>
            {id === 'hawaiian' && <HawaiianPhotoEssay chapter={index} />}
            {index === 1 && <figure className={styles.pullQuote}><blockquote>{story.quote}</blockquote><figcaption>WPMTest editorial perspective</figcaption></figure>}
          </Fragment>)}
          <aside className={styles.perspective}><p className={styles.eyebrow}>The thread through this history</p><h2>{story.bridge}</h2><p>{story.perspective}</p></aside>
          <section id="timeline" className={styles.timelineSection}><p className={styles.eyebrow}>History in focus</p><h2>Turning points in {language.name}’s story</h2><ol className={styles.timeline}>{article.timeline.map(([date, text]) => <li key={date}><span className={styles.timelineDate}>{date}</span><p>{text}</p></li>)}</ol><p className={styles.contextNote}>Selected milestones, not a complete history. Experiences differ between communities and generations.</p></section>
          <section id="practice" className={styles.writingPanel}><p className={styles.eyebrow}>From reading to written practice</p><h2>Make room for the language on your keyboard.</h2><p>{language.guidance}</p><p className={styles.writingCharacters} dir={direction}>{language.chars}</p><p>{id === 'hawaiian' ? 'The Hawaiian test offers the existing practice passages.' : 'Start with a character and language-name drill, or bring a passage whose language and use rights you can verify. This introductory activity is not a speaker-reviewed sentence collection.'}</p><a className={styles.button} href={practicePath(id)}>{id === 'hawaiian' ? 'Practice Hawaiian typing' : `Explore ${language.name} character practice`} →</a><p className={styles.contextNote}>Typing speed measures keyboard performance. It does not measure fluency, belonging, or cultural knowledge.</p></section>
          {language.glossika && <GlossikaCard id={id} />}
          <section id="sources" className={styles.editorialSources}><p className={styles.eyebrow}>Follow the evidence</p><h2>Sources, photographs, and editorial care</h2><p>This history draws on the sources below. Community voices and specialist knowledge remain essential to understanding it.</p><ol>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></li>)}</ol><div className={styles.sourcePhoto}><PhotoCredit photo={photo} /><p>Location photographs introduce a place; they do not represent every speaker or community. Stock photographs were resized and converted to WebP. {id === 'hawaiian' && 'The six additional photographs were supplied by WPMTest’s editor; captions avoid assigning unverified dates, school names, or language use to the people pictured.'}</p></div><p>New sentence passages require appropriate language review. <a href="/contact/">Send a correction or offer language review →</a></p></section>
          </>}
        </div>
      </div>
    </article>
    {!review?.sections.some(section => section.heading.startsWith('Keep Exploring:')) && <section className={styles.relatedStories} aria-labelledby="related-stories"><header><p className={styles.eyebrow}>Keep exploring</p><h2 id="related-stories">Another place. Another living story.</h2><a href="/language-revival/">All eleven language pathways →</a></header><div className={styles.storyCards}>{related.map(item => { const image = photoData[item.id as keyof typeof photoData]; const next = editorial[item.id as keyof typeof editorial]; return <article key={item.id}><a className={styles.storyCardImage} href={articlePath(item.id)}><img src={image.src} {...responsivePhoto(image, '(max-width: 600px) 100vw, 360px')} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" /></a><p className={styles.eyebrow}>{item.region}</p><h3><a href={articlePath(item.id)}>{next.headline}</a></h3><PhotoCredit photo={image} /></article>; })}</div></section>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
  </main>;
}
