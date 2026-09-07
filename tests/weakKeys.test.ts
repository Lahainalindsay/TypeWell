import { describe, expect, it } from "vitest";
import { analyzeWeakCombinations, analyzeWeakKeys, generateWeakKeyExercise } from "../src/engine/weakKeys";

describe("weak-key analysis", () => {
  it("sorts weak keys by error rate", () => {
    const result = analyzeWeakKeys([
      { expected: "r", actual: "t", correct: false, timestamp: 1 },
      { expected: "r", actual: "r", correct: true, timestamp: 2 },
      { expected: "p", actual: "o", correct: false, timestamp: 3 },
      { expected: "p", actual: "o", correct: false, timestamp: 4 }
    ]);
    expect(result[0].key).toBe("p");
  });

  it("tracks difficult bigrams", () => {
    const result = analyzeWeakCombinations("there", [
      { expected: "t", actual: "t", correct: true, timestamp: 1 },
      { expected: "h", actual: "j", correct: false, timestamp: 2 },
      { expected: "e", actual: "e", correct: true, timestamp: 3 }
    ]);
    expect(result[0].combo).toBe("th");
  });

  it("generates exercises that include weak keys without using only weak keys", () => {
    const text = generateWeakKeyExercise(["r", "p"], "asdf", 80);
    expect(text).toContain("r");
    expect(text).toContain("p");
    expect(text).toMatch(/[asdf]/);
  });
});
