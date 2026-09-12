import { describe, expect, it } from "vitest";
import { calculateDataEntryMetrics, dataEntryFields, fictionalDataEntryRecords } from "../src/engine/dataEntry";
import { calculateKph, calculateKpm, calculateNumericMetrics } from "../src/engine/numeric";

describe("numeric and data-entry engines", () => {
  it("calculates KPM and KPH from keystrokes", () => {
    expect(calculateKpm(120, 60000)).toBe(120);
    expect(calculateKph(120, 60000)).toBe(7200);
  });

  it("calculates numeric accuracy and errors", () => {
    const result = calculateNumericMetrics("48291", "48201", 60000);
    expect(result.correctKeystrokes).toBe(4);
    expect(result.incorrectKeystrokes).toBe(1);
    expect(result.kpm).toBe(5);
    expect(result.kph).toBe(300);
    expect(result.accuracy).toBe(80);
  });

  it("counts records and fields independently", () => {
    const first = dataEntryFields(fictionalDataEntryRecords[0]);
    const second = dataEntryFields(fictionalDataEntryRecords[1]);
    const result = calculateDataEntryMetrics(fictionalDataEntryRecords.slice(0, 2), [first, second.map((field, index) => index === 4 ? "00000" : field)]);
    expect(result.recordsAttempted).toBe(2);
    expect(result.correctRecords).toBe(1);
    expect(result.correctFields).toBe(11);
    expect(result.incorrectFields).toBe(1);
    expect(result.accuracy).toBe(91.7);
  });
});
