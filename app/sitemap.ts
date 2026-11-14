import {personalities} from "../src/features/typingPersonality";
import {languages,articlePath,practicePath} from "../src/features/revival/content";
import { guides } from "../src/features/editorial/guides";
import type { MetadataRoute } from "next";
import { seoPages } from "../src/seo/pages";
import { absoluteUrl, canonicalPath } from "../src/lib/seo/site";
import { typingTestLanguageAlternates, typingTestLanguagePaths } from "../src/lib/seo/localized";

export const dynamic = "force-static";

// The public SEO pages received substantial content, metadata, schema, and
// internal-link updates in the September 20 release. Keep this date honest:
// Google may use lastmod when it matches a significant page update.
const SEO_CONTENT_LAST_MODIFIED = new Date("2026-09-20T00:00:00.000Z");
const LOCALIZED_CONTENT_LAST_MODIFIED = new Date("2026-10-12T00:00:00.000Z");
const NEW_TEST_CONTENT_LAST_MODIFIED = new Date("2026-09-23T00:00:00.000Z");
const addedPaths = new Set(["/customer-service-typing-test/", "/certificate/verify/"]);
const keywordUpdatedPaths = new Set(["/", "/typing-test/", "/data-entry-typing-test/"]);
const updatedPaths = new Set(["/", "/about/", "/contact/", "/privacy/", "/blog/", "/data-entry-typing-test/", "/typing-test-for-employment/", "/1-minute-typing-test/", "/3-minute-typing-test/", "/5-minute-typing-test/", "/10-minute-typing-test/", "/numeric-keypad-test/", "/10-key-typing-test/", "/kph-typing-test/", "/average-typing-speed/", "/wpm-calculator/"]);
const localizedTypingPaths = new Set(Object.values(typingTestLanguagePaths).map(canonicalPath));

const auditUpdatedPaths = new Set([
  "/", "/about/", "/blog/", "/typing-personality-test/", "/blog/typing-personality-test/",
  "/blog/best-typing-test-websites/", "/blog/data-entry-typing-test-for-employment/",
  "/blog/typing-test-on-phone-vs-keyboard/", "/blog/glossika-language-revival/",
  "/average-typing-speed/", "/learn/", "/typing-practice/", "/touch-typing-practice/",
  ...guides.map(guide => `/blog/${guide.slug}/`), ...languages.map(language => articlePath(language.id))
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
  const paths = [...personalities.map(p=>`/typing-personality-test/profile/${p.slug}/`),"/language-revival/", ...languages.flatMap(l=>[articlePath(l.id),practicePath(l.id)]), ...seoPages.map((page) => page.path), ...supportingIndexableRoutes, ...guides.map(guide => `/blog/${guide.slug}/`)];
  return [...new Set(paths.map(canonicalPath))].filter(path => path !== "/typing-test/").map((path) => ({
    url: absoluteUrl(path),
    lastModified: path === "/blog/desk-setup-for-typing/" ? new Date("2026-11-13T00:00:00Z") : auditUpdatedPaths.has(path) ? new Date("2026-11-12T00:00:00Z") : (path === "/blog/glossika-language-revival/" || path === "/privacy/" || path === "/blog/" || localizedTypingPaths.has(path) || path === "/language-revival/" || languages.some(l=>path===articlePath(l.id)||path===practicePath(l.id))) ? new Date("2026-11-09T00:00:00Z") : (path === "/language-revival/" || languages.some(l=>path===articlePath(l.id)||path===practicePath(l.id))) ? new Date("2026-11-08T00:00:00Z") : (["/typing-personality-test/", "/blog/typing-personality-test/"].includes(path) || path === "/blog/typing-test-on-phone-vs-keyboard/" || path === "/blog/" || guides.some(guide => path === `/blog/${guide.slug}/`)) ? new Date("2026-10-28T00:00:00Z") : [typingTestLanguagePaths.fil, typingTestLanguagePaths.haw, "/blog/hawaiian-language-revival/", "/blog/", "/blog/best-typing-test-websites/", "/blog/data-entry-typing-test-for-employment/", ...guides.map(guide => `/blog/${guide.slug}/`)].some(route => route === path) ? new Date("2026-10-27T00:00:00Z") : keywordUpdatedPaths.has(path) ? new Date("2026-10-09T00:00:00Z") : addedPaths.has(path) ? new Date("2026-10-05T00:00:00Z") : updatedPaths.has(path) || guides.some(guide => path === `/blog/${guide.slug}/`) ? new Date("2026-10-03T00:00:00Z") : localizedTypingPaths.has(path) ? LOCALIZED_CONTENT_LAST_MODIFIED
      : path === "/" || /^\/[123]-page-typing-test\/$/.test(path) ? NEW_TEST_CONTENT_LAST_MODIFIED
      : SEO_CONTENT_LAST_MODIFIED,
    ...(localizedTypingPaths.has(path) ? { alternates: { languages: typingTestLanguageAlternates } } : {})
  }));
}
