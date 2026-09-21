import { splitGraphemes } from "./graphemes";

export function keysFromTextInput(inputType: string, data: string | null): string[] {
  if (inputType.startsWith("delete")) return ["Backspace"];
  if (!data) return [];
  return splitGraphemes(data).map((character) => character === "\n" ? " " : character);
}
