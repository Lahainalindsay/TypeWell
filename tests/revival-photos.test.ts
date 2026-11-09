import {describe,it,expect} from 'vitest';
import {existsSync} from 'node:fs';
import {languages} from '../src/features/revival/content';
import photos from '../src/features/revival/photos.json';
describe('language article location photography',()=>{
 it('provides a local photograph with source attribution for every language',()=>{
  expect(Object.keys(photos).sort()).toEqual(languages.map(l=>l.id).sort());
  for(const language of languages){const photo=photos[language.id as keyof typeof photos];expect(existsSync(`public${photo.src}`)).toBe(true);expect(photo.alt.length).toBeGreaterThan(20);expect(photo.credit.length).toBeGreaterThan(5);expect(photo.creditUrl).toMatch(/^https:\/\//);expect(photo.licenseUrl).toMatch(/^https:\/\//);expect(photo.width).toBeGreaterThanOrEqual(1200);expect(photo.height).toBeGreaterThan(500);}
 });
});
