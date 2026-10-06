import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { business } from "@/lib/data/business";
import { locales, localeNames } from "@/i18n/config";

export const metadata: Metadata = {
  title: `404 — ${business.name}`,
};

/*
 * Styles are inline on purpose: importing any CSS here (globals.css, a plain
 * .css file, even next/font) sends Turbopack (Next 16.2.9, `next dev`) into an
 * endless rewrite of this page's client chunk after the first 404 — CPU
 * pinned, memory growing until the dev server crashes, and every navigation
 * slowed down meanwhile. Colors mirror the theme tokens in globals.css.
 */
const css = `
  html { height: 100%; -webkit-font-smoothing: antialiased; }
  body {
    margin: 0; min-height: 100%; display: flex; flex-direction: column; justify-content: center;
    padding: 5rem clamp(1.5rem, 4vw, 5rem); box-sizing: border-box;
    background: #fafaf9; color: #292524;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  .brand { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; text-transform: uppercase; }
  .grid { display: grid; gap: 3.5rem; margin-top: 4rem; }
  @media (min-width: 768px) { .grid { grid-template-columns: 1fr 1fr; } }
  .eyebrow { font-size: 0.875rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #6b655f; }
  h1 { margin: 1.25rem 0 0; font-size: clamp(2.25rem, 5vw, 4rem); line-height: 0.98; font-weight: 700; letter-spacing: -0.02em; }
  p { margin: 1.25rem 0 0; max-width: 28rem; line-height: 1.6; color: #6b655f; }
  a.cta {
    margin-top: 2rem; display: inline-flex; align-items: center; height: 3rem; padding: 0 2rem;
    background: #292524; color: #fafaf9; text-decoration: none;
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
  }
  a.cta:focus-visible { outline: 2px solid #003893; outline-offset: 3px; }
`;

/**
 * 404 for URLs that match no route at all (e.g. `/es/carta/xyz`). It renders
 * outside the `[lang]` layout, so it can't know the language: it shows the
 * message in every language, each with its own way back (a plain <a>: this
 * page has its own <html>, so leaving it is a full load anyway).
 */
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <span className="brand">{business.name}</span>
        <div className="grid">
          {locales.map((locale) => {
            const t = getContent(locale).common.notFound;
            return (
              <section key={locale} lang={locale}>
                <span className="eyebrow">
                  {t.eyebrow} · {localeNames[locale]}
                </span>
                <h1>{t.title}</h1>
                <p>{t.body}</p>
                <a className="cta" href={t.cta.href}>
                  {t.cta.label}
                </a>
              </section>
            );
          })}
        </div>
      </body>
    </html>
  );
}
