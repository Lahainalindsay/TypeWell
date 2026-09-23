import { describe, expect, it } from "vitest";
import { buildPageTestText } from "../src/data/texts";
import { applyInput, calculateMetrics, createSession } from "../src/engine/metrics";
import { splitGraphemes } from "../src/engine/graphemes";

describe("page-length typing tests", () => {
  it("provides increasingly long passages that end at sentence boundaries", () => {
    for (const pages of [1, 2, 3] as const) {
      const passage = buildPageTestText(pages);
      expect(passage.split(/\s+/).length).toBeGreaterThanOrEqual(pages * 250);
      expect(passage.split(/\s+/).length).toBeLessThan(pages * 250 + 30);
      expect(passage.endsWith(".")).toBe(true);
    }
  });

  it("ends when the complete passage is typed without a timed cutoff", () => {
    const target = buildPageTestText(1);
    let session = createSession(target);
    for (const [index, character] of splitGraphemes(target).entries()) {
      session = applyInput(session, character, 1000 + index * 100);
    }
    expect(session.endedAt).not.toBeNull();
    expect(calculateMetrics(session).accuracy).toBe(100);
  });
});
