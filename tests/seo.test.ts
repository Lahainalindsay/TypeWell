import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import { seoPages, SITE_URL } from "../src/seo/pages";

describe("SEO route registry", () => {
  it("generates unique canonical sitemap URLs from public routes", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).toContain(`${SITE_URL}/1-minute-typing-test/`);
    expect(urls).toContain(`${SITE_URL}/data-entry-typing-test/`);
    expect(urls).not.toContain(`${SITE_URL}/progress/`);
    expect(urls).not.toContain(`${SITE_URL}/settings/`);
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
