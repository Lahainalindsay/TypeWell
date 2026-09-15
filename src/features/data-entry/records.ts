import type { StructuredDataEntryRecord } from "./model";

export const generalDataEntryRecords: StructuredDataEntryRecord[] = [
  {
    id: "record-001",
    fields: [
      { id: "name", label: "Name", kind: "name", value: "Morgan Ellis" },
      { id: "address", label: "Address", kind: "address", value: "418 Pine Street" },
      { id: "city", label: "City", kind: "text", value: "Seattle" },
      { id: "state", label: "State", kind: "code", value: "WA" },
      { id: "zip", label: "ZIP", kind: "number", value: "98104" },
      { id: "phone", label: "Phone", kind: "phone", value: "206-555-0148" },
      { id: "account", label: "Account", kind: "code", value: "A48291" },
      { id: "amount", label: "Amount", kind: "currency", value: "$147.28" }
    ]
  },
  {
    id: "record-002",
    fields: [
      { id: "name", label: "Name", kind: "name", value: "Priya Nolan" },
      { id: "address", label: "Address", kind: "address", value: "72 Westfield Avenue" },
      { id: "city", label: "City", kind: "text", value: "Atlanta" },
      { id: "state", label: "State", kind: "code", value: "GA" },
      { id: "zip", label: "ZIP", kind: "number", value: "30318" },
      { id: "phone", label: "Phone", kind: "phone", value: "404-555-0196" },
      { id: "account", label: "Account", kind: "code", value: "B73910" },
      { id: "amount", label: "Amount", kind: "currency", value: "$62.40" }
    ]
  },
  {
    id: "record-003",
    fields: [
      { id: "name", label: "Name", kind: "name", value: "Jordan Lee" },
      { id: "address", label: "Address", kind: "address", value: "1508 Morgan Drive" },
      { id: "city", label: "City", kind: "text", value: "Chicago" },
      { id: "state", label: "State", kind: "code", value: "IL" },
      { id: "zip", label: "ZIP", kind: "number", value: "60607" },
      { id: "phone", label: "Phone", kind: "phone", value: "312-555-0112" },
      { id: "account", label: "Account", kind: "code", value: "Q10577" },
      { id: "amount", label: "Amount", kind: "currency", value: "$318.09" }
    ]
  }
];
