import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
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

  it("keeps WPMTest branding and page H1s distinct", () => {
    const serialized = JSON.stringify(seoPages);
    expect(serialized.toLowerCase()).not.toContain("typewell");
    const h1s = seoPages.map((page) => page.h1);
    expect(new Set(h1s).size).toBe(h1s.length);
  });

  it("server-renders the application instead of hiding it behind a client-only boundary", () => {
    const routeSource = readFileSync(join(process.cwd(), "app/[[...slug]]/page.tsx"), "utf8");
    const clientSource = readFileSync(join(process.cwd(), "src/ClientApp.tsx"), "utf8");
    expect(routeSource).toContain("<WPMTestApp initialPath={path} />");
    expect(clientSource).not.toContain("ssr: false");
  });

  it("keeps every generated lesson route backed by page metadata instead of a 404 fallback", () => {
    const routeSource = readFileSync(join(process.cwd(), "app/[[...slug]]/page.tsx"), "utf8");
    for (const path of [
      "/learn/home-row",
      "/learn/top-row",
      "/learn/bottom-row",
      "/learn/capital-letters",
      "/learn/punctuation",
      "/learn/numbers"
    ]) {
      expect(routeSource, path).toContain(`["${path}", [`);
    }
  });

  it("uses secondary headings when an interactive tool is embedded below a page H1", () => {
    const appSource = readFileSync(join(process.cwd(), "src/App.tsx"), "utf8");
    expect(appSource).toContain('heading={embedded ? "h2" : undefined}');
    expect(appSource).toContain('title="Word Rush" heading="h2"');

    for (const path of [
      "app/typing-test-for-kids/page.tsx",
      "app/typing-test-for-students/page.tsx",
      "app/typing-test-for-employment/page.tsx",
      "app/typing-test-with-numbers/page.tsx",
      "app/typing-test-with-punctuation/page.tsx",
      "app/typing-test/code/page.tsx",
      "app/data-entry-practice/page.tsx",
      "app/data-entry-practice/alphanumeric/page.tsx",
      "app/data-entry-practice/currency-dates/page.tsx",
      "app/data-entry-practice/invoices-orders/page.tsx",
      "app/data-entry-practice/names-addresses/page.tsx"
    ]) {
      expect(readFileSync(join(process.cwd(), path), "utf8"), path).toContain(" embedded");
    }
  });

  it("does not publish crawlable links to client-only practice states", () => {
    const appSource = readFileSync(join(process.cwd(), "src/App.tsx"), "utf8");
    const professionalsSource = readFileSync(join(process.cwd(), "app/professionals/page.tsx"), "utf8");
    expect(appSource).not.toContain('["/practice/numbers",');
    expect(appSource).not.toContain('["/practice/punctuation",');
    expect(professionalsSource).not.toContain('["/practice/code",');
    expect(professionalsSource).toContain('["/typing-test/code/",');
  });

  it("keeps priority SEO landing pages substantive", () => {
    const priorityPaths = [
      "/1-minute-typing-test/",
      "/3-minute-typing-test/",
      "/5-minute-typing-test/",
      "/10-minute-typing-test/",
      "/typing-practice/",
      "/kph-typing-test/",
      "/wpm-calculator/",
      "/average-typing-speed/"
    ];
    for (const path of priorityPaths) {
      const page = seoPages.find((entry) => entry.path === path);
      expect(page, path).toBeTruthy();
      const text = [page!.intro, ...page!.content, ...(page!.faqs ?? []).flatMap((faq) => [faq.question, faq.answer])].join(" ");
      expect(text.trim().split(/\s+/).length, path).toBeGreaterThanOrEqual(350);
    }
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
