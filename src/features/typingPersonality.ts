import type { Metrics } from "../engine/types";
export function typingPersonality({wpm, accuracy, consistency}: Pick<Metrics,"wpm" | "accuracy" | "consistency">) {
return accuracy < 90
            ? { name: "The Chaos Goblin", image: "/images/personalities/chaos-goblin.webp", imageAlt: "A mischievous green goblin scattering keycaps while typing wildly", description: "Your fingers have places to be. Unfortunately, some of those places are the wrong keys. A little more accuracy will make that speed count." }
            : accuracy >= 98 && consistency >= 85
              ? { name: "The Precision Machine", image: "/images/personalities/precision-machine.webp", imageAlt: "A precise robot typing on a perfectly aligned keyboard", description: "Steady, accurate, and suspiciously well organized. Your keyboard probably respects you." }
              : wpm >= 75 && accuracy >= 95
                ? { name: "The Speed Demon", image: "/images/personalities/speed-demon.webp", imageAlt: "A racing-goggled speed demon typing with fiery speed trails", description: "Fast and mostly fearless. Your keyboard has requested a lunch break." }
                : accuracy >= 97
                  ? { name: "The Perfectionist", image: "/images/personalities/perfectionist.webp", imageAlt: "A meticulous owl inspecting a spotless keyboard with a magnifying glass", description: "You would rather get it right than launch a typo into the universe. Respectable." }
                  : consistency >= 80
                    ? { name: "The Steady Hand", image: "/images/personalities/steady-hand.webp", imageAlt: "A calm tortoise typing with a steady, confident rhythm", description: "No drama, just dependable rhythm. Your secret weapon is consistency." }
                    : { name: "The Comeback Kid", image: "/images/personalities/comeback-kid.webp", imageAlt: "A determined fox returning to the keyboard with a triumphant fist", description: "A few stumbles, plenty of determination. Every great typist started somewhere." };
}
