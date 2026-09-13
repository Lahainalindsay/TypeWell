(() => {
  const q = (s, root = document) => root.querySelector(s);

  function upgradeNav() {
    const nav = q('.topbar nav');
    if (!nav || nav.dataset.twUpgrade) return;
    nav.dataset.twUpgrade = '1';
    const details = q('.more-tools', nav);
    Array.from(nav.querySelectorAll(':scope > a')).forEach(a => a.remove());

    const links = [
      ['/typing-test/', 'Typing Tests'],
      ['/typing-practice/', 'Typing Practice'],
      ['/learn', 'Learn Typing']
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
      if (summary) summary.textContent = 'More Typing Tools';
      const menu = q('div', details);
      if (menu) menu.innerHTML = `
        <a href="/average-typing-speed/">Average Typing Speed</a>
        <a href="/wpm-calculator/">WPM Calculator</a>
        <a href="/progress">Typing Progress</a>
        <a href="/settings">Typing Settings</a>`;
    }
  }

  function removeHomepageBand() {
    document.querySelectorAll('.tw-home-feature-band').forEach(el => el.remove());
  }

  function refineHomepage() {
    const home = q('.home');
    if (!home) return;
    home.classList.add('tw-free-online-typing');
  }

  function run() {
    upgradeNav();
    removeHomepageBand();
    refineHomepage();
  }

  run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
