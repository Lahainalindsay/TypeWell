import type { CareerAssessmentDefinition } from "../types";

export const dataEntryAssessment: CareerAssessmentDefinition = {
  id: "data-entry",
  name: "Data Entry Practice Test",
  publicPath: "/data-entry-typing-test/",
  description: "A self-administered practice test of exact entry across fictional records, with field accuracy and targeted drills.",
  audience: [
    "Data Entry Clerks",
    "Records Clerks",
    "Order Entry",
    "Administrative Support",
    "Billing",
    "Job Applicants"
  ],
  sections: [
    {
      id: "structured-records",
      title: "Structured Records",
      description: "Enter names, addresses, dates, phone numbers, account identifiers and amounts into matching fields.",
      skill: "structured-records",
      durationSeconds: 180
    },
    {
      id: "alphanumeric-entry",
      title: "Alphanumeric Entry",
      description: "Enter mixed identifiers and codes exactly as shown.",
      skill: "ids-codes",
      durationSeconds: 90
    },
    {
      id: "numeric-entry",
      title: "Numeric / 10-Key",
      description: "Enter numeric groups and decimal values while maintaining accuracy.",
      skill: "ten-key",
      durationSeconds: 120
    },
    {
      id: "verification",
      title: "Data Verification",
      description: "Compare structured values and identify mismatches accurately.",
      skill: "verification",
      durationSeconds: 90
    }
  ],
  certificateTitle: "Data Entry Practice Result"
};
