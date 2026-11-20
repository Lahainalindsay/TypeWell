import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Collection from '../app/language-revival/page';
import LanguagePage from '../app/language-revival/[language]/page';
import PracticePage from '../app/language-revival/[language]/typing-test/page';
import { languagePathways, revivalStoryUrl } from '../src/features/revival/pathways';
import { drillCharacters } from '../src/features/revival/RevivalPractice';
function dom(markup: string) { const host = document.createElement('div'); host.innerHTML = markup; return host; }
describe('ten featured language pathways', () => {
 it('gives every card four distinct, labeled destinations', () => {
  const page = dom(renderToStaticMarkup(<Collection />));
  expect(languagePathways).toHaveLength(10);
  for (const item of languagePathways) {
   const nav = page.querySelector(`nav[aria-label="${item.name} pathway"]`)!;
   const links = [...nav.querySelectorAll('a')];
   expect(links.map(l => l.textContent)).toEqual(['Discover the Language →','Keyboard & Setup Guide →','Typing Practice →','The Revival Story ↗']);
   expect(links.map(l => l.getAttribute('href'))).toEqual([`/language-revival/${item.id}/`,`/language-revival/${item.id}/#keyboard-setup`,item.test,revivalStoryUrl(item.id)]);
  }
 });
 it('provides a real setup anchor, practice action, and matching external history on each page', async () => {
  for (const item of languagePathways) {
   const page = dom(renderToStaticMarkup(await LanguagePage({params: Promise.resolve({language:item.id})})));
   expect(page.querySelector('#keyboard-setup')).not.toBeNull();
   expect(page.querySelector(`a[href="${item.test}"]`)).not.toBeNull();
   expect(page.querySelector(`a[href="${revivalStoryUrl(item.id)}"]`)).not.toBeNull();
   if (item.id !== 'hawaiian') {
    expect(drillCharacters[item.id]).toBeTruthy();
    const practice = dom(renderToStaticMarkup(await PracticePage({params: Promise.resolve({language:item.id})})));
    expect(practice.querySelector(`a[href="${revivalStoryUrl(item.id)}"]`)).not.toBeNull();
   }
  }
 });
});
