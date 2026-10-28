import type { Metrics } from "../engine/types";
export function typingPersonality({wpm, accuracy, consistency}: Pick<Metrics,"wpm" | "accuracy" | "consistency">) {
return accuracy < 90
            ? { name: "The Chaos Goblin", description: "Your fingers have places to be. Unfortunately, some of those places are the wrong keys. A little more accuracy will make that speed count." }
            : accuracy >= 98 && consistency >= 85
              ? { name: "The Precision Machine", description: "Steady, accurate, and suspiciously well organized. Your keyboard probably respects you." }
              : wpm >= 75 && accuracy >= 95
                ? { name: "The Speed Demon", description: "Fast and mostly fearless. Your keyboard has requested a lunch break." }
                : accuracy >= 97
                  ? { name: "The Perfectionist", description: "You would rather get it right than launch a typo into the universe. Respectable." }
                  : consistency >= 80
                    ? { name: "The Steady Hand", description: "No drama, just dependable rhythm. Your secret weapon is consistency." }
                    : { name: "The Comeback Kid", description: "A few stumbles, plenty of determination. Every great typist started somewhere." };
}
