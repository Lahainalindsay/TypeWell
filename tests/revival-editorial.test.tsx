import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import RevivalArticle, { revivalMetadata } from '../src/features/revival/RevivalArticle';
import photos from '../src/features/revival/photos.json';
import hawaiianPhotos from '../src/features/revival/hawaiianPhotos.json';
import { languages, practicePath } from '../src/features/revival/content';

function render(id: string) { const host = document.createElement('div'); host.innerHTML = renderToStaticMarkup(<RevivalArticle id={id} />); return host; }

describe('revival editorial reading paths', () => {
  it('connects every chapter anchor and practice action, with one page heading', () => {
    for (const language of languages) {
      const page = render(language.id);
      expect(page.querySelectorAll('h1')).toHaveLength(1);
      for (const link of page.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) expect(page.querySelector(link.getAttribute('href')!)).not.toBeNull();
      expect(page.querySelector(`a[href="${practicePath(language.id)}"]`)).not.toBeNull();
      expect(revivalMetadata(language.id).alternates?.canonical).toBe(`https://wpmtest.app/blog/${language.id}-language-revival/`);
      for (const image of page.querySelectorAll('img')) {
        if (image.getAttribute('src') === '/images/partners/glossika-owl.png') {
          expect(image.getAttribute('alt')).toBe('');
        } else {
          expect(image.getAttribute('alt')?.length).toBeGreaterThan(10);
        }
      }
    }
  });
  it('places all six supplied photographs in the Hawaiian history with their captions', () => {
    const page = render('hawaiian');
    for (const photo of Object.values(hawaiianPhotos)) {
      expect(page.querySelector(`img[src="${photo.src}"]`)).not.toBeNull();
      expect(page.textContent).toContain(photo.caption);
    }
    expect(page.textContent).not.toContain('fatal school fire');
    expect(page.textContent).toContain('The institution opened in 1903.');
  });
  it('uses local responsive stock photographs and shows their attribution', () => {
    for (const language of languages) {
      const page = render(language.id), photo = photos[language.id as keyof typeof photos];
      const hero = page.querySelector<HTMLImageElement>(`img[src="${photo.src}"]`)!;
      expect(hero.getAttribute('srcset')).toContain(photo.smallSrc);
      expect(hero.getAttribute('srcset')).toContain(photo.mediumSrc);
      expect(hero.getAttribute('loading')).toBe('eager');
      expect(page.querySelector(`a[href="${photo.creditUrl}"]`)).not.toBeNull();
      expect(page.querySelector(`a[href="${photo.licenseUrl}"]`)).not.toBeNull();
    }
  });
});
