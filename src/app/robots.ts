import type { MetadataRoute } from "next";
import { business } from "@/lib/data/business";

/** /robots.txt — everything is crawlable; points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
