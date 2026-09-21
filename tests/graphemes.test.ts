import { describe, expect, it } from "vitest";
import { splitGraphemes } from "../src/engine/graphemes";
import { applyInput, calculateMetrics, createSession } from "../src/engine/metrics";

describe("Unicode grapheme typing", () => {
  it("keeps a Devanagari consonant and vowel sign in one visible unit", () => {
    expect(splitGraphemes("कि")).toEqual(["कि"]);
  });

  it("accepts a composed Hindi grapheme as one correct input", () => {
    let session = createSession("कि");
    session = applyInput(session, "कि", 100);

    expect(session.typed).toEqual(["कि"]);
    expect(session.statuses).toEqual(["correct"]);
    expect(session.endedAt).toBe(100);
    expect(calculateMetrics(session, 200).correctCharacters).toBe(1);
  });

  it("normalizes canonically equivalent accented characters", () => {
    let session = createSession("é");
    session = applyInput(session, "e\u0301", 100);
    expect(session.statuses).toEqual(["correct"]);
  });
});
