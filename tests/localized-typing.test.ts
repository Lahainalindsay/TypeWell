import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sitemap from "../app/sitemap";
import { localizedTypingContents } from "../src/features/localized/content";
import { localizedTypingMetadata, localizedTypingSchema } from "../src/features/localized/seo";
import { typingTestLanguageAlternates, typingTestLanguagePaths } from "../src/lib/seo/localized";
import { localizedKeyboardKey } from "../src/features/localized/keyboardKey";
import { applyInput, createSession } from "../src/engine/metrics";
import { splitGraphemes } from "../src/engine/graphemes";
import { absoluteUrl } from "../src/lib/seo/site";

describe("localized typing tests", () => {
  it("publishes every localized route with reciprocal language alternates", () => {
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

  it("uses the matching script and distinctive keys for the new layouts", () => {
    expect(localizedTypingContents.es.passages.join(" ")).toMatch(/[¿ñá]/i);
    expect(localizedTypingContents.es.keyboard.rows.flat()).toContain("Ñ");
    expect(localizedTypingContents.de.passages.join(" ")).toMatch(/[äöüß]/i);
    expect(localizedTypingContents.de.keyboard.rows[1].slice(4, 6)).toEqual(["T", "Z"]);
    expect(localizedTypingContents.pt.passages.join(" ")).toMatch(/[ãç]/i);
    expect(localizedTypingContents.pt.keyboard.rows.flat()).toContain("Ç");
    expect(localizedTypingContents.ru.passages.join(" ")).toMatch(/[А-Яа-я]/);
    expect(localizedTypingContents.ru.keyboard.rows[1].slice(0, 6)).toEqual(["Й", "Ц", "У", "К", "Е", "Н"]);
  });

  it("backs each localized URL with a dedicated static page", () => {
    for (const relativePath of [
      "app/fr/test-de-vitesse-de-frappe/page.tsx",
      "app/it/test-di-velocita-di-scrittura/page.tsx",
      "app/hi/hindi-typing-test/page.tsx",
      "app/es/prueba-de-velocidad-de-escritura/page.tsx",
      "app/de/schreibtest/page.tsx",
      "app/pt/teste-de-digitacao/page.tsx",
      "app/ru/test-skorosti-pechati/page.tsx",
      "app/fil/filipino-typing-test/page.tsx",
      "app/haw/hawaiian-typing-test/page.tsx"
    ]) {
      expect(existsSync(join(process.cwd(), relativePath)), relativePath).toBe(true);
      expect(readFileSync(join(process.cwd(), relativePath), "utf8")).toContain("localizedTypingMetadata");
    }
  });
});


describe("Pacific language typing", () => {
  it("scores every Filipino and Hawaiian passage correctly with Unicode input", () => {
    for (const content of [localizedTypingContents.fil, localizedTypingContents.haw]) {
      for (const passage of content.passages) {
        let state = createSession(passage);
        splitGraphemes(passage.normalize("NFD")).forEach((key, index) => {
          state = applyInput(state, key, 100 + index * 20);
        });
        expect(state.statuses.every(status => status === "correct")).toBe(true);
        expect(state.endedAt).not.toBeNull();
      }
    }
  });

  it("maps Hawaiian macrons and okina to their QWERTY base positions", () => {
    const rows = localizedTypingContents.haw.keyboard.rows;
    for (const [character, expected] of [["ā", "A"], ["ē", "E"], ["ī", "I"], ["ō", "O"], ["ū", "U"], ["ʻ", "ʻ"]]) {
      expect(localizedKeyboardKey(character, rows, "haw")).toBe(expected);
    }
    const passages = localizedTypingContents.haw.passages.join(" ");
    for (const character of "ʻāēīōū") expect(passages).toContain(character);
  });

  it("does not silently substitute apostrophes or plain vowels in Hawaiian", () => {
    expect(applyInput(createSession("ʻ"), "'", 100).statuses).toEqual(["incorrect"]);
    expect(applyInput(createSession("ā"), "a", 100).statuses).toEqual(["incorrect"]);
    expect(applyInput(createSession("ā"), "a\u0304", 100).statuses).toEqual(["correct"]);
  });
});
