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
});
