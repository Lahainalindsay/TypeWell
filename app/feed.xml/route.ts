import { guides } from "../../src/features/editorial/guides";
import { personalityArticleTitle } from "../../src/features/editorial/personalityArticle";
import { articlePath, languages } from "../../src/features/revival/content";
import { absoluteUrl } from "../../src/lib/seo/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const entries = [
    { path: "/blog/glossika-language-revival/", title: "The Story Doesn’t End at the Keyboard" },
    { path: "/blog/typing-personality-test/", title: personalityArticleTitle },
    { path: "/blog/typing-test-on-phone-vs-keyboard/", title: "Phone vs Keyboard Typing Speed" },
    { path: "/blog/best-typing-test-websites/", title: "The Best Free Typing Test Websites, Compared" },
    { path: "/blog/data-entry-typing-test-for-employment/", title: "Data Entry Typing Test for Employment" },
    ...guides.map(guide => ({ path: `/blog/${guide.slug}/`, title: guide.title })),
    ...languages.map(language => ({ path: articlePath(language.id), title: `${language.name} Language Revival` }))
  ];

  const items = entries.map(({ path, title }) => {
    const url = escapeXml(absoluteUrl(path));
    return `<item><title>${escapeXml(title)}</title><link>${url}</link><guid>${url}</guid></item>`;
  }).join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>WPMTest Articles</title>
<link>${absoluteUrl("/blog/")}</link>
<description>Typing guides, keyboard experiments, and language revival stories.</description>
<language>en</language>
<atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
