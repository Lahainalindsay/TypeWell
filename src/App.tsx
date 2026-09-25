"use client";

import React, { useEffect, useRef, useState } from "react";
import { Award, BarChart3, Calculator, Gamepad2, Gauge, Keyboard, LineChart, Moon, RotateCcw, Timer, X, Zap } from "lucide-react";
import { applyInput, calculateMetrics, createSession, round } from "./engine/metrics";
import { calculateRhythmMetrics, nearestBeat } from "./engine/rhythm";
import { calculateKph, calculateKpm, calculateNumericMetrics } from "./engine/numeric";
import { isLessonPassed, nextLessonId } from "./engine/lessons";
import { analyzeWeakCombinations, analyzeWeakKeys, generateWeakKeyExercise } from "./engine/weakKeys";
import { lessons } from "./data/lessons";
import { buildPageTestText, buildPracticeText, durations, practiceModes, testDurations, wordCounts, type PracticeMode } from "./data/texts";
import { keyInfo, rows, fingerClass } from "./data/keyboard";
import { defaultProgress, exportProgress, loadProgress, saveProgress, summarizeProgress, validateProgress, type ProgressData, type SessionRecord } from "./storage/progress";
import { AdSlot } from "./components/AdSlot";
import { HomePage } from "./components/HomePage";
import { metricRange, trackEvent } from "./analytics";
import { calculateDataEntryMetrics, dataEntryFields, fictionalDataEntryRecords } from "./engine/dataEntry";
import { splitGraphemes } from "./engine/graphemes";
import { keysFromTextInput } from "./engine/textInput";
import type { Metrics } from "./engine/types";

type Page = "home" | "learn" | "practice" | "test" | "rhythm" | "progress" | "settings" | "tools" | "games";

export default function WPMTestApp({ initialPath = "/", embedded = false }: { initialPath?: string; embedded?: boolean }) {
  const [page, setPage] = useState<Page>(routeToPage(initialPath));
  const [path, setPath] = useState(initialPath);
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);
  const [storageReady, setStorageReady] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    saveProgress(progress);
    document.documentElement.dataset.theme = progress.settings.theme === "system" && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : progress.settings.theme;
    document.documentElement.dataset.contrast = String(progress.settings.highContrast);
    document.documentElement.dataset.motion = progress.settings.reducedMotion ? "reduced" : "ok";
  }, [progress, storageReady]);

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname);
      setPage(routeToPage(window.location.pathname));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function go(next: Page, route = next === "home" ? "/" : `/${next}`) {
    window.history.pushState(null, "", route);
    setPath(route);
    setPage(next);
  }

  function record(record: SessionRecord, completedLesson?: string) {
    setProgress((old) => ({
      ...old,
      completedLessons: completedLesson && !old.completedLessons.includes(completedLesson) ? [...old.completedLessons, completedLesson] : old.completedLessons,
      currentLesson: completedLesson ? nextLessonId(lessons, [...old.completedLessons, completedLesson]) : old.currentLesson,
      sessions: [...old.sessions, record].slice(-300),
      strokes: [...old.strokes, ...(record.strokes ?? [])].slice(-5000)
    }));
  }

  const props = { progress, setProgress, record, go, setFocus, path, embedded };
  const ContentLandmark = embedded ? "div" : "main";

  return (
    <div className={focus ? "app focus-active" : "app"}>
      <ContentLandmark className="app-content">
        {page === "home" && <Home {...props} />}
        {page === "learn" && <Learn {...props} />}
        {page === "practice" && <Practice {...props} />}
        {page === "test" && <Test {...props} />}
        {page === "rhythm" && <Rhythm {...props} />}
        {page === "progress" && <Progress progress={progress} setProgress={setProgress} />}
        {page === "settings" && <Settings progress={progress} setProgress={setProgress} />}
        {page === "tools" && <Tools path={path} go={go} progress={progress} />}
        {page === "games" && <TypingGames progress={progress} setProgress={setProgress} record={record} setFocus={setFocus} path={path} go={go} embedded={embedded} />}
      </ContentLandmark>
    </div>
  );
}

function Home({ progress, setProgress, record, setFocus, path, go, embedded }: SharedProps) {
  return <HomePage test={<HomeTest progress={progress} setProgress={setProgress} record={record} setFocus={setFocus} path={path} go={go} embedded={embedded} />} />;
}

function HomeTest({ progress, setProgress, record, setFocus, path, go }: SharedProps) {
  const [duration, setDuration] = useState(() => testDurationFromPath(path));
  useEffect(() => setDuration(testDurationFromPath(path)), [path]);
  const durationLabels: Record<number, string> = { 60: "1 Minute", 180: "3 Minutes", 300: "5 Minutes", 600: "10 Minutes" };
  return <section className="home-test"><div className="home-test-head"><div><h2>Check Your Typing Speed</h2><p>Choose a test length, then type the passage below. Your WPM, accuracy, and consistency update as you type.</p></div><div className="duration-picker" aria-label="Typing test duration">{Object.entries(durationLabels).map(([seconds, label]) => <button className={duration === Number(seconds) ? "active" : ""} onClick={() => { const next = Number(seconds); setDuration(next); trackEvent("test_duration_selected", { testType: "home", duration: next }); }} key={seconds}>{label}</button>)}</div></div><Trainer title={`${duration / 60} Minute Typing Test`} heading="h2" subtitle="Standard 5-character word scoring with local results and no signup." target={buildPracticeText("Sentences", Math.max(120, Math.round(duration * 1.8)))} mode="test" duration={duration} progress={progress} setProgress={setProgress} onRecord={record} setFocus={setFocus} onPractice={() => go("practice", "/practice/weak-keys")} /></section>;
}

function InternalLink({ href, go, children }: { href: string; go: (page: Page, route?: string) => void; children: React.ReactNode }) {
  return <a href={href} onClick={(event) => { event.preventDefault(); go(routeToPage(href), href); }}>{children}</a>;
}

function Learn({ progress, setProgress, record, setFocus, path, go }: SharedProps) {
  const routeLesson = lessonFromPath(path);
  const lesson = routeLesson ?? lessons.find((item) => item.id === progress.currentLesson) ?? lessons[0];
  const lessonIndex = lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = lessons[lessonIndex - 1];
  const nextLesson = lessons[lessonIndex + 1];
  return (
    <Trainer
      title={lesson.title}
      subtitle={`Level ${lesson.level} · ${lesson.summary}`}
      target={lesson.exercise}
      mode="lesson"
      keys={lesson.keys}
      targetWpm={lesson.targetWpm}
      targetAccuracy={lesson.targetAccuracy}
      progress={progress}
      setProgress={setProgress}
      onRecord={(session) => {
        const passed = isLessonPassed(session.metrics.wpm, session.metrics.accuracy, lesson.targetWpm, lesson.targetAccuracy);
        record(session, passed ? lesson.id : undefined);
      }}
      setFocus={setFocus}
      seoCopy={<p className="tool-copy">This touch typing lesson teaches {lesson.keys.join(", ")} with keyboard practice, finger placement guidance, live typing accuracy, and WPM feedback.</p>}
      side={<LessonList progress={progress} go={go} activeLessonId={lesson.id} />}
      footer={
        <div className="lesson-nav">
          <button disabled={!previousLesson} onClick={() => previousLesson && go("learn", lessonPath(previousLesson.id))}>Previous Lesson</button>
          <button disabled={!nextLesson} onClick={() => nextLesson && go("learn", lessonPath(nextLesson.id))}>Next Lesson</button>
        </div>
      }
    />
  );
}

function Practice({ progress, setProgress, record, setFocus, path, embedded }: SharedProps) {
  const [mode, setMode] = useState<PracticeMode>(() => practiceModeFromPath(path));
  const [duration, setDuration] = useState(60);
  const [count, setCount] = useState(50);
  const [custom, setCustom] = useState("");
  useEffect(() => setMode(practiceModeFromPath(path)), [path]);
  const weak = analyzeWeakKeys(progress.strokes);
  const target = mode === "Weak Keys" ? generateWeakKeyExercise(weak.map((item) => item.key)) : buildPracticeText(mode, count, custom);
  return (
    <Trainer
      title={mode === "Weak Keys" ? "Weak-Key Typing Practice" : "Typing Practice — Targeted Drills to Fix Your Weak Keys"}
      heading={embedded ? "h2" : undefined}
      subtitle="Choose a focused mode, duration, or word-count target. Everything runs locally in your browser."
      target={target}
      mode="practice"
      duration={duration}
      progress={progress}
      setProgress={setProgress}
      onRecord={(session) => record(session)}
      setFocus={setFocus}
      seoCopy={<p className="tool-copy">Use this free typing practice tool to improve WPM, typing speed, keyboard accuracy, punctuation control, numbers, custom text, and code-style typing without an account.</p>}
      side={<Controls mode={mode} setMode={setMode} duration={duration} setDuration={setDuration} count={count} setCount={setCount} custom={custom} setCustom={setCustom} />}
    />
  );
}

function Test({ progress, setProgress, record, setFocus, path, go, embedded }: SharedProps) {
  const [duration, setDuration] = useState(() => testDurationFromPath(path));
  const [count, setCount] = useState(() => Math.max(50, Math.round(testDurationFromPath(path) * 1.8)));
  const pageCount = pageCountFromPath(path);
  const testMode = testModeFromPath(path);
  const testTitle = pageCount ? `${pageCount} Page Typing Test`
    : testMode === "Data Entry" ? "Data Entry Typing Test"
    : testMode === "Numeric Keypad" ? path.includes("kph") ? "KPH Typing Test — Measure Your 10-Key Numeric Entry Speed" : path.includes("10-key") ? "10 Key Typing Test" : "Numeric Keypad Test"
    : testMode === "Numbers"
    ? path.includes("kph") ? "KPH Typing Test — Measure Your 10-Key Numeric Entry Speed" : path.includes("10-key") || path.includes("numeric-keypad") ? "10 Key Numeric Keypad Test" : "Typing Test with Numbers"
    : testMode === "Punctuation" ? "Typing Test with Punctuation"
    : path.replace(/\/$/, "") === "/mobile-typing-test" ? "Mobile Typing Test — Test Your Speed on a Phone or Tablet"
    : timedTestTitle(path);
  const testDescription = pageCount
    ? `Complete approximately ${pageCount * 250} words at your own pace. The test ends when you finish the passage, and your WPM is calculated from your actual time.`
    : testMode === "Data Entry"
    ? "Practice fictional records with names, order IDs, dates, amounts, and ZIP codes."
    : testMode === "Numeric Keypad"
      ? "Practice numeric keypad groups while tracking speed, accuracy, and errors."
      : testMode === "Numbers"
    ? "Practice dates, prices, measurements, and percentages in a realistic number-focused typing test."
    : testMode === "Punctuation"
      ? "Practice commas, quotes, questions, and capitalization while measuring typing speed and accuracy."
      : path.replace(/\/$/, "") === "/mobile-typing-test"
        ? "Measure touchscreen typing speed using your phone or tablet's on-screen keyboard."
        : `${duration / 60}-minute typing speed test with standard WPM scoring, accuracy, consistency, and local results.`;
  useEffect(() => {
    const nextDuration = testDurationFromPath(path);
    setDuration(nextDuration);
    setCount(Math.max(50, Math.round(nextDuration * 1.8)));
  }, [path]);
  if (testMode === "Data Entry") {
    return <DataEntryTrainer path={path} progress={progress} setProgress={setProgress} onRecord={record} setFocus={setFocus} go={go} embedded={embedded} />;
  }
  if (testMode === "Numeric Keypad") {
    return <NumericKeypadTrainer title={testTitle} duration={duration} progress={progress} setProgress={setProgress} onRecord={record} setFocus={setFocus} go={go} />;
  }
  return (
    <Trainer
      title={testTitle}
      heading={embedded ? "h2" : undefined}
      subtitle={pageCount ? "Finish the whole passage at your own pace. No countdown or account required." : "Standard 5-character word WPM with raw WPM, accuracy, consistency, and local best comparisons."}
      target={pageCount ? buildPageTestText(pageCount) : buildPracticeText(testMode, count)}
      mode="test"
      duration={pageCount ? undefined : duration}
      progress={progress}
      setProgress={setProgress}
      onRecord={(session) => record(session)}
      setFocus={setFocus}
      onPractice={() => go("practice", "/practice/weak-keys")}
      seoCopy={<p className="tool-copy">{testDescription} No signup is required, and your result stays in this browser.</p>}
      side={pageCount
        ? <div className="panel"><h2>Page Tests</h2><p>One page is approximately 250 words. Complete the passage to see your result.</p><div className="inline-links">{([1, 2, 3] as const).map((pages) => <a key={pages} href={`/${pages}-page-typing-test/`}>{pages} Page{pages > 1 ? "s" : ""}</a>)}</div></div>
        : <div className="panel"><h2>Test Setup</h2><Segment values={testDurations} value={duration} setValue={setDuration} suffix="s" /><Segment values={wordCounts} value={count} setValue={setCount} suffix=" words" /><p className="hint">Restart shortcut: press Tab, then Enter on Restart.</p></div>}
    />
  );
}

function utilityMetrics(correctCharacters: number, incorrectCharacters: number, totalKeystrokes: number, elapsedMs: number): Metrics {
  const minutes = elapsedMs > 0 ? elapsedMs / 60000 : 0;
  const accuracy = totalKeystrokes ? (correctCharacters / totalKeystrokes) * 100 : 100;
  const wpm = minutes ? (correctCharacters / 5) / minutes : 0;
  const rawWpm = minutes ? (totalKeystrokes / 5) / minutes : 0;
  return {
    correctCharacters, incorrectCharacters, correctedErrors: 0,
    uncorrectedErrors: incorrectCharacters, totalKeystrokes, elapsedMs,
    activeMs: elapsedMs, idleMs: 0, wordsTyped: correctCharacters / 5,
    wpm: round(wpm), rawWpm: round(rawWpm), grossWpm: round(rawWpm),
    netWpm: round(wpm), charactersPerMinute: round(minutes ? totalKeystrokes / minutes : 0),
    correctWords: 0, mistypedWords: 0, accuracy: round(accuracy), consistency: 100,
    consistencyLabel: "Very Steady", errorRate: round(totalKeystrokes ? (incorrectCharacters / totalKeystrokes) * 100 : 0)
  };
}

function DataEntryTrainer({ path, progress, setProgress, onRecord, setFocus, go, embedded }: Pick<SharedProps, "progress" | "setProgress" | "setFocus" | "go" | "path" | "embedded"> & { onRecord: (record: SessionRecord) => void }) {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const profile = normalizedPath.endsWith("/alphanumeric")
    ? { title: "Alphanumeric Data Entry Practice", description: "Practice names, order IDs, ZIP codes, and product codes.", indexes: [0, 1, 4, 5], labels: ["Name", "Order ID", "ZIP", "Product code"] }
    : normalizedPath.endsWith("/names-addresses")
      ? { title: "Names & Address Data Entry Practice", description: "Practice contact-style records with names and ZIP codes before moving into full structured records.", indexes: [0, 4], labels: ["Name", "ZIP"] }
      : normalizedPath.endsWith("/currency-dates")
        ? { title: "Currency & Date Data Entry Practice", description: "Practice exact entry of dates, dollar amounts, and decimals.", indexes: [2, 3], labels: ["Date", "Amount"] }
        : normalizedPath.endsWith("/invoices-orders")
          ? { title: "Invoices & Orders Data Entry Practice", description: "Practice order IDs, product codes, dates, and amounts used in order-entry work.", indexes: [1, 5, 2, 3], labels: ["Order ID", "Product code", "Date", "Amount"] }
          : { title: normalizedPath === "/data-entry-typing-test" ? "Data Entry Typing Test — Measure Speed for Data-Entry Roles" : "General Data Entry Practice", description: "Enter each fictional record field exactly, including dates, amounts, codes, and ZIP codes.", indexes: [0, 1, 2, 3, 4, 5], labels: ["Name", "Order ID", "Date", "Amount", "ZIP", "Product code"] };

  const [recordIndex, setRecordIndex] = useState(0);
  const [fieldIndex, setFieldIndex] = useState(0);
  const [actual, setActual] = useState<string[][]>([]);
  const [value, setValue] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finished, setFinished] = useState<SessionRecord | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const record = fictionalDataEntryRecords[recordIndex];
  const allFields = dataEntryFields(record);
  const fields = profile.indexes.map((index) => allFields[index]);
  const expected = fields[fieldIndex] ?? "";

  useEffect(() => { inputRef.current?.focus(); }, [recordIndex, fieldIndex, finished]);

  function submitField() {
    if (!value && !startedAt) return;
    const start = startedAt ?? performance.now();
    if (!startedAt) { setStartedAt(start); trackEvent("data_entry_started", { testType: "data-entry" }); }
    const nextActual = actual.map((fields) => [...fields]);
    nextActual[recordIndex] = [...(nextActual[recordIndex] ?? []), value];
    setActual(nextActual);
    setValue("");
    if (fieldIndex + 1 < fields.length) { setFieldIndex(fieldIndex + 1); return; }
    if (recordIndex + 1 < fictionalDataEntryRecords.length) { setRecordIndex(recordIndex + 1); setFieldIndex(0); return; }
    const elapsedMs = Math.max(1, performance.now() - start);
    const expectedFields = fictionalDataEntryRecords.flatMap((item) => {
      const values = dataEntryFields(item);
      return profile.indexes.map((index) => values[index]);
    });
    const actualFields = nextActual.flat();
    const correct = actualFields.reduce((count, field, index) => count + (field === expectedFields[index] ? 1 : 0), 0);
    const accuracy = actualFields.length ? Math.round((correct / actualFields.length) * 1000) / 10 : 100;
    const total = nextActual.flat().reduce((sum, item) => sum + item.length, 0);
    const session: SessionRecord = {
      id: crypto.randomUUID(), date: new Date().toISOString(), type: "test", label: "Data Entry Typing Test",
      metrics: utilityMetrics(correct, Math.max(0, actualFields.length - correct), Math.max(1, actualFields.length), elapsedMs), weakKeys: [], weakCombinations: []
    };
    session.metrics.accuracy = accuracy;
    setFinished(session); onRecord(session); trackEvent("data_entry_completed", { testType: "data-entry", accuracyRange: metricRange(accuracy) });
  }

  function reset() { setRecordIndex(0); setFieldIndex(0); setActual([]); setValue(""); setStartedAt(null); setFinished(null); }
  return <section className="dashboard utility-test">
    <div className="trainer-head"><div>{embedded ? <h2>{profile.title}</h2> : <h1>{profile.title}</h1>}<p>{profile.description}</p></div><button onClick={reset}><RotateCcw size={18} />Restart</button></div>
    {!finished ? <><div className="data-entry-record panel"><p className="eyebrow">Record {recordIndex + 1} of {fictionalDataEntryRecords.length} · Field {fieldIndex + 1} of {fields.length}</p>{fields.map((field, index) => <div className={index === fieldIndex ? "data-field active" : "data-field"} key={`${field}-${index}`}><span>{profile.labels[index]}</span><strong>{field}</strong></div>)}</div><div className="panel data-entry-input"><label htmlFor="data-entry-field">Type the highlighted value</label><input id="data-entry-field" ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submitField(); } }} autoComplete="off" /><p className="hint">Press Enter after each field. The next record appears automatically.</p></div></> : <div className="result-card inline-result"><p className="eyebrow">Session complete</p><h2>Data entry results</h2><div className="metrics"><Metric label="Field Accuracy" value={`${finished.metrics.accuracy}%`} /><Metric label="Records" value={fictionalDataEntryRecords.length} /><Metric label="Correct Fields" value={finished.metrics.correctCharacters} /><Metric label="Incorrect Fields" value={finished.metrics.incorrectCharacters} /><Metric label="Time" value={formatTime(finished.metrics.elapsedMs)} /></div><div className="actions"><button className="primary" onClick={reset}><RotateCcw size={18} />Retake Test</button><InternalAction href="/10-key-typing-test/">Try 10-Key Test</InternalAction><InternalAction href="/typing-certificate/">Create Certificate</InternalAction></div></div>}
    <p className="tool-copy">This test uses fictional records and measures field-level accuracy separately from paragraph typing. Progress is stored locally on this device.</p>
    <div className="inline-links"><InternalLink href="/data-entry-practice/" go={go}>All Data Entry Practice</InternalLink><InternalLink href="/10-key-typing-test/" go={go}>10-Key Test</InternalLink><InternalLink href="/kph-typing-test/" go={go}>KPH Test</InternalLink><InternalLink href="/typing-test/" go={go}>Prose Typing Test</InternalLink></div>
  </section>;
}

function NumericKeypadTrainer({ title, duration, progress, setProgress, onRecord, setFocus, go }: { title: string; duration: number; progress: ProgressData; setProgress: React.Dispatch<React.SetStateAction<ProgressData>>; onRecord: (record: SessionRecord) => void; setFocus: (focus: boolean) => void; go: (page: Page, route?: string) => void }) {
  const target = "48291 10577 63.42 921004 782.15 34008 19.76 55021";
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => performance.now());
  const [finished, setFinished] = useState<SessionRecord | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { const id = window.setInterval(() => setNow(performance.now()), 250); return () => clearInterval(id); }, []);
  const elapsedMs = startedAt ? Math.min(duration * 1000, now - startedAt) : 0;
  const numeric = calculateNumericMetrics(target, typed, elapsedMs);
  useEffect(() => { if (startedAt && elapsedMs >= duration * 1000 && !finished) complete(); }, [elapsedMs, startedAt, finished]);
  function complete() { const finalMs = Math.max(1, Math.min(duration * 1000, performance.now() - (startedAt ?? performance.now()))); const result = calculateNumericMetrics(target, typed, finalMs); const session: SessionRecord = { id: crypto.randomUUID(), date: new Date().toISOString(), type: "test", label: title, metrics: utilityMetrics(result.correctKeystrokes, result.incorrectKeystrokes, result.totalKeystrokes, finalMs), weakKeys: [], weakCombinations: [] }; setFinished(session); onRecord(session); trackEvent("ten_key_completed", { testType: title, duration, accuracyRange: metricRange(result.accuracy) }); }
  function reset() { setTyped(""); setStartedAt(null); setFinished(null); requestAnimationFrame(() => inputRef.current?.focus()); }
  function applyNumericKeys(keys: string[]) {
    if (!keys.length) return;
    if (!startedAt && keys.some((key) => key !== "Backspace")) setStartedAt(performance.now());
    setTyped((old) => keys.reduce((value, key) => {
      if (key === "Backspace") return value.slice(0, -1);
      let nextValue = value;
      if (key !== " ") {
        while (target[nextValue.length] === " ") nextValue += " ";
      }
      return nextValue.length < target.length ? nextValue + key : nextValue;
    }, old));
  }
  function numericBeforeInput(event: React.FormEvent<HTMLTextAreaElement>) {
    const inputEvent = event.nativeEvent as InputEvent;
    if (inputEvent.isComposing) return;
    const keys = keysFromTextInput(inputEvent.inputType, inputEvent.data);
    if (!keys.length) return;
    event.preventDefault();
    applyNumericKeys(keys);
  }
  return <section className="dashboard utility-test"><div className="trainer-head"><div><h1>{title}</h1><p>Type the numeric groups using your physical or on-screen keypad. KPM and KPH count every entered keystroke.</p></div><button onClick={reset}><RotateCcw size={18} />Restart</button></div>{!finished ? <><div className="metrics"><Metric label="KPM" value={numeric.kpm} /><Metric label="KPH" value={numeric.kph} /><Metric label="Accuracy" value={`${numeric.accuracy}%`} /><Metric label="Time" value={formatTime(Math.max(0, duration * 1000 - elapsedMs))} /></div><div className="typing-text numeric-prompt" onClick={() => inputRef.current?.focus()}>{Array.from(target).map((char, index) => <span className={index < typed.length ? typed[index] === char ? "correct" : "incorrect" : index === typed.length ? "current" : "pending"} key={`${index}-${char}`}>{char === " " ? "·" : char}</span>)}</div><textarea ref={inputRef} className="typing-capture-input" value="" rows={1} onKeyDown={(event) => { if (event.key.length !== 1 && event.key !== "Backspace") return; event.preventDefault(); applyNumericKeys([event.key]); }} onBeforeInput={numericBeforeInput} onChange={(event) => applyNumericKeys(keysFromTextInput("insertText", event.currentTarget.value))} autoComplete="off" autoCorrect="off" spellCheck={false} inputMode="decimal" enterKeyHint="done" aria-label="Numeric keypad typing input" placeholder="Tap here to open your numeric keyboard" /><p className="start-hint">Tap the number sequence or input field to begin. Spaces between number groups advance automatically on mobile.</p><p className="mobile-typing-note">An on-screen number pad measures touchscreen entry. Use a physical 10-key keypad when preparing for a hardware-keyboard employment assessment.</p></> : <div className="result-card inline-result"><p className="eyebrow">Session complete</p><h2>{calculateKph(finished.metrics.totalKeystrokes, finished.metrics.elapsedMs)} KPH · {finished.metrics.accuracy}% accuracy</h2><div className="metrics"><Metric label="KPM" value={calculateKpm(finished.metrics.totalKeystrokes, finished.metrics.elapsedMs)} /><Metric label="KPH" value={calculateKph(finished.metrics.totalKeystrokes, finished.metrics.elapsedMs)} /><Metric label="Correct Keystrokes" value={finished.metrics.correctCharacters} /><Metric label="Incorrect Keystrokes" value={finished.metrics.incorrectCharacters} /></div><div className="actions"><button className="primary" onClick={reset}><RotateCcw size={18} />Retake Test</button><InternalAction href="/data-entry-typing-test/">Data Entry Test</InternalAction><InternalAction href="/kph-typing-test/">KPH Test</InternalAction></div></div>}<p className="tool-copy">KPM is keystrokes per minute. KPH is KPM multiplied by 60. Accuracy compares correct numeric keystrokes with all entered keystrokes; backspaces remove an entry before it is scored.</p><div className="inline-links"><InternalLink href="/data-entry-typing-test/" go={go}>Data Entry Test</InternalLink><InternalLink href="/kph-typing-test/" go={go}>KPH Typing Test</InternalLink><InternalLink href="/typing-test-with-numbers/" go={go}>Typing Test With Numbers</InternalLink></div></section>;
}

interface SharedProps {
  progress: ProgressData;
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>;
  record: (record: SessionRecord, completedLesson?: string) => void;
  go: (page: Page, route?: string) => void;
  setFocus: (focus: boolean) => void;
  path: string;
  embedded: boolean;
}

function Trainer(props: {
  title: string;
  subtitle: string;
  target: string;
  mode: "lesson" | "practice" | "test";
  heading?: "h1" | "h2";
  keys?: string[];
  targetWpm?: number;
  targetAccuracy?: number;
  seoCopy?: React.ReactNode;
  footer?: React.ReactNode;
  onPractice?: () => void;
  duration?: number;
  progress: ProgressData;
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>;
  onRecord: (session: SessionRecord) => void;
  setFocus: (focus: boolean) => void;
  side?: React.ReactNode;
}) {
  const [session, setSession] = useState(() => createSession(props.target));
  const [finished, setFinished] = useState<SessionRecord | null>(null);
  const [now, setNow] = useState(performance.now());
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const metrics = calculateMetrics(session, pausedAt ?? now);
  const targetCharacters = splitGraphemes(props.target);
  const current = targetCharacters[session.typed.length] ?? "";
  const next = targetCharacters[session.typed.length + 1] ?? "";

  useEffect(() => reset(), [props.target, props.duration]);
  useEffect(() => {
    const id = window.setInterval(() => setNow(performance.now()), 250);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!props.duration || !session.startedAt || finished) return;
    if (pausedAt) return;
    if ((now - session.startedAt) / 1000 >= props.duration) complete();
  }, [now, session.startedAt, props.duration, finished, pausedAt]);
  useEffect(() => {
    if (session.endedAt && !finished) complete();
  }, [session.endedAt, finished]);
  useEffect(() => {
    const exit = (event: KeyboardEvent) => {
      if (event.key === "Escape") props.setFocus(false);
    };
    addEventListener("keydown", exit);
    return () => removeEventListener("keydown", exit);
  }, []);
  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        if (session.startedAt && !finished) setPausedAt(performance.now());
        return;
      }
      setPausedAt((hiddenAt) => {
        if (hiddenAt === null) return null;
        const resumedAt = performance.now();
        setSession((old) => old.startedAt ? { ...old, startedAt: old.startedAt + (resumedAt - hiddenAt) } : old);
        return null;
      });
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [session.startedAt, finished]);

  function reset() {
    setSession(createSession(props.target));
    setFinished(null);
    setPausedAt(null);
    trackEvent("typing_test_restarted", { testType: props.mode, duration: props.duration ?? null });
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function complete() {
    const finalMetrics = calculateMetrics(session, performance.now());
    const weakKeys = analyzeWeakKeys(session.keystrokes);
    const weakCombinations = analyzeWeakCombinations(props.target, session.keystrokes);
    const record: SessionRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type: props.mode,
      label: props.title,
      metrics: finalMetrics,
      weakKeys,
      weakCombinations,
      strokes: session.keystrokes
    };
    setFinished(record);
    trackEvent(props.mode === "test" ? "typing_test_completed" : "typing_test_completed", {
      testType: props.mode,
      duration: props.duration ?? null,
      wpmRange: metricRange(finalMetrics.wpm),
      accuracyRange: metricRange(finalMetrics.accuracy)
    });
    props.onRecord(record);
  }

  function applyKeys(keys: string[]) {
    if (!keys.length) return;
    setSession((old) => {
      let nextState = old;
      keys.forEach((key, index) => {
        if (key === "Backspace" && !props.progress.settings.allowCorrections) return;
        const candidate = applyInput(nextState, key, performance.now() + index);
        if (props.progress.settings.stopOnError && candidate.statuses[candidate.typed.length - 1] === "incorrect") return;
        nextState = candidate;
      });
      if (!old.startedAt && nextState.startedAt) trackEvent("typing_test_started", { testType: props.mode, duration: props.duration ?? null });
      return nextState;
    });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Tab") return;
    if (event.key.length === 1 || event.key === "Backspace") {
      event.preventDefault();
      applyKeys([event.key]);
    }
  }

  function onBeforeInput(event: React.FormEvent<HTMLTextAreaElement>) {
    const inputEvent = event.nativeEvent as InputEvent;
    if (inputEvent.isComposing) return;
    const keys = keysFromTextInput(inputEvent.inputType, inputEvent.data);
    if (!keys.length) return;
    event.preventDefault();
    applyKeys(keys);
  }

  function onTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.currentTarget.value;
    if (value) applyKeys(keysFromTextInput("insertText", value));
  }

  return (
    <section className="workspace">
      <aside className="side">{props.side}</aside>
      <section className="trainer" onMouseDown={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("button, a, input, select, textarea, label")) return;
        inputRef.current?.focus();
      }}>
        <div className="trainer-head">
          <div>{props.heading === "h2" ? <h2>{props.title}</h2> : <h1>{props.title}</h1>}<p>{props.subtitle}</p></div>
          <div className="actions"><button onClick={reset}><RotateCcw size={18} />Restart</button><button onClick={() => props.setFocus(true)}><Zap size={18} />Focus Mode</button></div>
        </div>
        {props.seoCopy}
        {props.keys && <div className="key-strip">{props.keys.map((key) => <span key={key}>{key}</span>)}<small>Target {props.targetWpm} WPM · {props.targetAccuracy}% accuracy</small></div>}
        {props.progress.settings.showLiveMetrics && <div className="metrics"><Metric label="WPM" value={metrics.wpm} /><Metric label="Accuracy" value={`${metrics.accuracy}%`} /><Metric label="Consistency" value={`${metrics.consistency}%`} /><Metric label="Time" value={formatTime(metrics.elapsedMs)} />{props.duration && <Metric label="Remaining" value={formatTime(Math.max(0, props.duration * 1000 - metrics.elapsedMs))} />}</div>}
        <TypingText target={props.target} statuses={session.statuses} index={session.typed.length} fontSize={props.progress.settings.fontSize} lineHeight={props.progress.settings.lineHeight} onFocusInput={() => inputRef.current?.focus()} />
        {!session.startedAt && <p className="start-hint">Tap or click the text, then start typing. The timer begins on your first keystroke.</p>}
        <textarea
          ref={inputRef}
          className="typing-capture-input"
          value=""
          rows={1}
          onKeyDown={onKeyDown}
          onBeforeInput={onBeforeInput}
          onChange={onTextChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          inputMode="text"
          enterKeyHint="done"
          aria-label="Typing input area. Type the displayed text."
        />
        {pausedAt && <p className="pause-notice" role="status">Test paused while this tab was inactive. Return to continue.</p>}
        {props.progress.settings.showKeyboard && <KeyboardView current={current} next={next} last={session.typed.at(-1)} incorrect={session.statuses[session.typed.length - 1] === "incorrect" ? session.typed.at(-1) : undefined} />}
        {props.footer}
        {finished && <ResultScreen record={finished} history={props.progress.sessions} reset={reset} onPractice={props.onPractice} />}
      </section>
    </section>
  );
}

function TypingText({ target, statuses, index, fontSize, lineHeight, onFocusInput, onClickInput }: { target: string; statuses: string[]; index: number; fontSize: number; lineHeight: number; onFocusInput?: () => void; onClickInput?: () => void }) {
  const [windowSize, setWindowSize] = useState(260);
  useEffect(() => {
    const updateWindowSize = () => setWindowSize(window.innerWidth < 520 ? 145 : window.innerWidth < 900 ? 210 : 320);
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  const start = Math.max(0, index - Math.floor(windowSize * 0.42));
  const targetCharacters = splitGraphemes(target);
  const end = Math.min(targetCharacters.length, start + windowSize);
  const visible = targetCharacters.slice(start, end);
  return (
    <div className="typing-text" style={{ fontSize, lineHeight }} tabIndex={0} role="textbox" aria-label="Typing prompt. Start typing to begin." onFocus={onFocusInput} onClick={onClickInput ?? onFocusInput}>
      {start > 0 && <span className="edge-fade" aria-hidden="true">...</span>}
      {visible.map((char, i) => {
        const targetIndex = start + i;
        return <span key={`${targetIndex}-${char}`} className={`${statuses[targetIndex] ?? "pending"} ${targetIndex === index ? "current" : ""}`}>{char === " " ? "\u00a0" : char}</span>;
      })}
      {end < targetCharacters.length && <span className="edge-fade" aria-hidden="true">...</span>}
    </div>
  );
}

function KeyboardView({ current, next, last, incorrect, compact }: { current?: string; next?: string; last?: string; incorrect?: string; compact?: boolean }) {
  return (
    <div className={compact ? "keyboard compact" : "keyboard"} aria-label="On-screen keyboard">
      {rows.map((row, rowIndex) => <div className="key-row" key={rowIndex}>{row.map((key) => {
        const info = keyInfo(key);
        const display = key === "space" ? "Space" : key;
        const active = keyboardKey(current) === key;
        const upcoming = keyboardKey(next) === key;
        const wasLast = keyboardKey(last) === key;
        const wrong = keyboardKey(incorrect) === key;
        return <div title={`${display}: ${info.finger}`} className={`key ${fingerClass(info.finger)} ${active ? "target" : ""} ${upcoming ? "next" : ""} ${wasLast ? "last" : ""} ${wrong ? "wrong" : ""}`} key={key}>{display}</div>;
      })}</div>)}
    </div>
  );
}

function WeakKeyHeatmap({ weakKeys }: { weakKeys: SessionRecord["weakKeys"] }) {
  const errorRates = new Map(weakKeys.map((item) => [keyboardKey(item.key), item.errorRate]));
  return (
    <div className="weak-key-heatmap" aria-label="Weak-key keyboard heatmap">
      {rows.map((row, rowIndex) => (
        <div className="weak-key-row" key={rowIndex}>
          {row.map((key) => {
            const errorRate = errorRates.get(key) ?? 0;
            const severity = errorRate >= 40 ? "high" : errorRate >= 20 ? "medium" : errorRate > 0 ? "low" : "none";
            return (
              <span className={`weak-key-cell ${severity}${key === "space" ? " space" : ""}`} title={errorRate ? `${key}: ${round(errorRate)}% errors` : key} key={key}>
                {key === "space" ? "Space" : key}
              </span>
            );
          })}
        </div>
      ))}
      <small>Darker keys had a higher error rate in this session.</small>
    </div>
  );
}

function ResultScreen({ record, history, reset, onPractice }: { record: SessionRecord; history: SessionRecord[]; reset: () => void; onPractice?: () => void }) {
  const comparable = history.filter((item) => item.id !== record.id && item.type === record.type && item.label === record.label);
  const previous = comparable.at(-1);
  const previousBest = Math.max(0, ...comparable.map((item) => item.metrics.wpm));
  const newBest = !comparable.length || record.metrics.wpm > previousBest;
  const previousDelta = previous ? round(record.metrics.wpm - previous.metrics.wpm) : null;
  const bestDelta = previousBest ? round(record.metrics.wpm - previousBest) : null;
  const recommendation = record.metrics.accuracy < 95
    ? "Accuracy is holding back your score. Slow down until clean keystrokes feel automatic."
    : record.metrics.consistency < 78
      ? "Your speed varies between bursts. Rhythm training can help smooth the pace."
      : record.weakKeys[0]
        ? `Most errors involved ${record.weakKeys.slice(0, 3).map((key) => key.key).join(", ")}.`
        : "Retest or choose a longer session to confirm this pace.";
  return (
    <div className="result" role="dialog" aria-label="Session results">
      <div className="result-card">
        <button className="result-close" type="button" onClick={reset} aria-label="Exit results and return to the typing test">
          <X size={18} aria-hidden="true" /> Exit results
        </button>
        <p className="eyebrow">{newBest ? "New personal best" : "Session complete"}</p>
        <h2>{record.metrics.wpm} WPM · {record.metrics.accuracy}% accuracy</h2>
        <div className="metrics big result-primary-metrics">
          <Metric label="WPM" value={record.metrics.wpm} />
          <Metric label="Accuracy" value={`${record.metrics.accuracy}%`} />
          <Metric label="Consistency" value={`${record.metrics.consistency}%`} />
          <Metric label="Errors" value={record.metrics.uncorrectedErrors} />
        </div>
        <div className="actions result-actions">
          <button className="primary" onClick={reset}><RotateCcw size={18} />Retake Test</button>
          {onPractice && <button onClick={onPractice}>Practice Weak Keys</button>}
          <InternalAction href="/typing-certificate/">Create Certificate</InternalAction>
        </div>
        <details className="result-details">
          <summary>Detailed breakdown and progress</summary>
          <div className="metrics">
            <Metric label="Raw WPM" value={record.metrics.rawWpm} />
            <Metric label="Net WPM" value={record.metrics.netWpm} />
            <Metric label="Characters" value={record.metrics.totalKeystrokes} />
            <Metric label="CPM" value={record.metrics.charactersPerMinute} />
            <Metric label="Correct Chars" value={record.metrics.correctCharacters} />
            <Metric label="Incorrect Chars" value={record.metrics.incorrectCharacters} />
            <Metric label="Personal Best" value={`${previousBest || record.metrics.wpm} WPM`} />
            <Metric label="Change" value={previousDelta === null ? "First try" : `${previousDelta >= 0 ? "+" : ""}${previousDelta} WPM`} />
            <Metric label="Duration" value={formatTime(record.metrics.elapsedMs)} />
            <Metric label="Active Time" value={formatTime(record.metrics.activeMs)} />
          </div>
          {(record.label.includes("KPH") || record.label.includes("10 Key") || record.label.includes("Numeric")) && <div className="metrics"><Metric label="KPM" value={calculateKpm(record.metrics.totalKeystrokes, record.metrics.elapsedMs)} /><Metric label="KPH" value={calculateKph(record.metrics.totalKeystrokes, record.metrics.elapsedMs)} /></div>}
          <Sparkline values={history.filter((item) => item.id !== record.id).slice(-12).map((item) => item.metrics.wpm).concat(record.metrics.wpm)} />
          {bestDelta !== null && bestDelta < 0 && <p className="hint">{Math.abs(bestDelta)} WPM below your personal best for this test.</p>}
        </details>
        <p>{recommendation}</p>
        {record.weakKeys.length > 0 && (
          <section className="weak-key-summary" aria-labelledby="weak-key-heading">
            <div>
              <p className="eyebrow">Target your next practice</p>
              <h3 id="weak-key-heading">Weak-key snapshot</h3>
              <p>Your highest-error keys from this session are highlighted below. Practice these before your next timed test.</p>
            </div>
            <div className="weak-key-chips" aria-label="Keys to practice">
              {record.weakKeys.slice(0, 8).map((item) => (
                <span key={item.key}><kbd>{item.key === " " ? "Space" : item.key}</kbd><small>{round(item.errorRate)}% errors</small></span>
              ))}
            </div>
            <WeakKeyHeatmap weakKeys={record.weakKeys} />
          </section>
        )}
        <nav className="result-next" aria-label="Related tests"><a href="/5-minute-typing-test/">Take a 5 Minute Test</a><a href="/typing-practice/">Explore practice</a></nav>
      </div>
    </div>
  );
}

function InternalAction({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="button" href={href}>{children}</a>;
}

async function createResultShareFile(record: SessionRecord): Promise<File | null> {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#071a30");
    gradient.addColorStop(1, "#0d3158");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    ctx.fillStyle = "#1dc8ff";
    ctx.fillRect(72, 68, 12, 494);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 48px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("WPMTEST", 120, 140);

    ctx.fillStyle = "#9fdcf2";
    ctx.font = "600 28px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("TYPING RESULT", 120, 192);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 150px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(String(record.metrics.wpm), 116, 380);

    ctx.fillStyle = "#1dc8ff";
    ctx.font = "700 44px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("WPM", 470, 380);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 58px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(`${record.metrics.accuracy}% accuracy`, 120, 480);

    ctx.fillStyle = "#c7d7e8";
    ctx.font = "500 28px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("wpmtest.app", 120, 540);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
    return blob ? new File([blob], `WPMTest-${record.metrics.wpm}-WPM.png`, { type: "image/png" }) : null;
  } catch {
    return null;
  }
}

async function shareResult(record: SessionRecord) {
  const text = `I typed ${record.metrics.wpm} WPM with ${record.metrics.accuracy}% accuracy on WPMTest.`;
  try {
    trackEvent("share_result", { testType: record.type, wpmRange: metricRange(record.metrics.wpm), accuracyRange: metricRange(record.metrics.accuracy) });
    const file = await createResultShareFile(record);

    if (navigator.share && file && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: "My WPMTest typing result", text, url: "https://wpmtest.app/", files: [file] });
      return;
    }

    if (navigator.share) {
      await navigator.share({ title: "My WPMTest typing result", text, url: "https://wpmtest.app/" });
      return;
    }

    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    await navigator.clipboard.writeText(`${text} https://wpmtest.app/`);
    alert(file ? "Share image downloaded and result link copied." : "Result copied to clipboard.");
  } catch {
    alert(text);
  }
}

function Rhythm({ progress, setProgress }: SharedProps) {
  const [bpm, setBpm] = useState(80);
  const [mode, setMode] = useState("Words");
  const [running, setRunning] = useState(false);
  const [startAt, setStartAt] = useState(0);
  const [hits, setHits] = useState<{ beatAt: number; typedAt: number }[]>([]);
  const [pulse, setPulse] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const metrics = calculateRhythmMetrics(hits, 75);
  const text = mode === "Single Keys" ? "f j f j d k s l a ;" : mode === "Letter Sequences" ? "asdf jkl; fj dk sl gh ru ei" : buildPracticeText(mode as PracticeMode, 25);

  useEffect(() => {
    if (!running) return;
    const interval = 60000 / bpm;
    const id = window.setInterval(() => {
      setPulse((value) => !value);
      if (progress.settings.metronome) playClick(audioRef, progress.settings.volume);
    }, interval);
    return () => clearInterval(id);
  }, [running, bpm, progress.settings.metronome, progress.settings.volume]);

  async function begin() {
    try {
      if (!audioRef.current && progress.settings.metronome && typeof AudioContext !== "undefined") {
        audioRef.current = new AudioContext();
      }
      if (audioRef.current?.state === "suspended") await audioRef.current.resume();
    } catch {
      audioRef.current = null;
    }
    setHits([]);
    setStartAt(performance.now());
    setPulse(true);
    setRunning(true);
    if (progress.settings.metronome) playClick(audioRef, progress.settings.volume);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function key(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!running || (event.key.length !== 1 && event.key !== " ")) return;
    event.preventDefault();
    const typedAt = performance.now();
    setHits((old) => [...old, { beatAt: nearestBeat(startAt, bpm, typedAt), typedAt }]);
  }

  useEffect(() => {
    if (!hits.length) return;
    setProgress((old) => ({ ...old, rhythmBest: Math.max(old.rhythmBest, metrics.withinTolerancePercent) }));
  }, [hits.length, metrics.withinTolerancePercent, setProgress]);

  return (
    <section className="rhythm-page">
      <div className="trainer-head"><div><h1>Rhythm Trainer</h1><p>Type one keystroke per beat. Use visual pulse, audio if enabled, or silent timing.</p></div><button className="primary" onClick={begin}>Start Timing</button></div>
      <div className="rhythm-grid">
        <div className="panel"><h2>Keystroke Metronome</h2><Segment values={[40,50,60,70,80,90,100,120,140,160]} value={bpm} setValue={setBpm} suffix=" BPM" /><select aria-label="Rhythm practice mode" value={mode} onChange={(e) => setMode(e.target.value)}><option>Single Keys</option><option>Letter Sequences</option><option>Words</option><option>Sentences</option></select><label className="inline-toggle"><input type="checkbox" checked={progress.settings.metronome} onChange={(event) => setProgress((old) => ({ ...old, settings: { ...old.settings, metronome: event.target.checked } }))} /> Audio metronome</label><div className={pulse ? "beat on" : "beat"} aria-label="Visual beat indicator" /></div>
        <div className="panel"><div className="coach-title"><h2>Timing Coach</h2><button className="primary" onClick={begin}>{running ? "Restart Timing" : "Start Timing"}</button></div><TypingText target={text} statuses={[]} index={hits.length} fontSize={22} lineHeight={1.7} onFocusInput={() => inputRef.current?.focus()} onClickInput={() => { if (!running) void begin(); else inputRef.current?.focus(); }} /><textarea ref={inputRef} className="sr-input" value="" readOnly onKeyDown={key} aria-label="Rhythm typing input. Type one key per beat." /><p className="start-hint">{running ? "Type the displayed sequence one key per beat." : "Click Start Timing or click the text to begin."}</p><TimingHeatmap deviation={metrics.deviations.at(-1) ?? 0} /><div className="metrics"><Metric label="Rhythm Accuracy" value={`${metrics.withinTolerancePercent}%`} /><Metric label="Avg Deviation" value={`${metrics.averageDeviationMs}ms`} /><Metric label="Std Dev" value={`${metrics.standardDeviationMs}ms`} /><Metric label="Status" value={metrics.label} /></div></div>
      </div>
    </section>
  );
}

function playClick(audioRef: React.MutableRefObject<AudioContext | null>, volume: number) {
  const context = audioRef.current;
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = 880;
  gain.gain.value = Math.max(0, Math.min(0.12, volume / 800));
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.035);
}

function Progress({ progress, setProgress }: { progress: ProgressData; setProgress: React.Dispatch<React.SetStateAction<ProgressData>> }) {
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

function Settings({ progress, setProgress }: { progress: ProgressData; setProgress: React.Dispatch<React.SetStateAction<ProgressData>> }) {
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

function Tools({ path, go, progress }: { path: string; go: (page: Page, route?: string) => void; progress: ProgressData }) {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  if (normalizedPath === "/wpm-calculator") return <WpmCalculator go={go} />;
  if (normalizedPath === "/typing-certificate") return <TypingCertificate progress={progress} go={go} />;
  return <AverageTypingSpeed go={go} />;
}

function AverageTypingSpeed({ go }: { go: (page: Page, route?: string) => void }) {
  const [wpm, setWpm] = useState(45);
  const label = wpm < 25 ? "Beginner" : wpm < 45 ? "Everyday baseline" : wpm < 65 ? "Productive" : wpm < 85 ? "Fast" : "Advanced";
  return (
    <section className="dashboard">
      <div className="trainer-head"><div><h1>Average Typing Speed by Experience — What&apos;s a Good WPM?</h1><p>Interpret WPM carefully. A useful typing result combines speed, accuracy, consistency, and the difficulty of the text.</p></div><InternalLink href="/1-minute-typing-test/" go={go}>Take Typing Test</InternalLink></div>
      <div className="grid-two">
        <div className="panel"><h2><Gauge size={18} />WPM Interpreter</h2><label>Typing speed <input type="range" min="5" max="120" value={wpm} onChange={(event) => setWpm(Number(event.target.value))} /></label><div className="metrics"><Metric label="Entered WPM" value={wpm} /><Metric label="Range" value={label} /></div><p>A short test can overstate speed. Use 3, 5, or 10 minute tests when you need a more stable result.</p></div>
        <div className="panel"><h2>What WPM Means</h2><p>Typing tests commonly treat five characters, including spaces, as one standard word. WPMTest calculates WPM from correct characters so mistakes do not inflate the score.</p><p>For real work, accuracy above 95% is usually more valuable than brief bursts of high raw WPM.</p></div>
      </div>
      <AdSlot placement="guide-mid-article" />
      <section className="seo-section two-column-copy"><div><h2>How to Improve</h2><p>Practice clean finger movement, return to home row, slow down around weak keys, and retest after targeted practice. Consistent daily sessions usually beat occasional long sessions.</p></div><div><h2>Related Tools</h2><div className="inline-links"><InternalLink href="/wpm-calculator/" go={go}>WPM Calculator</InternalLink><InternalLink href="/typing-practice/" go={go}>Typing Practice</InternalLink><InternalLink href="/rhythm/" go={go}>Rhythm Trainer</InternalLink></div></div></section>
    </section>
  );
}

function WpmCalculator({ go }: { go: (page: Page, route?: string) => void }) {
  const [characters, setCharacters] = useState(1500);
  const [words, setWords] = useState(300);
  const [errors, setErrors] = useState(20);
  const [seconds, setSeconds] = useState(300);
  const minutes = Math.max(0, seconds / 60);
  const characterBasis = Math.max(characters, words * 5);
  const correctCharacters = Math.max(0, characterBasis - errors);
  const wpm = minutes ? round((correctCharacters / 5) / minutes) : 0;
  const rawWpm = minutes ? round((characterBasis / 5) / minutes) : 0;
  const accuracy = characterBasis ? round((correctCharacters / characterBasis) * 100) : 100;
  return (
    <section className="dashboard">
      <div className="trainer-head"><div><h1>WPM Calculator — Convert Characters and Time to Words Per Minute</h1><p>Calculate words per minute using the standard five-character word convention.</p></div><InternalLink href="/1-minute-typing-test/" go={go}>Try Live Test</InternalLink></div>
      <div className="grid-two">
        <div className="panel tool-form"><h2><Calculator size={18} />Inputs</h2><label>Characters typed <input type="number" min="0" value={characters} onChange={(event) => setCharacters(Number(event.target.value))} /></label><label>Words typed <input type="number" min="0" value={words} onChange={(event) => setWords(Number(event.target.value))} /></label><label>Errors <input type="number" min="0" value={errors} onChange={(event) => setErrors(Number(event.target.value))} /></label><label>Time in seconds <input type="number" min="1" value={seconds} onChange={(event) => setSeconds(Number(event.target.value))} /></label></div>
        <div className="panel"><h2>Result</h2><div className="metrics"><Metric label="WPM" value={wpm} /><Metric label="Raw WPM" value={rawWpm} /><Metric label="Accuracy" value={`${accuracy}%`} /></div><p>Formula: correct characters divided by 5, then divided by elapsed minutes. Raw WPM uses all typed characters before subtracting errors.</p></div>
      </div>
    </section>
  );
}

function TypingCertificate({ progress, go }: { progress: ProgressData; go: (page: Page, route?: string) => void }) {
  const lastTest = [...progress.sessions].reverse().find((session) => session.type === "test");
  return (
    <section className="dashboard">
      <div className="trainer-head"><div><h1>Typing Certificate</h1><p>Generate the designed WPMTest certificate from your most recent completed typing test.</p></div><div className="actions"><a href="/certificate/sample/">View Sample Certificate</a><InternalLink href="/1-minute-typing-test/" go={go}>Complete a Test</InternalLink></div></div>
      {lastTest ? (
        <div className="result-card">
          <h2>{lastTest.metrics.wpm} WPM · {lastTest.metrics.accuracy}%</h2>
          <div className="metrics">
            <Metric label="Net WPM" value={lastTest.metrics.wpm} />
            <Metric label="Accuracy" value={`${lastTest.metrics.accuracy}%`} />
            <Metric label="Duration" value={lastTest.label} />
            <Metric label="Completed" value={new Date(lastTest.date).toLocaleDateString()} />
          </div>
          <p>Your certificate uses this completed local test result. Enter your name when you generate it, then download, print, save as PDF, or share it.</p>
          <div className="actions">
            <button onClick={() => shareResult(lastTest)}>Share Result</button>
            <InternalLink href="/typing-test/" go={go}>Retake Test</InternalLink>
          </div>
        </div>
      ) : <div className="panel"><h2>No qualifying test yet</h2><p>Finish a timed typing test first. WPMTest will use only your real local result.</p></div>}
    </section>
  );
}

function TypingGames({ progress, setProgress, record, setFocus, path, go }: SharedProps) {
  return (
    <section className="dashboard">
      <div className="trainer-head"><div><h1>Typing Games</h1><p>Lightweight drills that reinforce real typing accuracy without accounts or leaderboards.</p></div><Gamepad2 aria-hidden="true" /></div>
      <Trainer title="Word Rush" heading="h2" subtitle="A short speed-burst game. Type common words cleanly before chasing peak WPM." target={buildPracticeText("Speed Burst", 35)} mode="practice" duration={20} progress={progress} setProgress={setProgress} onRecord={record} setFocus={setFocus} onPractice={() => go("practice", "/practice/weak-keys")} seoCopy={<p className="tool-copy">This typing game is a functional 20-second speed burst, not a leaderboard. Results are stored locally with your other practice history.</p>} />
    </section>
  );
}

function Controls({ mode, setMode, duration, setDuration, count, setCount, custom, setCustom }: { mode: PracticeMode; setMode: (mode: PracticeMode) => void; duration: number; setDuration: (duration: number) => void; count: number; setCount: (count: number) => void; custom: string; setCustom: (text: string) => void }) {
  return <div className="panel"><h2>Practice Setup</h2><select aria-label="Practice text type" value={mode} onChange={(e) => setMode(e.target.value as PracticeMode)}>{practiceModes.map((item) => <option key={item}>{item}</option>)}</select><Segment values={durations} value={duration} setValue={setDuration} suffix="s" /><Segment values={wordCounts} value={count} setValue={setCount} suffix=" words" />{mode === "Custom Text" && <textarea aria-label="Custom practice text" className="custom" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Paste local-only custom text" />}</div>;
}

function LessonList({ progress, go, activeLessonId }: { progress: ProgressData; go: (page: Page, route?: string) => void; activeLessonId?: string }) {
  const selectedLesson = activeLessonId ?? progress.currentLesson;
  return <div className="panel"><h2>Curriculum</h2>{lessons.map((lesson) => <button className={lesson.id === selectedLesson ? "lesson active" : "lesson"} key={lesson.id} onClick={() => go("learn", lessonPath(lesson.id))}><span>Level {lesson.level}</span><strong>{lesson.title}</strong><small>{progress.completedLessons.includes(lesson.id) ? "Completed" : `${lesson.targetWpm} WPM · ${lesson.targetAccuracy}%`}</small></button>)}</div>;
}

function Segment<T extends number>({ values, value, setValue, suffix }: { values: T[]; value: T; setValue: (value: T) => void; suffix: string }) {
  return <div className="segment">{values.map((item) => <button className={item === value ? "active" : ""} onClick={() => setValue(item)} key={item}>{item}{suffix}</button>)}</div>;
}

function Metric({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return <div className="metric">{icon}<span>{label}</span><strong>{value}</strong></div>;
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const points = values.length ? values.map((value, i) => `${(i / Math.max(1, values.length - 1)) * 100},${42 - (value / max) * 36}`).join(" ") : "0,42 100,42";
  return <svg className="sparkline" viewBox="0 0 100 48" role="img" aria-label="Performance graph"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg>;
}

function TimingHeatmap({ deviation }: { deviation: number }) {
  const x = Math.max(4, Math.min(96, 50 + deviation / 4));
  return <div className="heatmap"><span>EARLY</span><div><i style={{ left: `${x}%` }} /></div><span>LATE</span></div>;
}

function routeToPage(path: string): Page {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const value = normalizedPath.split("/")[1] as Page;
  if (normalizedPath.startsWith("/typing-test") || normalizedPath.startsWith("/data-entry-practice") || /\/(1|3|5|10)-minute-typing-test$/.test(normalizedPath) || pageCountFromPath(normalizedPath) || ["/mobile-typing-test", "/data-entry-typing-test", "/10-key-typing-test", "/numeric-keypad-test", "/kph-typing-test"].includes(normalizedPath)) return "test";
  if (normalizedPath.startsWith("/practice") || normalizedPath === "/typing-practice" || normalizedPath === "/touch-typing-practice") return "practice";
  if (normalizedPath.startsWith("/learn")) return "learn";
  if (["/average-typing-speed", "/wpm-calculator", "/typing-certificate"].includes(normalizedPath)) return "tools";
  if (normalizedPath === "/typing-games") return "games";
  return ["home", "learn", "practice", "test", "rhythm", "progress", "settings"].includes(value) ? value as Page : "home";
}

const lessonRoutes: Record<string, string> = {
  "/learn/home-row": "home-asdf-jkl",
  "/learn/top-row": "top-ei",
  "/learn/bottom-row": "bottom-cm-vn-xz-b",
  "/learn/capital-letters": "shift-capitals",
  "/learn/punctuation": "punctuation",
  "/learn/numbers": "numbers"
};

const lessonPaths: Record<string, string> = Object.fromEntries(Object.entries(lessonRoutes).map(([route, id]) => [id, route]));

function lessonFromPath(path: string) {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const id = lessonRoutes[normalizedPath] ?? lessonRoutes[`${normalizedPath}/`];
  return id ? lessons.find((lesson) => lesson.id === id) : undefined;
}

function lessonPath(id: string) {
  return lessonPaths[id] ?? "/learn";
}

function practiceModeFromPath(path: string): PracticeMode {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  if (normalizedPath === "/practice/numbers") return "Numbers";
  if (normalizedPath === "/practice/punctuation") return "Punctuation";
  if (normalizedPath === "/practice/code") return "Code";
  if (normalizedPath === "/practice/weak-keys") return "Weak Keys";
  return "Words";
}

function testDurationFromPath(path: string) {
  const normalizedPath = path.replace(/\/$/, "");
  if (normalizedPath === "/typing-test/60-seconds") return 60;
  const match = normalizedPath.match(/^\/(1|3|5|10)-minute-typing-test$/);
  return match ? Number(match[1]) * 60 : 60;
}

function pageCountFromPath(path: string): 1 | 2 | 3 | null {
  const match = path.replace(/\/$/, "").match(/^\/(1|2|3)-page-typing-test$/);
  return match ? Number(match[1]) as 1 | 2 | 3 : null;
}

function timedTestTitle(path: string) {
  if ((path.replace(/\/$/, "") || "/") === "/typing-test") return "Typing Speed Test";
  const minutes = testDurationFromPath(path) / 60;
  if ([1, 3, 5, 10].includes(minutes)) return `${minutes} Minute Typing Test`;
  return "Typing Test";
}

function testModeFromPath(path: string): PracticeMode {
  const normalizedPath = path.replace(/\/$/, "");
  if (normalizedPath === "/data-entry-typing-test" || normalizedPath.startsWith("/data-entry-practice")) return "Data Entry";
  if (["/10-key-typing-test", "/numeric-keypad-test", "/kph-typing-test"].includes(normalizedPath)) return "Numeric Keypad";
  if (normalizedPath === "/typing-test-with-numbers") return "Numbers";
  if (normalizedPath === "/typing-test-with-punctuation") return "Punctuation";
  return "Sentences";
}

function normalizeKey(key?: string) {
  if (!key) return "";
  return keyboardKey(key);
}

function keyboardKey(key?: string) {
  if (!key) return "";
  return key === " " || key === "\u00a0" || key.toLowerCase() === "space" ? "space" : key.toLowerCase();
}

function formatTime(ms: number) {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function human(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
