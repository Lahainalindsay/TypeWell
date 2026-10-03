import { describe, expect, it } from "vitest";
import { numericExercise, numericProfileForTitle } from "../src/features/numericProfiles";
import { calculateNumericMetrics } from "../src/engine/numeric";
describe("numeric practice profiles", () => {
 it("provides distinct whole-number, decimal and leading-zero patterns", () => {
  const basics=numericExercise("basics"), mixed=numericExercise("mixed"), sustained=numericExercise("sustained");
  expect(basics).not.toContain("."); expect(mixed).toContain("63.42"); expect(sustained).toContain("00482"); expect(new Set([basics,mixed,sustained]).size).toBe(3);
  expect(numericProfileForTitle("Numeric Keypad Test")).toBe("basics"); expect(numericProfileForTitle("10 Key Typing Test")).toBe("mixed"); expect(numericProfileForTitle("KPH Typing Test")).toBe("sustained");
 });
 it("supplies a sustained high-rate sample without running out", () => {
  const target=numericExercise("sustained"); expect(target.length).toBeGreaterThan(1000);
  const result=calculateNumericMetrics(target,target.slice(0,1000),180000); expect(result.accuracy).toBe(100); expect(result.kph).toBeCloseTo(20000,-1);
 });
});
