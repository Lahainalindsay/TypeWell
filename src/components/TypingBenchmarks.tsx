import styles from "./TypingBenchmarks.module.css";

export const typingStudies = [
  { device: "Physical keyboard", mean: "About 52 WPM", sample: "168,960 volunteers", year: 2018, title: "Dhakal et al., Observations on Typing from 136 Million Keystrokes", href: "https://userinterfaces.aalto.fi/136Mkeystrokes/resources/chi-18-analysis.pdf" },
  { device: "Mobile touchscreen", mean: "36.2 WPM", sample: "37,370 volunteers", year: 2019, title: "Palin et al., How Do People Type on Mobile Devices?", href: "https://userinterfaces.aalto.fi/typing37k/resources/Mobile_typing_study.pdf" }
];

export function TypingBenchmarks() {
  return <section className="panel" aria-labelledby="typing-benchmarks">
    <h2 id="typing-benchmarks">Published typing speed benchmarks</h2>
    <p>Both studies used online sentence-copying tasks with volunteers. Their averages depend on the device, participants and test setup. Use them as reference points when comparing similar tests.</p>
    <div className={styles.scroll} role="region" aria-label="Typing speed benchmark table" tabIndex={0}>
      <table>
        <thead><tr>{["Input", "Mean speed", "Sample", "Study"].map(heading => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
        <tbody>{typingStudies.map(study => <tr key={study.year}>
          <th scope="row">{study.device}</th><td>{study.mean}</td><td>{study.sample}</td>
          <td><a href={study.href}>{study.title} ({study.year})</a></td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>;
}
