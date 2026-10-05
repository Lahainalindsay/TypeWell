import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import WPMTestApp from "../src/App";
import { SiteHeader } from "../src/components/SiteShell";
import { defaultProgress, loadProgress, saveProgress } from "../src/storage/progress";

let root: ReturnType<typeof createRoot> | undefined;
afterEach(() => {
  if (root) act(() => root!.unmount());
  root = undefined;
  document.body.innerHTML = "";
  localStorage.clear();
  vi.unstubAllGlobals();
});

describe("shared theme controls", () => {
  it("keeps the header, settings and saved progress in sync, including system changes", () => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    let prefersLight = false;
    const media = new EventTarget();
    Object.defineProperty(media, "matches", { get: () => prefersLight });
    vi.stubGlobal("matchMedia", () => media);
    saveProgress({ ...defaultProgress, completedLessons: ["first-fj"], settings: { ...defaultProgress.settings, theme: "dark" } });
    const container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => { root!.render(<><SiteHeader /><WPMTestApp initialPath="/settings/" embedded /></>); });
    const toggle = container.querySelector<HTMLButtonElement>(".site-theme-toggle")!;
    const select = container.querySelector<HTMLSelectElement>('select[aria-label="Color theme"]')!;
    expect(select.value).toBe("dark");
    act(() => toggle.click()); // dark -> system
    expect(select.value).toBe("system");
    expect(document.documentElement.dataset.theme).toBe("dark");
    act(() => { prefersLight = true; media.dispatchEvent(new Event("change")); });
    expect(document.documentElement.dataset.theme).toBe("light");
    act(() => toggle.click()); // system -> light
    expect(select.value).toBe("light");
    expect(loadProgress().settings.theme).toBe("light");
    expect(loadProgress().completedLessons).toEqual(["first-fj"]);
    act(() => { select.value = "dark"; select.dispatchEvent(new Event("change", { bubbles: true })); });
    expect(loadProgress().settings.theme).toBe("dark");
    expect(toggle.title).toBe("Dark theme");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
