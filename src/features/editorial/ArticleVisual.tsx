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

const diagramDescriptions: Record<ArticleTopic, string> = {
 "wpm-vs-kph": "250 correct characters in one minute is 50 WPM. 300 entered characters in three minutes is 6,000 KPH.",
 "data-entry-accuracy": "One error in four six-field records yields 95.8% field accuracy and 75% complete-record accuracy.",
 "avoid-data-entry-errors": "Examples of swapped digits, shifted decimal points and missing leading zeroes.",
 "prepare-employment-typing-test": "Warm up for two minutes, drill one error for three minutes, then take a five-minute timed sample.",
 "best-typing-test-websites": "Choose guided lessons to learn, comparable tests to measure, or job-shaped exercises to practice.",
 "data-entry-typing-test-for-employment": "Check characters as you type, compare exact field values, and review the whole record."
};

export function ArticleVisual({ topic }: { topic: ArticleTopic }) {
 return <figure className={styles.figure}>
  <img src={`/images/guides/${topic}.svg`} width={760} height={280} alt={diagramDescriptions[topic]} decoding="async" />
 </figure>;
}

export function GuideTakeaways({ topic }: { topic: ArticleTopic }) {
 const panel = panels[topic];
 return <aside className={styles.takeaway} aria-label="Key takeaways">
  <h2>Key takeaways</h2><p>{panel.label}</p>
  <div className={styles.cards}>{panel.cards.map(([value, label]) => <div className={styles.card} key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
 </aside>;
}

export function AuthorByline({ date }: { date: string }) {
 const display = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
 return <p className={styles.note}>By <a href="/about/#lindsay-johnson">Lindsay Johnson</a>, WPMTest creator and Maui-based developer · Updated <time dateTime={date}>{display}</time></p>;
}

export function RelatedGuides({ topics }: { topics: ArticleTopic[] }) {
 const labels: Record<ArticleTopic, string> = {
  "wpm-vs-kph": "How to read WPM and KPH scores",
  "data-entry-accuracy": "How data-entry accuracy is scored",
  "avoid-data-entry-errors": "Common data-entry errors to avoid",
  "prepare-employment-typing-test": "How to prepare for an employment typing test",
  "best-typing-test-websites": "Compare typing test websites",
  "data-entry-typing-test-for-employment": "Data-entry typing tests for employment"
 };
 return <nav className={styles.related} aria-label="Related articles">
  <h2>Related articles</h2>
  <ul>{topics.map(topic => <li key={topic}><a href={`/blog/${topic}/`}>{labels[topic]}</a></li>)}</ul>
 </nav>;
}

export function PracticeCard({ href, label }: { href: string; label: string }) {
 return <aside className={styles.cta}><a className={styles.button} href={href}>{label} →</a><p className={styles.more}><a href="/blog/">Explore more guides</a> · <a href="/contact/">Suggest a correction</a></p></aside>;
}
