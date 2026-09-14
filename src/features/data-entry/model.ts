export type DataEntryFieldKind =
  | "text"
  | "name"
  | "address"
  | "phone"
  | "date"
  | "currency"
  | "number"
  | "code";

export interface DataEntryFieldDefinition {
  id: string;
  label: string;
  kind: DataEntryFieldKind;
  value: string;
}

export interface StructuredDataEntryRecord {
  id: string;
  fields: DataEntryFieldDefinition[];
}

export interface DataEntryResult {
  recordsAttempted: number;
  correctRecords: number;
  incorrectRecords: number;
  fieldsAttempted: number;
  correctFields: number;
  incorrectFields: number;
  accuracy: number;
}

export function scoreStructuredRecords(
  expected: StructuredDataEntryRecord[],
  actual: Record<string, Record<string, string>>
): DataEntryResult {
  let recordsAttempted = 0;
  let correctRecords = 0;
  let fieldsAttempted = 0;
  let correctFields = 0;

  for (const record of expected) {
    const submitted = actual[record.id];
    if (!submitted) continue;

    recordsAttempted += 1;
    let recordCorrect = true;

    for (const field of record.fields) {
      const value = submitted[field.id];
      if (typeof value !== "string") {
        recordCorrect = false;
        continue;
      }

      fieldsAttempted += 1;
      if (value === field.value) {
        correctFields += 1;
      } else {
        recordCorrect = false;
      }
    }

    if (recordCorrect && Object.keys(submitted).length >= record.fields.length) {
      correctRecords += 1;
    }
  }

  const incorrectRecords = Math.max(0, recordsAttempted - correctRecords);
  const incorrectFields = Math.max(0, fieldsAttempted - correctFields);

  return {
    recordsAttempted,
    correctRecords,
    incorrectRecords,
    fieldsAttempted,
    correctFields,
    incorrectFields,
    accuracy: fieldsAttempted ? Math.round((correctFields / fieldsAttempted) * 1000) / 10 : 100
  };
}
