import type { Metadata } from "next";
import type { LocalizedTypingContent } from "./content";
import { absoluteUrl, SITE_NAME } from "../../lib/seo/site";
import { typingTestLanguageAlternates } from "../../lib/seo/localized";

export function localizedTypingMetadata(content: LocalizedTypingContent): Metadata {
  const canonical = absoluteUrl(content.path);
  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical,
      languages: typingTestLanguageAlternates
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: content.locale.replace("-", "_"),
      images: [{ url: absoluteUrl("/og-default.svg"), width: 1200, height: 630, alt: content.h1 }]
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [absoluteUrl("/og-default.svg")]
    }
  };
}

export function localizedTypingSchema(content: LocalizedTypingContent) {
  const url = absoluteUrl(content.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: content.h1,
        description: content.description,
        url,
        inLanguage: content.locale,
        isAccessibleForFree: true,
        publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") }
      },
      {
        "@type": "WebApplication",
        name: content.h1,
        description: content.description,
        url,
        inLanguage: content.locale,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern browser with Unicode text input",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: ({ hi: "INR", pt: "BRL", ru: "RUB" } as Record<string, string>)[content.lang] ?? "EUR" }
      },
      {
        "@type": "FAQPage",
        inLanguage: content.locale,
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: content.h1, item: url }
        ]
      }
    ]
  };
}
