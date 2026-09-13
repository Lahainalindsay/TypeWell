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
      if (summary) summary.textContent = 'More WPM Tools';
      const menu = q('div', details);
      if (menu) menu.innerHTML = `
        <a href="/3-minute-typing-test/">3 Minute Typing Test</a>
        <a href="/10-minute-typing-test/">10 Minute Typing Test</a>
        <a href="/data-entry-typing-test/">Data Entry Typing Test</a>
        <a href="/10-key-typing-test/">10-Key Typing Test</a>
        <a href="/numeric-keypad-test/">Numeric Keypad Test</a>
        <a href="/kph-typing-test/">KPH Typing Test</a>
        <a href="/wpm-calculator/">WPM Calculator</a>
        <a href="/average-typing-speed/">Average Typing Speed</a>
        <a href="/typing-practice/">Improve Typing with Typewell</a>`;
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

  function run() {
    upgradeNav();
    removeHomepageBand();
    refineHomepage();
  }

  run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
