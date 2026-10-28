"use client";
import { useEffect, useRef, useState } from "react";
import type { Metrics } from "../engine/types";
import { typingPersonality } from "./typingPersonality";
import styles from "./personality.module.css";

export function PersonalityCard({metrics}: {metrics: Metrics}) {
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
  return <section ref={ref} tabIndex={-1} className={styles.card} aria-label="Your typing personality card">
    <p className={styles.series}>WPMTEST · KEYBOARD ALL-STARS</p>
    <h3>{personality.name}</h3>
    <div className={styles.portrait}><img src={personality.image} alt={personality.imageAlt} width="960" height="640" /></div>
    <div className={styles.stats}><strong>{metrics.wpm}<small>WPM</small></strong><strong>{metrics.accuracy}%<small>ACCURACY</small></strong><strong>{metrics.consistency}%<small>CONSISTENCY</small></strong></div>
    <p>{personality.description}</p>
    <p className={styles.note}>This attempt’s alter ego. Just for fun.</p>
    <button type="button" onClick={share}>Share my typing personality</button><p role="status">{status}</p>
  </section>;
}
