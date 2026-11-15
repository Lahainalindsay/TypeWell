import { describe, expect, it } from "vitest";
import { buildPageTestText, buildPracticeText, categoryPassages } from "../src/data/texts";

describe("coherent typing passages", () => {
  it.each(["Sentences", "Fun Facts", "Tiny Dramas"] as const)("cycles through complete %s passages before repeating", (mode) => {
    const passages = categoryPassages[mode];
    expect(passages.length).toBeGreaterThanOrEqual(6);
    const result = buildPracticeText(mode, 2500, "", () => 0);
    const seen: string[] = [];
    let remainder = result;
    while (remainder) {
      const next = passages.find(passage => remainder.startsWith(passage));
      expect(next).toBeDefined();
      if (!next) break;
      seen.push(next);
      remainder = remainder.slice(next.length).trimStart();
    }
    expect(result.length).toBeGreaterThanOrEqual(2500 * 6);
    expect(new Set(seen.slice(0, passages.length)).size).toBe(passages.length);
    expect(seen.slice(1).some((passage, index) => passage === seen[index])).toBe(false);
    expect(result).not.toMatch(/\d/);
  });

  it("keeps page stories chronological across page lengths", () => {
    const one = buildPageTestText(1);
    expect(one.startsWith("The morning light reached the kitchen table")).toBe(true);
    expect(one.indexOf("She wanted to finish a letter")).toBeLessThan(one.indexOf("At the library"));
    expect(buildPageTestText(2).startsWith(one)).toBe(true);
    expect(buildPageTestText(3).startsWith(buildPageTestText(2))).toBe(true);
  });

  it("preserves custom text and dedicated numeric modes", () => {
    expect(buildPracticeText("Custom Text", 50, "My own passage.")).toBe("My own passage.");
    expect(buildPracticeText("Numbers")).toMatch(/\d/);
    expect(buildPracticeText("Numeric Keypad")).toMatch(/\d/);
  });
});
