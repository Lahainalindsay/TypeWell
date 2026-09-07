import type { RhythmHit, RhythmMetrics } from "./types";
import { round } from "./metrics";

export function beatIntervalMs(bpm: number): number {
  return 60000 / bpm;
}

export function nearestBeat(startAt: number, bpm: number, typedAt: number): number {
  const interval = beatIntervalMs(bpm);
  const beat = Math.round((typedAt - startAt) / interval);
  return startAt + beat * interval;
}

export function calculateRhythmMetrics(hits: RhythmHit[], toleranceMs = 75): RhythmMetrics {
  const deviations = hits.map((hit) => hit.typedAt - hit.beatAt);
  const abs = deviations.map(Math.abs);
  const averageDeviationMs = abs.length ? abs.reduce((sum, value) => sum + value, 0) / abs.length : 0;
  const mean = deviations.length ? deviations.reduce((sum, value) => sum + value, 0) / deviations.length : 0;
  const variance = deviations.length ? deviations.reduce((sum, value) => sum + (value - mean) ** 2, 0) / deviations.length : 0;
  const within = abs.filter((value) => value <= toleranceMs).length;
  const withinTolerancePercent = deviations.length ? (within / deviations.length) * 100 : 100;
  const early = deviations.filter((value) => value < -toleranceMs).length;
  const late = deviations.filter((value) => value > toleranceMs).length;
  const onBeat = deviations.length - early - late;
  return {
    deviations: deviations.map(round),
    averageDeviationMs: round(averageDeviationMs),
    standardDeviationMs: round(Math.sqrt(variance)),
    withinTolerancePercent: round(withinTolerancePercent),
    early,
    onBeat,
    late,
    label: labelRhythm(withinTolerancePercent, averageDeviationMs)
  };
}

export function labelRhythm(within: number, averageDeviation: number): RhythmMetrics["label"] {
  if (within >= 96 && averageDeviation <= 35) return "Perfect";
  if (within >= 88) return "Locked In";
  if (within >= 72) return "Steady";
  return "Drifting";
}
