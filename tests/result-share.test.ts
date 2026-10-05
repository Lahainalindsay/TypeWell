import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { resultChallenge } from "../src/features/certificate/share";
import type { CertificateResult } from "../src/features/certificate/result";

const typing: CertificateResult = {
  kind: "typing", type: "1 Minute Typing Speed Test", completed: "10/4/2026", duration: "1m 0s",
  metrics: [{ label: "Words per minute (WPM)", value: "12.8" }, { label: "Accuracy", value: "91.4%" }], groups: []
};
afterEach(() => { document.body.innerHTML = ""; vi.restoreAllMocks(); });

function openCertificate(result: CertificateResult) {
  document.body.innerHTML = '<div class="result-card"><div class="actions"></div></div>';
  document.querySelector<HTMLElement>(".result-card")!.dataset.certificateResult = JSON.stringify(result);
  new Function("MutationObserver", readFileSync("public/certificate-flow.js", "utf8"))(class { observe() {} });
  document.dispatchEvent(new Event("DOMContentLoaded"));
  document.querySelector<HTMLButtonElement>(".tw-get-cert")!.click();
  document.querySelector<HTMLInputElement>("#tw-cert-name")!.value = "Thomas Meehan";
  document.querySelector<HTMLButtonElement>("#tw-generate-cert")!.click();
}

describe("clean test challenges", () => {
  it.each([
    [typing, "/1-minute-typing-test/"],
    [{ ...typing, type: "5 Minute Typing Test" }, "/5-minute-typing-test/"],
    [{ ...typing, type: "2 Page Typing Test" }, "/2-page-typing-test/"],
    [{ ...typing, type: "5 Minute Typing Test with Numbers" }, "/typing-test-with-numbers/?seconds=300"],
    [{ ...typing, kind: "numeric", type: "3 Minute KPH Typing Test", metrics: [{ label: "KPH", value: "4200" }, { label: "Accuracy", value: "98%" }] }, "/kph-typing-test/?seconds=180"],
    [{ ...typing, kind: "data-entry", type: "Data Entry Typing Test — Structured Records", metrics: [{ label: "Field accuracy", value: "95.8%" }, { label: "Fields per minute", value: "24" }, { label: "Correct fields", value: "23/24" }] }, "/data-entry-typing-test/"]
  ])("shares the matching test and agrees across both buttons (%s)", async (result, path) => {
    const expected = resultChallenge(result as CertificateResult);
    expect(expected.url).toBe(`https://wpmtest.app${path}`);
    expect(expected.text).toContain("Can you beat me?");
    expect(expected.url).not.toMatch(/certificate|metrics|name|sig|date/);
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { configurable: true, value: share });
    openCertificate(result as CertificateResult);
    document.querySelector<HTMLButtonElement>("#tw-share")!.click();
    await Promise.resolve();
    expect(share).toHaveBeenCalledWith(expected);
    expect(share.mock.calls[0][0].text).not.toContain("Thomas Meehan");
  });
  it("sends the screenshot's score as a short challenge", () => {
    expect(resultChallenge(typing).text).toBe("⌨️ 12.8 WPM · 91.4% accuracy\n1 Minute Typing Speed Test on WPMTest\nCan you beat me? Take the same test 👇");
  });
  it("copies the same clean challenge when native sharing is unavailable", async () => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    const copy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: copy } });
    vi.spyOn(window, "alert").mockImplementation(() => {});
    openCertificate(typing);
    document.querySelector<HTMLButtonElement>("#tw-share")!.click();
    await Promise.resolve();
    const challenge = resultChallenge(typing);
    expect(copy).toHaveBeenCalledWith(`${challenge.text}\n${challenge.url}`);
  });
  it("does not treat closing the share sheet as an error", async () => {
    Object.defineProperty(navigator, "share", { configurable: true, value: vi.fn().mockRejectedValue(new DOMException("Cancelled", "AbortError")) });
    const prompt = vi.spyOn(window, "prompt").mockReturnValue(null);
    openCertificate(typing);
    document.querySelector<HTMLButtonElement>("#tw-share")!.click();
    await Promise.resolve(); await Promise.resolve();
    expect(prompt).not.toHaveBeenCalled();
  });
});
