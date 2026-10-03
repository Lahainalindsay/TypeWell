export type NumericProfile = "basics" | "mixed" | "sustained";
export function numericProfileForTitle(title: string): NumericProfile {
  return title.includes("KPH") ? "sustained" : title.includes("Numeric Keypad Test") ? "basics" : "mixed";
}
export function numericExercise(profile: NumericProfile): string {
  const patterns = profile === "basics" ? ["456", "654", "123", "321", "789", "987", "405", "506", "708", "809"]
    : profile === "mixed" ? ["48291", "10577", "63.42", "921004", "782.15", "34008", "19.76", "55021"]
    : ["00482", "147.28", "90371", "08.50", "620194", "507.03", "00109", "92.16", "74082", "305.67"];
  // Supply the whole timed session, displaying only an active window.
  return Array.from({ length: 150 }, (_, cycle) => patterns.map((_, index) => patterns[(index + cycle) % patterns.length]).join(" ")).join(" ");
}
