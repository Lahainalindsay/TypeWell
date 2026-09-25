"use client";
import { adsConfig, adsEnabledForLocalPreview } from "../ads.config";

export function AdSlot({ placement }: { placement: string }) {
  const enabled = adsConfig.enabled || adsEnabledForLocalPreview();
  if (!enabled) return null;
  const slot = adsConfig.slots[placement as keyof typeof adsConfig.slots] ?? adsConfig.slots.contentMiddle;
  return <div className="ad-slot" data-placement={placement} aria-label="Ad placement" style={{ minHeight: slot.minHeight }}>Ad placement</div>;
}

