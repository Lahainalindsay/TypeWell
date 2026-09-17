import { describe, expect, it, vi } from "vitest";
import { safeGet, safeRemove, safeSet } from "../src/storage/safeStorage";

describe("safe storage helpers", () => {
  it("does not throw when localStorage write fails", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(safeSet("x", "y")).toBe(false);
    spy.mockRestore();
  });

  it("returns null when localStorage read fails", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(safeGet("x")).toBeNull();
    spy.mockRestore();
  });

  it("removes keys safely", () => {
    safeSet("wpmtest.test", "1");
    expect(safeRemove("wpmtest.test")).toBe(true);
  });
});
