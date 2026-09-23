import { absoluteUrl } from "./site";

export const typingTestLanguagePaths = {
  en: "/typing-test/",
  fr: "/fr/test-de-vitesse-de-frappe/",
  it: "/it/test-di-velocita-di-scrittura/",
  hi: "/hi/hindi-typing-test/",
  es: "/es/prueba-de-velocidad-de-escritura/",
  de: "/de/schreibtest/",
  pt: "/pt/teste-de-digitacao/",
  ru: "/ru/test-skorosti-pechati/"
} as const;

export const typingTestLanguageAlternates = {
  en: absoluteUrl(typingTestLanguagePaths.en),
  fr: absoluteUrl(typingTestLanguagePaths.fr),
  it: absoluteUrl(typingTestLanguagePaths.it),
  hi: absoluteUrl(typingTestLanguagePaths.hi),
  es: absoluteUrl(typingTestLanguagePaths.es),
  de: absoluteUrl(typingTestLanguagePaths.de),
  "pt-BR": absoluteUrl(typingTestLanguagePaths.pt),
  ru: absoluteUrl(typingTestLanguagePaths.ru),
  "x-default": absoluteUrl(typingTestLanguagePaths.en)
};
