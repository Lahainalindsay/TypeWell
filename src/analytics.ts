type AnalyticsEvent =
  | "typing_test_started"
  | "typing_test_completed"
  | "typing_test_restarted"
  | "test_duration_selected"
  | "share_result"
  | "certificate_created"
  | "weak_keys_practice"
  | "theme_changed"
  | "data_entry_started"
  | "data_entry_completed"
  | "ten_key_completed";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

export interface AnalyticsProvider {
  track(event: AnalyticsEvent, properties: Record<string, string | number | boolean | null>): void;
}

const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" || process.env.VITE_ANALYTICS_ENABLED === "true";
let provider: AnalyticsProvider | null = null;

export function configureAnalytics(nextProvider: AnalyticsProvider | null): void {
  provider = nextProvider;
}

export function trackEvent(event: AnalyticsEvent, properties: AnalyticsProperties = {}) {
  if (!analyticsEnabled || typeof window === "undefined") return;
  const sanitized = Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => value !== undefined && !["text", "customText", "name", "email"].includes(key))
  ) as Record<string, string | number | boolean | null>;
  provider?.track(event, sanitized);
  window.dispatchEvent(new CustomEvent("typewell:analytics", { detail: { event, properties: sanitized } }));
}

export function metricRange(value: number, step = 10) {
  const lower = Math.floor(value / step) * step;
  return `${lower}-${lower + step - 1}`;
}
