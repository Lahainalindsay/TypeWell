import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { MissedFieldRetry } from "../src/features/dataEntry/MissedFieldRetry";
import { calculateDataEntryMetrics, fictionalDataEntryRecords } from "../src/engine/dataEntry";
import { ErrorCheck } from "../src/features/editorial/ErrorCheck";
let root:Root, host:HTMLDivElement;
beforeEach(() => {
 Object.assign(globalThis,{IS_REACT_ACT_ENVIRONMENT:true}); window.localStorage.clear();
 vi.stubGlobal("matchMedia",vi.fn(() => ({matches:false,addEventListener(){},removeEventListener(){}})));
 host=document.createElement("div"); document.body.append(host); root=createRoot(host);
});
afterEach(() => {act(() => root.unmount());host.remove();vi.useRealTimers();vi.unstubAllGlobals();});
function render(element:React.ReactNode){act(() => root.render(element));}
function click(label:string){const button=[...host.querySelectorAll("button")].find(item => item.textContent===label)!; act(() => button.click());}
describe("content and assessment flows", () => {
 it("caps retry rounds at six fields and hides retries for perfect results", () => {
  const report=calculateDataEntryMetrics(fictionalDataEntryRecords, [["", "", "", "", "", ""]]);
  render(<MissedFieldRetry report={report} />);click("Retry missed fields");
  expect(host.textContent).toContain("Field 1 of 6");
  for (let index=0;index<6;index++) act(() => host.querySelector("form")!.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true})));
  expect(host.textContent).toContain("0/6 fields correct");
  const perfect={...report, byType:report.byType.map(group => ({...group,correct:group.total}))};
  render(<MissedFieldRetry report={perfect} />);
  expect(host.textContent).toBe("");
 });

 it("gives feedback and resets verification practice", () => {
  render(<ErrorCheck />); const first=host.querySelector("fieldset")!;
  act(() => (first.querySelectorAll("button")[1] as HTMLButtonElement).click()); expect(first.textContent).toContain("Correct. The 2 and 9 are transposed.");
  click("Reset exercise");expect(first.textContent).toContain("Choose an answer.");
 });
 it("runs KPH for three minutes and supports retake", () => {
  vi.useFakeTimers({toFake:["setInterval","clearInterval","performance","requestAnimationFrame"]}); render(<App initialPath="/kph-typing-test/" />);
  expect(host.textContent).toContain("3m 0s"); const input=host.querySelector("textarea")!;
  act(() => input.dispatchEvent(new KeyboardEvent("keydown",{key:"0",bubbles:true})));
  act(() => vi.advanceTimersByTime(60000));expect(host.textContent).not.toContain("Session complete");
  act(() => vi.advanceTimersByTime(120000));expect(host.textContent).toContain("Session complete");
  click("Retake Test");expect(host.textContent).toContain("3m 0s");expect(host.textContent).not.toContain("Session complete");
 });
 it("completes records using mobile buttons and reviews a blank error", () => {
  render(<App initialPath="/data-entry-typing-test/" />);const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value")!.set!;
  for(let index=0;index<24;index++){
   const input=host.querySelector("input")!,expected=host.querySelector(".data-field.active strong")!.textContent!;
   act(() => {setter.call(input,index===0?"":expected);input.dispatchEvent(new Event("input",{bubbles:true}));});click(index===23?"See results":"Next field");
  }
  expect(host.textContent).toContain("95.8%");expect(host.textContent).toContain("23/24");expect(host.textContent).toContain("(blank)");expect(host.querySelector('a[href="/data-entry-practice/names-addresses/"]')).not.toBeNull();
  click("Retry missed fields");
  expect(host.textContent).toContain("Casey Rivera");
  const retry=host.querySelector('section[aria-label="Retry missed fields"]')!;
  act(() => retry.querySelector("form")!.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true})));
  expect(retry.textContent).toContain("Taylor Chen");
  const retryInput=retry.querySelector("input")!;
  act(() => {setter.call(retryInput,"Taylor Chen");retryInput.dispatchEvent(new Event("input",{bubbles:true}));});
  act(() => retry.querySelector("form")!.dispatchEvent(new Event("submit",{bubbles:true,cancelable:true})));
  expect(retry.textContent).toContain("1/2 fields correct");
  expect(host.textContent).toContain("23/24");
  click("Retake Test");expect(host.textContent).toContain("Record 1 of 4");
 });
});
