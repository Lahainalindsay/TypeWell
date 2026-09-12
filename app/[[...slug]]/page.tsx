import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TypewellApp from "../../src/App";
import { getSeoPage, seoPages, SITE_URL } from "../../src/seo/pages";

const extraRoutes = [
  "/learn",
  "/learn/home-row",
  "/learn/top-row",
  "/learn/bottom-row",
  "/learn/capital-letters",
  "/learn/punctuation",
  "/learn/numbers",
  "/rhythm",
  "/progress",
  "/settings",
  "/about",
  "/privacy",
  "/contact",
  "/terms"
];

const extraSeo = new Map([
  ["/learn", ["Learn Touch Typing - Free Typing Lessons | Typewell", "Learn touch typing with guided lessons for home row, top row, bottom row, capitals, punctuation, numbers, and symbols.", "Learn Touch Typing"]],
  ["/rhythm", ["Typing Rhythm Trainer - Improve Speed & Consistency | Typewell", "Train typing rhythm with a visual keystroke metronome that measures early, on-beat, and late timing.", "Typing Rhythm Trainer"]],
  ["/progress", ["Typing Progress Tracker | Typewell", "Track local typing progress, best WPM, average accuracy, practice time, weak keys, and completed lessons.", "Typing Progress Tracker"]],
  ["/settings", ["Typing Trainer Settings | Typewell", "Adjust typing display, theme, keyboard guide, sound, high contrast, and reduced motion settings.", "Typing Settings"]],
  ["/about", ["About Typewell - Free Local Typing Practice", "Learn how Typewell provides free typing tests, practice tools, lessons, and local progress without an account.", "About Typewell"]],
  ["/privacy", ["Privacy Policy - Typewell Free Typing Practice", "Learn how Typewell stores typing progress locally and handles typing practice data.", "Privacy Policy"]],
  ["/contact", ["Contact Typewell - Typing Practice Support", "Contact Typewell about typing test issues, accessibility feedback, lessons, calculations, and product support.", "Contact Typewell"]],
  ["/terms", ["Terms and Disclaimer - Typewell", "Read the Typewell terms and disclaimer for free typing tests, practice tools, lessons, and locally stored results.", "Terms and Disclaimer"]]
]);

function pathFromSlug(slug?: string[]) {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

function canonicalPath(path: string) {
  return path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
}

export function generateStaticParams() {
  const paths = [...seoPages.map((page) => page.path), ...extraRoutes];
  return paths.map((path) => {
    const trimmed = path.replace(/^\/|\/$/g, "");
    return { slug: trimmed ? trimmed.split("/") : [] };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = canonicalPath(pathFromSlug(slug));
  const normalized = path.replace(/\/$/, "") || "/";
  const seo = getSeoPage(path);
  const extra = extraSeo.get(normalized);
  if (!seo && !extra) return {};
  const title = seo?.title ?? extra?.[0] ?? "Typewell";
  const description = seo?.description ?? extra?.[1] ?? "Free typing tests and typing practice.";
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website"
    },
    twitter: {
      card: "summary",
      title,
      description
    },
    robots: ["/progress", "/settings"].includes(normalized)
      ? { index: false, follow: false }
      : { index: true, follow: true }
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = canonicalPath(pathFromSlug(slug));
  const normalized = path.replace(/\/$/, "") || "/";
  const seo = getSeoPage(path);
  const extra = extraSeo.get(normalized);

  if (!seo && !extra) notFound();

  return (
    <>
      <TypewellApp initialPath={path} />
      <section className="seo-prerender" aria-label="Page information">
        {seo ? (
          <>
            <p className="eyebrow">Free typing utility</p>
            <h2>How this typing tool works</h2>
            <p>{seo.intro}</p>
            {seo.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <nav aria-label="Related typing tools">
              {seo.related.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            </nav>
          </>
        ) : (
          <>
            <p className="eyebrow">Typewell</p>
            <h2>More about this Typewell tool</h2>
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
            "@type": "WebPage",
            name: seo?.title ?? extra?.[0],
            description: seo?.description ?? extra?.[1],
            url: `${SITE_URL}${path === "/" ? "/" : path}`,
            isAccessibleForFree: true,
            inLanguage: "en-US",
            publisher: {
              "@type": "Organization",
              name: "Typewell"
            }
          })
        }}
      />
    </>
  );
}
