import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";
import { inter, spaceGrotesk } from "@/lib/fonts";
import { getContent } from "@/lib/content";
import { business } from "@/lib/data/business";
import { locales, localeNames } from "@/i18n/config";

export const metadata: Metadata = {
  title: `404 — ${business.name}`,
};

/**
 * 404 for URLs that match no route at all (e.g. `/es/carta/xyz`). It renders
 * outside the `[lang]` layout, so it can't know the language: it shows the
 * message in every language, each with its own way back.
 */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={cn("h-full antialiased", inter.variable, spaceGrotesk.variable)}>
      <body className="flex min-h-full flex-col justify-center px-gutter py-20">
        <span className="font-display text-xl font-bold tracking-tight uppercase">
          {business.name}
        </span>
        <div className="mt-16 grid gap-14 md:grid-cols-2">
          {locales.map((locale) => {
            const t = getContent(locale).common.notFound;
            return (
              <section key={locale} lang={locale}>
                <span className="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                  {t.eyebrow} · {localeNames[locale]}
                </span>
                <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-bold tracking-[-0.02em]">
                  {t.title}
                </h1>
                <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{t.body}</p>
                <Link
                  href={t.cta.href}
                  className="mt-8 inline-flex h-12 items-center bg-primary px-8 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase"
                >
                  {t.cta.label}
                </Link>
              </section>
            );
          })}
        </div>
      </body>
    </html>
  );
}
