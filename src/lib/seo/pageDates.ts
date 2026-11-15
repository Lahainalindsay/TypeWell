// Dates track substantive published copy changes and are shared with page bylines.
export const aboutUpdated = "2026-11-15";
export const deskSetupPublished = "2026-11-13";
export const deskSetupUpdated = deskSetupPublished;
export const editorialUpdated = "2026-11-12";

export function guideUpdated(slug: string) {
  return slug === "wpm-vs-kph" ? "2026-11-14" : editorialUpdated;
}
