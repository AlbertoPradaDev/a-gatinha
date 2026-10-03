import { locales, type Locale } from "./config";

/**
 * Every page of the site, with its URL slug per language. Pages are addressed
 * by key everywhere in the code (`localizedPath("pt", "about")` →
 * `/pt/sobre-nos`), so renaming a slug only happens here.
 *
 * `app/[lang]/[slug]/page.tsx` resolves the slug back to its key and renders
 * the matching page; any slug not listed here is a 404.
 */
export const routes = {
  home: { es: "", pt: "" },
  menu: { es: "carta", pt: "menu" },
  about: { es: "nosotros", pt: "sobre-nos" },
  contact: { es: "contacto", pt: "contactos" },
  privacy: { es: "privacidad", pt: "privacidade" },
  terms: { es: "terminos", pt: "termos" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/** Routes served by `app/[lang]/[slug]` (everything except the home page). */
export type SlugRouteKey = Exclude<RouteKey, "home">;

const routeKeys = Object.keys(routes) as RouteKey[];

export function localizedPath(locale: Locale, key: RouteKey, hash?: string) {
  const slug = routes[key][locale];
  const path = slug ? `/${locale}/${slug}` : `/${locale}`;
  return hash ? `${path}#${hash}` : path;
}

/** Slug → page key for one language (`undefined` when it doesn't exist). */
export function routeFromSlug(locale: Locale, slug: string | undefined) {
  if (!slug) return "home" as const;
  return routeKeys.find((key) => routes[key][locale] === slug && slug !== "");
}

/** Page key for a slug in any language (`"sobre-nos"` → `"about"`). */
export function routeFromAnySlug(slug: string) {
  return routeKeys.find((key) =>
    locales.some((locale) => slug !== "" && routes[key][locale] === slug),
  );
}

/** All `{ slug }` params for one language, for `generateStaticParams`. */
export function slugParams(locale: Locale) {
  return routeKeys
    .map((key) => routes[key][locale])
    .filter((slug) => slug !== "")
    .map((slug) => ({ slug }));
}

/** Same page in every language — used by the language switcher. */
export function alternatePaths(key: RouteKey) {
  return Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, key)]),
  ) as Record<Locale, string>;
}
