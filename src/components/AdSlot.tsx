"use client";

import { useEffect, useState } from "react";
import { adsConfig, adsEnabledForLocalPreview, type AdSlotId } from "../ads.config";

export function AdSlot({ placement }: { placement: AdSlotId }) {
  const [localPreview, setLocalPreview] = useState(false);
  useEffect(() => { setLocalPreview(adsEnabledForLocalPreview()); }, []);

  if (!adsConfig.enabled && !localPreview) return null;

  return <div className="ad-slot" data-placement={placement} aria-hidden="true"
    style={{ minHeight: adsConfig.slots[placement].minHeight, visibility: "hidden" }} />;
}
