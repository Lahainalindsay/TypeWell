import type { Lesson } from "../data/lessons";

export function nextLessonId(lessons: Lesson[], completedIds: string[]): string {
  const completed = new Set(completedIds);
  return lessons.find((lesson) => !completed.has(lesson.id))?.id ?? lessons[lessons.length - 1]?.id ?? "";
}

export function isLessonPassed(wpm: number, accuracy: number, targetWpm: number, targetAccuracy: number): boolean {
  return wpm >= targetWpm && accuracy >= targetAccuracy;
}
