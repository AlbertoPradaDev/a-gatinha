import type { MetadataRoute } from "next";
import { business } from "@/lib/data/business";
import { htmlLang, locales } from "@/i18n/config";
import { alternatePaths, routes, type RouteKey } from "@/i18n/routes";

/**
 * /sitemap.xml — every page in every language, each entry listing its
 * translations (hreflang). `/` picks the visitor's language, so it is the
 * x-default. Minimal on purpose: SEO is refined per restaurant later.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${business.siteUrl}${path}`;

  return (Object.keys(routes) as RouteKey[]).flatMap((key) => {
    const paths = alternatePaths(key);
    const languages = {
      ...Object.fromEntries(locales.map((l) => [htmlLang[l], url(paths[l])])),
      "x-default": url("/"),
    };
    return locales.map((locale) => ({
      url: url(paths[locale]),
      changeFrequency: key === "privacy" || key === "terms" ? "yearly" : "monthly",
      priority: key === "home" ? 1 : key === "privacy" || key === "terms" ? 0.3 : 0.8,
      alternates: { languages },
    }));
  });
}
