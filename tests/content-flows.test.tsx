import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";
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
  click("Retake Test");expect(host.textContent).toContain("Record 1 of 4");
 });
});
