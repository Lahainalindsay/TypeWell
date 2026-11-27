"use client";

import { useTypingViewport } from "../../hooks/useTypingViewport";
import { useEffect, useMemo, useRef, useState } from "react";
import { applyInput, calculateMetrics, createSession, round } from "../../engine/metrics";
import { splitGraphemes } from "../../engine/graphemes";
import { keysFromTextInput } from "../../engine/textInput";
import type { Metrics, SessionState } from "../../engine/types";
import type { LocalizedTypingContent } from "./content";
import { localizedKeyboardKey } from "./keyboardKey";
import styles from "./LocalizedTypingPage.module.css";

const DURATIONS = [60, 180, 300] as const;

function buildTarget(passages: string[], duration: number): string {
  const source = passages.join(" ").normalize("NFC");
  const sourceCharacters = splitGraphemes(source);
  const minimumCharacters = duration * 12;
  const output: string[] = [];
  while (output.length < minimumCharacters) {
    if (output.length) output.push(" ");
    output.push(...sourceCharacters);
  }
  return output.join("");
}

function formatClock(milliseconds: number, locale: string): string {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${new Intl.NumberFormat(locale).format(minutes)}:${String(remainder).padStart(2, "0")}`;
}

function interpolate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce((text, [key, value]) => text.replace(`{${key}}`, String(value)), template);
}

export default function LocalizedTypingTest({ content }: { content: LocalizedTypingContent }) {
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(60);
  const [windowSize, setWindowSize] = useState(260);
  const target = useMemo(() => buildTarget(content.passages, duration), [content.passages, duration]);
  const [session, setSession] = useState<SessionState>(() => createSession(target));
  const [now, setNow] = useState(0);
  const [result, setResult] = useState<Metrics | null>(null);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [certificateName, setCertificateName] = useState("");
  const [certificateReady, setCertificateReady] = useState(false);
  const [certificateLanguage, setCertificateLanguage] = useState<"local" | "english" | "both">("local");
  const [captureValue, setCaptureValue] = useState("");
  const composing = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useTypingViewport(inputRef);
  const metrics = calculateMetrics(session, now || performance.now());
  const targetCharacters = useMemo(() => splitGraphemes(target), [target]);
  const remainingMs = session.startedAt ? Math.max(0, duration * 1000 - ((now || performance.now()) - session.startedAt)) : duration * 1000;

  useEffect(() => {
    const id = window.setInterval(() => setNow(performance.now()), 200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const updateWindowSize = () => setWindowSize(window.innerWidth < 520 ? 145 : window.innerWidth < 900 ? 210 : 320);
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    reset();
  }, [target]);

  useEffect(() => {
    if (result || !session.startedAt) return;
    if (session.endedAt || remainingMs <= 0) setResult(calculateMetrics(session, performance.now()));
  }, [result, remainingMs, session]);

  function reset() {
    setSession(createSession(target));
    setResult(null);
    setCertificateOpen(false);
    setCertificateReady(false);
    setCertificateLanguage("local");
    setCaptureValue("");
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }

  function applyKeys(keys: string[]) {
    if (!keys.length || result) return;
    setSession((previous) => keys.reduce(
      (state, key, index) => applyInput(state, key, performance.now() + index),
      previous
    ));
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (composing.current || event.key === "Tab") return;
    if (event.key === "Backspace" || splitGraphemes(event.key).length === 1) {
      event.preventDefault();
      applyKeys([event.key]);
    }
  }

  function onBeforeInput(event: React.FormEvent<HTMLTextAreaElement>) {
    const inputEvent = event.nativeEvent as InputEvent;
    if (inputEvent.isComposing || composing.current) return;
    const keys = keysFromTextInput(inputEvent.inputType, inputEvent.data);
    if (!keys.length) return;
    event.preventDefault();
    applyKeys(keys);
    setCaptureValue("");
  }

  function onCompositionEnd(event: React.CompositionEvent<HTMLTextAreaElement>) {
    composing.current = false;
    applyKeys(keysFromTextInput("insertCompositionText", event.data));
    setCaptureValue("");
  }

  const start = Math.max(0, session.typed.length - Math.floor(windowSize * 0.42));
  const end = Math.min(targetCharacters.length, start + windowSize);
  const visible = targetCharacters.slice(start, end);
  const currentCharacter = targetCharacters[session.typed.length] ?? "";
  const resultTitle = result
    ? interpolate(content.ui.resultHeading, { wpm: result.wpm, accuracy: result.accuracy })
    : "";
  const completedDate = new Intl.DateTimeFormat(content.locale, { dateStyle: "long" }).format(new Date());

  return (
    <section className={styles.testPanel} aria-labelledby={`${content.lang}-test-heading`}>
      <div className={styles.testHeader}>
        <div>
          <h2 id={`${content.lang}-test-heading`}>{content.ui.testHeading}</h2>
          <p>{content.ui.testIntro}</p>
        </div>
        <button type="button" className={styles.secondaryButton} onClick={reset}>{content.ui.restart}</button>
      </div>

      <fieldset className={styles.durationPicker}>
        <legend>{content.ui.durationLabel}</legend>
        {DURATIONS.map((seconds) => (
          <button
            type="button"
            className={duration === seconds ? styles.activeDuration : ""}
            aria-pressed={duration === seconds}
            onClick={() => setDuration(seconds)}
            key={seconds}
          >
            {content.ui.durations[seconds]}
          </button>
        ))}
      </fieldset>

      <div className={styles.metrics} aria-live="polite">
        <Metric label={content.ui.wpm} value={metrics.wpm} />
        <Metric label={content.ui.accuracy} value={`${metrics.accuracy}%`} />
        <Metric label={content.ui.consistency} value={`${metrics.consistency}%`} />
        <Metric label={content.ui.time} value={formatClock(metrics.elapsedMs, content.locale)} />
        <Metric label={content.ui.remaining} value={formatClock(remainingMs, content.locale)} />
      </div>

      <div
        data-typing-prompt className={styles.typingText}
        lang={content.lang}
        role="textbox"
        tabIndex={0}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        onFocus={() => inputRef.current?.focus({ preventScroll: true })}
        aria-label={content.ui.inputLabel}
      >
        {start > 0 ? <span className={styles.fade}>…</span> : null}
        {visible.map((character, visibleIndex) => {
          const index = start + visibleIndex;
          const status = session.statuses[index] ?? "pending";
          return (
            <span
              data-typing-current={index === session.typed.length} className={`${styles.character} ${styles[status]} ${index === session.typed.length ? styles.current : ""}`}
              key={`${index}-${character}`}
            >
              {character}
            </span>
          );
        })}
        {end < targetCharacters.length ? <span className={styles.fade} aria-hidden="true">…</span> : null}
      </div>

      <textarea
        ref={inputRef}
        className={styles.captureInput}
        value={captureValue}
        rows={1}
        onKeyDown={onKeyDown}
        onBeforeInput={onBeforeInput}
        onCompositionStart={() => { composing.current = true; }}
        onCompositionEnd={onCompositionEnd}
        onChange={(event) => {
          setCaptureValue(event.currentTarget.value);
          if (!composing.current && event.currentTarget.value) {
            applyKeys(keysFromTextInput("insertText", event.currentTarget.value));
            setCaptureValue("");
          }
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        inputMode="text"
        aria-label={content.ui.inputLabel}
      />

      {!result && <LocalizedKeyboard rows={content.keyboard.rows} current={currentCharacter} lang={content.lang} label={content.keyboard.name} />}

      {result ? (
        <div className={styles.result} role="dialog" aria-label={content.ui.complete}>
          <p className={styles.eyebrow}>{content.ui.complete}</p>
          <h2>{resultTitle}</h2>
          <div className={styles.metrics}>
            <Metric label={content.ui.rawWpm} value={result.rawWpm} />
            <Metric label={content.ui.consistency} value={`${result.consistency}%`} />
            <Metric label={content.ui.errors} value={result.uncorrectedErrors} />
            <Metric label={content.ui.characters} value={result.totalKeystrokes} />
          </div>
          <div className={styles.resultActions}>
            <button type="button" onClick={reset}>{content.ui.tryAgain}</button>
            <button type="button" className={styles.primaryButton} onClick={() => setCertificateOpen(true)}>{content.ui.certificateButton}</button>
          </div>
        </div>
      ) : null}

      {result && certificateOpen ? (
        <div data-language-certificate className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby={`${content.lang}-certificate-dialog`}>
          <div className={styles.modal}>
            <button type="button" className={styles.closeButton} onClick={() => setCertificateOpen(false)} aria-label={content.ui.close}>×</button>
            {!certificateReady ? (
              <>
                <h2 id={`${content.lang}-certificate-dialog`}>{content.certificate.dialogTitle}</h2>
                <p>{content.certificate.dialogIntro}</p>
                <label className={styles.nameField}>
                  {content.certificate.nameLabel}
                  <input value={certificateName} maxLength={80} autoComplete="name" placeholder={content.certificate.namePlaceholder} onChange={(event) => setCertificateName(event.target.value)} />
                </label>
                <fieldset className={styles.certificateChoice}><legend>Certificate language / ʻŌlelo o ka palapala</legend>
                  <label><input type="radio" name="certificate-language" checked={certificateLanguage==="local"} onChange={()=>setCertificateLanguage("local")}/> Language tested ({content.lang==="haw"?"ʻŌlelo Hawaiʻi":content.certificate.testName})</label>
                  <label><input type="radio" name="certificate-language" checked={certificateLanguage==="english"} onChange={()=>setCertificateLanguage("english")}/> English</label>
                  <label><input type="radio" name="certificate-language" checked={certificateLanguage==="both"} onChange={()=>setCertificateLanguage("both")}/> Both — two certificates</label>
                </fieldset>
                <button type="button" className={styles.primaryButton} disabled={!certificateName.trim()} onClick={() => setCertificateReady(true)}>{content.certificate.generate}</button>
              </>
            ) : (
              <>
                {certificateLanguage!=="english" && <Certificate content={{...content,certificate:localCertificate(content)}} name={certificateName.trim()} metrics={result} date={completedDate} duration={duration} />}
                {certificateLanguage!=="local" && <Certificate content={{...content,certificate:englishCertificate(content)}} name={certificateName.trim()} metrics={result} date={new Intl.DateTimeFormat("en-US",{dateStyle:"long"}).format(new Date())} duration={duration} />}
                <div className={styles.resultActions}>
                  <button type="button" onClick={() => { if(certificateLanguage!=="english")downloadCertificate({...content,certificate:localCertificate(content)},certificateName.trim(),result,completedDate,duration); if(certificateLanguage!=="local")downloadCertificate({...content,certificate:englishCertificate(content)},certificateName.trim(),result,new Intl.DateTimeFormat("en-US",{dateStyle:"long"}).format(new Date()),duration); }}>{content.certificate.download}</button>
                  <button type="button" onClick={() => window.print()}>{content.certificate.print}</button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function LocalizedKeyboard({ rows, current, lang, label }: { rows: string[][]; current: string; lang: string; label: string }) {
  const keys = rows.flat();
  const key = localizedKeyboardKey(current, rows, lang);

  return (
    <div className={styles.keyboard} aria-label={label}>
      {[...rows, ...(keys.some((item) => item.toLowerCase() === "space") ? [] : [["Space"]])].map((row, rowIndex) => (
        <div className={styles.keyboardRow} key={rowIndex}>
          {row.map((item, keyIndex) => (
            <span
              className={`${styles.key} ${item.toLowerCase() === "space" ? styles.spaceKey : ""} ${key?.toLowerCase() === item.toLowerCase() ? styles.targetKey : ""}`}
              key={`${item}-${keyIndex}`}
            >{item}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className={styles.metric}><span>{label}</span><strong>{value}</strong></div>;
}

function localCertificate(content: LocalizedTypingContent): LocalizedTypingContent["certificate"] {
 // Hawaiian interface text is in English; use a Hawaiian certificate variant
 // without changing the test content or scoring. Native-speaker review is still required.
 if (content.lang !== "haw") return content.certificate;
 return {...content.certificate,
   titleTop:"PALAPALA",
   titleMain:"HOʻOMAIKAʻI",
   certifies:"HE PALAPALA NO",
   statement:"Ua hoʻopau i ka hoʻāʻo kikokiko ʻōlelo Hawaiʻi ma WPMTest:",
   speedLabel:"HUAʻŌLELO I KA MINUKE",
   accuracyLabel:"POLOLEI",
   testLabel:"HOʻĀʻO",
   dateLabel:"LĀ",
   testName:"Hoʻāʻo kikokiko ʻōlelo Hawaiʻi",
   motto:"E hoʻomau i ka hoʻomaʻamaʻa",
   disclaimer:"He moʻolelo kēia no ka hopena hoʻāʻo kikokiko WPMTest; ʻaʻole ia he palapala hōʻoia ʻoihana.",
   fileName:"WPMTest-Palapala-Hawaii"
 };
}
function englishCertificate(content: LocalizedTypingContent): LocalizedTypingContent["certificate"] {
 return {...content.certificate,titleTop:"CERTIFICATE OF",titleMain:"TYPING ACHIEVEMENT",certifies:"THIS CERTIFIES THAT",statement:"completed a typing test in "+content.certificate.testName+" on WPMTest with the following results:",speedLabel:"WORDS PER MINUTE",accuracyLabel:"ACCURACY",testLabel:"TEST",dateLabel:"DATE",testName:content.certificate.testName,motto:"PRACTICE BUILDS PROGRESS",disclaimer:"WPMTest typing-result record. Not an accredited language or professional certification.",fileName:"WPMTest-English-"+content.lang};
}
function Certificate({ content, name, metrics, date, duration }: { content: LocalizedTypingContent; name: string; metrics: Metrics; date: string; duration: number }) {
  return (
    <article className={styles.certificate} lang={content.certificate.titleTop==="CERTIFICATE OF"?"en":content.lang}>
      <header><strong>WPM<span>Test</span></strong><small>OFFICIAL TYPING RESULT · ONLINE PRACTICE</small></header><div className={styles.certificateEmblem} aria-hidden="true">★</div>
      <p>{content.certificate.titleTop}</p>
      <h2>{content.certificate.titleMain}</h2>
      <p>{content.certificate.certifies}</p>
      <div className={styles.certificateName}>{name}</div>
      <p>{content.certificate.statement}</p>
      <div className={styles.certificateStats}>
        <Metric label={content.certificate.speedLabel} value={metrics.wpm} />
        <Metric label={content.certificate.accuracyLabel} value={`${metrics.accuracy}%`} />
        <Metric label={content.certificate.testLabel} value={`${content.certificate.testName} · ${content.ui.durations[duration as 60 | 180 | 300]}`} />
        <Metric label={content.certificate.dateLabel} value={date} />
      </div>
      <div className={styles.certificateSeal} aria-hidden="true">★<small>WPMTEST</small></div><p className={styles.certificateMotto}>{content.certificate.motto}</p><small>{content.certificate.disclaimer}</small>
    </article>
  );
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" })[character] ?? character);
}

function downloadCertificate(content: LocalizedTypingContent, name: string, metrics: Metrics, date: string, duration: number) {
  const certificate = content.certificate;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <rect width="1600" height="1000" fill="#fffdf7"/><rect x="24" y="24" width="1552" height="952" rx="18" fill="none" stroke="#0c2948" stroke-width="18"/><rect x="45" y="45" width="1510" height="910" rx="12" fill="none" stroke="#b58a35" stroke-width="4"/><rect x="63" y="63" width="1474" height="874" rx="8" fill="none" stroke="#b58a35" stroke-width="1"/><circle cx="800" cy="80" r="26" fill="#0c2948" stroke="#b58a35" stroke-width="5"/><text x="800" y="90" font-family="serif" text-anchor="middle" font-size="29" fill="#f1d38b">★</text>
    <g text-anchor="middle" font-family="Arial, Noto Sans, Noto Sans Devanagari, Noto Sans Cherokee, sans-serif" fill="#071a30">
      <text x="800" y="120" font-size="50" font-weight="700">WPMTest</text><text x="800" y="215" font-size="34" letter-spacing="4">${escapeXml(certificate.titleTop)}</text><text x="800" y="305" font-size="72" font-weight="700">${escapeXml(certificate.titleMain)}</text>
      <text x="800" y="375" font-size="24">${escapeXml(certificate.certifies)}</text><text x="800" y="485" font-size="66" fill="#a87822">${escapeXml(name)}</text><line x1="330" x2="1270" y1="515" y2="515" stroke="#b58a35"/>
      <text x="800" y="575" font-size="22">${escapeXml(certificate.statement)}</text>
      <text x="250" y="700" font-size="54" font-weight="700">${metrics.wpm}</text><text x="600" y="700" font-size="54" font-weight="700">${metrics.accuracy}%</text><text x="1030" y="690" font-size="28" font-weight="700">${escapeXml(certificate.testName)}</text><text x="1030" y="720" font-size="19">${escapeXml(content.ui.durations[duration as 60 | 180 | 300])}</text><text x="1370" y="690" font-size="25" font-weight="700">${escapeXml(date)}</text>
      <text x="250" y="745" font-size="17">${escapeXml(certificate.speedLabel)}</text><text x="600" y="745" font-size="17">${escapeXml(certificate.accuracyLabel)}</text><text x="1030" y="745" font-size="17">${escapeXml(certificate.testLabel)}</text><text x="1370" y="745" font-size="17">${escapeXml(certificate.dateLabel)}</text>
      <text x="800" y="835" font-size="19" letter-spacing="3">${escapeXml(certificate.motto)}</text><text x="800" y="930" font-size="15" fill="#596577">${escapeXml(certificate.disclaimer)}</text>
    </g></svg>`;
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${certificate.fileName}-${name.replace(/[^\p{L}\p{N}]+/gu, "-")}.svg`;
  link.click();
  URL.revokeObjectURL(url);
}
