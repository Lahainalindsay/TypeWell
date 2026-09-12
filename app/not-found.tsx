export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="panel">
        <p className="eyebrow">404</p>
        <h1>That page couldn't be found.</h1>
        <p>Use one of these typing tools instead.</p>
        <nav className="link-grid compact-links" aria-label="404 recovery links">
          <a href="/"><strong>Typing Test</strong><span>Check your WPM and accuracy.</span></a>
          <a href="/typing-practice/"><strong>Typing Practice</strong><span>Practice words, weak keys, and custom text.</span></a>
          <a href="/data-entry-typing-test/"><strong>Data Entry Test</strong><span>Practice records and mixed data.</span></a>
          <a href="/10-key-typing-test/"><strong>10-Key Test</strong><span>Practice numeric keypad speed.</span></a>
          <a href="/wpm-calculator/"><strong>WPM Calculator</strong><span>Calculate words per minute.</span></a>
        </nav>
      </section>
    </main>
  );
}
