import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WPMTestApp from "../../src/ClientApp";
import { getSeoPage, seoPages } from "../../src/seo/pages";
import { absoluteUrl, canonicalPath, SITE_NAME } from "../../src/lib/seo/site";

const dedicatedRoutes = new Set([
  "/about/", "/blog/", "/blog/data-entry-typing-test-for-employment/", "/certificate/sample/", "/contact/",
  "/data-entry-practice/", "/data-entry-practice/alphanumeric/", "/data-entry-practice/currency-dates/",
  "/data-entry-practice/invoices-orders/", "/data-entry-practice/names-addresses/", "/data-entry-typing-test/",
  "/educators/", "/privacy/", "/professionals/", "/terms/", "/typing-test/code/", "/typing-test-for-kids/",
  "/typing-test-for-students/", "/typing-test-for-employment/", "/typing-test-with-numbers/", "/typing-test-with-punctuation/"
]);

const extraRoutes = [
  "/learn", "/learn/home-row", "/learn/top-row", "/learn/bottom-row", "/learn/capital-letters",
  "/learn/punctuation", "/learn/numbers", "/rhythm", "/progress", "/settings"
];

const extraSeo = new Map([
  ["/learn", ["Learn Touch Typing - Free Typing Lessons | WPMTest", "Learn touch typing with guided lessons for home row, top row, bottom row, capitals, punctuation, numbers, and symbols.", "Learn Touch Typing"]],
  ["/rhythm", ["Typing Rhythm Trainer - Improve Speed & Consistency | WPMTest", "Train typing rhythm with a visual keystroke metronome that measures early, on-beat, and late timing.", "Typing Rhythm Trainer"]],
  ["/progress", ["Typing Progress Tracker | WPMTest", "Track local typing progress, best WPM, average accuracy, practice time, weak keys, and completed lessons.", "Typing Progress Tracker"]],
  ["/settings", ["Typing Trainer Settings | WPMTest", "Adjust typing display, theme, keyboard guide, sound, high contrast, and reduced motion settings.", "Typing Settings"]]
]);

function pathFromSlug(slug?: string[]) {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

function isDedicatedRoute(path: string) {
  return dedicatedRoutes.has(canonicalPath(path));
}

export function generateStaticParams() {
  const legacyPaths = seoPages.map((page) => page.path).filter((path) => !isDedicatedRoute(path));
  const paths = [...legacyPaths, ...extraRoutes];
  return paths.map((path) => {
    const trimmed = path.replace(/^\/|\/$/g, "");
    return { slug: trimmed ? trimmed.split("/") : [] };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = canonicalPath(pathFromSlug(slug));
  if (isDedicatedRoute(path)) return {};
  const normalized = path.replace(/\/$/, "") || "/";
  const seo = getSeoPage(path);
  const extra = extraSeo.get(normalized);
  if (!seo && !extra) return {};
  const title = seo?.title ?? extra?.[0] ?? SITE_NAME;
  const description = seo?.description ?? extra?.[1] ?? "Free typing tests and typing practice.";
  const url = absoluteUrl(path);
  const image = absoluteUrl("/og-default.svg");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: SITE_NAME, images: [{ url: image, width: 1200, height: 630, alt: `${SITE_NAME} - ${seo?.h1 ?? extra?.[2] ?? "Typing Test"}` }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: ["/progress", "/settings"].includes(normalized)
      ? { index: false, follow: false }
      : { index: true, follow: true }
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = canonicalPath(pathFromSlug(slug));
  if (isDedicatedRoute(path)) notFound();
  const normalized = path.replace(/\/$/, "") || "/";
  const seo = getSeoPage(path);
  const extra = extraSeo.get(normalized);

  if (!seo && !extra) notFound();

  return (
    <>
      <WPMTestApp initialPath={path} />
      {path !== "/" ? (
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">›</span>{" "}
          <span>{seo?.h1 ?? extra?.[2] ?? SITE_NAME}</span>
        </nav>
      ) : null}
      <section className="seo-prerender" aria-label={`${seo?.h1 ?? extra?.[2] ?? SITE_NAME} information`}>
        {seo ? (
          <>
            <p className="eyebrow">{SITE_NAME} guide</p>
            <h2>{seo.h1}: guide and scoring details</h2>
            <p>{seo.intro}</p>
            {seo.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {seo.faqs?.length ? (
              <section className="seo-faq" aria-labelledby="page-faq-heading">
                <h2 id="page-faq-heading">Frequently asked questions</h2>
                {seo.faqs.map((faq) => (
                  <article key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </section>
            ) : null}
            <nav aria-label={`Related ${seo.h1} tools`}>
              {seo.related.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            </nav>
          </>
        ) : (
          <>
            <p className="eyebrow">{SITE_NAME}</p>
            <h2>{extra?.[2]} guide</h2>
            <p>{extra?.[1]}</p>
            <nav aria-label="Useful typing links">
              <a href="/">Typing Test</a>
              <a href="/typing-practice/">Typing Practice</a>
              <a href="/wpm-calculator/">WPM Calculator</a>
              <a href="/10-key-typing-test/">10-Key Test</a>
            </nav>
          </>
        )}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                name: seo?.title ?? extra?.[0],
                description: seo?.description ?? extra?.[1],
                url: absoluteUrl(path),
                isAccessibleForFree: true,
                inLanguage: "en-US",
                publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") }
              },
              ...(path !== "/" ? [{
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: seo?.h1 ?? extra?.[2] ?? SITE_NAME, item: absoluteUrl(path) }
                ]
              }] : []),
              ...(seo ? [{
                "@type": "WebApplication",
                name: seo.h1,
                url: absoluteUrl(path),
                applicationCategory: "EducationalApplication",
                operatingSystem: "Any",
                isAccessibleForFree: true,
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
              }] : []),
              ...(seo?.faqs?.length ? [{
                "@type": "FAQPage",
                mainEntity: seo.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer }
                }))
              }] : [])
            ]
          })
        }}
      />
    </>
  );
}