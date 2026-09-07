import { describe, expect, it } from "vitest";
import { beatIntervalMs, calculateRhythmMetrics, nearestBeat } from "../src/engine/rhythm";

describe("rhythm engine", () => {
  it("calculates beat interval from BPM", () => {
    expect(beatIntervalMs(120)).toBe(500);
  });

  it("finds nearest beat", () => {
    expect(nearestBeat(1000, 60, 2530)).toBe(3000);
  });

  it("calculates deviation and tolerance", () => {
    const metrics = calculateRhythmMetrics([
      { beatAt: 1000, typedAt: 1020 },
      { beatAt: 2000, typedAt: 1960 },
      { beatAt: 3000, typedAt: 3120 }
    ], 75);
    expect(metrics.averageDeviationMs).toBe(60);
    expect(metrics.withinTolerancePercent).toBe(66.7);
    expect(metrics.late).toBe(1);
  });
});
