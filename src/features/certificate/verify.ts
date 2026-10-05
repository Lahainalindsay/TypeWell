import type { CertificateResult, CertificateMetric } from "./result";

// Public checksums detect accidental link changes, not forgery or authenticity.
// Keep both algorithms in sync with issued links; v1 remains readable.
interface LegacyCertificatePayload {
  id: string; name: string; wpm: string; accuracy: string; type: string; completed: string;
}
export interface ResultCertificatePayload extends CertificateResult { version: 2; id: string; name: string }
export type CertificatePayload = LegacyCertificatePayload | ResultCertificatePayload;

function fnv1a(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(16).padStart(8, "0");
}
export function certSignature(p: CertificatePayload): string {
  if ("version" in p && p.version === 2) {
    return fnv1a(JSON.stringify([p.id, p.name, p.kind, p.type, p.completed, p.duration, p.metrics, p.groups, "wpmtest-cert-v2"]));
  }
  const legacy = p as LegacyCertificatePayload;
  return fnv1a([legacy.id, legacy.name, legacy.wpm, legacy.accuracy, legacy.type, legacy.completed, "wpmtest-cert-v1"].join("|"));
}
function metricList(value: unknown, allowEmpty = false): value is CertificateMetric[] {
  return Array.isArray(value) && (allowEmpty || value.length > 0) && value.length <= 8 && value.every(m =>
    m && typeof m === "object" && typeof m.label === "string" && typeof m.value === "string" && m.label.length > 0 && m.label.length <= 100 && m.value.length > 0 && m.value.length <= 200);
}
export function readCertificateFromParams(params: Pick<URLSearchParams, "get" | "has">): { payload: CertificatePayload; valid: boolean } | null {
  const keys = ["v", "id", "name", "wpm", "accuracy", "type", "date", "sig", "metrics", "groups", "kind", "duration"];
  if (!keys.some(key => params.has(key))) return null;
  const common = { id: params.get("id") ?? "", name: params.get("name") ?? "", type: params.get("type") ?? "", completed: params.get("date") ?? "" };
  const fallback = { ...common, wpm: params.get("wpm") ?? "", accuracy: params.get("accuracy") ?? "" };
  const sig = params.get("sig") ?? "";
  if (params.get("v") === "2") {
    try {
      const metrics: unknown = JSON.parse(params.get("metrics") ?? "null");
      const groups: unknown = JSON.parse(params.get("groups") ?? "null");
      const kind = params.get("kind");
      const duration = params.get("duration") ?? "";
      if ((kind !== "typing" && kind !== "data-entry" && kind !== "numeric") || !duration || !metricList(metrics) || !metricList(groups, true)) return { payload: fallback, valid: false };
      const payload: ResultCertificatePayload = { ...common, version: 2, kind, duration, metrics, groups };
      return { payload, valid: Object.values(common).every(Boolean) && Boolean(sig) && certSignature(payload) === sig };
    } catch { return { payload: fallback, valid: false }; }
  }
  const complete = !params.has("v") && Object.values(fallback).every(Boolean) && Boolean(sig);
  return { payload: fallback, valid: complete && certSignature(fallback) === sig };
}
