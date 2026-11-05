import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { personalities } from "../src/features/typingPersonality";
import { resultChallenge } from "../src/features/certificate/share";

describe("personality sharing routes", () => {
  it("has unique slugs and images for all nine shareable profiles", () => {
    expect(personalities).toHaveLength(9);
    expect(new Set(personalities.map(p => p.slug)).size).toBe(9);
    for (const profile of personalities) {
      expect(existsSync(`public/images/personalities/${profile.slug}.webp`)).toBe(true);
    }
  });
  it("shares a profile URL instead of the generic test URL or private score", () => {
    const source = readFileSync("src/features/PersonalityCard.tsx", "utf8");
    expect(source).toContain("typing-personality-test/profile/${personality.slug}/");
    expect(source).toContain("What’s YOUR typing personality?");
    expect(source).not.toContain("metrics.wpm} WPM · ${metrics.accuracy}% accuracy. What's your typing personality?");
  });
  it("keeps regular test shares competitive", () => {
    const result = resultChallenge({
      kind: "typing", type: "1 Minute Typing Speed Test", completed: "11/5/2026", duration: "1m",
      metrics: [{ label: "Words per minute (WPM)", value: "80" }, { label: "Accuracy", value: "98%" }], groups: []
    });
    expect(result.text).toContain("Can you beat me?");
    expect(result.text).toContain("80 WPM");
    expect(result.url).toBe("https://wpmtest.app/1-minute-typing-test/");
  });
});
