import type { CertificateResult } from "./result";

// Keep routing and message formatting in sync with public/certificate-flow.js,
// which also runs on standalone certificate pages without the React bundle.
export function resultChallenge(result: CertificateResult) {
  const type = result.type;
  const minutes = type.match(/^(1|3|5|10) Minute /)?.[1];
  const pages = type.match(/^(1|2|3) Page /)?.[1];
  let path = result.kind === "data-entry" ? "/data-entry-typing-test/"
    : /KPH/i.test(type) ? "/kph-typing-test/"
    : /10[- ]Key/i.test(type) ? "/10-key-typing-test/"
    : result.kind === "numeric" ? "/numeric-keypad-test/"
    : /with Numbers/i.test(type) ? "/typing-test-with-numbers/"
    : /with Punctuation/i.test(type) ? "/typing-test-with-punctuation/"
    : /Mobile/i.test(type) ? "/mobile-typing-test/"
    : /Customer Service/i.test(type) ? "/customer-service-typing-test/"
    : pages ? `/${pages}-page-typing-test/`
    : `/${minutes || "1"}-minute-typing-test/`;
  if (minutes && !/^\/(1|3|5|10)-minute-typing-test\/$/.test(path)) path += `?seconds=${Number(minutes) * 60}`;
  const wanted = result.kind === "data-entry" ? ["Field accuracy", "Fields per minute"]
    : result.kind === "numeric" ? ["KPH", "Accuracy"] : ["Words per minute (WPM)", "Accuracy"];
  const score = wanted.map(label => result.metrics.find(metric => metric.label === label))
    .filter(metric => metric !== undefined)
    .map(metric => metric.label === "Words per minute (WPM)" ? `${metric.value} WPM`
      : `${metric.value} ${metric.label.toLowerCase() === "kph" ? "KPH" : metric.label.toLowerCase()}`).join(" · ");
  return {
    title: "Can you beat me? | WPMTest",
    text: `⌨️ ${score}\n${type} on WPMTest\nCan you beat me? Take the same test 👇`,
    url: `https://wpmtest.app${path}`
  };
}
