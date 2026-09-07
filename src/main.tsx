import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BarChart3, BookOpen, Gauge, Keyboard, LineChart, Moon, RotateCcw, Timer, Zap } from "lucide-react";
import { applyInput, calculateMetrics, createSession, round } from "./engine/metrics";
import { calculateRhythmMetrics, nearestBeat } from "./engine/rhythm";
import { isLessonPassed, nextLessonId } from "./engine/lessons";
import { analyzeWeakCombinations, analyzeWeakKeys, generateWeakKeyExercise } from "./engine/weakKeys";
import { lessons } from "./data/lessons";
import { buildPracticeText, durations, practiceModes, testDurations, wordCounts, type PracticeMode } from "./data/texts";
import { keyInfo, rows, fingerClass } from "./data/keyboard";
import { defaultProgress, exportProgress, loadProgress, saveProgress, summarizeProgress, validateProgress, type ProgressData, type SessionRecord } from "./storage/progress";
import "./styles.css";

type Page = "home" | "learn" | "practice" | "test" | "rhythm" | "progress" | "settings" | "about" | "privacy" | "contact" | "terms";

const nav: Array<[Page, string]> = [["home", "Home"], ["learn", "Learn"], ["practice", "Practice"], ["test", "Test"], ["rhythm", "Rhythm"], ["progress", "Progress"], ["settings", "Settings"]];

function App() {
  const [page, setPage] = useState<Page>(routeToPage(location.pathname));
  const [path, setPath] = useState(location.pathname);
  const [progress, setProgress] = useState<ProgressData>(() => loadProgress());
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    saveProgress(progress);
    document.documentElement.dataset.theme = progress.settings.theme === "system" && matchMedia("(prefers-color-scheme: light)").matches ? "light" : progress.settings.theme;
    document.documentElement.dataset.contrast = String(progress.settings.highContrast);
    document.documentElement.dataset.motion = progress.settings.reducedMotion ? "reduced" : "ok";
  }, [progress]);

  useEffect(() => {
    const onPop = () => {
      setPath(location.pathname);
      setPage(routeToPage(location.pathname));
    };
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    applySeo(path);
  }, [path]);

  function go(next: Page, route = next === "home" ? "/" : `/${next}`) {
    history.pushState(null, "", route);
    setPath(route);
    setPage(next);
  }

  function record(record: SessionRecord, completedLesson?: string) {
    setProgress((old) => ({
      ...old,
      completedLessons: completedLesson && !old.completedLessons.includes(completedLesson) ? [...old.completedLessons, completedLesson] : old.completedLessons,
      currentLesson: completedLesson ? nextLessonId(lessons, [...old.completedLessons, completedLesson]) : old.currentLesson,
      sessions: [...old.sessions, record].slice(-300),
      strokes: old.strokes.slice(-5000)
    }));
  }

  const props = { progress, setProgress, record, go, setFocus, path };

  return (
    <div className={focus ? "app focus-active" : "app"}>
      {!focus && <Header page={page} go={go} />}
      <main>
        {page === "home" && <Home {...props} />}
        {page === "learn" && <Learn {...props} />}
        {page === "practice" && <Practice {...props} />}
        {page === "test" && <Test {...props} />}
        {page === "rhythm" && <Rhythm {...props} />}
        {page === "progress" && <Progress progress={progress} setProgress={setProgress} />}
        {page === "settings" && <Settings progress={progress} setProgress={setProgress} />}
        {page === "about" && <About />}
        {page === "privacy" && <LegalPage kind="privacy" />}
        {page === "contact" && <LegalPage kind="contact" />}
        {page === "terms" && <LegalPage kind="terms" />}
      </main>
      {!focus && <Footer go={go} />}
    </div>
  );
}

function Header({ page, go }: { page: Page; go: (page: Page) => void }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => go("home")} aria-label="Typewell home"><span>Typewell</span><small>Free typing mastery</small></button>
      <nav aria-label="Primary navigation">
        {nav.map(([id, label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)}
      </nav>
    </header>
  );
}

function Home({ progress, setProgress, record, setFocus, path, go }: SharedProps) {
  return (
    <section className="home">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">FREE • NO SIGNUP • PRIVATE</p>
          <h1>Free Typing Test - Check Your WPM &amp; Accuracy</h1>
          <p>Start typing instantly. Test your speed, accuracy, and consistency in 1, 3, 5, or 10 minutes. Free, private, and no account required.</p>
        </div>
      </div>
      <HomeTest progress={progress} setProgress={setProgress} record={record} setFocus={setFocus} path={path} go={go} />
      <AdSlot placement="after-home-test" />
      <section className="seo-section philosophy">
        <h2>Improve More Than Just WPM</h2>
        <p className="section-intro">Fast typing comes from accuracy, rhythm, repetition, and good technique. Typewell shows how well you type, not only how fast.</p>
        <div className="indicator-row">{["Speed", "Accuracy", "Consistency", "Rhythm", "Technique"].map((item) => <article key={item}><strong>{item}</strong><p>{copyFor(item)}</p></article>)}</div>
      </section>
      <section className="seo-section link-section">
        <h2>Choose Your Typing Test</h2>
        <div className="link-grid">{[
          ["/1-minute-typing-test/", "1 Minute Typing Test", "A quick WPM test for a fast, focused baseline."],
          ["/3-minute-typing-test/", "3 Minute Typing Test", "Measure speed and accuracy with a steadier sample."],
          ["/5-minute-typing-test/", "5 Minute Typing Test", "Build endurance while watching consistency."],
          ["/10-minute-typing-test/", "10 Minute Typing Test", "See how your typing holds up over long-form work."],
          ["/typing-test-with-numbers/", "Typing Test With Numbers", "Practice dates, prices, measurements, and percentages."],
          ["/typing-test-with-punctuation/", "Typing Test With Punctuation", "Improve accuracy across punctuation and capitalization."]
        ].map(([href, title, text]) => <InternalLink key={href} href={href} go={go}><strong>{title}</strong><span>{text}</span></InternalLink>)}</div>
      </section>
      <section className="seo-section link-section">
        <h2>Practice What Slows You Down</h2>
        <div className="link-grid compact-links">{[
          ["/typing-practice/", "Typing Practice", "Flexible words and sentence drills."],
          ["/practice/weak-keys", "Weak-Key Practice", "Adaptive drills for difficult keys."],
          ["/practice/numbers", "Numbers", "Number-row practice for real work."],
          ["/practice/punctuation", "Punctuation", "Punctuation and capitalization control."],
          ["/touch-typing-practice/", "Touch Typing", "Build reliable finger placement."],
          ["/rhythm", "Rhythm Trainer", "Practice smooth, even timing."]
        ].map(([href, title, text]) => <InternalLink key={href} href={href} go={go}><strong>{title}</strong><span>{text}</span></InternalLink>)}</div>
      </section>
      <section className="seo-section two-column-copy">
        <div><h2>Learn Touch Typing</h2><p>Build keyboard confidence step by step with guided lessons for the home row, top row, bottom row, capital letters, numbers, and punctuation.</p><div className="inline-links">{[["/learn/home-row", "Home Row"], ["/learn/top-row", "Top Row"], ["/learn/bottom-row", "Bottom Row"], ["/learn/capital-letters", "Capital Letters"], ["/learn/numbers", "Numbers"], ["/learn/punctuation", "Punctuation"]].map(([href, label]) => <InternalLink key={href} href={href} go={go}>{label}</InternalLink>)}</div></div>
        <div><h2>Typing Speed &amp; WPM Guide</h2><p>WPM means words per minute. Typewell uses the standard convention of five characters, including spaces, as one typing word. Accuracy matters because correcting mistakes interrupts flow, while consistency shows whether your pace is sustainable.</p><p>Short daily practice is usually more useful than occasional long sessions. Start with clean keystrokes, then build speed through touch typing practice, weak-key drills, and retesting.</p></div>
      </section>
      <AdSlot placement="mid-home-content" />
      <section className="seo-section faq-section">
        <h2>Frequently Asked Questions</h2>
        {["What is a good typing speed?", "How is WPM calculated?", "What is considered fast typing?", "How can I improve my typing speed?", "Is this typing test free?", "Do I need an account?", "Does my progress stay private?", "Can I practice typing with numbers?"].map((question) => <details key={question}><summary>{question}</summary><p>{faqAnswer(question)}</p></details>)}
      </section>
    </section>
  );
}

function HomeTest({ progress, setProgress, record, setFocus, path, go }: SharedProps) {
  const [duration, setDuration] = useState(() => testDurationFromPath(path));
  useEffect(() => setDuration(60), [path]);
  const durationLabels: Record<number, string> = { 60: "1 Minute", 180: "3 Minutes", 300: "5 Minutes", 600: "10 Minutes" };
  return <section className="home-test"><div className="home-test-head"><div><h2>Check Your Typing Speed</h2><p>Choose a test length, then type the passage below. Your WPM, accuracy, and consistency update as you type.</p></div><div className="duration-picker" aria-label="Typing test duration">{Object.entries(durationLabels).map(([seconds, label]) => <button className={duration === Number(seconds) ? "active" : ""} onClick={() => setDuration(Number(seconds))} key={seconds}>{label}</button>)}</div></div><Trainer title={`${duration / 60} Minute Typing Test`} subtitle="Standard 5-character word scoring with local results and no signup." target={buildPracticeText("Sentences", 50)} mode="test" duration={duration} progress={progress} setProgress={setProgress} onRecord={record} setFocus={setFocus} onPractice={() => go("practice", "/practice/weak-keys")} /></section>;
}

function InternalLink({ href, go, children }: { href: string; go: (page: Page, route?: string) => void; children: React.ReactNode }) {
  return <a href={href} onClick={(event) => { event.preventDefault(); go(routeToPage(href), href); }}>{children}</a>;
}

function AdSlot({ placement }: { placement: string }) {
  const enabled = typeof location !== "undefined" && ["localhost", "127.0.0.1"].includes(location.hostname) && new URLSearchParams(location.search).get("showAds") === "1";
  if (!enabled) return null;
  return <div className="ad-slot" data-placement={placement} aria-label="Ad placement">Ad placement</div>;
}

function faqAnswer(question: string) {
  const answers: Record<string, string> = {
    "What is a good typing speed?": "Around 40 WPM is a useful everyday baseline. Faster professional typing depends on accuracy, consistency, and the kind of work you do.",
    "How is WPM calculated?": "WPM is calculated as correct characters divided by five, then divided by elapsed minutes. This makes results comparable across tests.",
    "What is considered fast typing?": "Typing above 60 WPM is often considered fast for general work, but reliable accuracy is more useful than chasing a single number.",
    "How can I improve my typing speed?": "Practice regularly, keep your eyes on the screen, use the correct fingers, fix weak keys, and increase speed only after accuracy is stable.",
    "Is this typing test free?": "Yes. Typewell's typing test and practice tools are free with no subscription, paywall, or account requirement.",
    "Do I need an account?": "No. You can start an online typing test immediately. Preferences and progress are saved locally in your browser.",
    "Does my progress stay private?": "Your local progress stays on this device unless you choose to export it. Core typing sessions do not require an account or email.",
    "Can I practice typing with numbers?": "Yes. Use the numbers practice and typing test with numbers to work on dates, prices, measurements, percentages, and other number patterns."
  };
  return answers[question];
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Typing trainer preview">
      <div className="metrics"><Metric icon={<Gauge />} label="WPM" value="72" /><Metric icon={<BarChart3 />} label="Accuracy" value="98%" /><Metric icon={<LineChart />} label="Consistency" value="91%" /></div>
      <div className="typing-line"><span className="done">steady rhythm</span><span className="cursor"> </span><span>builds confident typing</span></div>
      <KeyboardView current="r" next="h" compact />
      <div className="mini-map"><span /><span /><span /><span /><span /></div>
    </div>
  );
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

function Practice({ progress, setProgress, record, setFocus, path }: SharedProps) {
  const [mode, setMode] = useState<PracticeMode>(() => practiceModeFromPath(path));
  const [duration, setDuration] = useState(60);
  const [count, setCount] = useState(50);
  const [custom, setCustom] = useState("");
  useEffect(() => setMode(practiceModeFromPath(path)), [path]);
  const weak = analyzeWeakKeys(progress.sessions.flatMap((session) => session.weakKeys.map((key) => ({ expected: key.key, actual: "", correct: key.errors === 0, timestamp: 0 }))));
  const target = mode === "Weak Keys" ? generateWeakKeyExercise(weak.map((item) => item.key)) : buildPracticeText(mode, count, custom);
  return (
    <Trainer
      title="Practice"
      subtitle="Choose a mode, duration, or word-count target. Everything runs locally in your browser."
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

function Test({ progress, setProgress, record, setFocus, path, go }: SharedProps) {
  const [duration, setDuration] = useState(() => testDurationFromPath(path));
  const [count, setCount] = useState(50);
  const testMode = testModeFromPath(path);
  const testTitle = testMode === "Numbers" ? "Typing Test with Numbers" : testMode === "Punctuation" ? "Typing Test with Punctuation" : "Typing Test";
  const testDescription = testMode === "Numbers"
    ? "Practice dates, prices, measurements, and percentages in a realistic number-focused typing test."
    : testMode === "Punctuation"
      ? "Practice commas, quotes, questions, and capitalization while measuring typing speed and accuracy."
      : `${duration / 60}-minute typing speed test with standard WPM scoring, accuracy, consistency, and local results.`;
  useEffect(() => setDuration(testDurationFromPath(path)), [path]);
  return (
    <Trainer
      title={testTitle}
      subtitle="Standard 5-character word WPM with raw WPM, accuracy, consistency, and local best comparisons."
      target={buildPracticeText(testMode, count)}
      mode="test"
      duration={duration}
      progress={progress}
      setProgress={setProgress}
      onRecord={(session) => record(session)}
      setFocus={setFocus}
      onPractice={() => go("practice", "/practice/weak-keys")}
      seoCopy={<p className="tool-copy">{testDescription} No signup is required, and your result stays in this browser.</p>}
      side={<div className="panel"><h2>Test Setup</h2><Segment values={testDurations} value={duration} setValue={setDuration} suffix="s" /><Segment values={wordCounts} value={count} setValue={setCount} suffix=" words" /><p className="hint">Restart shortcut: press Tab, then Enter on Restart.</p></div>}
    />
  );
}

interface SharedProps {
  progress: ProgressData;
  setProgress: React.Dispatch<React.SetStateAction<ProgressData>>;
  record: (record: SessionRecord, completedLesson?: string) => void;
  go: (page: Page, route?: string) => void;
  setFocus: (focus: boolean) => void;
  path: string;
}

function Trainer(props: {
  title: string;
  subtitle: string;
  target: string;
  mode: "lesson" | "practice" | "test";
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const metrics = calculateMetrics(session, now);
  const current = props.target[session.typed.length] ?? "";
  const next = props.target[session.typed.length + 1] ?? "";

  useEffect(() => reset(), [props.target, props.duration]);
  useEffect(() => {
    const id = window.setInterval(() => setNow(performance.now()), 250);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!props.duration || !session.startedAt || finished) return;
    if ((now - session.startedAt) / 1000 >= props.duration) complete();
  }, [now, session.startedAt, props.duration, finished]);
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

  function reset() {
    setSession(createSession(props.target));
    setFinished(null);
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
      weakCombinations
    };
    setFinished(record);
    props.onRecord(record);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Tab") return;
    if (event.key === "Backspace" && !props.progress.settings.allowCorrections) {
      event.preventDefault();
      return;
    }
    if (event.key.length === 1 || event.key === "Backspace") {
      event.preventDefault();
      setSession((old) => {
        const nextState = applyInput(old, event.key, performance.now());
        if (props.progress.settings.stopOnError && nextState.statuses[nextState.typed.length - 1] === "incorrect") return old;
        return nextState;
      });
    }
  }

  return (
    <section className="workspace">
      <aside className="side">{props.side}</aside>
      <section className="trainer">
        <div className="trainer-head">
          <div><h1>{props.title}</h1><p>{props.subtitle}</p></div>
          <div className="actions"><button onClick={reset}><RotateCcw size={18} />Restart</button><button onClick={() => props.setFocus(true)}><Zap size={18} />Focus Mode</button></div>
        </div>
        {props.seoCopy}
        {props.keys && <div className="key-strip">{props.keys.map((key) => <span key={key}>{key}</span>)}<small>Target {props.targetWpm} WPM · {props.targetAccuracy}% accuracy</small></div>}
        {props.progress.settings.showLiveMetrics && <div className="metrics"><Metric label="WPM" value={metrics.wpm} /><Metric label="Accuracy" value={`${metrics.accuracy}%`} /><Metric label="Consistency" value={`${metrics.consistency}%`} /><Metric label="Time" value={formatTime(metrics.elapsedMs)} /></div>}
        <TypingText target={props.target} statuses={session.statuses} index={session.typed.length} fontSize={props.progress.settings.fontSize} lineHeight={props.progress.settings.lineHeight} />
        <textarea ref={inputRef} className="sr-input" value="" onKeyDown={onKeyDown} aria-label="Typing input area. Type the displayed text." />
        {props.progress.settings.showFingerGuide && <FingerGuide current={current} />}
        {props.progress.settings.showKeyboard && <KeyboardView current={current} next={next} last={session.typed.at(-1)} incorrect={session.statuses[session.typed.length - 1] === "incorrect" ? session.typed.at(-1) : undefined} />}
        {props.footer}
        {finished && <ResultScreen record={finished} history={props.progress.sessions} reset={reset} onPractice={props.onPractice} />}
      </section>
    </section>
  );
}

function TypingText({ target, statuses, index, fontSize, lineHeight }: { target: string; statuses: string[]; index: number; fontSize: number; lineHeight: number }) {
  const windowSize = typeof window === "undefined" ? 260 : window.innerWidth < 520 ? 145 : window.innerWidth < 900 ? 210 : 320;
  const start = Math.max(0, index - Math.floor(windowSize * 0.42));
  const end = Math.min(target.length, start + windowSize);
  const visible = Array.from(target.slice(start, end));
  return (
    <div className="typing-text" style={{ fontSize, lineHeight }} tabIndex={0} aria-label="Typing prompt">
      {start > 0 && <span className="edge-fade" aria-hidden="true">...</span>}
      {visible.map((char, i) => {
        const targetIndex = start + i;
        return <span key={`${targetIndex}-${char}`} className={`${statuses[targetIndex] ?? "pending"} ${targetIndex === index ? "current" : ""}`}>{char === " " ? "\u00a0" : char}</span>;
      })}
      {end < target.length && <span className="edge-fade" aria-hidden="true">...</span>}
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

function FingerGuide({ current }: { current: string }) {
  const info = keyInfo(current || "f");
  const fingers = ["Left pinky", "Left ring", "Left middle", "Left index", "Thumbs", "Right index", "Right middle", "Right ring", "Right pinky"];
  return (
    <div className="finger-guide" aria-label="Finger placement guide">
      <div><h2>{info.finger}</h2><p>Home key <strong>{info.home}</strong> · Target <strong>{current === " " ? "Space" : current || "ready"}</strong></p></div>
      <div className="hands">{fingers.map((finger) => <span key={finger} className={finger === info.finger ? "active" : ""}>{finger.replace("Left ", "L ").replace("Right ", "R ")}</span>)}</div>
    </div>
  );
}

function ResultScreen({ record, history, reset, onPractice }: { record: SessionRecord; history: SessionRecord[]; reset: () => void; onPractice?: () => void }) {
  const previousBest = Math.max(0, ...history.slice(0, -1).map((item) => item.metrics.wpm));
  const newBest = record.metrics.wpm > previousBest;
  return (
    <div className="result" role="dialog" aria-label="Session results">
      <div className="result-card">
        <p className="eyebrow">{newBest ? "New personal best" : "Session complete"}</p>
        <h2>{record.metrics.wpm} WPM · {record.metrics.accuracy}% accuracy</h2>
        <div className="metrics"><Metric label="Raw WPM" value={record.metrics.rawWpm} /><Metric label="Consistency" value={`${record.metrics.consistency}%`} /><Metric label="Errors" value={record.metrics.uncorrectedErrors} /><Metric label="Characters" value={record.metrics.totalKeystrokes} /></div>
        <Sparkline values={history.slice(-12).map((item) => item.metrics.wpm).concat(record.metrics.wpm)} />
        <p>{record.weakKeys[0] ? `Your most difficult key was ${record.weakKeys[0].key}.` : "No clear weak key in this session."}</p>
        <div className="actions"><button className="primary" onClick={reset}><RotateCcw size={18} />Restart</button>{onPractice && record.weakKeys[0] && <button onClick={onPractice}>Practice weak keys</button>}</div>
      </div>
    </div>
  );
}

function Rhythm({ progress, setProgress }: SharedProps) {
  const [bpm, setBpm] = useState(80);
  const [mode, setMode] = useState("Words");
  const [running, setRunning] = useState(false);
  const [startAt, setStartAt] = useState(0);
  const [hits, setHits] = useState<{ beatAt: number; typedAt: number }[]>([]);
  const [pulse, setPulse] = useState(false);
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

  function begin() {
    if (!audioRef.current && progress.settings.metronome) audioRef.current = new AudioContext();
    setHits([]);
    setStartAt(performance.now());
    setRunning(true);
  }

  function key(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!running || (event.key.length !== 1 && event.key !== " ")) return;
    const typedAt = performance.now();
    setHits((old) => [...old, { beatAt: nearestBeat(startAt, bpm, typedAt), typedAt }]);
  }

  useEffect(() => {
    setProgress((old) => ({ ...old, rhythmBest: Math.max(old.rhythmBest, metrics.withinTolerancePercent) }));
  }, [metrics.withinTolerancePercent]);

  return (
    <section className="rhythm-page" tabIndex={0} onKeyDown={key}>
      <div className="trainer-head"><div><h1>Rhythm Trainer</h1><p>Type one keystroke per beat. Use visual pulse, audio if enabled, or silent timing.</p></div><button className="primary" onClick={begin}>Start Timing</button></div>
      <div className="rhythm-grid">
        <div className="panel"><h2>Keystroke Metronome</h2><Segment values={[40,50,60,70,80,90,100,120,140,160]} value={bpm} setValue={setBpm} suffix=" BPM" /><select value={mode} onChange={(e) => setMode(e.target.value)}><option>Single Keys</option><option>Letter Sequences</option><option>Words</option><option>Sentences</option></select><div className={pulse ? "beat on" : "beat"} aria-label="Visual beat indicator" /></div>
        <div className="panel"><h2>Timing Coach</h2><TypingText target={text} statuses={[]} index={hits.length} fontSize={22} lineHeight={1.7} /><TimingHeatmap deviation={metrics.deviations.at(-1) ?? 0} /><div className="metrics"><Metric label="Rhythm Accuracy" value={`${metrics.withinTolerancePercent}%`} /><Metric label="Avg Deviation" value={`${metrics.averageDeviationMs}ms`} /><Metric label="Std Dev" value={`${metrics.standardDeviationMs}ms`} /><Metric label="Status" value={metrics.label} /></div></div>
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
    link.download = "typewell-progress.json";
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
      <div className="actions"><button onClick={download}>Export Progress</button><label className="button">Import Progress<input type="file" accept="application/json" onChange={(e) => upload(e.target.files?.[0])} hidden /></label><button onClick={() => confirm("Reset local Typewell progress?") && setProgress(defaultProgress)}>Reset Progress</button></div>
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
        <div className="panel"><h2><Moon size={18} />Theme</h2><select value={settings.theme} onChange={(e) => update("theme", e.target.value as typeof settings.theme)}><option>dark</option><option>light</option><option>system</option></select></div>
        <div className="panel"><h2><Keyboard size={18} />Typing Display</h2><label>Font size <input type="range" min="18" max="34" value={settings.fontSize} onChange={(e) => update("fontSize", Number(e.target.value))} /></label><label>Line height <input type="range" min="1.3" max="2.1" step="0.05" value={settings.lineHeight} onChange={(e) => update("lineHeight", Number(e.target.value))} /></label></div>
        <TogglePanel title="Show / Hide" settings={settings} update={update} keys={["showLiveMetrics", "showKeyboard", "showFingerGuide"]} />
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

function Controls({ mode, setMode, duration, setDuration, count, setCount, custom, setCustom }: { mode: PracticeMode; setMode: (mode: PracticeMode) => void; duration: number; setDuration: (duration: number) => void; count: number; setCount: (count: number) => void; custom: string; setCustom: (text: string) => void }) {
  return <div className="panel"><h2>Practice Setup</h2><select value={mode} onChange={(e) => setMode(e.target.value as PracticeMode)}>{practiceModes.map((item) => <option key={item}>{item}</option>)}</select><Segment values={durations} value={duration} setValue={setDuration} suffix="s" /><Segment values={wordCounts} value={count} setValue={setCount} suffix=" words" />{mode === "Custom Text" && <textarea className="custom" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Paste local-only custom text" />}</div>;
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

function About() {
  return <section className="dashboard"><h1>About Typewell</h1><p>Typewell is a free, local-first typing trainer. It has no login, no subscriptions, no paid tier, and no email collection. Core practice data stays in browser storage on this device.</p></section>;
}

function LegalPage({ kind }: { kind: "privacy" | "contact" | "terms" }) {
  if (kind === "privacy") return <section className="legal-page"><h1>Privacy at Typewell</h1><p>Typewell is designed to work without an account, cookies required for core features, or email collection. Typing sessions, settings, and progress are stored locally in your browser on this device.</p><h2>Local storage</h2><p>Your browser stores progress so your history and preferences remain available when you return. You can export a JSON backup, import a previously exported backup, or reset local progress from the Progress page.</p><h2>Typing content</h2><p>Typewell does not send individual keystrokes or custom typing text to a remote service for core practice. Avoid entering sensitive information into custom exercises.</p><h2>Advertising</h2><p>Advertising may be added in reserved areas outside the typing interface. Any future advertising or measurement services will be disclosed and configured separately from local typing functionality.</p></section>;
  if (kind === "contact") return <section className="legal-page"><h1>Contact Typewell</h1><p>Found a broken route, accessibility issue, calculation problem, or confusing lesson? We welcome focused product feedback.</p><p>For now, contact details are not collected inside the app. Publish a support email address here before submitting the site to an advertising partner.</p><h2>Helpful report details</h2><p>Include the page URL, browser, device width, and a short description of what happened. Do not send private typing content or exported progress unless you have reviewed it first.</p></section>;
  return <section className="legal-page"><h1>Typewell Terms and Disclaimer</h1><p>Typewell provides free typing practice, typing tests, lessons, rhythm exercises, and locally stored performance summaries for personal educational use.</p><h2>Results</h2><p>WPM, accuracy, consistency, and generated certificates are practice measurements, not official professional certifications or employment guarantees. Results depend on the text, device, timing, and typing conditions.</p><h2>Use of the site</h2><p>Use the site lawfully and responsibly. Typewell may change or remove exercises, content, or features as the product develops.</p></section>;
}

function Footer({ go }: { go: (page: Page, route?: string) => void }) {
  return <footer className="site-footer"><span>Typewell · Free typing practice, locally stored.</span><nav aria-label="Footer navigation"><InternalLink href="/about" go={go}>About</InternalLink><InternalLink href="/privacy" go={go}>Privacy</InternalLink><InternalLink href="/contact" go={go}>Contact</InternalLink><InternalLink href="/terms" go={go}>Terms</InternalLink></nav></footer>;
}

function routeToPage(path: string): Page {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const value = normalizedPath.split("/")[1] as Page;
  if (normalizedPath.startsWith("/typing-test") || /\/(1|3|5|10)-minute-typing-test$/.test(normalizedPath) || normalizedPath === "/data-entry-typing-test") return "test";
  if (normalizedPath.startsWith("/practice") || normalizedPath === "/typing-practice" || normalizedPath === "/touch-typing-practice") return "practice";
  if (normalizedPath.startsWith("/learn")) return "learn";
  if (["about", "privacy", "contact", "terms"].includes(value)) return value as Page;
  return nav.some(([id]) => id === value) ? value : "home";
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

function testModeFromPath(path: string): PracticeMode {
  const normalizedPath = path.replace(/\/$/, "");
  if (normalizedPath === "/typing-test-with-numbers" || normalizedPath === "/data-entry-typing-test") return "Numbers";
  if (normalizedPath === "/typing-test-with-punctuation") return "Punctuation";
  return "Sentences";
}

interface SeoMeta {
  title: string;
  description: string;
}

const seoByPath: Record<string, SeoMeta> = {
  "/": {
    title: "Free Typing Practice & Typing Speed Test | Typewell",
    description: "Free typing practice, typing speed tests, touch typing lessons, WPM tracking, typing accuracy feedback, keyboard practice, and rhythm training with no login."
  },
  "/practice": {
    title: "Free Typing Practice — Improve WPM & Accuracy | Typewell",
    description: "Improve WPM, typing speed, and typing accuracy with free keyboard practice modes for words, punctuation, numbers, custom text, code, weak keys, and endurance."
  },
  "/practice/numbers": {
    title: "Free Number Typing Practice | Typewell",
    description: "Practice number-row typing with dates, prices, measurements, percentages, and real keyboard patterns while tracking WPM and typing accuracy."
  },
  "/practice/punctuation": {
    title: "Free Punctuation Typing Practice | Typewell",
    description: "Practice punctuation typing with commas, periods, quotes, questions, semicolons, and sentence patterns while improving typing speed and accuracy."
  },
  "/practice/code": {
    title: "Free Code Typing Practice | Typewell",
    description: "Practice code-style typing with symbols, punctuation, brackets, and technical text while tracking WPM, raw WPM, and accuracy."
  },
  "/practice/weak-keys": {
    title: "Weak Key Typing Practice — Improve Accuracy | Typewell",
    description: "Practice the keys you miss most with adaptive weak-key typing exercises that improve keyboard accuracy and typing speed locally."
  },
  "/test": {
    title: "Free Typing Speed Test — Check Your WPM | Typewell",
    description: "Take a free typing speed test and WPM test with standard 5-character word scoring, raw WPM, typing accuracy, consistency, and local results."
  },
  "/typing-test": {
    title: "Free Typing Speed Test — Check Your WPM | Typewell",
    description: "Check your WPM with a free typing test that measures speed, raw WPM, accuracy, consistency, errors, and characters typed."
  },
  "/typing-test/60-seconds": {
    title: "60 Second Typing Test — Free WPM Test | Typewell",
    description: "Take a 60 second typing speed test to measure WPM, raw WPM, typing accuracy, consistency, errors, and local progress."
  },
  "/typing-test/": {
    title: "Free Typing Speed Test — Check Your WPM | Typewell",
    description: "Take a free online typing test to check typing speed, WPM, accuracy, consistency, errors, and characters typed with no signup."
  },
  "/1-minute-typing-test/": {
    title: "1 Minute Typing Test — Free WPM Test | Typewell",
    description: "Take a one minute typing speed test to check your WPM, typing accuracy, mistakes, and consistency instantly with no account."
  },
  "/3-minute-typing-test/": {
    title: "3 Minute Typing Test — Free WPM Test | Typewell",
    description: "Take a three minute typing test to measure sustained typing speed, WPM, accuracy, mistakes, and consistency for free."
  },
  "/5-minute-typing-test/": {
    title: "5 Minute Typing Test — Free WPM Test | Typewell",
    description: "Take a five minute typing speed test to measure endurance, WPM, accuracy, mistakes, and steady typing consistency."
  },
  "/10-minute-typing-test/": {
    title: "10 Minute Typing Test — Free WPM Test | Typewell",
    description: "Take a ten minute typing test to measure long-form typing speed, WPM, accuracy, mistakes, and performance stability."
  },
  "/typing-practice/": {
    title: "Free Typing Practice — Improve WPM & Accuracy | Typewell",
    description: "Practice touch typing online with free words, sentences, weak-key, numbers, punctuation, code, and endurance exercises."
  },
  "/touch-typing-practice/": {
    title: "Free Touch Typing Practice | Typewell",
    description: "Build touch typing technique with free keyboard practice, finger guidance, WPM feedback, and typing accuracy tracking."
  },
  "/typing-test-with-numbers/": {
    title: "Typing Test With Numbers — Free Number WPM Test | Typewell",
    description: "Practice a free typing test with numbers, dates, prices, measurements, and percentages while tracking WPM and accuracy."
  },
  "/typing-test-with-punctuation/": {
    title: "Typing Test With Punctuation — Free WPM Test | Typewell",
    description: "Practice a free typing test with punctuation, capitalization, commas, quotes, and sentence patterns while measuring WPM."
  },
  "/data-entry-typing-test/": {
    title: "Data Entry Typing Test — Free Number Typing Practice | Typewell",
    description: "Practice data-entry style typing with numbers, dates, prices, and accuracy feedback in a free online typing test."
  },
  "/learn": {
    title: "Learn Touch Typing — Free Typing Lessons | Typewell",
    description: "Learn typing with free touch typing lessons for home row, finger placement, top row, bottom row, capital letters, punctuation, numbers, and symbols."
  },
  "/rhythm": {
    title: "Typing Rhythm Trainer — Improve Speed & Consistency | Typewell",
    description: "Train typing rhythm with a visual keystroke metronome that measures early, on-beat, and late timing to improve speed and consistency."
  },
  "/progress": {
    title: "Typing Progress Tracker | Typewell",
    description: "Track local typing progress, best WPM, average accuracy, consistency, practice time, completed typing lessons, weak keys, and weak combinations."
  },
  "/settings": {
    title: "Typing Trainer Settings | Typewell",
    description: "Adjust Typewell typing practice settings including theme, typing font size, live metrics, keyboard guide, sounds, high contrast, and reduced motion."
  },
  "/about": {
    title: "About Typewell — Free Local Typing Practice",
    description: "Learn how Typewell provides free typing tests, touch typing lessons, rhythm training, and local progress without an account."
  },
  "/privacy": {
    title: "Privacy Policy — Typewell Free Typing Practice",
    description: "Learn how Typewell stores typing progress locally, avoids account requirements, and handles typing practice data."
  },
  "/contact": {
    title: "Contact Typewell — Typing Practice Support",
    description: "Contact Typewell about typing test issues, accessibility feedback, lessons, calculations, and product support."
  },
  "/terms": {
    title: "Terms and Disclaimer — Typewell",
    description: "Read the Typewell terms and disclaimer for free typing tests, practice tools, educational lessons, and locally stored results."
  }
};

function applySeo(path: string) {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  const lesson = lessonFromPath(path);
  const meta = lesson
    ? {
        title: `${lesson.title} — Free Touch Typing Lesson | Typewell`,
        description: `Learn touch typing with ${lesson.title.toLowerCase()}, finger placement, keyboard practice, WPM targets, and typing accuracy feedback.`
      }
    : seoByPath[path] ?? seoByPath[`${normalizedPath}/`] ?? seoByPath[normalizedPath] ?? seoByPath[routeToPage(path) === "home" ? "/" : `/${routeToPage(path)}`] ?? seoByPath["/"];
  document.title = meta.title;
  setMeta("description", meta.description);
  setMeta("og:title", meta.title, "property");
  setMeta("og:description", meta.description, "property");
  setMeta("og:type", "website", "property");
  setMeta("og:url", location.origin + normalizedPath, "property");
  setCanonical(location.origin + normalizedPath);
  setStructuredData(path, meta);
}

function setMeta(name: string, content: string, attribute = "name") {
  let node = document.head.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attribute, name);
    document.head.appendChild(node);
  }
  node.content = content;
}

function setCanonical(href: string) {
  let node = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!node) {
    node = document.createElement("link");
    node.rel = "canonical";
    document.head.appendChild(node);
  }
  node.href = href;
}

function setStructuredData(path: string, meta: SeoMeta) {
  const normalizedPath = path.replace(/\/$/, "") || "/";
  let node = document.getElementById("typewell-jsonld") as HTMLScriptElement | null;
  if (!node) {
    node = document.createElement("script");
    node.type = "application/ld+json";
    node.id = "typewell-jsonld";
    document.head.appendChild(node);
  }
  const isLesson = normalizedPath.startsWith("/learn");
  node.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": isLesson ? "LearningResource" : "WebSite",
    name: meta.title.replace(" | Typewell", ""),
    description: meta.description,
    url: location.origin + normalizedPath,
    isAccessibleForFree: true,
    inLanguage: "en-US",
    provider: {
      "@type": "Organization",
      name: "Typewell"
    },
    ...(isLesson ? { educationalLevel: "Beginner to advanced", learningResourceType: "Typing lesson" } : {})
  });
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

function copyFor(item: string) {
  const map: Record<string, string> = {
    Speed: "Measured with the standard 5 characters per word convention.",
    Accuracy: "Correct keystrokes matter more than noisy top speed.",
    Consistency: "Short-window speed variation reveals whether your pace is steady.",
    Rhythm: "Beat training teaches smooth spacing instead of frantic bursts.",
    Technique: "Finger placement and home-row return build confident touch typing."
  };
  return map[item];
}

createRoot(document.getElementById("root")!).render(<App />);
