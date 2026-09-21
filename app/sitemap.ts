import type { MetadataRoute } from "next";
import { seoPages } from "../src/seo/pages";
import { absoluteUrl, canonicalPath } from "../src/lib/seo/site";

export const dynamic = "force-static";

// The public SEO pages received substantial content, metadata, schema, and
// internal-link updates in the September 20 release. Keep this date honest:
// Google may use lastmod when it matches a significant page update.
const SEO_CONTENT_LAST_MODIFIED = new Date("2026-09-20T00:00:00.000Z");

const supportingIndexableRoutes = [
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
  "/educators/",
  "/professionals/",
  "/about/",
  "/privacy/",
  "/contact/",
  "/terms/"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...seoPages.map((page) => page.path), ...supportingIndexableRoutes];
  return [...new Set(paths.map(canonicalPath))].map((path) => ({
    url: absoluteUrl(path),
    lastModified: SEO_CONTENT_LAST_MODIFIED
  }));
}
