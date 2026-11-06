import { describe, expect, it } from "vitest";
import { revivalLanguages } from "../src/features/editorial/revivalLanguages";
import { readFileSync } from "node:fs";

describe("language revival editorial collection", () => {
 it("covers all nine currently free Glossika minoritized-language courses plus Hawaiian and Irish", () => {
  expect(revivalLanguages).toHaveLength(11);
  expect(revivalLanguages.filter(language => language.glossika)).toHaveLength(10);
  expect(revivalLanguages.filter(language => language.slug === "hawaiian")[0]?.testPath).toBe("/haw/hawaiian-typing-test/");
  for (const slug of ["welsh","manx","scottish-gaelic","catalan","taiwanese-taigi","hakka-sixian","hakka-hailu","wenzhounese","sorani-kurdish"]) {
   expect(revivalLanguages.find(language => language.slug === slug)?.glossika).toBe(true);
  }
 });
 it("does not invent working typing tests for languages without verified passages", () => {
  expect(revivalLanguages.filter(language => language.testPath).map(language => language.slug)).toEqual(["hawaiian"]);
 });
 it("provides distinct slugs, researched context and sources", () => {
  expect(new Set(revivalLanguages.map(language => language.slug)).size).toBe(revivalLanguages.length);
  for (const language of revivalLanguages) {
   expect(language.introduction.length).toBeGreaterThan(90);
   expect(language.history.length).toBeGreaterThan(90);
   expect(language.writing.length).toBeGreaterThan(90);
   expect(language.sources.length).toBeGreaterThan(0);
   expect(language.sources.every(source => source.url.startsWith("https://"))).toBe(true);
  }
 });
 it("connects the collection to the sitemap and site navigation", () => {
  expect(readFileSync("app/sitemap.ts","utf8")).toContain("/language-revival/");
  expect(readFileSync("src/components/SiteShell.tsx","utf8")).toContain("Language Revival Collection");
 });
});
