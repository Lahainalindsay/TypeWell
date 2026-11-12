import styles from "./TypingPreviews.module.css";

const previews = [
  { file: "results.svg", label: "Sample standard test result", alt: "A sample WPMTest result showing 62 WPM and 97% accuracy", href: "/blog/wpm-vs-kph/", link: "How results are scored" },
  { file: "certificate.svg", label: "Sample typing certificate", alt: "A sample WPMTest typing proficiency certificate", href: "/certificate/sample/", link: "See the full certificate" },
  { file: "score-bands.svg", label: "Typing speed benchmarks", alt: "Physical-keyboard study: about 52 WPM on average, with most volunteers around 30 to 60 WPM. Touchscreen study: 36.2 WPM on average.", href: "/average-typing-speed/", link: "Read the studies and compare scores" }
];

export function TypingPreviews() {
  return <section className={styles.previews} aria-label="Standard typing test previews and benchmarks">
    {previews.map(({ file, label, alt, href, link }) => <figure key={file}>
      <img src={`/images/typing-previews/${file}`} width={540} height={310} alt={alt} loading="lazy" decoding="async" />
      <figcaption><strong>{label}</strong><a href={href}>{link}</a></figcaption>
    </figure>)}
  </section>;
}
