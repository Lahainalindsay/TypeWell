import { absoluteUrl, SITE_NAME } from "./site";

export const publisher = {
  "@id": absoluteUrl("/#organization"), "@type": "Organization", name: SITE_NAME,
  url: absoluteUrl("/"), logo: absoluteUrl("/favicon.svg"),
  sameAs: ["https://github.com/Lahainalindsay/TypeWell"]
};
export const website = { "@id": absoluteUrl("/#website") };
const authorUrl = absoluteUrl("/about/#lindsay-johnson");
export const author = { "@id": authorUrl, "@type": "Person", name: "Lindsay Johnson", url: authorUrl };
export const authorProfile = {
  ...author,
  jobTitle: "Web Developer and WPMTest Creator",
  image: "https://avatars.githubusercontent.com/u/220595273?v=4&s=320",
  sameAs: ["https://github.com/Lahainalindsay"]
};

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
