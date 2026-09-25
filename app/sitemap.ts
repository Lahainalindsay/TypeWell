import type { MetadataRoute } from "next";
import { seoPages } from "../src/seo/pages";
import { absoluteUrl, canonicalPath } from "../src/lib/seo/site";
import { typingTestLanguageAlternates, typingTestLanguagePaths } from "../src/lib/seo/localized";

export const dynamic = "force-static";

// The public SEO pages received substantial content, metadata, schema, and
// internal-link updates in the September 20 release. Keep this date honest:
// Google may use lastmod when it matches a significant page update.
const SEO_CONTENT_LAST_MODIFIED = new Date("2026-09-20T00:00:00.000Z");
const LOCALIZED_CONTENT_LAST_MODIFIED = new Date("2026-09-23T00:00:00.000Z");
const NEW_TEST_CONTENT_LAST_MODIFIED = new Date("2026-09-23T00:00:00.000Z");
const localizedTypingPaths = new Set(Object.values(typingTestLanguagePaths).map(canonicalPath));

const supportingIndexableRoutes = [
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
  typingTestLanguagePaths.ru
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...seoPages.map((page) => page.path), ...supportingIndexableRoutes];
  return [...new Set(paths.map(canonicalPath))].map((path) => ({
    url: absoluteUrl(path),
    lastModified: localizedTypingPaths.has(path) ? LOCALIZED_CONTENT_LAST_MODIFIED
      : path === "/" || /^\/[123]-page-typing-test\/$/.test(path) ? NEW_TEST_CONTENT_LAST_MODIFIED
      : SEO_CONTENT_LAST_MODIFIED,
    ...(localizedTypingPaths.has(path) ? { alternates: { languages: typingTestLanguageAlternates } } : {})
  }));
}
