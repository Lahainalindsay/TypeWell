import type { Keystroke, Metrics, SessionState } from "./types";

const MINUTE = 60000;
const IDLE_THRESHOLD_MS = 3000;

export function createSession(target: string): SessionState {
  return {
    target,
    typed: [],
    statuses: Array.from({ length: target.length }, () => "pending"),
    keystrokes: [],
    startedAt: null,
    endedAt: null,
    idleMs: 0,
    lastInputAt: null,
    backspaces: 0
  };
}

export function applyInput(state: SessionState, key: string, now = performance.now()): SessionState {
  if (key === "Backspace") return applyBackspace(state, now);
  if (key.length !== 1 || state.typed.length >= state.target.length) return state;

  const startedAt = state.startedAt ?? now;
  const idleMs = state.lastInputAt && now - state.lastInputAt > IDLE_THRESHOLD_MS
    ? state.idleMs + (now - state.lastInputAt)
    : state.idleMs;
  const index = state.typed.length;
  const expected = state.target[index];
  const correct = key === expected;
  const typed = [...state.typed, key];
  const statuses = [...state.statuses];
  statuses[index] = correct ? "correct" : "incorrect";
  const keystrokes: Keystroke[] = [...state.keystrokes, { expected, actual: key, correct, timestamp: now }];
  return {
    ...state,
    typed,
    statuses,
    keystrokes,
    startedAt,
    endedAt: typed.length === state.target.length ? now : null,
    idleMs,
    lastInputAt: now
  };
}

export function applyBackspace(state: SessionState, now = performance.now()): SessionState {
  if (state.typed.length === 0) return state;
  const statuses = [...state.statuses];
  const removedIndex = state.typed.length - 1;
  const wasIncorrect = statuses[removedIndex] === "incorrect";
  statuses[removedIndex] = "pending";
  const keystrokes = state.keystrokes.map((stroke, index) => {
    if (wasIncorrect && index === state.keystrokes.length - 1) return { ...stroke, corrected: true };
    return stroke;
  });
  return {
    ...state,
    typed: state.typed.slice(0, -1),
    statuses,
    keystrokes,
    endedAt: null,
    lastInputAt: now,
    backspaces: state.backspaces + 1
  };
}

export function calculateMetrics(state: SessionState, now = performance.now()): Metrics {
  const elapsedMs = Math.max(0, (state.endedAt ?? now) - (state.startedAt ?? now));
  const activeMs = Math.max(0, elapsedMs - state.idleMs);
  const elapsedMinutes = elapsedMs / MINUTE;
  const correctCharacters = state.statuses.filter((status) => status === "correct").length;
  const incorrectCharacters = state.statuses.filter((status) => status === "incorrect").length;
  const correctedErrors = state.keystrokes.filter((stroke) => stroke.corrected).length;
  const totalKeystrokes = state.keystrokes.length;
  const wpm = elapsedMinutes <= 0 ? 0 : (correctCharacters / 5) / elapsedMinutes;
  const rawWpm = elapsedMinutes <= 0 ? 0 : (totalKeystrokes / 5) / elapsedMinutes;
  const accuracy = totalKeystrokes === 0 ? 100 : (state.keystrokes.filter((stroke) => stroke.correct).length / totalKeystrokes) * 100;
  const consistency = calculateConsistency(state.keystrokes);
  return {
    correctCharacters,
    incorrectCharacters,
    correctedErrors,
    uncorrectedErrors: incorrectCharacters,
    totalKeystrokes,
    elapsedMs,
    activeMs,
    idleMs: state.idleMs,
    wordsTyped: correctCharacters / 5,
    wpm: round(wpm),
    rawWpm: round(rawWpm),
    accuracy: round(accuracy),
    consistency: round(consistency),
    consistencyLabel: labelConsistency(consistency),
    errorRate: round(totalKeystrokes === 0 ? 0 : (incorrectCharacters / totalKeystrokes) * 100)
  };
}

export function calculateConsistency(keystrokes: Keystroke[], windowSize = 8): number {
  if (keystrokes.length < windowSize + 1) return 100;
  const wpms: number[] = [];
  for (let i = windowSize; i < keystrokes.length; i += windowSize) {
    const start = keystrokes[i - windowSize].timestamp;
    const end = keystrokes[i].timestamp;
    const minutes = (end - start) / MINUTE;
    if (minutes > 0) wpms.push((windowSize / 5) / minutes);
  }
  if (wpms.length < 2) return 100;
  const mean = wpms.reduce((sum, value) => sum + value, 0) / wpms.length;
  if (mean <= 0) return 100;
  const variance = wpms.reduce((sum, value) => sum + (value - mean) ** 2, 0) / wpms.length;
  const coefficient = Math.sqrt(variance) / mean;
  return Math.max(0, Math.min(100, 100 - coefficient * 100));
}

export function labelConsistency(score: number): Metrics["consistencyLabel"] {
  if (score >= 90) return "Very Steady";
  if (score >= 78) return "Steady";
  if (score >= 62) return "Variable";
  return "Uneven";
}

export function round(value: number): number {
  return Math.round(value * 10) / 10;
}
