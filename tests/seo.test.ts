import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { seoPages } from "../src/seo/pages";
import { absoluteUrl, canonicalPath, SITE_ORIGIN } from "../src/lib/seo/site";

describe("SEO route registry", () => {
  it("generates unique canonical sitemap URLs from public routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(`${SITE_ORIGIN}/`);
    expect(urls).toContain(`${SITE_ORIGIN}/1-minute-typing-test/`);
    expect(urls).toContain(`${SITE_ORIGIN}/data-entry-typing-test/`);
    expect(urls).toContain(`${SITE_ORIGIN}/blog/data-entry-typing-test-for-employment/`);
    expect(urls).not.toContain(`${SITE_ORIGIN}/progress/`);
    expect(urls).not.toContain(`${SITE_ORIGIN}/settings/`);
  });

  it("normalizes canonical paths with a leading and trailing slash", () => {
    expect(canonicalPath("data-entry-typing-test")).toBe("/data-entry-typing-test/");
    expect(canonicalPath("/data-entry-typing-test/")).toBe("/data-entry-typing-test/");
    expect(canonicalPath("/")).toBe("/");
    expect(absoluteUrl(canonicalPath("data-entry-typing-test"))).toBe(
      `${SITE_ORIGIN}/data-entry-typing-test/`
    );
  });

  it("keeps primary SEO registry paths unique", () => {
    const paths = seoPages.map((page) => page.path.replace(/\/$/, "") || "/");
    expect(new Set(paths).size).toBe(paths.length);
    for (const page of seoPages) {
      expect(page.title.length).toBeGreaterThan(10);
      expect(page.description.length).toBeGreaterThan(40);
      expect(page.h1.length).toBeGreaterThan(3);
      expect(page.related.length).toBeGreaterThan(0);
    }
  });
});
