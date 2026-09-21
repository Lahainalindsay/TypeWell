const graphemeSegmenter = typeof Intl !== "undefined" && "Segmenter" in Intl
  ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
  : null;

export function splitGraphemes(value: string): string[] {
  const normalized = value.normalize("NFC");
  if (!graphemeSegmenter) return Array.from(normalized);
  return Array.from(graphemeSegmenter.segment(normalized), ({ segment }) => segment);
}

export function graphemeLength(value: string): number {
  return splitGraphemes(value).length;
}
