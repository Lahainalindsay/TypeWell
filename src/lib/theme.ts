import type { ProgressData } from "../storage/progress";
export type ThemePreference = ProgressData["settings"]["theme"];
export const THEME_EVENT = "wpmtest:theme-change";
export function resolveTheme(pref: ThemePreference): "light" | "dark" {
  if (pref === "system") return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  return pref === "light" ? "light" : "dark";
}
