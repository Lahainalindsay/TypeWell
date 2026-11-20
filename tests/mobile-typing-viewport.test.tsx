import React, { act, useRef } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { useTypingViewport } from "../src/hooks/useTypingViewport";

it("fits the prompt above the keyboard and never scrolls the page for typing", () => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  const viewport = Object.assign(new EventTarget(), { height: 300, offsetTop: 0 });
  vi.stubGlobal("visualViewport", viewport);
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => window.setTimeout(fn, 0));
  vi.stubGlobal("cancelAnimationFrame", clearTimeout);
  const scroll = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
  function Fixture() {
    const ref = useRef<HTMLTextAreaElement>(null);
    useTypingViewport(ref);
    return <div><div data-typing-prompt><span className="current">a</span></div><textarea ref={ref} /></div>;
  }
  const host = document.createElement("div"); document.body.append(host);
  const root = createRoot(host);
  act(() => root.render(<Fixture />));
  const prompt = host.querySelector<HTMLElement>("[data-typing-prompt]")!;
  const input = host.querySelector("textarea")!;
  vi.spyOn(prompt, "getBoundingClientRect").mockReturnValue({ top: 400, bottom: 570 } as DOMRect);
  vi.spyOn(input, "getBoundingClientRect").mockReturnValue({ top: 580, bottom: 628 } as DOMRect);
  act(() => { input.focus({ preventScroll: true }); vi.runAllTimers(); });
  expect(prompt.style.getPropertyValue("--typing-visible-height")).toBe("170px");
  expect(scroll).toHaveBeenCalledWith({ top: 340, behavior: "instant" });
  scroll.mockClear();
  act(() => { input.dispatchEvent(new Event("input", { bubbles: true })); vi.runAllTimers(); });
  expect(scroll).not.toHaveBeenCalled();
  viewport.height = 240;
  act(() => { viewport.dispatchEvent(new Event("resize")); vi.runAllTimers(); });
  expect(prompt.style.getPropertyValue("--typing-visible-height")).toBe("110px");
  act(() => input.blur());
  expect(prompt.style.getPropertyValue("--typing-visible-height")).toBe("");
  act(() => root.unmount()); host.remove();
  vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers();
});
