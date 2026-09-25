"use client";

import { useEffect, useRef } from "react";
import { typingTestLanguagePaths } from "../lib/seo/localized";

const groups = [
  { label: "Tests", sections: [
    { title: "Standard tests", links: [["/typing-test/", "Standard Typing Test"], ["/1-minute-typing-test/", "1 Minute Test"], ["/3-minute-typing-test/", "3 Minute Test"], ["/5-minute-typing-test/", "5 Minute Test"], ["/10-minute-typing-test/", "10 Minute Test"]] },
    { title: "Specialized tests", links: [["/1-page-typing-test/", "Page Typing Tests"], ["/typing-test-with-numbers/", "Numbers Test"], ["/typing-test-with-punctuation/", "Punctuation Test"], ["/mobile-typing-test/", "Mobile Typing Test"]] }
  ] },
  { label: "Professional", sections: [
    { title: "Professional tests", links: [["/typing-test-for-employment/", "Employment Typing Test"], ["/data-entry-typing-test/", "Data Entry Typing Test"], ["/10-key-typing-test/", "10-Key Typing Test"], ["/kph-typing-test/", "KPH Typing Test"]] },
    { title: "Data entry practice", links: [["/data-entry-practice/alphanumeric/", "Alphanumeric"], ["/data-entry-practice/names-addresses/", "Names & Addresses"], ["/data-entry-practice/currency-dates/", "Currency & Dates"], ["/data-entry-practice/invoices-orders/", "Invoices & Orders"]] }
  ], hub: ["/professionals/", "Explore all professional skills"] },
  { label: "Practice", sections: [
    { title: "Build your skills", links: [["/typing-practice/", "Typing Practice"], ["/learn/", "Touch Typing Lessons"], ["/practice/weak-keys/", "Weak-Key Practice"], ["/rhythm/", "Rhythm Trainer"], ["/progress/", "Progress"]] }
  ] },
  { label: "Languages", sections: [
    { title: "Typing test language", links: [[typingTestLanguagePaths.en, "English"], [typingTestLanguagePaths.fr, "Français"], [typingTestLanguagePaths.it, "Italiano"], [typingTestLanguagePaths.hi, "हिन्दी"], [typingTestLanguagePaths.es, "Español"], [typingTestLanguagePaths.de, "Deutsch"], [typingTestLanguagePaths.pt, "Português (Brasil)"], [typingTestLanguagePaths.ru, "Русский"]] }
  ] }
] as const;

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event.type === "pointerdown" && header.current?.contains(event.target as Node)) return;
      header.current?.querySelectorAll("details[open]").forEach((item) => item.removeAttribute("open"));
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", close); };
  }, []);
  return <header className="site-header" ref={header}>
    <div className="site-header-inner">
      <a className="site-brand" href="/" aria-label="WPMTest home">WPMTEST<span>.</span></a>
      <details className="site-mobile-toggle">
        <summary>Menu <span aria-hidden="true">☰</span></summary>
        <nav className="site-navigation" aria-label="Primary navigation">
          {groups.map((group) => <details className="site-menu" key={group.label} onToggle={(event) => {
            if (!event.currentTarget.open) return;
            header.current?.querySelectorAll(".site-menu[open]").forEach((item) => { if (item !== event.currentTarget) item.removeAttribute("open"); });
          }}>
            <summary>{group.label}</summary>
            <div className="site-menu-panel">
              {group.sections.map((section) => <div className="site-menu-section" key={section.title}>
                <strong>{section.title}</strong>
                {section.links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
              </div>)}
              {"hub" in group && <a className="site-menu-hub" href={group.hub[0]}>{group.hub[1]} →</a>}
            </div>
          </details>)}
          <a className="site-articles" href="/blog/">Articles</a>
        </nav>
      </details>
    </div>
  </header>;
}

function CookieSettings() {
  return <button type="button" className="site-cookie-button" onClick={() => {
    const consent = window as Window & { googlefc?: { showRevocationMessage?: () => void }; __tcfapi?: (command: string, version: number, callback: () => void) => void };
    if (consent.googlefc?.showRevocationMessage) consent.googlefc.showRevocationMessage();
    else if (consent.__tcfapi) consent.__tcfapi("displayConsentUi", 2, () => {});
    else window.location.href = "/privacy/";
  }}>Cookie Settings</button>;
}

export function SiteFooter() {
  const columns = [
    ["Tests", ["/typing-test/", "Standard Test"], ["/1-minute-typing-test/", "1 Minute Test"], ["/3-minute-typing-test/", "3 Minute Test"], ["/5-minute-typing-test/", "5 Minute Test"], ["/1-page-typing-test/", "Page Tests"], ["/mobile-typing-test/", "Mobile Test"]],
    ["Practice", ["/typing-practice/", "Typing Practice"], ["/learn/", "Lessons"], ["/practice/weak-keys/", "Weak Keys"], ["/rhythm/", "Rhythm"], ["/progress/", "Progress"]],
    ["Professional", ["/professionals/", "Professional Hub"], ["/data-entry-typing-test/", "Data Entry Test"], ["/data-entry-practice/", "Data Entry Practice"], ["/10-key-typing-test/", "10-Key Test"], ["/kph-typing-test/", "KPH Test"]],
    ["Resources", ["/blog/", "Articles"], ["/wpm-calculator/", "WPM Calculator"], ["/average-typing-speed/", "Average Speed"], ["/typing-certificate/", "Certificate"], ["/certificate/sample/", "Sample Certificate"], ["/educators/", "Educators"], ["/typing-test-for-students/", "Students"]],
    ["Languages", [typingTestLanguagePaths.fr, "Français"], [typingTestLanguagePaths.it, "Italiano"], [typingTestLanguagePaths.hi, "हिन्दी"], [typingTestLanguagePaths.es, "Español"], [typingTestLanguagePaths.de, "Deutsch"], [typingTestLanguagePaths.pt, "Português"], [typingTestLanguagePaths.ru, "Русский"]],
    ["Company", ["/about/", "About"], ["/contact/", "Contact"], ["/privacy/", "Privacy"], ["/terms/", "Terms"], ["/settings/", "Settings"]]
  ] as const;
  return <footer className="site-footer site-footer-grid">
    <div className="site-footer-intro"><strong>WPMTEST.</strong><p>Free typing tests and practical keyboard skills. Progress stays on your device.</p></div>
    <div className="site-footer-columns">{columns.map(([title, ...links]) => <nav aria-label={`${title} links`} key={title}><strong>{title}</strong>{links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>)}</div>
    <div className="site-footer-bottom"><span>© {new Date().getUTCFullYear()} WPMTest</span><CookieSettings /></div>
  </footer>;
}
