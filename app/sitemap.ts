import type { MetadataRoute } from "next";
import { seoPages } from "../src/seo/pages";

export const dynamic = "force-static";
const SITE_URL = "https://wpmtest.app";

const supportingIndexableRoutes = [
  "/typing-test/code/",
  "/about",
  "/privacy",
  "/contact",
  "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...seoPages.map((page) => page.path), ...supportingIndexableRoutes];
  return [...new Set(paths)].map((path) => ({
    url: `${SITE_URL}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`
  }));
}
