"use client";

import { cn } from "@/lib/utils";
import { LOCALE_COOKIE, localeNames, locales } from "@/i18n/config";
import { alternatePaths } from "@/i18n/routes";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";

/**
 * ES · PT toggle. Links to the same page in the other language (localized
 * slug included) and remembers the choice in a cookie, so the proxy sends
 * returning visitors on `/` straight to it.
 *
 * Plain <a>, not next/link: another language is another root layout
 * (<html lang>, metadata), so it is a full page load — the page curtain
 * covers it (components/providers/Curtain.tsx).
 */
export function LanguageSwitcher({
  label,
  inverted = false,
  className,
}: {
  label: string;
  /** Light text, for dark backgrounds (open nav overlay, footer). */
  inverted?: boolean;
  className?: string;
}) {
  const { lang, route } = useCurrentRoute();
  const paths = alternatePaths(route ?? "home");

  return (
    <nav
      aria-label={label}
      className={cn(
        "flex h-11 items-center rounded-full border px-3 transition-colors duration-[var(--duration-fast)]",
        inverted ? "border-white/20 bg-white/10" : "border-border bg-secondary",
        className,
      )}
    >
      {locales.map((locale, i) => {
        const active = locale === lang;
        return (
          <span key={locale} className="flex items-center">
            {i > 0 && (
              <span
                aria-hidden
                className={cn("mx-1.5 h-3 w-px", inverted ? "bg-white/30" : "bg-border")}
              />
            )}
            <a
              href={paths[locale]}
              hrefLang={locale}
              lang={locale}
              aria-current={active ? "true" : undefined}
              onClick={() => {
                document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
              }}
              className={cn(
                "px-1 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors duration-[var(--duration-fast)]",
                inverted
                  ? active
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                  : active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
              )}
            >
              {locale}
              {/* Name read out after the visible code ("es (Español)"), so the
                  accessible name still starts with what is on screen. */}
              <span className="sr-only"> ({localeNames[locale]})</span>
            </a>
          </span>
        );
      })}
    </nav>
  );
}
