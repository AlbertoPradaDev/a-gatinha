"use client";

import { useParams } from "next/navigation";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { routeFromSlug } from "@/i18n/routes";

/**
 * Current language + page key, read from the `[lang]/[slug]` params. Used by
 * the header/footer (active link, language switcher).
 * `route` is undefined for a slug that isn't in `routes.ts`.
 */
export function useCurrentRoute() {
  const params = useParams<{ lang?: string; slug?: string }>();
  const lang = params.lang && hasLocale(params.lang) ? params.lang : defaultLocale;
  const route = routeFromSlug(lang, params.slug);
  return { lang, route };
}
