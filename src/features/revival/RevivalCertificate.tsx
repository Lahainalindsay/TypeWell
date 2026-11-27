"use client";

import { useEffect, useRef, useState } from 'react';
import { revivalTestContent } from './testContent';
import { splitGraphemes } from '../../engine/graphemes';
import styles from '../localized/LocalizedTypingPage.module.css';

export type RevivalResult = {
  wpm: number; accuracy: number; correct: number; total: number;
  elapsed: number; completed: string; material: string;
};

const escapeXml = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
})[character]!);

export function revivalCertificateSvg(id: string, native: string, name: string, result: RevivalResult, english: boolean, fontData = '') {
  const content = revivalTestContent[id];
  const title = english ? 'Typing Certificate' : content.certificateTitle;
  const lines = [native, name, `${result.wpm} WPM     ${result.accuracy}%`, `${Math.round(result.elapsed / 1000)} s     ${result.completed.slice(0, 10)}`, result.material];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" xml:lang="${english ? 'en' : content.lang}">
  ${fontData ? `<defs><style>@font-face{font-family:WPMCherokee;src:url(data:font/woff2;base64,${fontData}) format('woff2');}</style></defs>` : ''}<rect width="1600" height="1000" fill="#fffdf7"/><rect x="30" y="30" width="1540" height="940" rx="16" fill="none" stroke="#103458" stroke-width="16"/><rect x="55" y="55" width="1490" height="890" fill="none" stroke="#b58a35" stroke-width="3"/>
  <g text-anchor="middle" fill="#103458" font-family="Arial, WPMCherokee, Noto Sans, Noto Sans Cherokee, sans-serif"><text x="800" y="160" font-size="48">WPMTest</text><text x="800" y="290" font-size="58">${escapeXml(title)}</text>
  ${lines.map((line, index) => `<text x="800" y="${410 + index * 100}" font-size="${index === 1 ? Math.min(55, Math.floor(1250 / Math.max(1, splitGraphemes(name).length) / 0.7)) : 32}" direction="${index < 2 && !english && content.direction === 'rtl' ? 'rtl' : 'ltr'}">${escapeXml(line)}</text>`).join('')}
  </g></svg>`;
}

export default function RevivalCertificate({ id, native, result }: { id: string; native: string; result: RevivalResult }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('both');
  const [downloadError, setDownloadError] = useState('');
  const content = revivalTestContent[id];
  const dialog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.querySelector<HTMLElement>('button')?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      const controls = [...(dialog.current?.querySelectorAll<HTMLElement>('button, input, select, a[href]') ?? [])];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [open]);
  async function download(english: boolean) {
    setDownloadError('');
    let fontData = '';
    if (id === 'cherokee') {
      try {
        const response = await fetch('/fonts/noto-sans-cherokee.woff2');
        if (!response.ok) throw new Error('Font download failed');
        fontData = btoa(String.fromCharCode(...new Uint8Array(await response.arrayBuffer())));
      } catch {
        setDownloadError('The Cherokee font could not be included. Try again, or use Print / Save PDF.');
        return;
      }
    }
    const svg = revivalCertificateSvg(id, native, name.trim(), result, english, fontData);
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = `WPMTest-${id}-${english ? 'English' : content.lang}.svg`; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <>
    <button type="button" onClick={() => setOpen(true)}>Create certificate</button>
    {open && <div data-language-certificate className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-label="Typing certificate">
      <div ref={dialog} className={styles.modal}>
        <button type="button" onClick={() => setOpen(false)}>Close certificate</button>
        <h2>Your typing result</h2>
        <label>Your name<input autoComplete="name" maxLength={80} value={name} onChange={event => setName(event.target.value)} /></label>
        <label>Certificate language<select value={language} onChange={event => setLanguage(event.target.value)}><option value="both">English and {native}</option><option value="english">English</option><option value="native">{native}</option></select></label>
        <p><a href={content.certificateSource} target="_blank" rel="noopener noreferrer">Native certificate-title reference</a></p>
        <p>This records a self-administered copying result. WPM uses five matching grapheme clusters per word. Symbols identify speed (WPM), accuracy (%), elapsed seconds (s), date (YYYY-MM-DD), and material (¶ passage, Aa characters, ✎ custom text).</p>
        {name.trim() && <>
          {['english', 'native'].filter(value => language === 'both' || language === value).map(value => {
            const english = value === 'english';
            return <article key={value} className={styles.certificate} lang={english ? 'en' : content.lang} dir={english ? 'ltr' : content.direction as 'rtl' | 'ltr'}>
              <header><strong>WPM<span>Test</span></strong></header><div className={styles.certificateEmblem} aria-hidden="true">★</div>
              <h2>{english ? 'Typing Certificate' : content.certificateTitle}</h2><p>{native}</p>
              <div className={styles.certificateName}>{name.trim()}</div>
              <div className={styles.certificateStats}>
                <div className={styles.metric}><span>WPM</span><strong>{result.wpm}</strong></div>
                <div className={styles.metric}><span>{english ? 'Accuracy' : '%'}</span><strong>{result.accuracy}%</strong></div>
                <div className={styles.metric}><span>{english ? 'Time' : 's'}</span><strong>{Math.round(result.elapsed / 1000)} s</strong></div>
                <div className={styles.metric}><span>{english ? 'Date' : 'YYYY-MM-DD'}</span><strong>{result.completed.slice(0, 10)}</strong></div>
              </div><p>{result.material}</p><div className={styles.certificateSeal} aria-hidden="true">★</div>
            </article>;
          })}
          {downloadError && <p role="alert">{downloadError}</p>}
          <div className={styles.resultActions}>
            {language !== 'native' && <button type="button" onClick={() => download(true)}>Download English certificate</button>}
            {language !== 'english' && <button type="button" onClick={() => download(false)}>Download {native} certificate</button>}
            <button type="button" onClick={() => window.print()}>Print / Save PDF</button>
          </div>
        </>}
      </div>
    </div>}
  </>;
}
