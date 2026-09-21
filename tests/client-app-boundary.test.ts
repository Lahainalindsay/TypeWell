import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("client app hydration boundary", () => {
  it("keeps the interactive app server-renderable on catch-all routes", () => {
    const wrapper = readFileSync(resolve("src/ClientApp.tsx"), "utf8");
    const route = readFileSync(resolve("app/[[...slug]]/page.tsx"), "utf8");

    expect(wrapper).not.toContain('ssr: false');
    expect(wrapper).toContain('import WPMTestApp from "./App"');
    expect(route).toContain('from "../../src/ClientApp"');
  });

  it("does not nest main landmarks when the app is embedded", () => {
    const app = readFileSync(resolve("src/App.tsx"), "utf8");

    expect(app).toContain('const ContentLandmark = embedded ? "div" : "main"');
    expect(app).toContain('<ContentLandmark className="app-content">');
    expect(app).not.toContain("<main>");
  });

  it("gives interactive selects and custom text an accessible name", () => {
    const app = readFileSync(resolve("src/App.tsx"), "utf8");

    expect(app).toContain('aria-label="Rhythm practice mode"');
    expect(app).toContain('aria-label="Color theme"');
    expect(app).toContain('aria-label="Practice text type"');
    expect(app).toContain('aria-label="Custom practice text"');
  });

  it("uses editable mobile input capture instead of a read-only keyboard trap", () => {
    const app = readFileSync(resolve("src/App.tsx"), "utf8");
    const styles = readFileSync(resolve("src/styles.css"), "utf8");

    expect(app).toContain('className="typing-capture-input"');
    expect(app).toContain("onBeforeInput={onBeforeInput}");
    expect(app).toContain("Touchscreen mode measures speed");
    expect(app).not.toContain('className="typing-capture-input" value="" readOnly');
    expect(styles).toContain(".typing-capture-input");
    expect(styles).toContain(".mobile-typing-note");
  });

  it("keeps sitewide AdSense loading after hydration with an early connection hint", () => {
    const layout = readFileSync(resolve("app/layout.tsx"), "utf8");

    expect(layout).toContain("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
    expect(layout).toContain('strategy="afterInteractive"');
    expect(layout).toContain('rel="preconnect" href="https://pagead2.googlesyndication.com"');
    expect(layout).toContain('crossOrigin="anonymous"');
  });
});
