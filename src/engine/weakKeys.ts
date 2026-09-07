import type { Keystroke } from "./types";

export interface WeakKey {
  key: string;
  attempts: number;
  errors: number;
  errorRate: number;
}

export interface WeakCombination {
  combo: string;
  attempts: number;
  errors: number;
  errorRate: number;
}

export function analyzeWeakKeys(strokes: Keystroke[]): WeakKey[] {
  const map = new Map<string, { attempts: number; errors: number }>();
  for (const stroke of strokes) {
    const key = stroke.expected;
    const record = map.get(key) ?? { attempts: 0, errors: 0 };
    record.attempts += 1;
    if (!stroke.correct) record.errors += 1;
    map.set(key, record);
  }
  return [...map.entries()]
    .map(([key, record]) => ({ key, ...record, errorRate: record.attempts ? (record.errors / record.attempts) * 100 : 0 }))
    .filter((item) => item.attempts >= 2 && item.errors > 0)
    .sort((a, b) => b.errorRate - a.errorRate || b.errors - a.errors)
    .slice(0, 10);
}

export function analyzeWeakCombinations(target: string, strokes: Keystroke[]): WeakCombination[] {
  const map = new Map<string, { attempts: number; errors: number }>();
  for (let i = 1; i < strokes.length; i += 1) {
    const expectedIndex = Math.min(i, target.length - 1);
    const bigram = target.slice(expectedIndex - 1, expectedIndex + 1);
    if (bigram.length < 2 || /\s/.test(bigram)) continue;
    const record = map.get(bigram) ?? { attempts: 0, errors: 0 };
    record.attempts += 1;
    if (!strokes[i].correct || !strokes[i - 1].correct) record.errors += 1;
    map.set(bigram, record);
  }
  return [...map.entries()]
    .map(([combo, record]) => ({ combo, ...record, errorRate: record.attempts ? (record.errors / record.attempts) * 100 : 0 }))
    .filter((item) => item.errors > 0)
    .sort((a, b) => b.errorRate - a.errorRate || b.errors - a.errors)
    .slice(0, 10);
}

export function generateWeakKeyExercise(weakKeys: string[], comfortable = "asdfjkl; eiruthon", length = 120): string {
  const keys = weakKeys.length ? weakKeys.join("") : "erthasdfjkl;";
  const words = ["steady", "clean", "focus", "reach", "return", "index", "home", "flow", "accurate"];
  let output = "";
  for (let i = 0; output.length < length; i += 1) {
    const weak = keys[i % keys.length];
    const base = words[i % words.length];
    const comfort = comfortable[(i * 3) % comfortable.length] ?? "e";
    output += `${base}${weak}${comfort} `;
  }
  return output.trim().slice(0, length);
}
