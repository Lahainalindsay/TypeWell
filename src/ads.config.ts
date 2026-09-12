export type AdSlotId = "belowResults" | "contentMiddle" | "desktopSidebar" | "articleBottom" | "afterHomeTest" | "guideMidArticle";

export const adsConfig = {
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true" || process.env.VITE_ADS_ENABLED === "true",
  provider: "adsense",
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || process.env.VITE_ADSENSE_PUBLISHER_ID || "",
  slots: {
    belowResults: { minHeight: 90 },
    contentMiddle: { minHeight: 90 },
    desktopSidebar: { minHeight: 250 },
    articleBottom: { minHeight: 90 },
    afterHomeTest: { minHeight: 90 },
    guideMidArticle: { minHeight: 90 }
  } satisfies Record<AdSlotId, { minHeight: number }>
};

export function adsEnabledForLocalPreview() {
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1"].includes(window.location.hostname) && new URLSearchParams(window.location.search).get("showAds") === "1";
}
