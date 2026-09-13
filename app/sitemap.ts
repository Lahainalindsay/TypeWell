import type { MetadataRoute } from "next";
import { seoPages, SITE_URL } from "../src/seo/pages";

export const dynamic = "force-static";

const additionalIndexableRoutes = [
  "/learn",
  "/learn/home-row",
  "/learn/top-row",
  "/learn/bottom-row",
  "/learn/capital-letters",
  "/learn/punctuation",
  "/learn/numbers",
  "/rhythm",
  "/professionals",
  "/educators",
  "/about",
  "/privacy",
  "/contact",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...seoPages.map((page) => page.path), ...additionalIndexableRoutes];
  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`
  }));
}
