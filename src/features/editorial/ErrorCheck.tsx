"use client";
import { useState } from "react";
const examples = [
 { source: "A48291", entry: "A48921", correct: false, explanation: "The 2 and 9 are transposed." },
 { source: "$147.28", entry: "$147.28", correct: true, explanation: "The symbol, digits and decimal all match." },
 { source: "00482", entry: "482", correct: false, explanation: "Two leading zeroes are missing." },
 { source: "08/14/2026", entry: "08/14/2026", correct: true, explanation: "The displayed date format is preserved." }
];
export function ErrorCheck() {
 const [answers, setAnswers] = useState<Record<number, boolean>>({});
 return <section className="practice-check" aria-labelledby="check-heading"><h2 id="check-heading">Try a quick verification exercise</h2><p>Does each entry match its fictional source? This exercise runs locally without saving your answers.</p>{examples.map((item,index) => <fieldset key={item.source}><legend>Field {index+1}</legend><p>Source: <code>{item.source}</code> · Entry: <code>{item.entry}</code></p><div className="actions"><button type="button" aria-pressed={answers[index] === true} onClick={() => setAnswers({...answers,[index]:true})}>Exact match</button><button type="button" aria-pressed={answers[index] === false} onClick={() => setAnswers({...answers,[index]:false})}>Contains an error</button></div><p aria-live="polite">{index in answers ? `${answers[index] === item.correct ? "Correct." : "Check again."} ${item.explanation}` : "Choose an answer."}</p></fieldset>)}<button type="button" onClick={() => setAnswers({})}>Reset exercise</button></section>;
}
