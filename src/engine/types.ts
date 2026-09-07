export type CharStatus = "pending" | "correct" | "incorrect" | "corrected";

export interface Keystroke {
  expected: string;
  actual: string;
  correct: boolean;
  timestamp: number;
  corrected?: boolean;
}

export interface SessionState {
  target: string;
  typed: string[];
  statuses: CharStatus[];
  keystrokes: Keystroke[];
  startedAt: number | null;
  endedAt: number | null;
  idleMs: number;
  lastInputAt: number | null;
  backspaces: number;
}

export interface Metrics {
  correctCharacters: number;
  incorrectCharacters: number;
  correctedErrors: number;
  uncorrectedErrors: number;
  totalKeystrokes: number;
  elapsedMs: number;
  activeMs: number;
  idleMs: number;
  wordsTyped: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  consistencyLabel: "Very Steady" | "Steady" | "Variable" | "Uneven";
  errorRate: number;
}

export interface RhythmHit {
  beatAt: number;
  typedAt: number;
}

export interface RhythmMetrics {
  deviations: number[];
  averageDeviationMs: number;
  standardDeviationMs: number;
  withinTolerancePercent: number;
  early: number;
  onBeat: number;
  late: number;
  label: "Perfect" | "Locked In" | "Steady" | "Drifting";
}
