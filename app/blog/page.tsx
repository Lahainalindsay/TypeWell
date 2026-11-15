import { ArticleCard, type ArticleCardProps } from "../../src/features/editorial/ArticleCard";
import { deskSetupUpdated, editorialUpdated, guideUpdated } from "../../src/lib/seo/pageDates";
import photos from "../../src/features/revival/photos.json";
import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { articleLastModified, articlePath, languages } from "../../src/features/revival/content";
import { personalityArticleTitle } from "../../src/features/editorial/personalityArticle";
import { guides } from "../../src/features/editorial/guides";
import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "../../src/lib/seo/site";

const canonical = absoluteUrl("/blog/");

export const metadata: Metadata = {
  title: "Typing Blog & Articles | WPMTest",
  description: "Read articles about typing tests, practice methods, keyboard skills, and employment assessments.",
  alternates: { canonical },
  openGraph: { title: "Typing Blog & Articles | WPMTest",
    description: "Articles about typing tests, practice methods, keyboard skills, and employment assessments.",
    url: canonical,
    type: "website", images: [{ url: absoluteUrl("/og-default.png"), width: 1200, height: 630, alt: "WPMTest typing tools" }] },
  twitter: { card: "summary_large_image",
    title: "Typing Blog & Articles | WPMTest",
    description: "Articles about typing tests, practice methods, keyboard skills, and employment assessments.", images: [absoluteUrl("/og-default.png")] },
  robots: { index: true, follow: true }
};

const deskImage = { src: "/images/typing-editorial-desk-600.webp", alt: "Keyboard and notebook on a typing desk", width: 600, height: 400 };
const resultsImage = { src: "/images/typing-previews/results.svg", alt: "Sample typing speed and accuracy results", width: 540, height: 310 };

const featuredArticles: ArticleCardProps[] = [
  {
    href: "/blog/desk-setup-for-typing/", title: "Set Yourself Up for Success: A Desk That Works With You",
    description: "Adjust your chair, keyboard, lighting, and papers for typing at school or work.",
    category: "Guides", date: deskSetupUpdated, image: deskImage, affiliate: true,
  },
  {
    href: "/blog/glossika-language-revival/", title: "The Story Doesn’t End at the Keyboard: WPMTest × Glossika",
    description: "How Glossika teaches, ten courses from our revival series, and a fifteen-minute routine.",
    category: "Language revival", date: editorialUpdated, affiliate: true,
    image: { src: "/images/partners/glossika-wordmark.png", alt: "Glossika owl and wordmark", width: 1024, height: 300 },
  },
  {
    href: "/language-revival/", title: "Language Revival: Suppression, Survival and Community Renewal",
    description: "Explore eleven language histories, timelines, sources, and practice pathways.",
    category: "Language revival", date: "2026-11-13", image: photos.hawaiian,
  },
  {
    href: "/blog/typing-personality-test/", title: personalityArticleTitle,
    description: "Your keyboard has been keeping score. Find out what it thinks of you.",
    category: "Fun", date: editorialUpdated,
    image: { src: "/images/typing-personality-600.webp", alt: "Illustrated typing personality cards", width: 600, height: 338 },
  },
  {
    href: "/blog/typing-test-on-phone-vs-keyboard/", title: "Phone vs Keyboard Typing Speed: How to Compare Your WPM",
    description: "Compare WPM, accuracy, and input settings with a repeatable one-minute test.",
    category: "Comparisons", date: editorialUpdated, image: deskImage,
  },
  {
    href: "/blog/best-typing-test-websites/", title: "The 9 Best Free Typing Test Websites (2026), Compared",
    description: "Compare typing tools for lessons, speed measurement, and data-entry practice.",
    category: "Comparisons", date: editorialUpdated, image: resultsImage,
  },
  {
    href: "/blog/data-entry-typing-test-for-employment/", title: "Data Entry Typing Test for Employment: What to Expect",
    description: "Learn how data entry differs from prose typing, how WPM and KPH work, and which skills to practice.",
    category: "Data entry", date: editorialUpdated, image: resultsImage,
  },
  ...guides.map((guide): ArticleCardProps => ({
    href: `/blog/${guide.slug}/`, title: guide.title, description: guide.description,
    category: guide.slug.includes("data-entry") ? "Data entry" : "Guides",
    date: guideUpdated(guide.slug), image: resultsImage,
  })),
];

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WPMTest Typing Blog & Articles",
    url: canonical,
    publisher: { "@type": "Organization", name: SITE_NAME },
    inLanguage: "en-US"
  };

  return (
    <>
      <main id="main-content" tabIndex={-1} className="seo-prerender">
        <Breadcrumbs items={[{ name: "All Articles", url: "/blog/" }]} />

        <p className="eyebrow">Blog & articles</p>
        <h1>All Articles</h1>
        <p>Explore typing test comparisons, practice advice, and articles about keyboard skills. <a href="/feed.xml">Subscribe via RSS</a>.</p>

        <div className="article-card-grid">
          {featuredArticles.map(article => <ArticleCard key={article.href} {...article} />)}
        </div>
        <section aria-labelledby="revival-articles">
          <h2 id="revival-articles">Language revival articles</h2>
          <div className="article-card-grid">
            {languages.map(language => {
              const photo = photos[language.id as keyof typeof photos];
              return <ArticleCard key={language.id} href={articlePath(language.id)} title={`${language.name} Language Revival`}
                description={language.desc} category="Language revival" date={articleLastModified(language.id)} image={photo} />;
            })}
          </div>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
