import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import GlossikaCard from '../src/features/partners/GlossikaCard';
import {glossikaAffiliateUrl,glossikaCourses,localizedGlossikaCourses} from '../src/features/partners/glossika';
import article from '../src/features/partners/glossikaArticle.json';
describe('Glossika affiliate guidance',()=>{
 it('keeps the nine free-course labels separate from Irish and unsupported Hawaiian',()=>{
  expect(Object.values(glossikaCourses).filter(c=>c.free)).toHaveLength(9);
  expect(glossikaCourses.irish.free).toBe(false);expect(glossikaCourses.hawaiian).toBeUndefined();
  expect(localizedGlossikaCourses.fil).toBe('Tagalog');expect(localizedGlossikaCourses.haw).toBeUndefined();
 });
 it('discloses the relationship beside every sponsored outbound link',()=>{
  for(const id of Object.keys(glossikaCourses)){
   const html=renderToStaticMarkup(<GlossikaCard id={id}/>);
   expect(html).toContain(glossikaAffiliateUrl);expect(html).toContain('rel="sponsored noopener noreferrer"');
   expect(html).toContain('may earn a commission');expect(html).toContain('web/Legacy');expect(html).toContain('newer mobile app');
  }
  expect(renderToStaticMarkup(<GlossikaCard id="hawaiian"/>)).toBe('');
 });
 it('links each factual article section to existing source records',()=>{
  const sources=new Set(article.sources.map(s=>s.id));
  for(const section of article.sections)for(const id of section.sources)expect(sources.has(id)).toBe(true);
 });
});
