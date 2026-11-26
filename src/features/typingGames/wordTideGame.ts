const words = [
  "reef", "sail", "tide", "foam", "surf", "dive", "fish", "pier",
  "sand", "cove", "kelp", "wave", "shell", "drift", "coral", "ocean",
  "swell", "shore", "float", "skate", "canoe", "splash", "lagoon", "island",
  "anchor", "ripple", "sunset", "current", "paddle", "breeze", "harbor", "seagull"
];

export const laneCount = 3;
const waveDuration = 18_000;

type TideWord = {
  id: number;
  text: string;
  lane: number;
  enteredAt: number;
  travelTime: number;
};

type Game = {
  status: "ready" | "playing" | "paused" | "over";
  deck: readonly string[];
  elapsed: number;
  nextSpawn: number;
  nextWord: number;
  active: TideWord[];
  input: string;
  score: number;
  streak: number;
  lives: number;
};

type Action =
  | { type: "start"; deck: readonly string[] }
  | { type: "tick"; milliseconds: number }
  | { type: "type"; value: string }
  | { type: "pause" }
  | { type: "resume" };

export const initialGame: Game = {
  status: "ready",
  deck: words,
  elapsed: 0,
  nextSpawn: 0,
  nextWord: 0,
  active: [],
  input: "",
  score: 0,
  streak: 0,
  lives: 3
};

export function shuffledWords() {
  const deck = [...words];
  for (let index = deck.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
  return deck;
}

export function waveAt(elapsed: number) {
  return 1 + Math.floor(elapsed / waveDuration);
}

export function distanceToShore(word: TideWord, elapsed: number) {
  return Math.min(1, (elapsed - word.enteredAt) / word.travelTime);
}

function spawnWord(game: Game): Game {
  const lane = Array.from({ length: laneCount }, (_, index) => (game.nextWord + index) % laneCount)
    .find(index => !game.active.some(word => word.lane === index));
  if (lane === undefined) return game;

  const wave = waveAt(game.elapsed);
  const word = {
    id: game.nextWord,
    text: game.deck[game.nextWord % game.deck.length],
    lane,
    enteredAt: game.elapsed,
    travelTime: Math.max(3_100, 8_000 - (wave - 1) * 700)
  };
  return {
    ...game,
    active: [...game.active, word],
    nextWord: game.nextWord + 1,
    nextSpawn: game.elapsed + Math.max(800, 2_700 - (wave - 1) * 275)
  };
}

export function wordTideReducer(game: Game, action: Action): Game {
  if (action.type === "start") return spawnWord({ ...initialGame, deck: action.deck, status: "playing" });
  if (action.type === "resume" && game.status === "paused") return { ...game, status: "playing" };
  if (game.status !== "playing") return game;
  if (action.type === "pause") return { ...game, status: "paused" };

  if (action.type === "type") {
    const input = action.value.toLowerCase().replace(/[^a-z]/g, "").slice(0, 12);
    const match = game.active.find(word => word.text === input);
    if (!match) return { ...game, input };

    const streak = game.streak + 1;
    const next = {
      ...game,
      active: game.active.filter(word => word.id !== match.id),
      input: "",
      streak,
      score: game.score + 10 + Math.min(20, Math.floor(streak / 3) * 5)
    };
    return next.active.length ? next : spawnWord(next);
  }

  if (action.type !== "tick") return game;
  const elapsed = game.elapsed + action.milliseconds;
  const active = game.active.filter(word => distanceToShore(word, elapsed) < 1);
  const missed = game.active.length - active.length;
  const lives = Math.max(0, game.lives - missed);
  const next: Game = {
    ...game,
    elapsed,
    active,
    lives,
    streak: missed ? 0 : game.streak,
    input: missed && !active.some(word => word.text.startsWith(game.input)) ? "" : game.input,
    status: lives ? "playing" : "over"
  };
  return lives && (!active.length || elapsed >= game.nextSpawn) ? spawnWord(next) : next;
}
