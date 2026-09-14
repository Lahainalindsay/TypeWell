import { describe, expect, it } from "vitest";
import { scoreStructuredRecords, type StructuredDataEntryRecord } from "../src/features/data-entry/model";

const records: StructuredDataEntryRecord[] = [
  {
    id: "record-1",
    fields: [
      { id: "name", label: "Name", kind: "name", value: "Morgan Ellis" },
      { id: "amount", label: "Amount", kind: "currency", value: "125.40" }
    ]
  },
  {
    id: "record-2",
    fields: [{ id: "code", label: "Account", kind: "code", value: "AC-2048" }]
  }
];

describe("structured data entry scoring", () => {
  it("scores fully correct records", () => {
    expect(
      scoreStructuredRecords(records, {
        "record-1": { name: "Morgan Ellis", amount: "125.40" },
        "record-2": { code: "AC-2048" }
      })
    ).toEqual({
      recordsAttempted: 2,
      correctRecords: 2,
      incorrectRecords: 0,
      fieldsAttempted: 3,
      correctFields: 3,
      incorrectFields: 0,
      accuracy: 100
    });
  });

  it("counts entered incorrect fields and records", () => {
    const result = scoreStructuredRecords(records, {
      "record-1": { name: "Morgan Ellis", amount: "125.04" }
    });

    expect(result.recordsAttempted).toBe(1);
    expect(result.correctRecords).toBe(0);
    expect(result.incorrectRecords).toBe(1);
    expect(result.fieldsAttempted).toBe(2);
    expect(result.correctFields).toBe(1);
    expect(result.incorrectFields).toBe(1);
    expect(result.accuracy).toBe(50);
  });

  it("does not count an untouched record as attempted", () => {
    expect(scoreStructuredRecords(records, {})).toEqual({
      recordsAttempted: 0,
      correctRecords: 0,
      incorrectRecords: 0,
      fieldsAttempted: 0,
      correctFields: 0,
      incorrectFields: 0,
      accuracy: 100
    });
  });
});
