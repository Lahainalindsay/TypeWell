import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

function collectDedicatedPageRoutes(root: string) {
  const routes: string[] = [];

  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.name !== "page.tsx") continue;

      const rel = relative(root, full).split(sep).join("/");
      if (rel === "[[...slug]]/page.tsx") continue;

      const route = `/${rel.replace(/\/page\.tsx$/, "")}/`
        .replace(/\/index\/$/, "/")
        .replace(/\/+/g, "/");
      routes.push(route);
    }
  }

  walk(root);
  return routes.sort();
}

describe("route ownership", () => {
  it("keeps every dedicated Next page out of the legacy catch-all", () => {
    const appRoot = join(process.cwd(), "app");
    const catchAll = readFileSync(join(appRoot, "[[...slug]]", "page.tsx"), "utf8");

    const declared = [...catchAll.matchAll(/"([^"]+\/)"[,\n]/g)]
      .map((match) => match[1])
      .filter((route) => route.startsWith("/"));

    const dedicatedRoutesBlock = catchAll.match(
      /const dedicatedRoutes = new Set\(\[(.*?)\]\);/s
    )?.[1] ?? "";

    const owned = [...dedicatedRoutesBlock.matchAll(/"([^"]+)"/g)]
      .map((match) => match[1])
      .sort();

    const actual = collectDedicatedPageRoutes(appRoot);

    expect(owned).toEqual(actual);
    expect(new Set(declared).size).toBeGreaterThanOrEqual(actual.length);
  });
});
