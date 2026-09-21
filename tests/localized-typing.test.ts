import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sitemap from "../app/sitemap";
import { localizedTypingContents } from "../src/features/localized/content";
import { localizedTypingMetadata, localizedTypingSchema } from "../src/features/localized/seo";
import { typingTestLanguageAlternates, typingTestLanguagePaths } from "../src/lib/seo/localized";
import { absoluteUrl } from "../src/lib/seo/site";

describe("localized typing tests", () => {
  it("publishes French, Italian, and Hindi routes with reciprocal language alternates", () => {
    const entries = sitemap();
    for (const content of Object.values(localizedTypingContents)) {
      const entry = entries.find((candidate) => candidate.url === absoluteUrl(content.path));
      expect(entry, content.lang).toBeTruthy();
      expect(entry?.alternates?.languages).toEqual(typingTestLanguageAlternates);

      const metadata = localizedTypingMetadata(content);
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(content.path));
      expect(metadata.alternates?.languages).toEqual(typingTestLanguageAlternates);
      expect(metadata.robots).toEqual({ index: true, follow: true });
    }
  });

  it("keeps the English typing test in the same hreflang cluster", () => {
    const entry = sitemap().find((candidate) => candidate.url === absoluteUrl(typingTestLanguagePaths.en));
    expect(entry?.alternates?.languages).toEqual(typingTestLanguageAlternates);
  });

  it("provides localized passages, keyboard guidance, FAQs, and certificates", () => {
    for (const content of Object.values(localizedTypingContents)) {
      expect(content.passages.length, content.lang).toBeGreaterThanOrEqual(5);
      expect(content.keyboard.rows.length, content.lang).toBeGreaterThanOrEqual(4);
      expect(content.keyboard.steps.length, content.lang).toBeGreaterThanOrEqual(3);
      expect(content.faqs.length, content.lang).toBeGreaterThanOrEqual(7);
      expect(content.certificate.titleMain.length, content.lang).toBeGreaterThan(3);

      const schema = JSON.stringify(localizedTypingSchema(content));
      expect(schema).toContain(`\"inLanguage\":\"${content.locale}\"`);
      expect(schema).toContain("FAQPage");
    }
  });

  it("backs each localized URL with a dedicated static page", () => {
    for (const relativePath of [
      "app/fr/test-de-vitesse-de-frappe/page.tsx",
      "app/it/test-di-velocita-di-scrittura/page.tsx",
      "app/hi/hindi-typing-test/page.tsx"
    ]) {
      expect(existsSync(join(process.cwd(), relativePath)), relativePath).toBe(true);
      expect(readFileSync(join(process.cwd(), relativePath), "utf8")).toContain("localizedTypingMetadata");
    }
  });
});
