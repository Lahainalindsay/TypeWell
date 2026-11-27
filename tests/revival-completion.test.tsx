import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import RevivalPractice from '../src/features/revival/RevivalPractice';
import LocalizedTypingTest from '../src/features/localized/LocalizedTypingTest';
import { hawaiianTypingContent } from '../src/features/localized/pacificContent';
import { revivalTestContent } from '../src/features/revival/testContent';
import { revivalCertificateSvg } from '../src/features/revival/RevivalCertificate';
import { languagePathways } from '../src/features/revival/pathways';
import { keyboardLayouts } from '../src/features/revival/guideDetails';

let host: HTMLDivElement, root: Root;
beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false, addEventListener() {}, removeEventListener() {} })));
  vi.useFakeTimers();
  host = document.createElement('div'); document.body.append(host); root = createRoot(host);
});
afterEach(() => { act(() => root.unmount()); host.remove(); vi.useRealTimers(); vi.unstubAllGlobals(); });
function type(value: string) {
  const input = host.querySelector('textarea')!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
}
it.each(languagePathways.filter(item => item.id !== 'hawaiian'))('completes $name with both certificate languages and safe SVG text', item => {
  act(() => root.render(<RevivalPractice id={item.id} name={item.name} />));
  const text = revivalTestContent[item.id].passage;
  type(text);
  act(() => vi.advanceTimersByTime(60000));
  expect(host.textContent).toContain('Test complete');
  const button = [...host.querySelectorAll('button')].find(button => button.textContent === 'Create certificate')!;
  act(() => button.click());
  const input = host.querySelector('input')!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, 'Lindsay');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const certificates = host.querySelectorAll('article');
  expect(certificates).toHaveLength(2);
  expect(certificates[0].lang).toBe('en');
  expect(certificates[1].lang).toBe(revivalTestContent[item.id].lang);
  expect(certificates[1].textContent).toContain(revivalTestContent[item.id].certificateTitle);
  expect(keyboardLayouts[item.id].url).toMatch(/^https:/);
  const svg = revivalCertificateSvg(item.id, item.native, '<img onerror="bad">', { wpm: 25, accuracy: 99, correct: 125, total: 126, elapsed: 60000, completed: '2026-11-27T00:00:00Z', material: '¶' }, false);
  expect(svg).not.toContain('<img');
  expect(svg).toContain('&lt;img');
  expect(svg).toContain('2026-11-27');
});
it('allows three-minute selection, reset and custom text while preserving combining marks', () => {
  act(() => root.render(<RevivalPractice id="maori" name="Māori" />));
  const select = host.querySelector('select')!;
  act(() => { select.value = '180'; select.dispatchEvent(new Event('change', { bubbles: true })); });
  type('a\u0304');
  act(() => vi.advanceTimersByTime(60000));
  expect(host.textContent).not.toContain('Test complete');
  expect(select.disabled).toBe(true);
  const restart = [...host.querySelectorAll('button')].find(button => button.textContent === 'Restart test')!;
  act(() => restart.click());
  expect(select.disabled).toBe(false);
  expect(host.querySelector('textarea')!.value).toBe('');
});
it('keeps composition text while timing and normalizes only when it is committed', () => {
  act(() => root.render(<RevivalPractice id="maori" name="Māori" />));
  const input = host.querySelector('textarea')!;
  act(() => input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true })));
  type('a\u0304');
  act(() => vi.advanceTimersByTime(500));
  expect(input.value).toBe('a\u0304');
  act(() => input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: 'a\u0304' })));
  expect(input.value).toBe('ā');
});
it('requires a custom source and blocks pasting directly into the scored field', () => {
  act(() => root.render(<RevivalPractice id="maori" name="Māori" />));
  const material = host.querySelectorAll('select')[1];
  act(() => { material.value = 'custom'; material.dispatchEvent(new Event('change', { bubbles: true })); });
  expect(host.querySelectorAll('textarea')[1].disabled).toBe(true);
  type('ā ē ī ō ū');
  const scored = host.querySelectorAll('textarea')[1];
  expect(scored.disabled).toBe(false);
  const paste = new Event('paste', { bubbles: true, cancelable: true });
  act(() => scored.dispatchEvent(paste));
  expect(paste.defaultPrevented).toBe(true);
});
it('exports a self-contained Cherokee font when supplied', () => {
  const svg = revivalCertificateSvg('cherokee', 'ᏣᎳᎩ', 'Ꭰ', { wpm: 10, accuracy: 100, correct: 50, total: 50, elapsed: 60000, completed: '2026-11-27T00:00:00Z', material: '¶' }, false, 'Zm9udA==');
  expect(svg).toContain('data:font/woff2;base64,Zm9udA==');
  expect(svg).toContain('xml:lang="chr"');
});

it('offers English and Hawaiian certificates after the Hawaiian timed test', () => {
  const content = hawaiianTypingContent;
  act(() => root.render(<LocalizedTypingTest content={content} />));
  act(() => vi.advanceTimersByTime(1000));
  act(() => host.querySelector('textarea')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'H', bubbles: true })));
  act(() => vi.advanceTimersByTime(60000));
  const button = [...host.querySelectorAll('button')].find(button => button.textContent === content.ui.certificateButton)!;
  expect(button).toBeTruthy();
  act(() => button.click());
  const input = host.querySelector('input[autocomplete="name"]')!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, 'Lindsay');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  act(() => (host.querySelectorAll('input[type="radio"]')[2] as HTMLInputElement).click());
  const generate = [...input.closest('[role=dialog]')!.querySelectorAll('button')].find(button => button.textContent === content.certificate.generate)!;
  act(() => generate.click());
  const certificates = host.querySelectorAll('article');
  expect([...certificates].map(card => card.lang)).toEqual(['haw', 'en']);
});
