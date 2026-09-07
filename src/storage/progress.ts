import type { Keystroke, Metrics } from "../engine/types";
import type { WeakCombination, WeakKey } from "../engine/weakKeys";

export interface SessionRecord {
  id: string;
  date: string;
  type: "lesson" | "practice" | "test" | "rhythm";
  label: string;
  metrics: Metrics;
  weakKeys: WeakKey[];
  weakCombinations: WeakCombination[];
}

export interface ProgressData {
  version: 1;
  completedLessons: string[];
  currentLesson: string;
  sessions: SessionRecord[];
  strokes: Keystroke[];
  rhythmBest: number;
  settings: {
    theme: "dark" | "light" | "system";
    showLiveMetrics: boolean;
    showKeyboard: boolean;
    showFingerGuide: boolean;
    fontSize: number;
    lineHeight: number;
    highContrast: boolean;
    reducedMotion: boolean;
    keySound: boolean;
    errorSound: boolean;
    metronome: boolean;
    volume: number;
    stopOnError: boolean;
    allowCorrections: boolean;
    smoothCaret: boolean;
  };
}

export const STORAGE_KEY = "typewell.progress.v1";

export const defaultProgress: ProgressData = {
  version: 1,
  completedLessons: [],
  currentLesson: "first-fj",
  sessions: [],
  strokes: [],
  rhythmBest: 0,
  settings: {
    theme: "dark",
    showLiveMetrics: true,
    showKeyboard: true,
    showFingerGuide: true,
    fontSize: 24,
    lineHeight: 1.75,
    highContrast: false,
    reducedMotion: false,
    keySound: false,
    errorSound: true,
    metronome: true,
    volume: 35,
    stopOnError: false,
    allowCorrections: true,
    smoothCaret: true
  }
};

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return validateProgress(JSON.parse(raw));
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function validateProgress(value: unknown): ProgressData {
  if (!value || typeof value !== "object") throw new Error("Progress file is not an object.");
  const candidate = value as Partial<ProgressData>;
  if (candidate.version !== 1) throw new Error("Unsupported progress version.");
  if (!Array.isArray(candidate.completedLessons) || !Array.isArray(candidate.sessions) || !Array.isArray(candidate.strokes)) {
    throw new Error("Progress file is missing required arrays.");
  }
  return {
    ...defaultProgress,
    ...candidate,
    settings: { ...defaultProgress.settings, ...(candidate.settings ?? {}) },
    completedLessons: candidate.completedLessons.filter((id): id is string => typeof id === "string"),
    sessions: candidate.sessions.slice(-300),
    strokes: candidate.strokes.slice(-5000)
  };
}

export function exportProgress(progress: ProgressData): string {
  return JSON.stringify(progress, null, 2);
}

export function summarizeProgress(progress: ProgressData) {
  const sessions = progress.sessions;
  const bestWpm = Math.max(0, ...sessions.map((session) => session.metrics.wpm));
  const averageWpm = sessions.length ? sessions.reduce((sum, session) => sum + session.metrics.wpm, 0) / sessions.length : 0;
  const averageAccuracy = sessions.length ? sessions.reduce((sum, session) => sum + session.metrics.accuracy, 0) / sessions.length : 100;
  const bestConsistency = Math.max(0, ...sessions.map((session) => session.metrics.consistency));
  const totalPracticeTime = sessions.reduce((sum, session) => sum + session.metrics.elapsedMs, 0);
  const totalCharacters = sessions.reduce((sum, session) => sum + session.metrics.totalKeystrokes, 0);
  return { bestWpm, averageWpm, averageAccuracy, bestConsistency, totalPracticeTime, totalCharacters };
}
