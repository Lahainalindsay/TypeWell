import {describe,it,expect} from 'vitest';
import {languages,articles,articlePath,practicePath,glossikaUrl} from '../src/features/revival/content';
import {copyScore,drillCharacters} from '../src/features/revival/RevivalPractice';
describe('language revival collection',()=>{
 it('connects every published language to substantive history and a real practice path',()=>{expect(languages).toHaveLength(11);for(const l of languages){const article=articles[l.id];expect(article.sections.length).toBeGreaterThanOrEqual(4);expect(article.sources.length).toBeGreaterThanOrEqual(2);expect(article.timeline.length).toBeGreaterThanOrEqual(3);expect(articlePath(l.id)).toMatch(/^\/blog\/.+\/$/);expect(practicePath(l.id)).toMatch(/^\/.+\/$/);if(l.id!=='hawaiian')expect(drillCharacters[l.id].length).toBeGreaterThanOrEqual(5);}});
 it('does not invent a Hawaiian provider course or claim affiliate tracking',()=>{expect(glossikaUrl('hawaiian')).toBeNull();expect(glossikaUrl('sorani-kurdish')).toContain('kurdish-sorani');for(const l of languages)if(glossikaUrl(l.id))expect(glossikaUrl(l.id)).not.toContain('?ref');});
 it('normalizes combining marks before measuring a copying task',()=>{expect(copyScore('â ê','a\u0302 e\u0302',60000)).toEqual({correct:3,total:3,accuracy:100,wpm:1});});
 it('reports mismatches and does not imply accuracy for empty input',()=>{expect(copyScore('abc','axc',60000).accuracy).toBe(67);expect(copyScore('abc','',0)).toEqual({correct:0,total:0,accuracy:0,wpm:0});});
});
