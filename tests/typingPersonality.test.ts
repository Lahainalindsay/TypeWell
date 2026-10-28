import { describe,it,expect } from "vitest";
import { typingPersonality } from "../src/features/typingPersonality";
import { readFileSync } from "node:fs";
import { articleBlocks } from "../src/features/editorial/personalityArticle";
describe("typing personalities",()=>{
 it.each([
 [100,89,90,"The Chaos Goblin"],
 [100,98,85,"The Precision Machine"],
 [75,95,70,"The Speed Demon"],
 [40,97,70,"The Perfectionist"],
 [40,94,80,"The Steady Hand"],
 [25,94,70,"The Comeback Kid"],
 ])("classifies %s WPM, %s accuracy, %s consistency",(wpm,accuracy,consistency,name)=>{
 expect(typingPersonality({wpm,accuracy,consistency}).name).toBe(name);
 });
 it("restricts the personality card to the dedicated test",()=>{
 const app=readFileSync("src/App.tsx","utf8");
 expect(app).toContain('path.replace(/\\/$/, "") === "/typing-personality-test"');
 expect(app).toContain('{personalityTest && <PersonalityCard');
 });
 it("keeps the supplied article text unchanged",()=>{
 const original=readFileSync("tests/fixtures/typing-personality-article.txt","utf8").trim();
 expect(articleBlocks.join("\n\n")).toBe(original);
 });
});
