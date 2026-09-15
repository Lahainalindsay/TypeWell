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
      ['/data-entry-typing-test/', 'Data Entry'],
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
        <a href="/data-entry-typing-test/">Data Entry Typing Test</a>
        <a href="/10-key-typing-test/">10-Key Typing Test</a>
        <a href="/typing-test-for-employment/">Employment Typing Tests</a>
        <a href="/certificate/sample/">View Sample Certificate</a>
        <a href="/blog/">Typing & Career Guides</a>
        <a href="/wpm-calculator/">WPM Calculator</a>
        <a href="/average-typing-speed/">Average Typing Speed</a>
        <a href="/progress">Typing Progress</a>
        <a href="/settings">Settings</a>
        <a href="/typing-practice/">Improve Your Typing with WPMTest</a>`;
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

    if (!q('.tw-career-entry-card', home)) {
      const card = document.createElement('section');
      card.className = 'tw-career-entry-card panel';
      card.setAttribute('aria-label', 'Employment typing assessments');
      card.innerHTML = `
        <p class="eyebrow">JOB SKILLS</p>
        <h2>Data Entry Typing Test</h2>
        <p>Practice realistic records, order IDs, dates, amounts, ZIP codes and mixed alphanumeric fields, then measure your accuracy.</p>
        <div class="actions">
          <a class="button primary" href="/data-entry-typing-test/">Take the Data Entry Test</a>
          <a class="button" href="/blog/data-entry-typing-test-for-employment/">How Data Entry Tests Work</a>
          <a class="button" href="/typing-test-for-employment/">Employment Tests</a>
        </div>`;
      const hero = q('.hero', home);
      if (hero && hero.nextSibling) home.insertBefore(card, hero.nextSibling);
      else home.appendChild(card);
    }
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

  function upgradeLegalFooter() {
    document.querySelectorAll('.site-footer').forEach((footer) => {
      if (footer.dataset.twLegalFooter) return;
      footer.dataset.twLegalFooter = '1';
      const nav = q('nav', footer) || footer.appendChild(document.createElement('nav'));
      nav.setAttribute('aria-label', 'Legal and privacy');
      nav.innerHTML = `
        <a href="/terms/">Terms of Service</a>
        <a href="/privacy/">Privacy Policy</a>
        <button type="button" class="tw-cookie-settings">Cookie Settings</button>`;
      const button = q('.tw-cookie-settings', nav);
      if (button) button.addEventListener('click', () => {
        /* Google Funding Choices exposes this API when its privacy/CMP script is available. */
        if (window.googlefc && typeof window.googlefc.showRevocationMessage === 'function') {
          window.googlefc.showRevocationMessage();
          return;
        }
        if (window.__tcfapi) {
          window.__tcfapi('displayConsentUi', 2, () => {});
          return;
        }
        window.location.href = '/privacy/';
      });
    });
  }

  function run() {
    upgradeNav();
    removeHomepageBand();
    refineHomepage();
    restoreTypingBreaks();
    upgradeLegalFooter();
  }

  run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
