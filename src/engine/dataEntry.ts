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
  fieldsPerMinute: number;
  byType: { label: string; correct: number; total: number; practice: string }[];
  mistakes: { record: number; label: string; expected: string; entered: string }[];
}

export const dataEntryFieldTypes = [
  { label: "Names", practice: "/data-entry-practice/names-addresses/" },
  { label: "Order IDs", practice: "/data-entry-practice/alphanumeric/" },
  { label: "Dates", practice: "/data-entry-practice/currency-dates/" },
  { label: "Amounts", practice: "/data-entry-practice/currency-dates/" },
  { label: "ZIP codes", practice: "/data-entry-practice/names-addresses/" },
  { label: "Product codes", practice: "/data-entry-practice/invoices-orders/" }
] as const;

export const fictionalDataEntryRecords: DataEntryRecord[] = [
  { name: "Morgan Ellis", order: "A48291", date: "08/14/2026", amount: "$147.28", zip: "98104", product: "KB-2047" },
  { name: "Priya Nolan", order: "B73910", date: "11/03/2026", amount: "$62.40", zip: "30318", product: "ST-8812" },
  { name: "Jordan Lee", order: "Q10577", date: "04/22/2026", amount: "$318.09", zip: "60607", product: "MX-4401" },
  { name: "Avery Brooks", order: "Q82004", date: "02/09/2026", amount: "$91.75", zip: "75201", product: "DP-7160" }
];

export function dataEntryFields(record: DataEntryRecord): string[] {
  return [record.name, record.order, record.date, record.amount, record.zip, record.product];
}

export function calculateDataEntryMetrics(expected: DataEntryRecord[], actual: string[][], elapsedMs = 0, indexes: number[] = [0, 1, 2, 3, 4, 5]): DataEntryMetrics {
  const byType = indexes.map((index) => ({ ...dataEntryFieldTypes[index], correct: 0, total: 0 }));
  const mistakes: DataEntryMetrics["mistakes"] = [];
  let correctFields = 0;
  let correctRecords = 0;
  let fieldsAttempted = 0;
  const recordsAttempted = Math.min(actual.length, expected.length);
  expected.slice(0, recordsAttempted).forEach((record, recordIndex) => {
    const fields = dataEntryFields(record);
    let recordCorrect = true;
    indexes.forEach((index, position) => {
      const entered = actual[recordIndex]?.[position];
      if (entered === undefined) { recordCorrect = false; return; }
      fieldsAttempted += 1;
      const group = byType[position];
      group.total += 1;
      if (entered === fields[index]) { correctFields += 1; group.correct += 1; }
      else {
        recordCorrect = false;
        mistakes.push({ record: recordIndex + 1, label: group.label, expected: fields[index], entered });
      }
    });
    if (recordCorrect) correctRecords += 1;
  });
  return {
    recordsAttempted,
    correctRecords,
    incorrectRecords: Math.max(0, recordsAttempted - correctRecords),
    fieldsAttempted,
    correctFields,
    incorrectFields: Math.max(0, fieldsAttempted - correctFields),
    accuracy: fieldsAttempted ? round((correctFields / fieldsAttempted) * 100) : 0,
    fieldsPerMinute: elapsedMs > 0 ? round(fieldsAttempted * 60000 / elapsedMs) : 0,
    byType,
    mistakes
  };
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
