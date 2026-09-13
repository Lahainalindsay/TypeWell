(() => {
  const q = (s, root = document) => root.querySelector(s);

  function upgradeNav() {
    const nav = q('.topbar nav');
    if (!nav || nav.dataset.twUpgrade) return;
    nav.dataset.twUpgrade = '1';
    const details = q('.more-tools', nav);
    const existing = Array.from(nav.querySelectorAll(':scope > a'));
    existing.forEach(a => a.remove());
    const links = [
      ['/typing-test/', 'Typing Test'],
      ['/typing-practice/', 'Practice'],
      ['/learn', 'Lessons'],
      ['/professionals/', 'Professionals'],
      ['/educators/', 'Educators']
    ];
    links.forEach(([href, label]) => {
      const a = document.createElement('a');
      a.href = href; a.textContent = label;
      if (location.pathname === href || (label === 'Typing Test' && location.pathname === '/')) a.className = 'active';
      nav.insertBefore(a, details || null);
    });
    if (details) {
      const summary = q('summary', details);
      if (summary) summary.textContent = 'More';
      const menu = q('div', details);
      if (menu) menu.innerHTML = `
        <a href="/rhythm">Rhythm Trainer</a>
        <a href="/typing-games/">Typing Games</a>
        <a href="/average-typing-speed/">Average Typing Speed</a>
        <a href="/wpm-calculator/">WPM Calculator</a>
        <a href="/progress">Progress</a>
        <a href="/settings">Settings</a>`;
    }
  }

  function addHomepageBand() {
    const home = q('.home');
    if (!home || q('.tw-home-feature-band', home)) return;
    const philosophy = q('.philosophy', home);
    const band = document.createElement('section');
    band.className = 'tw-home-feature-band';
    band.innerHTML = `
      <span class="tw-kicker">Build real keyboard skill</span>
      <h2>More ways to type better</h2>
      <p>Practice without a timer, learn touch typing step by step, or train job-specific keyboard skills with focused professional tests.</p>
      <div class="tw-feature-grid">
        <a class="tw-feature-card" href="/typing-practice/"><strong>Practice</strong><span>Open-ended words, custom text, weak keys, numbers, punctuation, code and accuracy drills.</span></a>
        <a class="tw-feature-card" href="/learn"><strong>Lessons</strong><span>Structured touch-typing lessons from home row through numbers, symbols and punctuation.</span></a>
        <a class="tw-feature-card" href="/professionals/"><strong>Professionals</strong><span>Data entry, 10-key, numeric keypad and job-specific typing practice for real work.</span></a>
        <a class="tw-feature-card" href="/rhythm"><strong>Rhythm Trainer</strong><span>Use the typing metronome to build a smoother, more repeatable cadence.</span></a>
        <a class="tw-feature-card" href="/typing-games/"><strong>Typing Games</strong><span>Build speed and accuracy with short, repeatable challenges. Racing modes are coming next.</span></a>
        <a class="tw-feature-card coming" href="/educators/"><strong>Educators · Coming Soon</strong><span>Classroom lessons, student progress, typing races, assignments and kids certificates.</span></a>
      </div>`;
    if (philosophy) home.insertBefore(band, philosophy);
    else home.appendChild(band);
  }

  function run() { upgradeNav(); addHomepageBand(); }
  run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
