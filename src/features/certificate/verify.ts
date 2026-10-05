// This public checksum detects accidental link changes, not forgery or authenticity.
// Anyone can recalculate it. No private signing key or server record is involved.
// Keep the algorithm in sync with public/certificate-flow.js.
const CERT_SALT = "wpmtest-cert-v1";

export interface CertificatePayload {
  id: string;
  name: string;
  wpm: string;
  accuracy: string;
  type: string;
  completed: string;
}

function fnv1a(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function certSignature(payload: CertificatePayload): string {
  return fnv1a([payload.id, payload.name, payload.wpm, payload.accuracy, payload.type, payload.completed, CERT_SALT].join("|"));
}

export function readCertificateFromParams(params: Pick<URLSearchParams, "get" | "has">): { payload: CertificatePayload; valid: boolean } | null {
  const keys = ["id", "name", "wpm", "accuracy", "type", "date", "sig"];
  if (!keys.some(key => params.has(key))) return null;
  const payload: CertificatePayload = {
    id: params.get("id") ?? "", name: params.get("name") ?? "",
    wpm: params.get("wpm") ?? "", accuracy: params.get("accuracy") ?? "",
    type: params.get("type") ?? "", completed: params.get("date") ?? ""
  };
  const sig = params.get("sig") ?? "";
  const complete = keys.every(key => Boolean(params.get(key)));
  return { payload, valid: complete && certSignature(payload) === sig };
}
