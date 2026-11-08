"use client";
import { useEffect, useRef, useState } from 'react';
import { splitGraphemes } from '../../engine/graphemes';
export const drillCharacters:Record<string,string>={welsh:'â ê î ô û ŵ ŷ',manx:'Gaelg Ellan Vannin', 'scottish-gaelic':'à è ì ò ù Gàidhlig',irish:'á é í ó ú Gaeilge',catalan:'à è é í ï ò ó ú ü ç l·l', 'taiwanese-taigi':'Tâi-gí Pe̍h-ōe-jī','hakka-sixian':'四 縣 客 語','hakka-hailu':'海 陸 客 語',wenzhounese:'溫 州 話','sorani-kurdish':'ڕ ڵ ۆ ێ ە کوردی'};
export function copyScore(target:string,typed:string,elapsed:number){const expected=splitGraphemes(target),actual=splitGraphemes(typed);const correct=actual.filter((c,i)=>c===expected[i]).length;return {correct,total:actual.length,accuracy:actual.length?Math.round(correct/actual.length*100):0,wpm:elapsed>0?Math.round(correct/5/(elapsed/60000)):0};}
export default function RevivalPractice({id,name}:{id:string;name:string}){
 const [custom,setCustom]=useState(''),[useCustom,setUseCustom]=useState(false),[typed,setTyped]=useState(''),[start,setStart]=useState<number|null>(null),[now,setNow]=useState(0),[done,setDone]=useState(false);
 const input=useRef<HTMLTextAreaElement>(null);
 const source=(useCustom&&custom.trim()?custom.trim():drillCharacters[id]).normalize('NFC');
 const target=Array(40).fill(source).join(' ');
 useEffect(()=>{if(start===null||done)return;const tick=()=>{const time=Date.now();setNow(Math.min(time,start+60000));if(time-start>=60000)setDone(true);};const timer=window.setInterval(tick,100);return()=>window.clearInterval(timer);},[start,done]);
 const elapsed=start===null?0:Math.min(60000,Math.max(0,now-start));const score=copyScore(target,typed,elapsed);
 function reset(){setTyped('');setStart(null);setNow(0);setDone(false);requestAnimationFrame(()=>input.current?.focus());}
 return <section className="panel" aria-label={`${name} character practice`}>
 <h2>One-minute {name} keyboard practice</h2><p>Copy the line below. The timer starts on your first input. Default material is a repeated character/name drill, not a sentence corpus or a fluency assessment.</p>
 <details><summary>Practice a passage you already know</summary><p>Paste material you have permission to use and whose language/variety you can verify. Text stays in this browser’s memory and is not uploaded by this tool.</p><label htmlFor="revival-source">Your passage</label><textarea id="revival-source" value={custom} disabled={start!==null} onChange={e=>setCustom(e.target.value.slice(0,4000))}/><label><input type="checkbox" checked={useCustom} disabled={start!==null||!custom.trim()} onChange={e=>setUseCustom(e.target.checked)}/> Use my passage</label></details>
 <p><strong>{Math.ceil((60000-elapsed)/1000)} seconds remaining</strong></p>
 <p style={{padding:20,fontSize:'1.35rem',lineHeight:1.8,overflowWrap:'anywhere',background:'var(--bg-2)',borderRadius:12}} dir={id==='sorani-kurdish'?'rtl':'ltr'}>{splitGraphemes(target).slice(Math.max(0,splitGraphemes(typed).length-30),splitGraphemes(typed).length+120).join('')}</p>
 <label htmlFor="revival-typing">Type the displayed text</label><textarea id="revival-typing" ref={input} disabled={done} value={typed} dir={id==='sorani-kurdish'?'rtl':'ltr'} autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} onChange={e=>{const time=Date.now();if(start!==null&&time-start>=60000){setNow(start+60000);setDone(true);return;}const value=e.target.value.normalize('NFC').slice(0,target.length);if(!value&&start===null)return;if(start===null)setStart(time);setNow(time);setTyped(value);if(value===target)setDone(true);}}/>
 {done&&<div role="status"><h3>Practice complete</h3><p>{score.wpm} WPM · {score.accuracy}% copy accuracy · {score.correct} matching characters of {score.total} entered.</p><p>Copy accuracy compares the current text with the target; corrected mistakes are not retained in this exercise. WPM uses matching grapheme clusters ÷ 5 ÷ elapsed minutes. These repeated drills are easier to anticipate than unseen prose; compare only like-for-like attempts. A score does not demonstrate language knowledge.</p></div>}
 <button type="button" onClick={reset}>Restart practice</button><p>Use your normal input method. Combining marks are normalized to NFC and counted as grapheme clusters; input-method composition is supported by the text field. {id==='wenzhounese'||id.startsWith('hakka')?'A Han-character drill cannot distinguish pronunciation or certify a particular spoken variety.':''}</p>
 </section>;
}
