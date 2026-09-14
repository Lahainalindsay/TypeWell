export interface SeoPage {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  content: string[];
  related: Array<{ href: string; label: string }>;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wpmtest.app";

export const seoPages: SeoPage[] = [
  {
    path: "/data-entry-typing-test/",
    title: "Data Entry Typing Test & Practice for Employment | WPMTest",
    description: "Practice realistic data entry with names, addresses, dates, amounts, IDs, codes and numbers. Prepare for employment tests and measure accuracy, WPM and KPH.",
    h1: "Data Entry Typing Test & Practice",
    intro: "Practice the keyboard skills used in professional data-entry work, then measure your performance with realistic mixed records.",
    content: [
      "Data-entry work requires more than fast paragraph typing. Accurate entry can involve names, addresses, dates, phone numbers, currency, invoice numbers, account IDs, ZIP codes, product codes and other structured fields.",
      "Use focused practice for alphanumeric records, numeric entry, 10-key, currency, dates and verification. Structured practice rewards exact values, including leading zeroes, decimals, punctuation, hyphens and capitalization.",
      "For employment preparation, compare speed with accuracy instead of chasing one number. WPM is useful for text, while KPH is useful for keystroke-heavy numeric and data-entry work.",
      "WPMTest results and certificates document performance on this site; they are not an accredited professional certification or a guarantee that an employer will accept a particular score."
    ],
    related: [
      { href: "/10-key-typing-test/", label: "10-Key Test" },
      { href: "/numeric-keypad-test/", label: "Numeric Keypad Test" },
      { href: "/kph-typing-test/", label: "KPH Test" },
      { href: "/typing-test-for-employment/", label: "Employment Typing Test" }
    ]
  }
];

export function getSeoPage(path: string): SeoPage | undefined {
  const canonical = path === "/" ? "/" : `${path.replace(/\/$/, "")}/`;
  return seoPages.find((page) => page.path === canonical);
}
