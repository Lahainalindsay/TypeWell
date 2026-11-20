import { useEffect, type RefObject } from "react";

/** Fit the passage and real input into the space above the software keyboard.
 * Run on focus/viewport changes, never on keystrokes or ordinary page scrolling.
 */
export function useTypingViewport(ref: RefObject<HTMLTextAreaElement | HTMLInputElement | null>) {
  useEffect(() => {
    const input = ref.current;
    if (!input) return;
    let frame = 0;
    let settle = 0;
    const viewport = window.visualViewport;
    const prompt = input.parentElement?.querySelector<HTMLElement>("[data-typing-prompt]");
    function followCharacter() {
      const current = prompt?.querySelector<HTMLElement>(".current, [data-typing-current='true']");
      if (!prompt || !current) return;
      const box = prompt.getBoundingClientRect(), caret = current.getBoundingClientRect();
      if (caret.bottom > box.bottom - 12) prompt.scrollTop += caret.bottom - box.bottom + 24;
      else if (caret.top < box.top + 12) prompt.scrollTop -= box.top + 12 - caret.top;
    }
    const observer = new MutationObserver(followCharacter);
    if (prompt) observer.observe(prompt, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "data-typing-current"] });
    function fit() {
      if (!input || document.activeElement !== input || !window.matchMedia("(max-width: 900px), (pointer: coarse)").matches) return;
      const height = viewport?.height ?? window.innerHeight;
      const top = viewport?.offsetTop ?? 0;
      // Keep room for the input and browser chrome, including landscape phones.
      prompt?.style.setProperty("--typing-visible-height", `${Math.max(60, Math.min(180, height - 130))}px`);
      followCharacter();
      const field = input.getBoundingClientRect();
      const passage = prompt?.getBoundingClientRect();
      const start = passage?.top ?? field.top;
      const bottom = Math.max(field.bottom, passage?.bottom ?? field.bottom);
      const available = height - 24;
      let delta = 0;
      if (bottom - start <= available && start < top + 12) delta = start - top - 12;
      else if (bottom > top + height - 12) delta = bottom - top - height + 12;
      if (Math.abs(delta) > 1) window.scrollBy({ top: delta, behavior: "instant" });
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); }
    function focus() {
      schedule();
      // Some keyboards finish their animation without a final resize event.
      window.clearTimeout(settle);
      settle = window.setTimeout(schedule, 350);
    }
    function blur() { prompt?.style.removeProperty("--typing-visible-height"); window.clearTimeout(settle); }
    input.addEventListener("focus", focus);
    input.addEventListener("blur", blur);
    viewport?.addEventListener("resize", schedule);
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame); window.clearTimeout(settle);
      input.removeEventListener("focus", focus); input.removeEventListener("blur", blur);
      viewport?.removeEventListener("resize", schedule); window.removeEventListener("resize", schedule);
      prompt?.style.removeProperty("--typing-visible-height");
    };
  }, [ref]);
}
