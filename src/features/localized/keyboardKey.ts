/** Resolve the visible key for a character in the selected layout. */
export function localizedKeyboardKey(character: string, rows: string[][], lang: string): string | undefined {
  if (!character) return undefined;
  if (character === " ") return "Space";

  const keys = rows.flat();
  const lookup = (value: string) => keys.find((key) => key.toLocaleLowerCase() === value.toLocaleLowerCase());
  const normalized = character.normalize("NFC");
  const direct = lookup(normalized);
  if (direct) return direct;

  // French AZERTY uses Shift with its first-row symbol keys for digits.
  if (lang === "fr" && /^[0-9]$/.test(normalized)) {
    return rows[0][normalized === "0" ? 9 : Number(normalized) - 1];
  }
  if (lang === "fr" && normalized === ".") return lookup(";");

  // Accented letters may be composed with dead keys. Point to the letter key.
  const base = normalized.normalize("NFD").replace(/\p{M}/gu, "");
  if (base && lookup(base)) return lookup(base);

  // A Devanagari grapheme can include a vowel sign and several consonants.
  // Show its first consonant when the full grapheme is not a single key.
  for (const part of Array.from(normalized)) {
    const candidate = lookup(part);
    if (candidate) return candidate;
  }
  return undefined;
}
