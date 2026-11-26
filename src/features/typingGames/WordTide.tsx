import { useEffect, useReducer, useRef, useState } from "react";
import { safeGet, safeSet } from "../../storage/safeStorage";
import { distanceToShore, initialGame, laneCount, shuffledWords, waveAt, wordTideReducer } from "./wordTideGame";
import styles from "./WordTide.module.css";

const bestKey = "wpmtest:word-tide-best";

export function WordTide() {
  const [game, dispatch] = useReducer(wordTideReducer, initialGame);
  const [savedBest, setSavedBest] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const { status, score, streak, lives, elapsed } = game;
  const playing = status === "playing";
  const best = Math.max(savedBest, score);

  useEffect(() => {
    const stored = Number(safeGet(bestKey));
    if (Number.isSafeInteger(stored) && stored > 0) setSavedBest(stored);
  }, []);

  useEffect(() => {
    if (score > savedBest) {
      safeSet(bestKey, String(score));
      setSavedBest(score);
    }
  }, [score, savedBest]);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      dispatch({ type: "tick", milliseconds: now - last });
      last = now;
    }, 80);
    function pauseInBackground() {
      if (document.hidden) dispatch({ type: "pause" });
    }
    document.addEventListener("visibilitychange", pauseInBackground);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", pauseInBackground);
    };
  }, [playing]);

  function handlePlayButton() {
    if (playing) {
      dispatch({ type: "pause" });
      return;
    }
    dispatch(status === "paused" ? { type: "resume" } : { type: "start", deck: shuffledWords() });
    input.current?.focus({ preventScroll: true });
  }

  return (
    <section className={styles.game} aria-labelledby="word-tide-title">
      <header className={styles.header}>
        <h2 id="word-tide-title">Word Tide</h2>
        <p id="word-tide-rules">Type a word to clear it before it reaches the shore. The tide speeds up every wave. Clear words in a row for bonus points.</p>
      </header>
      <dl className={styles.stats}>
        <div><dt>Score</dt><dd>{score}</dd></div>
        <div><dt>Best</dt><dd>{best}</dd></div>
        <div><dt>Wave</dt><dd>{waveAt(elapsed)}</dd></div>
        <div><dt>Streak</dt><dd>{streak}</dd></div>
        <div><dt>Lives</dt><dd>{lives}</dd></div>
      </dl>
      <div className={styles.controls}>
        <button type="button" onClick={handlePlayButton}>
          {playing ? "Pause" : status === "paused" ? "Resume" : status === "over" ? "Play again" : "Start game"}
        </button>
        <input
          ref={input}
          type="text"
          aria-label="Type a Word Tide word"
          aria-describedby="word-tide-rules"
          placeholder="Type a word"
          value={game.input}
          maxLength={12}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          onChange={event => dispatch({ type: "type", value: event.target.value })}
          onPaste={event => event.preventDefault()}
          onDrop={event => event.preventDefault()}
          onKeyDown={event => {
            if (playing && event.key === "Escape") {
              event.preventDefault();
              dispatch({ type: "pause" });
            }
          }}
        />
      </div>
      <div className={styles.board}>
        <div className={styles.shore} aria-hidden="true">Shore</div>
        <ul className={styles.lanes} aria-label="Words moving toward shore">
          {Array.from({ length: laneCount }, (_, lane) => {
            const word = game.active.find(item => item.lane === lane);
            if (!word || status === "over") return <li key={lane} aria-hidden="true" />;
            const distance = distanceToShore(word, elapsed);
            const matching = game.input.length > 0 && word.text.startsWith(game.input);
            return (
              <li key={lane}>
                <div className={styles.word} data-near={distance >= 0.75} data-match={matching}>
                  <span className={styles.slide} style={{ left: `${distance * 100}%`, translate: `${-distance * 100}% -50%` }}>
                    {word.text}
                    {distance >= 0.75 && <span className={styles.urgency}>Near shore</span>}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.status} role="status">
          {status === "paused" && <span>Paused</span>}
          {status === "over" && <span>Game over · {score} points · Wave {waveAt(elapsed)}</span>}
        </div>
      </div>
    </section>
  );
}
