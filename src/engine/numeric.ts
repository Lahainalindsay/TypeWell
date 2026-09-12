export interface NumericMetrics {
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
  elapsedMs: number;
  kpm: number;
  kph: number;
  accuracy: number;
}

const MINUTE = 60000;

export function calculateKpm(keystrokes: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  return round((Math.max(0, keystrokes) / elapsedMs) * MINUTE);
}

export function calculateKph(keystrokes: number, elapsedMs: number): number {
  return calculateKpm(keystrokes, elapsedMs) * 60;
}

export function calculateNumericMetrics(expected: string, actual: string, elapsedMs: number): NumericMetrics {
  const totalKeystrokes = actual.length;
  const correctKeystrokes = Array.from(actual).reduce((count, key, index) => count + (key === expected[index] ? 1 : 0), 0);
  const incorrectKeystrokes = totalKeystrokes - correctKeystrokes;
  const kpm = calculateKpm(totalKeystrokes, elapsedMs);
  return {
    totalKeystrokes,
    correctKeystrokes,
    incorrectKeystrokes,
    elapsedMs: Math.max(0, elapsedMs),
    kpm,
    kph: kpm * 60,
    accuracy: totalKeystrokes ? round((correctKeystrokes / totalKeystrokes) * 100) : 100
  };
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
