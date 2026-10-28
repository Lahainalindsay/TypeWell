import styles from "./editorial.module.css";

const panels = {
 "wpm-vs-kph": { label: "Know your numbers", cards: [["50 WPM", "250 correct characters ÷ 5, in one minute"], ["100 KPM", "300 entered characters in three minutes"], ["6,000 KPH", "100 KPM × 60; an extrapolated rate"]] },
 "data-entry-accuracy": { label: "One fictional record set. Two different scores.", cards: [["23 / 24", "Fields copied exactly"], ["95.8%", "Exact-match field accuracy"], ["75%", "Three of four records completely correct"]] },
 "avoid-data-entry-errors": { label: "Small changes. Different data.", cards: [["A48291 → A48921", "Transposed digits"], ["$147.28 → $14.728", "Shifted decimal"], ["00482 → 482", "Missing leading zeroes"]] },
 "prepare-employment-typing-test": { label: "A suggested ten-minute practice routine", cards: [["02 min", "Warm up slowly"], ["03 min", "Work on one common error"], ["05 min", "Take a comparable timed sample"]] },
 "best-typing-test-websites": { label: "Choose by purpose", cards: [["Learn", "Guided lessons and beginner skills"], ["Measure", "Comparable tests and clear scoring"], ["Practice", "Exercises matched to your goal"]] },
 "data-entry-typing-test-for-employment": { label: "Prepare for the task in the job posting", cards: [["Characters", "Copy letters, digits and punctuation"], ["Fields", "Preserve exact values and formatting"], ["Records", "Check the complete entry before moving on"]] }
} as const;
export type ArticleTopic = keyof typeof panels;

export function ArticleVisual({ topic }: { topic: ArticleTopic }) {
 const panel = panels[topic];
 return <div className={styles.visual}>
  <figure className={styles.figure}><img src="/images/typing-editorial-desk.webp" width="1536" height="1024" alt="A keyboard and notebook on an oak desk in soft daylight" fetchPriority="high" /><figcaption>A space to focus on the details. AI-generated editorial illustration.</figcaption></figure>
  <aside className={styles.takeaway} aria-label={panel.label}><p className={styles.kicker}>{panel.label}</p><div className={styles.cards}>{panel.cards.map(([value,label]) => <div className={styles.card} key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></aside>
 </div>;
}

export function PracticeCard({ href, label }: { href: string; label: string }) {
 return <aside className={styles.cta}><p className={styles.kicker}>Put this into practice</p><h2>Make your next session count.</h2><p>Apply what you’ve learned, review your accuracy, and choose the next skill to work on.</p><a className={styles.button} href={href}>{label} →</a><p className={styles.more}><a href="/blog/">Explore more guides</a> · <a href="/contact/">Suggest a correction</a></p></aside>;
}
