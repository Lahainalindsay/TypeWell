import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { readFileSync, writeFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { loadProgress } from "../src/storage/progress";
import { certificateForSession } from "../src/features/certificate/result";
import { readCertificateFromParams } from "../src/features/certificate/verify";
import { resultChallenge } from "../src/features/certificate/share";

let root: Root, host: HTMLDivElement;
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  localStorage.clear();
  host = document.createElement("div"); document.body.append(host); root = createRoot(host);
});
afterEach(() => { act(() => root.unmount()); host.remove(); document.querySelector("#tw-cert-modal")?.remove(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function enhanceCertificates() {
  new Function("MutationObserver", readFileSync("public/certificate-flow.js", "utf8"))(class { observe() {} });
  document.dispatchEvent(new Event("DOMContentLoaded"));
}
function click(text: string) {
  const button = [...host.querySelectorAll<HTMLButtonElement>("button")].find(b => b.textContent === text)!;
  act(() => button.click());
}
function completeRecords(path: string, count: number, beforeField?: (index: number) => void) {
  act(() => root.render(<App initialPath={path} />));
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
  for (let index = 0; index < count; index++) {
    beforeField?.(index);
    const input = host.querySelector("input")!;
    const target = host.querySelector(".data-field.active strong")!.textContent!;
    act(() => { setter.call(input, index === 0 ? "wrong" : target); input.dispatchEvent(new Event("input", { bubbles: true })); });
    click(index === count - 1 ? "See results" : "Next field");
  }
}
function generateCertificate() {
  document.querySelector<HTMLButtonElement>(".tw-get-cert")!.click();
  document.querySelector<HTMLInputElement>("#tw-cert-name")!.value = "Lindsay Johnson";
  document.querySelector<HTMLButtonElement>("#tw-generate-cert")!.click();
}

describe("certificates use completed test results", () => {
  it.each([
    ["/data-entry-practice/currency-dates/", 8],
    ["/data-entry-practice/alphanumeric/", 16],
    ["/data-entry-practice/names-addresses/", 8],
    ["/data-entry-practice/invoices-orders/", 16],
    ["/data-entry-practice/", 24]
  ])("does not issue a certificate for %s", (path, count) => {
    completeRecords(path as string, count as number);
    const session = loadProgress().sessions.at(-1)!;
    expect(session.type).toBe("practice");
    expect(certificateForSession(session)).toBeUndefined();
    enhanceCertificates();
    expect(host.querySelector(".tw-get-cert")).toBeNull();
    expect(host.querySelector("[data-certificate-result]")).toBeNull();
    expect(host.textContent).toContain("Data entry practice result");
  });
  it("shows exact structured scores in preview, download, saved results and verification", async () => {
    // Make the test take exactly one minute so the entry-rate result is meaningful.
    const clock = vi.spyOn(performance, "now").mockReturnValue(100);
    completeRecords("/data-entry-typing-test/", 24, index => { if (index === 23) clock.mockReturnValue(60100); });
    const session = loadProgress().sessions.at(-1)!;
    const expected = session.certificate!;
    expect(expected.type).toBe("Data Entry Typing Test — Structured Records");
    expect(expected.duration).toBe("1m 0s");
    expect(expected.metrics).toContainEqual({ label: "Fields per minute", value: "24" });
    expect(expected.metrics).toContainEqual({ label: "Field accuracy", value: "95.8%" });
    expect(expected.metrics).toContainEqual({ label: "Correct fields", value: "23/24" });
    expect(expected.metrics).toContainEqual({ label: "Complete records", value: "3/4" });
    expect(expected.groups).toContainEqual({ label: "Names", value: "3/4 correct (75%)" });
    expect(expected.groups).toContainEqual({ label: "Dates", value: "4/4 correct (100%)" });
    expect(expected.groups).toContainEqual({ label: "Amounts", value: "4/4 correct (100%)" });
    enhanceCertificates(); generateCertificate();
    const cert = document.querySelector("#tw-certificate")!;
    expect(cert.textContent).toContain(expected.type);
    expect(cert.textContent).toContain("Field accuracy");
    expect(cert.textContent).toContain("95.8%");
    expect(cert.textContent).toContain("3/4 correct (75%)");
    expect(cert.textContent).not.toMatch(/WPM\)|WORDS PER MINUTE/);
    const copy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: copy } });
    vi.spyOn(window, "alert").mockImplementation(() => {});
    document.querySelector<HTMLButtonElement>("#tw-verify-link")!.click(); await Promise.resolve();
    const verified = readCertificateFromParams(new URL(copy.mock.calls[0][0]).searchParams);
    expect(verified?.valid).toBe(true);
    expect(verified?.payload).toMatchObject(expected);
    const edited = new URL(copy.mock.calls[0][0]).searchParams;
    edited.set("groups", JSON.stringify([{ label: "Names", value: "4/4 correct (100%)" }]));
    expect(readCertificateFromParams(edited)?.valid).toBe(false);
    const svgStrings: string[] = [];
    const OriginalBlob = Blob;
    vi.stubGlobal("Blob", class extends OriginalBlob { constructor(parts: BlobPart[], options: BlobPropertyBag) { super(parts, options); svgStrings.push(String(parts[0])); } });
    vi.stubGlobal("URL", class extends URL { static createObjectURL() { return "blob:test"; } static revokeObjectURL() {} });
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    document.querySelector<HTMLButtonElement>("#tw-download")!.click();
    expect(svgStrings[0]).toContain("Field accuracy"); expect(svgStrings[0]).toContain("95.8%");
    expect(svgStrings[0]).toContain("Names: 3/4 correct (75%)"); expect(svgStrings[0]).not.toContain("WORDS PER MINUTE");
    if (process.env.CERTIFICATE_PREVIEW) writeFileSync(process.env.CERTIFICATE_PREVIEW, svgStrings[0]);
    document.querySelector<HTMLButtonElement>("#tw-close")!.click();
    act(() => root.render(<App key="saved" initialPath="/typing-certificate/" />));
    expect(host.textContent).toContain("Field accuracy"); expect(host.textContent).toContain(expected.type);
    expect(host.textContent).toContain("23/24"); expect(host.textContent).not.toContain("Net WPM");
  });
  it.each(["/1-minute-typing-test/", "/5-minute-typing-test/"])("uses the selected length on %s", path => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance", "requestAnimationFrame"] });
    act(() => root.render(<App initialPath={path} />));
    // Selecting another length must be reflected even when the URL stays put.
    if (path.includes("1-minute")) click("300s");
    act(() => vi.advanceTimersByTime(10));
    const input = host.querySelector("textarea")!;
    act(() => input.dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true })));
    act(() => vi.advanceTimersByTime(300500));
    const session = loadProgress().sessions.at(-1)!;
    expect(session.certificate?.type).toBe("5 Minute Typing Test");
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { configurable: true, value: share });
    click("Share Result");
    expect(share).toHaveBeenCalledWith(resultChallenge(session.certificate!));
    enhanceCertificates(); generateCertificate();
    expect(document.querySelector("#tw-certificate")?.textContent).toContain("5 Minute Typing Test");
  });
  it.each([["300", "300s"], ["-1", "60s"], ["999999", "60s"], ["broken", "60s"]])("opens a specialty challenge with validated duration %s", (seconds, selected) => {
    window.history.replaceState({}, "", `/typing-test-with-numbers/?seconds=${seconds}`);
    try {
      act(() => root.render(<App initialPath="/typing-test-with-numbers/" />));
      const button = [...host.querySelectorAll<HTMLButtonElement>("button")].find(b => b.textContent === selected)!;
      expect(button.className).toContain("active");
    } finally { window.history.replaceState({}, "", "/"); }
  });
  it("uses numeric metrics instead of synthetic WPM", () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance", "requestAnimationFrame"] });
    act(() => root.render(<App initialPath="/kph-typing-test/" />));
    act(() => vi.advanceTimersByTime(10));
    act(() => host.querySelector("textarea")!.dispatchEvent(new KeyboardEvent("keydown", { key: "0", bubbles: true })));
    act(() => vi.advanceTimersByTime(180500));
    const session = loadProgress().sessions.at(-1)!;
    expect(session.certificate?.type).toBe("3 Minute KPH Typing Test");
    enhanceCertificates(); generateCertificate();
    const text = document.querySelector("#tw-certificate")!.textContent!;
    expect(text).toContain("KPH"); expect(text).toContain("KPM"); expect(text).not.toContain("WORDS PER MINUTE");
  });
  it("removes certificate offers from completed prose practice", () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "performance", "requestAnimationFrame"] });
    act(() => root.render(<App initialPath="/typing-practice/" />));
    act(() => vi.advanceTimersByTime(10));
    act(() => host.querySelector("textarea")!.dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true })));
    act(() => vi.advanceTimersByTime(300500));
    expect(loadProgress().sessions.at(-1)?.type).toBe("practice");
    enhanceCertificates();
    expect(host.querySelector(".tw-get-cert")).toBeNull();
    expect(host.querySelector('a[href="/typing-certificate/"]')).toBeNull();
  });
});
