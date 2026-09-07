import { describe, expect, it } from "vitest";
import { applyInput, calculateConsistency, calculateMetrics, createSession } from "../src/engine/metrics";
import type { Keystroke } from "../src/engine/types";

describe("typing metrics", () => {
  it("calculates WPM using 5 characters per word", () => {
    let state = createSession("abcdefghij");
    Array.from("abcdefghij").forEach((char, index) => {
      state = applyInput(state, char, index * 6000);
    });
    const metrics = calculateMetrics(state, 60000);
    expect(metrics.correctCharacters).toBe(10);
    expect(metrics.wpm).toBe(2.2);
  });

  it("calculates raw WPM and accuracy from keystrokes", () => {
    let state = createSession("abcde");
    ["a", "x", "c", "d", "e"].forEach((char, index) => {
      state = applyInput(state, char, index * 1000);
    });
    const metrics = calculateMetrics(state, 5000);
    expect(metrics.rawWpm).toBe(15);
    expect(metrics.accuracy).toBe(80);
    expect(metrics.uncorrectedErrors).toBe(1);
  });

  it("handles zero elapsed time", () => {
    const metrics = calculateMetrics(createSession("abc"), 0);
    expect(metrics.wpm).toBe(0);
    expect(metrics.rawWpm).toBe(0);
    expect(metrics.accuracy).toBe(100);
  });

  it("marks corrected errors after backspace", () => {
    let state = createSession("ab");
    state = applyInput(state, "x", 100);
    state = applyInput(state, "Backspace", 200);
    state = applyInput(state, "a", 300);
    const metrics = calculateMetrics(state, 1000);
    expect(metrics.correctedErrors).toBe(1);
    expect(metrics.uncorrectedErrors).toBe(0);
  });

  it("scores steady typing higher than uneven typing", () => {
    const steady: Keystroke[] = Array.from({ length: 32 }, (_, i) => ({ expected: "a", actual: "a", correct: true, timestamp: i * 100 }));
    const uneven: Keystroke[] = Array.from({ length: 32 }, (_, i) => ({ expected: "a", actual: "a", correct: true, timestamp: i < 16 ? i * 60 : 960 + (i - 15) * 260 }));
    expect(calculateConsistency(steady)).toBeGreaterThan(calculateConsistency(uneven));
  });
});
