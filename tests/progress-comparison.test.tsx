import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it } from "vitest";
import { Progress } from "../src/features/localPreferences/ProgressAndSettings";
import { defaultProgress, validateProgress, type SessionRecord } from "../src/storage/progress";

it("filters comparable history, preserves legacy unknowns and separates numeric rates", () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  const session = (id: string, wpm: number): SessionRecord => ({
    id, date: new Date().toISOString(), type: "test", label: "Typing Test",
    metrics: { wpm, accuracy: 98, consistency: 90, elapsedMs: 60000, totalKeystrokes: 300 } as SessionRecord["metrics"],
    weakKeys: [], weakCombinations: []
  });
  const old = session("old", 40);
  const current = { ...session("new", 60), comparison: { duration: "60", category: "Fun Facts", language: "en", input: "Physical keyboard", corrections: "Allowed" } };
  const numeric = { ...session("numeric", 999), label: "KPH Test" };
  const data = { ...session("data", 888), label: "General Data Entry Practice" };
  const progress = validateProgress({ ...defaultProgress, sessions: [old, current, numeric, data] });
  act(() => root.render(<Progress progress={progress} setProgress={() => {}} />));
  expect(host.textContent).toContain("2 matching attempts · Median WPM 50");
  const selects = host.querySelectorAll("select");
  act(() => { selects[2].value = "60"; selects[2].dispatchEvent(new Event("change", { bubbles: true })); });
  expect(host.textContent).toContain("1 matching attempts · Median WPM 60");
  act(() => { selects[2].value = "Unknown"; selects[2].dispatchEvent(new Event("change", { bubbles: true })); });
  expect(host.textContent).toContain("1 matching attempts · Median WPM 40");
  act(() => { selects[0].value = "numeric"; selects[0].dispatchEvent(new Event("change", { bubbles: true })); });
  expect(host.textContent).toContain("1 matching attempts · Median KPH 18000");
  act(() => root.unmount());
  host.remove();
});
