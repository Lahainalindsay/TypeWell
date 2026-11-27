"use client";

import { useRef, useState } from "react";
import { dataEntryFieldTypes, type DataEntryMetrics } from "../../engine/dataEntry";

// All values differ from the initial assessment records.
const examples = [
  ["Casey Rivera", "Taylor Chen"], ["R90318", "N00764"],
  ["03/17/2027", "12/08/2027"], ["$208.06", "$19.50"],
  ["02108", "00725"], ["AZ-0193", "PL-6082"]
];

export function MissedFieldRetry({ report }: { report: DataEntryMetrics }) {
  const [round, setRound] = useState<{ label: string; expected: string }[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const missed = report.byType.filter(group => group.correct < group.total);
  if (!missed.length) return null;
  const complete = round.length > 0 && answers.length === round.length;
  function begin() {
    // Interleave field types before the second example so every missed type
    // receives practice within the six-field limit.
    const tasks = [0, 1].flatMap(example => missed.map(group => {
      const index = dataEntryFieldTypes.findIndex(field => field.label === group.label);
      return { label: group.label, expected: examples[index][example] };
    })).slice(0, 6);
    setRound(tasks); setAnswers([]); setValue("");
    requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
  }
  function submit() {
    setAnswers(previous => [...previous, value]);
    setValue("");
    requestAnimationFrame(() => input.current?.focus({ preventScroll: true }));
  }
  return <section className="panel" aria-label="Retry missed fields">
    <h3>Give those fields another go</h3>
    <p>Fresh fictional examples for the field types you missed. The zero has a job. The decimal has a specific seat.</p>
    {(!round.length || complete) && <button type="button" onClick={begin}>Retry missed fields</button>}
    {round.length > 0 && !complete && <form className="data-entry-input" onSubmit={event => { event.preventDefault(); submit(); }}>
      <p>Field {answers.length + 1} of {round.length} · {round[answers.length].label}</p>
      <p><strong>{round[answers.length].expected}</strong></p>
      <label>Copy the value exactly<input ref={input} value={value} onChange={event => setValue(event.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} /></label>
      <button type="submit">Next field</button><p>Blank entries count as errors.</p>
    </form>}
    {complete && <div role="status"><h4>Retry result</h4><p>{answers.filter((answer, index) => answer === round[index].expected).length}/{round.length} fields correct ({Math.round(answers.filter((answer, index) => answer === round[index].expected).length / round.length * 100)}%). Your original score is shown above.</p>
      <ul>{round.map((task, index) => <li key={index}>{task.label} · {answers[index] === task.expected ? "Correct" : <>Entered <code>{answers[index] || "(blank)"}</code>, expected <code>{task.expected}</code></>}</li>)}</ul>
    </div>}
  </section>;
}
