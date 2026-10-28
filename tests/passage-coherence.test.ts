import { describe, expect, it, vi } from "vitest";
import { buildPageTestText, buildPracticeText, categoryPassages } from "../src/data/texts";

describe("coherent typing passages", () => {
  it.each(["Sentences", "Fun Facts", "Tiny Dramas"] as const)("keeps one complete %s passage in authored order, including long tests", (mode) => {
    for (const choice of [0, 0.99]) {
      const random = vi.spyOn(Math, "random").mockReturnValue(choice);
      try {
        const expected = categoryPassages[mode][Math.floor(choice * categoryPassages[mode].length)];
        for (const count of [10, 50, 120, 540, 1080]) {
          const result = buildPracticeText(mode, count);
          expect(result.length).toBeGreaterThanOrEqual(count * 6);
          expect(result.split(expected).join("").trim()).toBe("");
          expect(result).not.toMatch(/\d/);
          expect(result.endsWith(".")).toBe(true);
        }
      } finally { random.mockRestore(); }
    }
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
