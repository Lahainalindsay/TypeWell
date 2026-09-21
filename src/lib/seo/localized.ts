import { absoluteUrl } from "./site";

export const typingTestLanguagePaths = {
  en: "/typing-test/",
  fr: "/fr/test-de-vitesse-de-frappe/",
  it: "/it/test-di-velocita-di-scrittura/",
  hi: "/hi/hindi-typing-test/"
} as const;

export const typingTestLanguageAlternates = {
  en: absoluteUrl(typingTestLanguagePaths.en),
  fr: absoluteUrl(typingTestLanguagePaths.fr),
  it: absoluteUrl(typingTestLanguagePaths.it),
  hi: absoluteUrl(typingTestLanguagePaths.hi),
  "x-default": absoluteUrl(typingTestLanguagePaths.en)
};
