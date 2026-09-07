import { describe, expect, it } from "vitest";
import { nextLessonId, isLessonPassed } from "../src/engine/lessons";
import { lessons } from "../src/data/lessons";
import { defaultProgress, exportProgress, validateProgress } from "../src/storage/progress";

describe("lesson progression and storage", () => {
  it("chooses the next incomplete lesson", () => {
    expect(nextLessonId(lessons, [lessons[0].id])).toBe(lessons[1].id);
  });

  it("requires speed and accuracy to pass a lesson", () => {
    expect(isLessonPassed(20, 96, 18, 95)).toBe(true);
    expect(isLessonPassed(20, 90, 18, 95)).toBe(false);
  });

  it("validates exported progress JSON", () => {
    const restored = validateProgress(JSON.parse(exportProgress(defaultProgress)));
    expect(restored.version).toBe(1);
    expect(restored.settings.theme).toBe("dark");
  });

  it("rejects invalid import data", () => {
    expect(() => validateProgress({ version: 2 })).toThrow();
  });
});
