"use client";

import type { Dispatch, SetStateAction } from "react";
import { Keyboard, Moon } from "lucide-react";
import { formatTime, Metric, Sparkline } from "../../components/TypingMetrics";
import { lessons } from "../../data/lessons";
import { round } from "../../engine/metrics";
import { defaultProgress, exportProgress, summarizeProgress, validateProgress, type ProgressData } from "../../storage/progress";

type PreferencesProps = { progress: ProgressData; setProgress: Dispatch<SetStateAction<ProgressData>> };

export function Progress({ progress, setProgress }: PreferencesProps) {
  const summary = summarizeProgress(progress);
  const weakKeys = progress.sessions.flatMap((session) => session.weakKeys).slice(-8);
  const combos = progress.sessions.flatMap((session) => session.weakCombinations).slice(-8);

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
      <div className="metrics big"><Metric label="Current WPM" value={round(progress.sessions.at(-1)?.metrics.wpm ?? 0)} /><Metric label="Best WPM" value={round(summary.bestWpm)} /><Metric label="Average Accuracy" value={`${round(summary.averageAccuracy)}%`} /><Metric label="Consistency" value={`${round(summary.bestConsistency)}%`} /><Metric label="Practice Time" value={formatTime(summary.totalPracticeTime)} /><Metric label="Lessons Completed" value={`${progress.completedLessons.length}/${lessons.length}`} /></div>
      <div className="panel"><h2>WPM Over Time</h2><Sparkline values={progress.sessions.map((session) => session.metrics.wpm)} /></div>
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
