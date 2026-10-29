"use client";
import { useEffect, useRef, useState } from "react";
import type { Metrics } from "../engine/types";
import type { WeakKey } from "../engine/weakKeys";
import { personalityDrill, typingPersonality } from "./typingPersonality";
import styles from "./personality.module.css";

export function PersonalityCard({metrics, weakKeys = []}: {metrics: Metrics; weakKeys?: WeakKey[]}) {
  const personality = typingPersonality(metrics);
  const ref = useRef<HTMLElement>(null);
  const [status,setStatus] = useState("");
  useEffect(()=>{ ref.current?.focus(); },[]);
  async function share() {
    const text = `I'm ${personality.name}! ${metrics.wpm} WPM · ${metrics.accuracy}% accuracy. What's your typing personality?`;
    const url = "https://wpmtest.app/typing-personality-test/";
    try {
      if(navigator.share) await navigator.share({title:personality.name,text,url});
      else if(navigator.clipboard) {await navigator.clipboard.writeText(`${text} ${url}`);setStatus("Card results copied. Your friends have been warned.");}
      else setStatus(`${text} ${url}`);
    } catch(error) {if(!(error instanceof Error && error.name === "AbortError")) setStatus("Sharing didn’t work. Try again or copy this page’s link.");}
  }
  const drill = personalityDrill(weakKeys);
  const [typed,setTyped] = useState("");
  const correct = [...typed].filter((char,index)=>char === drill.text[index]).length;
  return <div><section ref={ref} tabIndex={-1} className={styles.card} aria-label="Your typing personality card">
    <p className={styles.series}>WPMTEST · KEYBOARD ALL-STARS</p>
    <h3>{personality.name}</h3>
    <div className={styles.portrait}><img src={personality.image} alt={personality.imageAlt} width="960" height="640" /></div>
    <div className={styles.stats}><strong>{metrics.wpm}<small>WPM</small></strong><strong>{metrics.accuracy}%<small>ACCURACY</small></strong><strong>{metrics.consistency}%<small>CONSISTENCY</small></strong></div>
    <p>{personality.description}</p>
    <p className={styles.note}>This attempt’s alter ego. Just for fun.</p>
    <button type="button" onClick={share}>Share my typing personality</button><p role="status">{status}</p>
  </section>
  <section className={styles.explanation} aria-label="Your typing personality explained">
    <h3>Why your keyboard cast you in this role</h3>
    <p>{personality.story}</p>
    <p><strong>The evidence:</strong> {metrics.wpm} WPM · {metrics.accuracy}% accuracy · {metrics.consistency}% consistency.</p>
    <p><strong>The matching rule:</strong> {personality.rule}. Rules are checked in the published order; the first match wins. Labels use the displayed rounded scores.</p>
    <p><strong>Your useful takeaway:</strong> {personality.strength}</p>
    <h3>Your next mission: fewer excuses, cleaner keys</h3><p>{personality.mission}</p>
    {weakKeys.length > 0 ? <><h4>The keys that filed a complaint</h4><ul>{weakKeys.slice(0,3).map(key=><li key={key.key}><strong>{key.key === " " ? "Space" : key.key}</strong>: {key.errors} incorrect input{key.errors===1?"":"s"} in {key.attempts} attempts when this key was expected.</li>)}</ul><p>Only keys attempted at least twice with an error appear. A small sample can exaggerate a pattern; treat this as a practice clue.</p></> : <p>No repeated error keys met our reporting threshold on this attempt. That is encouraging, but a short sample cannot prove every key is mastered.</p>}
    <h4>Your keyboard redemption warm-up</h4>
    <p>{drill.keys.length ? `These real words include your repeated error letters: ${drill.keys.join(", ")}.` : "Start with these familiar words to practice clean, comfortable movement."} This is untimed practice, not another personality score. Copy the line, check each word, and repeat before retesting.</p>
    <p className={styles.drill}>{drill.text}</p>
    <label htmlFor="personality-warmup">Type the warm-up here</label>
    <textarea id="personality-warmup" value={typed} maxLength={drill.text.length} autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} onChange={event=>setTyped(event.target.value)} />
    <p role="status">{!typed ? "No timer. Let accuracy do the talking." : `${correct} of ${typed.length} entered characters match their positions.${typed === drill.text ? " Clean copy complete. Your keyboard accepts this peace offering." : typed.length === drill.text.length ? " You reached the end; compare your copy with the line and repair the differences." : ""}`}</p>
    <button type="button" onClick={()=>setTyped("")}>Clear warm-up</button>
    <p>Then use Retake Test to compare a fresh attempt. Keep duration, passage category, device and correction settings similar; one unusually good run is not a trend.</p>
    <details><summary>What these scores can—and cannot—tell you</summary>
    <p>WPM is correct characters remaining in the passage divided by five, divided by elapsed minutes. Spaces and punctuation count. Example: 250 correct characters in one minute = 50 WPM.</p>
    <p>Accuracy is correct character inputs divided by all character inputs. Correcting a mistake repairs the text but does not erase that wrong input from accuracy. Consistency describes variation in keystroke timing; it is not a percentage of correct words or a psychological measure.</p>
    <p>Our nine character labels and cutoffs are editorial game rules, not population percentiles or a validated personality test. They cannot measure intelligence, diagnose a condition, determine employability or establish an enduring trait. Keyboard, device, passage difficulty, assistance, fatigue and sample length can change a result. Very short attempts are particularly unstable.</p>
    <p>Typing and warm-up matching run in your browser. Practice progress is stored locally; clearing browser data can remove it. The share button sends your title, WPM, accuracy and test link only when you choose to share. Site ads or analytics may have separate data practices: <a href="/privacy/">read our privacy policy</a>.</p>
    <p>Original character illustrations are AI-generated and curated for this game. No employer endorsement, certified assessment, or scientific validation is implied. <a href="/typing-personality-test/#how-personalities-work">See every scoring rule</a> · <a href="/blog/wpm-vs-kph/">Read the scoring guide</a>.</p>
    </details>
  </section></div>;
}
