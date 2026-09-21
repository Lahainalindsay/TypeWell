import { describe, expect, it } from "vitest";
import { keysFromTextInput } from "../src/engine/textInput";

describe("mobile text input normalization", () => {
  it("converts inserted mobile text into individual keystrokes", () => {
    expect(keysFromTextInput("insertText", "abc")).toEqual(["a", "b", "c"]);
  });

  it("converts virtual-keyboard deletion into a backspace", () => {
    expect(keysFromTextInput("deleteContentBackward", null)).toEqual(["Backspace"]);
  });

  it("treats a mobile return as a space for continuous typing passages", () => {
    expect(keysFromTextInput("insertLineBreak", "\n")).toEqual([" "]);
  });

  it("keeps composed Devanagari input in grapheme clusters", () => {
    expect(keysFromTextInput("insertCompositionText", "कि")).toEqual(["कि"]);
  });
});
