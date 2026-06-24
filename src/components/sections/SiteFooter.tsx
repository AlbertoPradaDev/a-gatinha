"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { site } from "@/lib/data/site";

/** Footer: link columns, an oversized wordmark, and a back-to-top control. */
export function SiteFooter() {
  const scope = useRef<HTMLElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  useScrollReveal(scope);
  const year = new Date().getFullYear();

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

  const go = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = href === "#" ? 0 : document.querySelector(href);
    if (target === null) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement | number, { offset: -80 });
    } else if (typeof target !== "number") {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div data-reveal>
            <span className="font-display text-xl font-bold tracking-tight uppercase">
              {site.name}
            </span>
            <p className="mt-4 max-w-xs leading-relaxed text-white/90">
              {site.tagline}. Arepas, cachapas, empanadas y tequeños hechos al
              momento en Queluz — el sabor de casa, sin fronteras.
            </p>
            <a
              href={site.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center text-white"
            >
              <span className="relative font-medium">
                Escríbenos por WhatsApp
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </span>
            </a>
          </div>

          <nav data-reveal aria-label="Footer">
            <h3 className="text-xs font-semibold tracking-[0.22em] text-white/90 uppercase">
              Navega
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="text-white transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)] hover:text-white/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav data-reveal aria-label="Social">
            <h3 className="text-xs font-semibold tracking-[0.22em] text-white/90 uppercase">
              Síguenos
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)] hover:text-white/70"
                  >
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
            className="block font-display text-[clamp(2.5rem,10vw,7rem)] leading-[0.8] font-bold tracking-[-0.03em] text-white/90 uppercase [will-change:transform]"
          >
            {site.name}
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 text-sm text-white/90">
            <span>© {year} Snack-Bar A Gatinha. Todos los derechos reservados.</span>
            <span>
              Desarrollado por{" "}
              <a
                href="https://www.albertopradadev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-white"
              >
                <span className="relative font-medium">
                  Alberto Prada
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:scale-x-100" />
                </span>
              </a>
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => go(e, "#")}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-semibold tracking-[0.14em] text-white uppercase"
          >
            Volver arriba
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/20 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:bg-white/10">
              <ArrowUp className="size-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
