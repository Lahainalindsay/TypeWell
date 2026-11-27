"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Keyboard, Moon } from "lucide-react";
import { formatTime, Metric, Sparkline } from "../../components/TypingMetrics";
import { lessons } from "../../data/lessons";
import { round } from "../../engine/metrics";
import { defaultProgress, exportProgress, summarizeProgress, validateProgress, type ProgressData } from "../../storage/progress";

type PreferencesProps = { progress: ProgressData; setProgress: Dispatch<SetStateAction<ProgressData>> };

export function Progress({ progress, setProgress }: PreferencesProps) {
  const [kind, setKind] = useState("prose");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const classify = (session: ProgressData["sessions"][number]) => {
    if (session.certificate?.kind === "numeric" || /KPH|10[- ]Key|Numeric Keypad/i.test(session.label)) return "numeric";
    if (session.certificate?.kind === "data-entry" || /data entry|invoices|currency|names & address/i.test(session.label)) return "data";
    return "prose";
  };
  const candidates = progress.sessions.filter(session => classify(session) === kind);
  const setting = (session: ProgressData["sessions"][number], key: string): string => {
    if (key === "label") return session.label;
    const value = session.comparison?.[key as keyof NonNullable<typeof session.comparison>];
    return typeof value === "string" ? value : "Unknown";
  };
  const sessions = candidates.filter(session => Object.entries(filters).every(([key, value]) => !value || setting(session, key) === value));
  const filtered = { ...progress, sessions };
  const summary = summarizeProgress(filtered);
  const speeds = sessions.map(session => kind === "numeric" ? session.metrics.totalKeystrokes * 3600000 / Math.max(1, session.metrics.elapsedMs) : session.metrics.wpm);
  const ordered = [...speeds].sort((a, b) => a - b);
  const middle = Math.floor(ordered.length / 2);
  const median = ordered.length ? (ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2) : 0;
  const unit = kind === "numeric" ? "KPH" : "WPM";

  const weakKeys = sessions.flatMap((session) => session.weakKeys).slice(-8);
  const combos = sessions.flatMap((session) => session.weakCombinations).slice(-8);

  function download() {
    const blob = new Blob([exportProgress(progress)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wpmtest-progress.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function upload(file: File | undefined) {
    if (!file) return;
    try {
      setProgress(validateProgress(JSON.parse(await file.text())));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Invalid progress file.");
    }
  }

  return (
    <section className="dashboard">
      <h1>Progress</h1><p>Your progress is stored on this device. Export a JSON backup any time; imported data is validated and never executed.</p>
      <div className="panel"><h2>Compare similar tests</h2>
        <p>Your personal best deserves applause. Your progress deserves a few more data points. Match settings and check accuracy alongside speed.</p>
        <div className="settings-grid comparison-filters">
          <label>Measurement<select value={kind} onChange={event => { setKind(event.target.value); setFilters({}); }}><option value="prose">Prose WPM</option><option value="numeric">Numeric KPH</option></select></label>
          {[["label", "Test or practice"], ["duration", "Duration (seconds)"], ["category", "Passage type"], ["language", "Language"], ["input", "Input method"], ["corrections", "Corrections"]].map(([key, label]) => <label key={key}>{label}<select value={filters[key] || ""} onChange={event => setFilters(previous => ({ ...previous, [key]: event.target.value }))}><option value="">All</option>{[...new Set(candidates.map(session => setting(session, key)))].sort().map(value => <option key={value} value={value}>{value}</option>)}</select></label>)}
        </div>
        <button type="button" onClick={() => setFilters({})}>Reset filters</button>
        <p role="status">{sessions.length} matching attempts · Median {unit} {round(median)}</p>
        <p className="hint">Older results may have unknown settings. Input method reflects how text was entered. On-screen and other text-input tools are grouped together.</p>
        {!sessions.length && <p>No matching attempts. Adjust the filters or complete a test.</p>}
      </div>
      <div className="metrics big"><Metric label={`Current ${unit}`} value={round(speeds.at(-1) ?? 0)} /><Metric label={`Best ${unit}`} value={round(Math.max(0, ...speeds))} /><Metric label="Average Accuracy" value={`${round(summary.averageAccuracy)}%`} /><Metric label="Consistency" value={`${round(summary.bestConsistency)}%`} /><Metric label="Practice Time" value={formatTime(summary.totalPracticeTime)} /><Metric label="Lessons Completed" value={`${progress.completedLessons.length}/${lessons.length}`} /></div>
      <div className="panel"><h2>{unit} Over Time</h2><Sparkline values={speeds} /></div>
      <div className="grid-two"><div className="panel"><h2>Weak Keys</h2>{weakKeys.length ? weakKeys.map((key) => <p key={`${key.key}-${key.errorRate}`}>{key.key}: {round(key.errorRate)}% errors</p>) : <p>No weak keys recorded yet.</p>}</div><div className="panel"><h2>Weak Combinations</h2>{combos.length ? combos.map((combo) => <p key={`${combo.combo}-${combo.errorRate}`}>{combo.combo}: {round(combo.errorRate)}% errors</p>) : <p>No difficult combinations recorded yet.</p>}</div></div>
      <div className="actions"><button onClick={download}>Export Progress</button><label className="button">Import Progress<input type="file" accept="application/json" onChange={(e) => upload(e.target.files?.[0])} hidden /></label><button onClick={() => confirm("Reset local WPMTest progress?") && setProgress(defaultProgress)}>Reset Progress</button></div>
    </section>
  );
}

export function Settings({ progress, setProgress }: PreferencesProps) {
  const settings = progress.settings;
  const update = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => setProgress((old) => ({ ...old, settings: { ...old.settings, [key]: value } }));
  return (
    <section className="settings-page">
      <h1>Settings</h1>
      <div className="settings-grid">
        <div className="panel"><h2><Moon size={18} />Theme</h2><select aria-label="Color theme" value={settings.theme} onChange={(e) => update("theme", e.target.value as typeof settings.theme)}><option>dark</option><option>light</option><option>system</option></select></div>
        <div className="panel"><h2><Keyboard size={18} />Typing Display</h2><label>Font size <input type="range" min="18" max="34" value={settings.fontSize} onChange={(e) => update("fontSize", Number(e.target.value))} /></label><label>Line height <input type="range" min="1.3" max="2.1" step="0.05" value={settings.lineHeight} onChange={(e) => update("lineHeight", Number(e.target.value))} /></label></div>
        <TogglePanel title="Show / Hide" settings={settings} update={update} keys={["showLiveMetrics", "showKeyboard"]} />
        <TogglePanel title="Behavior" settings={settings} update={update} keys={["stopOnError", "allowCorrections", "smoothCaret"]} />
        <TogglePanel title="Sound" settings={settings} update={update} keys={["keySound", "errorSound", "metronome"]} />
        <div className="panel"><h2>Accessibility</h2><label><input type="checkbox" checked={settings.highContrast} onChange={(e) => update("highContrast", e.target.checked)} /> High contrast</label><label><input type="checkbox" checked={settings.reducedMotion} onChange={(e) => update("reducedMotion", e.target.checked)} /> Reduced motion</label></div>
      </div>
    </section>
  );
}

function TogglePanel({ title, settings, update, keys }: { title: string; settings: ProgressData["settings"]; update: <K extends keyof ProgressData["settings"]>(key: K, value: ProgressData["settings"][K]) => void; keys: Array<keyof ProgressData["settings"]> }) {
  return <div className="panel"><h2>{title}</h2>{keys.map((key) => <label key={key}><input type="checkbox" checked={Boolean(settings[key])} onChange={(e) => update(key, e.target.checked as never)} /> {human(key)}</label>)}</div>;
}

function human(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
