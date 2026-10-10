import type { MetadataRoute } from "next";
import { absoluteUrl } from "../src/lib/seo/site";

export const dynamic = "force-static";

// Public pages should be discoverable by conventional and AI-powered search.
// Keep API endpoints and non-public certificate routes out of the index.
// The public verification and sample pages are intentionally accessible.
const publicRules = {
  allow: ["/", "/certificate/verify/", "/certificate/sample/"],
  disallow: ["/api/", "/certificate/"]
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...publicRules },
      { userAgent: "OAI-SearchBot", ...publicRules },
      { userAgent: "PerplexityBot", ...publicRules },
      { userAgent: "bingbot", ...publicRules },
      { userAgent: "Googlebot", ...publicRules }
    ],
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
