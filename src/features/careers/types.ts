export type AssessmentSkill =
  | "prose"
  | "punctuation"
  | "numbers"
  | "ten-key"
  | "currency"
  | "dates-times"
  | "phone-numbers"
  | "names-addresses"
  | "ids-codes"
  | "structured-records"
  | "calculations"
  | "verification"
  | "transcription";

export interface CareerAssessmentSection {
  id: string;
  title: string;
  description: string;
  skill: AssessmentSkill;
  durationSeconds?: number;
}

export interface CareerAssessmentDefinition {
  id: string;
  name: string;
  publicPath: string;
  description: string;
  audience: string[];
  sections: CareerAssessmentSection[];
  certificateTitle: string;
}
