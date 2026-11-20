import { languagePathways } from "../src/features/revival/pathways";
import { aboutUpdated, deskSetupUpdated, editorialUpdated, guideUpdated } from "../src/lib/seo/pageDates";
import {personalities} from "../src/features/typingPersonality";
import {languages,articleLastModified,articlePath,practicePath} from "../src/features/revival/content";
import { guides } from "../src/features/editorial/guides";
import type { MetadataRoute } from "next";
import { seoPages } from "../src/seo/pages";
import { absoluteUrl, canonicalPath } from "../src/lib/seo/site";
import { typingTestLanguageAlternates, typingTestLanguagePaths } from "../src/lib/seo/localized";

export const dynamic = "force-static";

const localizedTypingPaths = new Set(Object.values(typingTestLanguagePaths).map(canonicalPath));

const contentDates = new Map<string, string>([
  ...[...localizedTypingPaths, ...languages.map(language => practicePath(language.id)), "/privacy/"]
    .map(path => [path, "2026-11-09"] as const),
  ...[
    "/typing-personality-test/", "/blog/typing-personality-test/", "/blog/best-typing-test-websites/",
    "/blog/data-entry-typing-test-for-employment/", "/blog/typing-test-on-phone-vs-keyboard/",
    "/blog/glossika-language-revival/", "/average-typing-speed/", "/learn/", "/typing-practice/",
    "/touch-typing-practice/"
  ].map(path => [path, editorialUpdated] as const),
  ...languages.map(language => [articlePath(language.id), articleLastModified(language.id)] as const),
  ...guides.map(guide => [`/blog/${guide.slug}/`, guideUpdated(guide.slug)] as const),
  ["/language-revival/", "2026-11-13"],
  ["/about/", aboutUpdated],
  ["/blog/desk-setup-for-typing/", deskSetupUpdated],
  ["/", "2026-11-15"],
  ["/blog/", "2026-11-15"],
  ["/typing-certificate/", "2026-11-15"],
  ["/contact/", "2026-10-03"],
  ["/data-entry-typing-test/", "2026-10-09"],
  ["/certificate/verify/", "2026-10-05"],
  ["/customer-service-typing-test/", "2026-10-05"],
  ...["/typing-test-for-employment/", "/1-minute-typing-test/", "/3-minute-typing-test/",
    "/5-minute-typing-test/", "/10-minute-typing-test/", "/numeric-keypad-test/", "/10-key-typing-test/",
    "/kph-typing-test/", "/wpm-calculator/"].map(path => [path, "2026-10-03"] as const),
  ...[1, 2, 3].map(count => [`/${count}-page-typing-test/`, "2026-09-23"] as const),
]);

const supportingIndexableRoutes = [
  "/blog/desk-setup-for-typing/",
  "/blog/glossika-language-revival/",
  "/typing-personality-test/", "/blog/typing-personality-test/",
  "/blog/hawaiian-language-revival/",
  "/blog/typing-test-on-phone-vs-keyboard/",
  "/customer-service-typing-test/",
  "/certificate/verify/",
  "/practice/weak-keys/",
  "/learn/",
  "/learn/home-row/",
  "/learn/top-row/",
  "/learn/bottom-row/",
  "/learn/capital-letters/",
  "/learn/punctuation/",
  "/learn/numbers/",
  "/rhythm/",
  "/typing-test/code/",
  "/typing-test-for-kids/",
  "/typing-test-for-students/",
  "/typing-test-for-employment/",
  "/data-entry-practice/",
  "/data-entry-practice/alphanumeric/",
  "/data-entry-practice/names-addresses/",
  "/data-entry-practice/currency-dates/",
  "/data-entry-practice/invoices-orders/",
  "/certificate/sample/",
  "/blog/",
  "/blog/data-entry-typing-test-for-employment/",
  "/blog/best-typing-test-websites/",
  "/educators/",
  "/professionals/",
  "/about/",
  "/privacy/",
  "/contact/",
  "/terms/",
  typingTestLanguagePaths.fr,
  typingTestLanguagePaths.it,
  typingTestLanguagePaths.hi,
  typingTestLanguagePaths.es,
  typingTestLanguagePaths.de,
  typingTestLanguagePaths.pt,
  typingTestLanguagePaths.ru,
  typingTestLanguagePaths.fil,
  typingTestLanguagePaths.haw
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...languagePathways.flatMap(l => [`/language-revival/${l.id}/`, ...(l.test ? [l.test] : [])]),...personalities.map(p=>`/typing-personality-test/profile/${p.slug}/`),"/language-revival/", ...languages.flatMap(l=>[articlePath(l.id),practicePath(l.id)]), ...seoPages.map((page) => page.path), ...supportingIndexableRoutes, ...guides.map(guide => `/blog/${guide.slug}/`)];
  return [...new Set(paths.map(canonicalPath))].filter(path => path !== "/typing-test/").map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(contentDates.get(path) ?? "2026-09-20"),
    ...(localizedTypingPaths.has(path) ? { alternates: { languages: typingTestLanguageAlternates } } : {})
  }));
}
