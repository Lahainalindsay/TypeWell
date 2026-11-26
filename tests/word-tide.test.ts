import { describe, expect, it } from "vitest";
import { initialGame, waveAt, wordTideReducer } from "../src/features/typingGames/wordTideGame";

function start() {
  return wordTideReducer(initialGame, { type: "start", deck: ["reef", "sail", "tide", "foam"] });
}

describe("Word Tide", () => {
  it("clears a full word and awards a streak bonus on the third clear", () => {
    let game = start();
    game = wordTideReducer(game, { type: "type", value: "re" });
    expect(game).toMatchObject({ score: 0, input: "re" });

    for (const value of ["REEF", "sail", "tide"]) {
      game = wordTideReducer(game, { type: "type", value });
    }
    expect(game).toMatchObject({ score: 35, streak: 3, input: "", active: [{ text: "foam" }] });
  });

  it("charges one life per missed word, resets the streak, and stops at zero lives", () => {
    let game = wordTideReducer(start(), { type: "type", value: "reef" });
    for (const milliseconds of [2700, 2700, 2600]) {
      game = wordTideReducer(game, { type: "tick", milliseconds });
    }
    expect(game).toMatchObject({ lives: 2, streak: 0, score: 10 });
    game = wordTideReducer(game, { type: "tick", milliseconds: 5400 });
    expect(game).toMatchObject({ lives: 0, status: "over" });
    expect(wordTideReducer(game, { type: "type", value: "reef" })).toBe(game);
  });

  it("freezes time and input while paused and spawns faster words in later waves", () => {
    let game = wordTideReducer(start(), { type: "pause" });
    expect(wordTideReducer(game, { type: "tick", milliseconds: 18000 })).toBe(game);
    expect(wordTideReducer(game, { type: "type", value: "reef" })).toBe(game);

    game = wordTideReducer(game, { type: "resume" });
    for (const milliseconds of [8000, 8000, 2800]) {
      game = wordTideReducer(game, { type: "tick", milliseconds });
    }
    expect(waveAt(game.elapsed)).toBe(2);
    expect(game.active).toEqual(expect.arrayContaining([expect.objectContaining({ travelTime: 7300 })]));
  });
});
