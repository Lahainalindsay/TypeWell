(() => {
  const q = (s, root = document) => root.querySelector(s);
  const promptStates = new WeakMap();

  function removeHomepageBand() {
    document.querySelectorAll('.tw-home-feature-band, .tw-career-entry-card').forEach(el => el.remove());
  }

  function refineHomepage() {
    const home = q('.home');
    if (!home) return;
    home.classList.remove('tw-free-online-typing');
    home.classList.add('tw-wpm-test-home');
  }

  function sourceCharacters(source) {
    return Array.from(source.children)
      .filter((node) => node instanceof HTMLElement && !node.classList.contains('edge-fade'))
      .map((node) => node.textContent === '\u00a0' ? ' ' : (node.textContent || ''));
  }

  function findPromptStart(state, chars, hasLeadingFade) {
    if (!hasLeadingFade || !state.cache.length) return 0;
    const from = Math.max(0, state.start - 3);
    const to = Math.min(state.cache.length, state.start + 8);
    let bestStart = state.start;
    let bestScore = -1;
    for (let candidate = from; candidate <= to; candidate += 1) {
      let score = 0;
      const sample = Math.min(28, chars.length);
      for (let i = 0; i < sample; i += 1) {
        if (state.cache[candidate + i] === chars[i]) score += 1;
        else if (state.cache[candidate + i] !== undefined) break;
      }
      if (score > bestScore) {
        bestScore = score;
        bestStart = candidate;
      }
    }
    return bestStart;
  }

  function renderStablePrompt(source) {
    if (!(source instanceof HTMLElement) || source.classList.contains('numeric-prompt')) return;
    let state = promptStates.get(source);
    if (!state) {
      const overlay = document.createElement('div');
      overlay.className = 'typing-text tw-stable-typing-window';
      overlay.tabIndex = 0;
      overlay.setAttribute('role', 'textbox');
      overlay.setAttribute('aria-label', source.getAttribute('aria-label') || 'Typing prompt. Start typing to begin.');
      source.classList.add('tw-original-typing-source');
      source.setAttribute('aria-hidden', 'true');
      source.tabIndex = -1;
      source.insertAdjacentElement('afterend', overlay);
      overlay.addEventListener('click', () => source.click());
      overlay.addEventListener('focus', () => source.click());
      state = { overlay, cache: [], status: [], start: 0, index: 0 };
      promptStates.set(source, state);
    }

    const overlay = state.overlay;
    const sourceSpans = Array.from(source.children).filter((node) => node instanceof HTMLElement && !node.classList.contains('edge-fade'));
    const chars = sourceCharacters(source);
    if (!chars.length) return;
    const hasLeadingFade = Boolean(source.firstElementChild?.classList.contains('edge-fade'));
    const start = findPromptStart(state, chars, hasLeadingFade);
    state.start = start;

    sourceSpans.forEach((span, i) => {
      const absolute = start + i;
      state.cache[absolute] = chars[i];
      if (span.classList.contains('correct')) state.status[absolute] = 'correct';
      else if (span.classList.contains('incorrect')) state.status[absolute] = 'incorrect';
    });

    const relativeCurrent = sourceSpans.findIndex((span) => span.classList.contains('current'));
    if (relativeCurrent >= 0) state.index = start + relativeCurrent;
    else if (!hasLeadingFade) state.index = 0;

    const sourceStyle = getComputedStyle(source);
    overlay.style.fontSize = sourceStyle.fontSize;
    overlay.style.lineHeight = sourceStyle.lineHeight;
    overlay.style.letterSpacing = sourceStyle.letterSpacing;

    const fragment = document.createDocumentFragment();
    state.cache.forEach((char, absolute) => {
      if (char === undefined) return;
      const span = document.createElement('span');
      const status = absolute < state.index ? (state.status[absolute] || 'correct') : 'pending';
      span.className = `${status}${absolute === state.index ? ' current' : ''}`;
      span.textContent = char;
      if (absolute === state.index) span.dataset.twCurrent = '1';
      fragment.appendChild(span);
    });
    overlay.replaceChildren(fragment);

    const overlayStyle = getComputedStyle(overlay);
    const lineHeight = parseFloat(overlayStyle.lineHeight) || 40;
    const verticalPadding = parseFloat(overlayStyle.paddingTop) + parseFloat(overlayStyle.paddingBottom);
    overlay.style.setProperty('--tw-window-height', `${Math.ceil(lineHeight * 3 + verticalPadding + 2)}px`);
    const current = overlay.querySelector('[data-tw-current="1"]');
    if (!(current instanceof HTMLElement) || state.index === 0) {
      overlay.scrollTop = 0;
      return;
    }
    const lineTop = current.offsetTop;
    const usableBottom = overlay.scrollTop + overlay.clientHeight - parseFloat(overlayStyle.paddingBottom);
    if (lineTop + lineHeight > usableBottom - lineHeight * 0.2) {
      const desired = Math.max(0, lineTop - lineHeight);
      overlay.scrollTop = Math.max(0, Math.round(desired / lineHeight) * lineHeight);
    } else if (lineTop < overlay.scrollTop) {
      overlay.scrollTop = Math.max(0, Math.floor(lineTop / lineHeight) * lineHeight);
    }
  }

  function stabilizeTypingPrompts() {
    document.querySelectorAll('.typing-text:not(.numeric-prompt):not(.tw-stable-typing-window)').forEach(renderStablePrompt);
  }

  function restoreTypingBreaks() {
    document.querySelectorAll('.tw-original-typing-source span').forEach((span) => {
      if (span.textContent === '\u00a0') span.textContent = ' ';
    });
  }

  function run() {
    removeHomepageBand();
    refineHomepage();
    restoreTypingBreaks();
    stabilizeTypingPrompts();
  }

  document.addEventListener('keydown', () => requestAnimationFrame(() => {
    restoreTypingBreaks();
    stabilizeTypingPrompts();
  }), true);
  window.addEventListener('resize', () => requestAnimationFrame(stabilizeTypingPrompts));

  function startAfterHydration() {
    run();
    new MutationObserver((mutations) => {
      const onlyStableWindowChanges = mutations.every((mutation) =>
        mutation.target instanceof Element && mutation.target.closest('.tw-stable-typing-window')
      );
      if (!onlyStableWindowChanges) run();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'complete') {
    window.setTimeout(startAfterHydration, 1200);
  } else {
    window.addEventListener('load', () => window.setTimeout(startAfterHydration, 1200), { once: true });
  }
})();
