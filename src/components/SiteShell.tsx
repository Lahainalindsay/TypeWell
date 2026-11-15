"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { loadProgress, saveProgress } from "../storage/progress";
import { resolveTheme, THEME_EVENT, type ThemePreference } from "../lib/theme";
import { articlesLink, footerColumns, navigationGroups } from "./siteNavigation";

const themeOrder: ThemePreference[] = ["system", "light", "dark"];
const themeIcon = { system: Monitor, light: Sun, dark: Moon } as const;
const themeLabel = { system: "System theme", light: "Light theme", dark: "Dark theme" } as const;

function ThemeToggle() {
  const [pref, setPref] = useState<ThemePreference>("system");
  useEffect(() => {
    const sync = () => {
      const value = loadProgress().settings.theme;
      const next = themeOrder.includes(value) ? value : "system";
      setPref(next);
      document.documentElement.dataset.theme = resolveTheme(next);
    };
    sync();
    window.addEventListener(THEME_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(THEME_EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);
  useEffect(() => {
    if (pref !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const apply = () => { document.documentElement.dataset.theme = resolveTheme("system"); };
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [pref]);
  const Icon = themeIcon[pref];
  return <button type="button" className="site-theme-toggle"
    aria-label={`Theme: ${themeLabel[pref]}. Click to change.`} title={themeLabel[pref]}
    onClick={() => {
      const next = themeOrder[(themeOrder.indexOf(pref) + 1) % themeOrder.length];
      document.documentElement.dataset.theme = resolveTheme(next);
      const progress = loadProgress();
      saveProgress({ ...progress, settings: { ...progress.settings, theme: next } });
      setPref(next);
      window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
    }}><Icon size={18} aria-hidden="true" /></button>;
}

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event.type === "pointerdown" && header.current?.contains(event.target as Node)) return;
      const active = document.activeElement;
      if (event instanceof KeyboardEvent && active instanceof HTMLElement) {
        const menu = active.closest<HTMLDetailsElement>(".site-menu[open]");
        if (mobileToggle.current?.getAttribute("aria-expanded") === "true" && header.current?.contains(active)) {
          mobileToggle.current.focus();
        } else {
          menu?.querySelector("summary")?.focus();
        }
      }
      header.current?.querySelectorAll("details[open]").forEach((item) => item.removeAttribute("open"));
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", close); };
  }, []);
  return <header lang="en" className="site-header" ref={header}>
    <div className="site-header-inner">
      <a className="site-brand" href="/" aria-label="WPMTest home">WPMTEST<span>.</span></a>
      <div className="site-header-actions"><a className="site-mobile-articles" href={articlesLink[0]}>{articlesLink[1]}</a><ThemeToggle />
      <button type="button" className="site-mobile-toggle" ref={mobileToggle} aria-controls="site-navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>Menu <span aria-hidden="true">☰</span></button></div>
        <nav id="site-navigation" className="site-navigation" data-open={mobileOpen} aria-label="Primary navigation">
          {navigationGroups.map((group) => <details className="site-menu" key={group.label} onToggle={(event) => {
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
          <a className="site-articles" href={articlesLink[0]}>{articlesLink[1]}</a>
        </nav>
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
  return <footer lang="en" className="site-footer site-footer-grid">
    <div className="site-footer-intro"><strong>WPMTEST.</strong><p>Free typing tests and practical keyboard skills. Progress stays on your device.</p></div>
    <div className="site-footer-columns">{footerColumns.map(([title, ...links]) => <nav aria-label={`${title} links`} key={title}><strong>{title}</strong>{links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>)}</div>
    <div className="site-footer-bottom"><span>© {new Date().getUTCFullYear()} WPMTest</span><CookieSettings /></div>
  </footer>;
}
