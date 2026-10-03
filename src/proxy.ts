import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  hasLocale,
  locales,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";
import { localizedPath, routeFromAnySlug } from "@/i18n/routes";

/**
 * Locale prefixing. URLs that already start with a supported locale pass
 * through; anything else (`/`, `/carta`, …) is redirected to the same path
 * under the visitor's language: a previous manual choice (cookie) first, then
 * the browser's `Accept-Language`, then `defaultLocale`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasPrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasPrefix) return;

  const locale = preferredLocale(request);
  // A bare page slug from either language lands on that page in the visitor's
  // language (`/nosotros` → `/pt/sobre-nos`); anything else keeps its path.
  const route = routeFromAnySlug(pathname.slice(1));
  request.nextUrl.pathname = route
    ? localizedPath(locale, route)
    : `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  // "pt-PT,pt;q=0.9,es;q=0.8" → ["pt", "pt", "es"], ordered by q weight.
  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.lang && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  const match = accepted.find((entry) => hasLocale(entry.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}

export const config = {
  // Run only where there is something to redirect: skip URLs that already
  // carry a locale (every page view, prefetch and client navigation — keep
  // `es|pt` in sync with `locales`), Next internals, API routes and any file
  // with an extension (images, favicon, robots.txt…).
  matcher: ["/((?!_next|api|es/|es$|pt/|pt$|.*\\..*).*)"],
};
