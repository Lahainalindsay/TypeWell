(() => {
  const q = (s, root = document) => root.querySelector(s);

  function upgradeNav() {
    const nav = q('.topbar nav');
    if (!nav || nav.dataset.twWpmFocus) return;
    nav.dataset.twWpmFocus = '1';
    const details = q('.more-tools', nav);
    Array.from(nav.querySelectorAll(':scope > a')).forEach(a => a.remove());

    const links = [
      ['/typing-test/', 'Typing Tests'],
      ['/1-minute-typing-test/', '1 Minute Typing Test'],
      ['/5-minute-typing-test/', '5 Minute Typing Test'],
      ['/typing-certificate/', 'Typing Certificate']
    ];

    links.forEach(([href, label]) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      const path = location.pathname.replace(/\/$/, '') || '/';
      const target = href.replace(/\/$/, '') || '/';
      if (path === target || path.startsWith(target + '/')) a.className = 'active';
      nav.insertBefore(a, details || null);
    });

    if (details) {
      const summary = q('summary', details);
      if (summary) summary.textContent = 'More';
      const menu = q('div', details);
      if (menu) menu.innerHTML = `
        <a href="/wpm-calculator/">WPM Calculator</a>
        <a href="/average-typing-speed/">Average Typing Speed</a>
        <a href="/progress">Typing Progress</a>
        <a href="/settings">Settings</a>
        <a href="/typing-practice/">Improve Your Typing with Typewell</a>`;
    }
  }

  function removeHomepageBand() {
    document.querySelectorAll('.tw-home-feature-band').forEach(el => el.remove());
  }

  function refineHomepage() {
    const home = q('.home');
    if (!home) return;
    home.classList.remove('tw-free-online-typing');
    home.classList.add('tw-wpm-test-home');
  }

  /* React renders each prompt space as a non-breaking space so a character can receive its
     own status class. That prevents the browser from wrapping at word boundaries and was the
     real cause of the one endlessly clipped line. Keep one span per character, but turn only
     prompt NBSP characters back into ordinary spaces after render. The underlying target and
     keystroke scoring are unchanged. */
  function restoreTypingBreaks() {
    document.querySelectorAll('.typing-text span').forEach((span) => {
      if (span.textContent === '\u00a0') span.textContent = ' ';
    });
  }

  function run() {
    upgradeNav();
    removeHomepageBand();
    refineHomepage();
    restoreTypingBreaks();
  }

  run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
