import type { SessionRecord } from "../../storage/progress";
import type { DataEntryMetrics } from "../../engine/dataEntry";
import { calculateKph, calculateKpm } from "../../engine/numeric";

export interface CertificateMetric { label: string; value: string }
export interface CertificateResult {
  kind: "typing" | "data-entry" | "numeric";
  type: string;
  completed: string;
  duration: string;
  metrics: CertificateMetric[];
  groups: CertificateMetric[];
}

function elapsedLabel(ms: number): string {
  const seconds = Math.round(ms / 1000);
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

export function speedCertificateResult(session: SessionRecord, durationSeconds?: number, numeric = false): CertificateResult {
  const duration = durationSeconds ? `${durationSeconds / 60} Minute` : "";
  // The selected test length is independent of elapsed time or the current URL.
  const base = session.label.replace(/\s*—.*$/, "").replace(/^\d+(?:\.\d+)? Minute /, "");
  return {
    kind: numeric ? "numeric" : "typing",
    type: duration ? `${duration} ${base}` : base,
    completed: new Date(session.date).toLocaleDateString(),
    duration: elapsedLabel(session.metrics.elapsedMs),
    metrics: numeric ? [
      { label: "KPH", value: String(calculateKph(session.metrics.totalKeystrokes, session.metrics.elapsedMs)) },
      { label: "KPM", value: String(calculateKpm(session.metrics.totalKeystrokes, session.metrics.elapsedMs)) },
      { label: "Accuracy", value: `${session.metrics.accuracy}%` }
    ] : [
      { label: "Words per minute (WPM)", value: String(session.metrics.wpm) },
      { label: "Accuracy", value: `${session.metrics.accuracy}%` }
    ],
    groups: []
  };
}

export function dataEntryCertificateResult(session: SessionRecord, report: DataEntryMetrics): CertificateResult {
  return {
    kind: "data-entry", type: session.label, completed: new Date(session.date).toLocaleDateString(),
    duration: elapsedLabel(session.metrics.elapsedMs),
    metrics: [
      { label: "Field accuracy", value: `${report.accuracy}%` },
      { label: "Fields per minute", value: String(report.fieldsPerMinute) },
      { label: "Correct fields", value: `${report.correctFields}/${report.fieldsAttempted}` },
      { label: "Complete records", value: `${report.correctRecords}/${report.recordsAttempted}` }
    ],
    groups: report.byType.map(group => ({ label: group.label, value: `${group.correct}/${group.total} correct (${group.total ? Math.round(group.correct / group.total * 1000) / 10 : 0}%)` }))
  };
}

export function certificateForSession(session: SessionRecord): CertificateResult | undefined {
  if (session.type !== "test" || /practice/i.test(session.label)) return undefined;
  if (session.certificate) return session.certificate;
  // Older structured sessions did not save field-level results. Do not invent
  // them from character WPM, or issue certificates for misclassified drills.
  if (/data entry/i.test(session.label)) return undefined;
  const numeric = /KPH|10[- ]Key|Numeric Keypad/i.test(session.label);
  const selectedMinutes = session.label.match(/^(\d+(?:\.\d+)?) Minute/);
  return speedCertificateResult(session, selectedMinutes ? Number(selectedMinutes[1]) * 60 : undefined, numeric);
}
