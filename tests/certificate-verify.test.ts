import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { certSignature, readCertificateFromParams, type CertificatePayload } from "../src/features/certificate/verify";

const payload: CertificatePayload = { id: "test-1", name: "Zoë & 李", wpm: "62.5", accuracy: "98.4", type: "5 Minute Typing Test", completed: "10/4/2026" };
function paramsFor(value = payload) {
  return new URLSearchParams({ ...value, date: value.completed, sig: certSignature(value) });
}

afterEach(() => { document.body.innerHTML = ""; vi.restoreAllMocks(); });

describe("certificate link consistency", () => {
  it("accepts a complete round trip, including Unicode names", () => {
    expect(readCertificateFromParams(new URLSearchParams(paramsFor().toString()))).toEqual({ payload, valid: true });
  });
  it("rejects edits with an unchanged checksum and incomplete links", () => {
    const params = paramsFor();
    params.set("wpm", "120");
    expect(readCertificateFromParams(params)?.valid).toBe(false);
    params.delete("name");
    expect(readCertificateFromParams(params)?.valid).toBe(false);
    expect(readCertificateFromParams(new URLSearchParams("id=test-1"))?.valid).toBe(false);
    expect(readCertificateFromParams(new URLSearchParams())).toBeNull();
  });
  it("documents why this public checksum cannot authenticate results", () => {
    const forged = { ...payload, wpm: "200" };
    expect(readCertificateFromParams(paramsFor(forged))).toEqual({ payload: forged, valid: true });
  });
  it("accepts the link produced by the standalone certificate UI", async () => {
    document.body.innerHTML = '<div class="result-card"><h2>62.5 WPM · 98.4%</h2><div class="metric"><span>Duration</span><strong>5:00</strong></div><div class="metric"><span>Completed</span><strong>10/4/2026</strong></div><div class="actions"></div></div>';
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    vi.spyOn(window, "alert").mockImplementation(() => {});
    const script = readFileSync("public/certificate-flow.js", "utf8");
    // Skip observation; run the real flow once against a completed result card.
    const Observer = class { observe() {} };
    new Function("MutationObserver", script)(Observer);
    document.dispatchEvent(new Event("DOMContentLoaded"));
    document.querySelector<HTMLButtonElement>(".tw-get-cert")!.click();
    document.querySelector<HTMLInputElement>("#tw-cert-name")!.value = payload.name;
    document.querySelector<HTMLButtonElement>("#tw-generate-cert")!.click();
    document.querySelector<HTMLButtonElement>("#tw-verify-link")!.click();
    await Promise.resolve();
    expect(writeText).toHaveBeenCalledOnce();
    const result = readCertificateFromParams(new URL(writeText.mock.calls[0][0]).searchParams);
    expect(result?.valid).toBe(true);
    expect(result?.payload).toMatchObject({ name: payload.name, wpm: "62.5", accuracy: "98.4", type: "5 Minute Typing Test", completed: "10/4/2026" });
    expect(document.querySelector(".tw-cert-verify")?.textContent).toContain(result!.payload.id);
  });
});
