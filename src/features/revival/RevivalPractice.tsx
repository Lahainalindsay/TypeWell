"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { splitGraphemes } from '../../engine/graphemes';
import { useTypingViewport } from '../../hooks/useTypingViewport';
import { revivalTestContent } from './testContent';
import { languagePathways } from './pathways';
import RevivalCertificate, { type RevivalResult } from './RevivalCertificate';
import styles from '../localized/LocalizedTypingPage.module.css';

export const drillCharacters: Record<string, string> = {
  ...Object.fromEntries(Object.entries(revivalTestContent).map(([id, content]) => [id, content.characters])),
  catalan: 'à è é í ï ò ó ú ü ç l·l', 'hakka-sixian': '四 縣 客 語',
  'hakka-hailu': '海 陸 客 語', wenzhounese: '溫 州 話'
};

export function copyScore(target: string, typed: string, elapsed: number) {
  const expected = splitGraphemes(target), actual = splitGraphemes(typed);
  const correct = actual.filter((character, index) => character === expected[index]).length;
  return { correct, total: actual.length, accuracy: actual.length ? Math.round(correct / actual.length * 100) : 0,
    wpm: elapsed > 0 ? Math.round(correct / 5 / (elapsed / 60000)) : 0 };
}

export default function RevivalPractice({ id, name }: { id: string; name: string }) {
  const content = revivalTestContent[id];
  const [duration, setDuration] = useState(60);
  const [mode, setMode] = useState(content ? 'passage' : 'characters');
  const [custom, setCustom] = useState('');
  const [typed, setTyped] = useState('');
  const [capture, setCapture] = useState('');
  const [start, setStart] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [result, setResult] = useState<RevivalResult | null>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const composing = useRef(false);
  useTypingViewport(input);
  const source = mode === 'custom' ? custom.trim() : mode === 'passage' ? content?.passage : drillCharacters[id];
  const target = useMemo(() => {
    const text = (source || drillCharacters[id] || '').normalize('NFC');
    const count = Math.max(1, Math.ceil(duration * 15 / Math.max(1, splitGraphemes(text).length)));
    return Array(count).fill(text).join(' ');
  }, [source, duration, id]);
  const expected = useMemo(() => splitGraphemes(target), [target]);
  const entered = splitGraphemes(typed);
  const elapsed = start === null ? 0 : Math.min(duration * 1000, Math.max(0, now - start));
  const score = copyScore(target, typed, elapsed);
  const direction = content?.direction === 'rtl' ? 'rtl' : 'ltr';

  function finish(time: number, text = typed) {
    const elapsed = Math.max(1, Math.min(duration * 1000, time - (start ?? time)));
    setNow(time); setCapture(text);
    setResult({ ...copyScore(target, text, elapsed), elapsed, completed: new Date().toISOString(), material: mode === 'passage' ? '¶' : mode === 'characters' ? 'Aa' : '✎' });
  }
  useEffect(() => {
    if (start === null || result) return;
    const timer = window.setInterval(() => {
      const time = Date.now();
      if (time - start >= duration * 1000) finish(start + duration * 1000);
      else setNow(time);
    }, 100);
    return () => window.clearInterval(timer);
  }, [start, result, duration, typed, target, mode]);

  function reset() {
    setTyped(''); setCapture(''); setStart(null); setNow(0); setResult(null); composing.current = false;
    requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
  }
  function begin() {
    if (start === null) { const time = Date.now(); setStart(time); setNow(time); }
  }
  function update(value: string) {
    const time = Date.now();
    if (start !== null && time - start >= duration * 1000) { finish(start + duration * 1000); return; }
    begin();
    const text = splitGraphemes(value).slice(0, expected.length).join('');
    setTyped(text); setCapture(text); setNow(time);
    if (text === target) finish(time, text);
  }
  const native = languagePathways.find(language => language.id === id)?.native ?? name;
  return <section className={styles.testPanel} aria-label={`${name} typing test`}>
    <h2>{name} Typing Test</h2>
    <p>Choose a duration and material, then copy the displayed text. The timer begins with your first input.</p>
    <div className={styles.resultActions}>
      <label>Duration<select value={duration} disabled={start !== null} onChange={event => setDuration(Number(event.target.value))}>{[60, 180, 300].map(seconds => <option key={seconds} value={seconds}>{seconds / 60} minute{seconds > 60 ? 's' : ''}</option>)}</select></label>
      <label>Test material<select value={mode} disabled={start !== null} onChange={event => setMode(event.target.value)}>{content && <option value="passage">Sourced passage</option>}<option value="characters">Characters and writing patterns</option><option value="custom">My own text</option></select></label>
    </div>
    {mode === 'custom' && <label>Your passage<textarea value={custom} disabled={start !== null} maxLength={4000} onChange={event => setCustom(event.target.value)} /><span>Use text you have permission to copy. It stays in this browser.</span></label>}
    {content && mode === 'passage' && <p><a href={content.sourceUrl} target="_blank" rel="noopener noreferrer">{content.sourceTitle}</a>. {content.sourceNote}</p>}
    <p aria-live="off"><strong>{Math.ceil((duration * 1000 - elapsed) / 1000)} seconds remaining</strong> · {score.wpm} WPM · {score.accuracy}%</p>
    <div data-typing-prompt className="revival-prompt" lang={content?.lang} dir={direction} onClick={() => input.current?.focus({ preventScroll: true })}>
      {expected.slice(Math.max(0, entered.length - 25), entered.length + 100).map((character, offset) => {
        const index = Math.max(0, entered.length - 25) + offset;
        return <span key={index} className={index === entered.length ? 'current' : index < entered.length ? character === entered[index] ? 'correct' : 'incorrect' : ''}>{character}</span>;
      })}
    </div>
    <label>Type the displayed text<textarea ref={input} lang={content?.lang} dir={direction} disabled={Boolean(result) || (mode === 'custom' && !custom.trim())} value={capture} className="revival-capture" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false}
      onPaste={event => event.preventDefault()} onDrop={event => event.preventDefault()}
      onCompositionStart={() => { composing.current = true; begin(); }}
      onCompositionEnd={event => { composing.current = false; update(event.currentTarget.value); }}
      onChange={event => { setCapture(event.target.value); if (!composing.current) update(event.target.value); }} /></label>
    {result && <div role="status"><h3>Test complete</h3><p>{result.wpm} WPM · {result.accuracy}% copy accuracy · {result.correct}/{result.total} matching characters.</p>
    </div>}
    {result && content && <RevivalCertificate id={id} native={native} result={result} />}
    <button type="button" onClick={reset}>Restart test</button>
    <p>Scoring compares the final copied text with the target after NFC normalization. Corrections replace earlier mistakes. WPM means matching grapheme clusters ÷ 5 ÷ elapsed minutes. Compare the same material, keyboard and duration. The certificate records this copying result and does not certify language fluency.</p>
  </section>;
}
