import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, it, vi } from "vitest";
import App from "../src/App";

let root: ReturnType<typeof createRoot>;
afterEach(() => { act(() => root.unmount()); document.body.innerHTML = ""; localStorage.clear(); vi.unstubAllGlobals(); });

it("advances weak-key rows and scrolls the cursor without another click, including backspace and restart", () => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  const host = document.createElement("div"); document.body.append(host); root = createRoot(host);
  act(() => root.render(<App initialPath="/practice/weak-keys/" />));
  const prompt = host.querySelector<HTMLDivElement>(".typing-viewport")!;
  const input = host.querySelector<HTMLTextAreaElement>(".typing-capture-input")!;
  const text = prompt.textContent!;
  // Model three visible rows, with the fourth row below the viewport.
  Object.defineProperty(prompt, "clientHeight", { value: 160 });
  [...prompt.children].forEach((span, index) => Object.defineProperty(span, "offsetTop", { value: 32 + Math.floor(index / 20) * 40 }));
  act(() => prompt.click());
  expect(document.activeElement).toBe(input);
  function key(value: string) { act(() => input.dispatchEvent(new KeyboardEvent("keydown", { key: value, bubbles: true, cancelable: true }))); }
  for (const char of text.slice(0, 85)) key(char);
  expect(prompt.querySelectorAll(".correct")).toHaveLength(85);
  expect(prompt.querySelector(".current")).toBe(prompt.children[85]);
  expect(prompt.scrollTop).toBeGreaterThan(0);
  expect(document.activeElement).toBe(input);
  key("Backspace");
  expect(prompt.querySelector(".current")).toBe(prompt.children[84]);
  act(() => [...host.querySelectorAll("button")].find(button => button.textContent === "Restart")!.click());
  expect(prompt.querySelector(".current")).toBe(prompt.children[0]);
  expect(prompt.scrollTop).toBe(0);
});
