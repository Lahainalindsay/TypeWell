import { absoluteUrl, SITE_NAME } from "./site";

export const publisher = {
  "@id": absoluteUrl("/#organization"), "@type": "Organization", name: SITE_NAME,
  url: absoluteUrl("/"), logo: absoluteUrl("/favicon.svg"),
  sameAs: ["https://github.com/Lahainalindsay/TypeWell"]
};
export const website = { "@id": absoluteUrl("/#website") };
export const author = { "@type": "Person", name: "Lindsay Johnson", url: absoluteUrl("/about/#lindsay-johnson") };

export const siteEntities = {
  "@context": "https://schema.org",
  "@graph": [
    publisher,
    { ...website, "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/"), publisher: { "@id": publisher["@id"] } }
  ]
};

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, url }, index) => ({
      "@type": "ListItem", position: index + 1, name, item: absoluteUrl(url)
    }))
  };
}
