import { describe,it,expect } from "vitest";
import { personalityDrill, personalities, typingPersonality } from "../src/features/typingPersonality";
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
 [100,99,90,"The Keyboard Legend"],
 [60,96,82,"The Rhythm Rider"],
 [30,96,70,"The Careful Explorer"],
 ])("classifies %s WPM, %s accuracy, %s consistency",(wpm,accuracy,consistency,name)=>{
 const result = typingPersonality({wpm,accuracy,consistency});
 expect(result.name).toBe(name);
 expect(result.imageAlt.length).toBeGreaterThan(20);
 expect(readFileSync(`public${result.image}`).byteLength).toBeGreaterThan(1000);
 });
 it("gives every personality a distinct image",()=>{
 const samples = [[100,89,90],[100,98,85],[75,95,70],[40,97,70],[40,94,80],[25,94,70],[100,99,90],[60,96,82],[30,96,70]];
 const images = samples.map(([wpm,accuracy,consistency])=>typingPersonality({wpm,accuracy,consistency}).image);
 expect(new Set(images).size).toBe(9);
 });
 it("publishes nine profiles with specific practice missions",()=>{
 expect(personalities).toHaveLength(9);
 expect(personalities.every(p=>p.story.length>70 && p.mission.length>50 && p.rule.length>10)).toBe(true);
 });
 it("builds readable warm-up words around repeated error letters",()=>{
 const drill=personalityDrill([{key:"r",attempts:5,errors:2,errorRate:40}]);
 expect(drill.keys).toEqual(["r"]);
 expect(drill.text.split(" ").every(word=>word.includes("r"))).toBe(true);
 expect(personalityDrill([]).text).toContain("steady");
 });
 it("respects priority and boundary changes",()=>{
 expect(typingPersonality({wpm:120,accuracy:89,consistency:99}).name).toBe("The Chaos Goblin");
 expect(typingPersonality({wpm:100,accuracy:98,consistency:90}).name).toBe("The Precision Machine");
 expect(typingPersonality({wpm:35,accuracy:96,consistency:70}).name).toBe("The Comeback Kid");
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
