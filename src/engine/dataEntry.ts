export interface DataEntryRecord {
  name: string;
  order: string;
  date: string;
  amount: string;
  zip: string;
  product: string;
}

export interface DataEntryMetrics {
  recordsAttempted: number;
  correctRecords: number;
  incorrectRecords: number;
  fieldsAttempted: number;
  correctFields: number;
  incorrectFields: number;
  accuracy: number;
}

export const fictionalDataEntryRecords: DataEntryRecord[] = [
  { name: "Morgan Ellis", order: "A48291", date: "08/14/2026", amount: "$147.28", zip: "98104", product: "KB-2047" },
  { name: "Priya Nolan", order: "B73910", date: "11/03/2026", amount: "$62.40", zip: "30318", product: "ST-8812" },
  { name: "Jordan Lee", order: "Q10577", date: "04/22/2026", amount: "$318.09", zip: "60607", product: "MX-4401" },
  { name: "Avery Brooks", order: "Q82004", date: "02/09/2026", amount: "$91.75", zip: "75201", product: "DP-7160" }
];

export function dataEntryFields(record: DataEntryRecord): string[] {
  return [record.name, record.order, record.date, record.amount, record.zip, record.product];
}

export function calculateDataEntryMetrics(expected: DataEntryRecord[], actual: string[][]): DataEntryMetrics {
  const expectedFields = expected.flatMap(dataEntryFields);
  const actualFields = actual.flat();
  const fieldsAttempted = actualFields.length;
  const correctFields = actualFields.reduce((count, field, index) => count + (field === expectedFields[index] ? 1 : 0), 0);
  const recordsAttempted = actual.length;
  const correctRecords = actual.reduce((count, fields, index) => count + (fields.length === dataEntryFields(expected[index]).length && fields.every((field, fieldIndex) => field === dataEntryFields(expected[index])[fieldIndex]) ? 1 : 0), 0);
  return {
    recordsAttempted,
    correctRecords,
    incorrectRecords: Math.max(0, recordsAttempted - correctRecords),
    fieldsAttempted,
    correctFields,
    incorrectFields: Math.max(0, fieldsAttempted - correctFields),
    accuracy: fieldsAttempted ? round((correctFields / fieldsAttempted) * 100) : 100
  };
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
