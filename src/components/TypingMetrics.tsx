import type { ReactNode } from "react";

export function Metric({ label, value, icon }: { label: string; value: ReactNode; icon?: ReactNode }) {
  return <div className="metric">{icon}<span>{label}</span><strong>{value}</strong></div>;
}

export function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const points = values.length ? values.map((value, i) => `${(i / Math.max(1, values.length - 1)) * 100},${42 - (value / max) * 36}`).join(" ") : "0,42 100,42";
  return <svg className="sparkline" viewBox="0 0 100 48" role="img" aria-label="Performance graph"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg>;
}

export function formatTime(ms: number) {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}
