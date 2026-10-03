/**
 * Locales the site is published in. Every URL is prefixed with one of them
 * (`/es/...`, `/pt/...`); `src/proxy.ts` redirects bare paths to the visitor's
 * language. To add a language: add it here, add its slugs in `routes.ts` and
 * its content file in `lib/data/`.
 */
export const locales = ["es", "pt"] as const;

export type Locale = (typeof locales)[number];

/** Used when the browser asks for none of the supported languages. */
export const defaultLocale: Locale = "es";

/** Cookie set by the language switcher so `/` remembers a manual choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  pt: "Português",
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** `<html lang>` / Open Graph locale for each language. */
export const htmlLang: Record<Locale, string> = { es: "es", pt: "pt-PT" };
export const ogLocale: Record<Locale, string> = { es: "es_ES", pt: "pt_PT" };
