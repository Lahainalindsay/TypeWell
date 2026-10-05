import type { CareerAssessmentDefinition } from "../types";

export const customerServiceAssessment: CareerAssessmentDefinition = {
  id: "customer-service",
  name: "Customer Service Typing Practice",
  publicPath: "/customer-service-typing-test/",
  description: "A self-administered practice test for live-chat and support typing: sustained prose speed and accuracy under a timer.",
  audience: ["Live Chat Agents", "Customer Support Representatives", "Help Desk / IT Support", "Call Center Agents", "Virtual Assistants", "Job Applicants"],
  sections: [
    { id: "sustained-prose", title: "Sustained Response Typing", description: "Type continuous prose at a sustainable pace, the way a chat or email response is typed under a queue.", skill: "prose", durationSeconds: 300 },
    { id: "punctuation", title: "Punctuation & Tone", description: "Practice the capitalization, punctuation and phrasing patterns common in professional support replies.", skill: "punctuation", durationSeconds: 90 }
  ],
  certificateTitle: "Customer Service Typing Practice Result"
};
