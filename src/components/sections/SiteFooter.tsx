"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";
import { business, fullAddress } from "@/lib/data/business";
import { localizedPath } from "@/i18n/routes";
import { scrollToTarget } from "@/lib/scroll";
import type { CommonContent } from "@/types/content";

const linkClass =
  "text-white transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)] hover:text-white/70";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold tracking-[0.22em] text-white/90 uppercase">
      {children}
    </h3>
  );
}

/**
 * Footer: brand blurb, page links, contact details and socials over the flag
 * bands, an oversized wordmark, and a legal row (privacy, terms, Livro de
 * Reclamações) with a back-to-top control.
 */
export function SiteFooter({ common }: { common: CommonContent }) {
  const { lang } = useCurrentRoute();
  const scope = useRef<HTMLElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  useScrollReveal(scope);
  const year = new Date().getFullYear();
  const t = common.footer;

  // Shelf `footer/big-type`: the oversized wordmark (rendered clipped via an
  // inline translateY) rises into view when the footer enters. Inline styles +
  // IntersectionObserver — robust, no GSAP and no compiled-CSS dependency.
  useEffect(() => {
    const el = scope.current;
    const w = word.current;
    if (!el || !w) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      w.style.transform = "translateY(0)";
      return;
    }
    w.style.transition = "transform 1s cubic-bezier(0.2, 0.7, 0.2, 1)";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          w.style.transform = "translateY(0)";
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={scope} className="relative overflow-hidden text-white">
      {/* Tricolor horizontal flag bands + dark scrim for legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--flag-yellow) 0 33.33%, var(--flag-blue) 33.33% 66.66%, var(--flag-red) 66.66% 100%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-[#0c0a09]/72" />

      <div className="relative z-10 px-gutter py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
          <div data-reveal>
            <span className="font-display text-xl font-bold tracking-tight uppercase">
              {business.name}
            </span>
            <p className="mt-4 max-w-xs leading-relaxed text-white/90">{t.blurb}</p>
            <a
              href={business.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center text-white"
            >
              <span className="relative font-medium">
                {t.whatsapp}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </span>
            </a>
          </div>

          <nav data-reveal aria-label={t.navHeading}>
            <Heading>{t.navHeading}</Heading>
            <ul className="mt-5 flex flex-col gap-3">
              {common.nav.map((key) => (
                <li key={key}>
                  <Link href={localizedPath(lang, key)} className={linkClass}>
                    {common.pages[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal>
            <Heading>{t.contactHeading}</Heading>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {fullAddress}
                </a>
              </li>
              <li>
                <a href={business.phone.href} className={linkClass}>
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className={linkClass}>
                  {business.email}
                </a>
              </li>
            </ul>
          </div>

          <nav data-reveal aria-label={t.followHeading}>
            <Heading>{t.followHeading}</Heading>
            <ul className="mt-5 flex flex-col gap-3">
              {business.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 overflow-hidden">
          <span
            ref={word}
            style={{ transform: "translateY(110%)" }}
            className="block font-display text-[clamp(2.5rem,10vw,11rem)] leading-[0.8] font-bold tracking-[-0.03em] text-white/90 uppercase [will-change:transform]"
          >
            {business.name}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/15 pt-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 text-sm text-white/90">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href={localizedPath(lang, "privacy")} className={linkClass}>
                {common.pages.privacy}
              </Link>
              <Link href={localizedPath(lang, "terms")} className={linkClass}>
                {common.pages.terms}
              </Link>
              <a
                href={business.complaintsBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {t.complaintsBook}
              </a>
            </div>
            <span>
              © {year} {business.name}. {t.rights}
            </span>
            <span>
              {t.developedBy}{" "}
              <a
                href={business.developer.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-white"
              >
                <span className="relative font-medium">
                  {business.developer.name}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:scale-x-100" />
                </span>
              </a>
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollToTarget(0, 0)}
            className="group inline-flex cursor-pointer items-center gap-2 self-start text-sm font-semibold tracking-[0.14em] text-white uppercase lg:self-auto"
          >
            {t.backToTop}
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:bg-white/10">
              <ArrowUp className="size-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
