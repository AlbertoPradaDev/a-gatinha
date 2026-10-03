"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { business } from "@/lib/data/business";
import { localizedPath } from "@/i18n/routes";
import { useCurrentRoute } from "@/hooks/useCurrentRoute";
import type { CommonContent } from "@/types/content";

// Anchor for the overlay's circular unfold — top-right, where the burger sits.
const ORIGIN = "calc(100% - 2.25rem) 2.5rem";

// Blue a touch lighter than the flag so it keeps 4.5:1 against the black outline.
const FLAG = { yellow: "#FCD016", blue: "#3d7bf7", red: "#ef3b54" };

/**
 * Wordmark painted in the flag colors: first word yellow, the rest split
 * blue / red ("SABOR" + "LAT" + "INO"). A single word is split in thirds.
 * Original case in the DOM (CSS uppercases it), so screen readers read the
 * name, not letters.
 */
function Wordmark({ name }: { name: string }) {
  const [first, ...others] = name.split(" ");
  const rest = others.join(" ");
  const parts = rest
    ? [first + " ", rest.slice(0, Math.ceil(rest.length / 2)), rest.slice(Math.ceil(rest.length / 2))]
    : [first.slice(0, Math.ceil(first.length / 3)), first.slice(Math.ceil(first.length / 3), Math.ceil((first.length * 2) / 3)), first.slice(Math.ceil((first.length * 2) / 3))];
  const colors = [FLAG.yellow, FLAG.blue, FLAG.red];
  return (
    <>
      {parts.map((part, i) => (
        <span key={i} style={{ color: colors[i] }}>
          {part}
        </span>
      ))}
    </>
  );
}

/**
 * Hamburger → ✕ in pure CSS: opening slides both lines to the middle, then
 * rotates them; closing reverses the order (outer span = move, inner = turn).
 */
function BurgerIcon({ open }: { open: boolean }) {
  const line = (offset: number, angle: number) => (
    <span
      className="absolute left-0.5 h-0.5 w-[18px] transition-transform duration-200 ease-out"
      style={{
        top: offset < 0 ? 14 : 6,
        transform: open ? `translateY(${offset}px)` : "none",
        transitionDelay: open ? "0s" : "0.2s",
      }}
    >
      <span
        className="block h-full w-full rounded-full bg-current transition-transform duration-200 ease-out"
        style={{
          transform: open ? `rotate(${angle}deg)` : "none",
          transitionDelay: open ? "0.2s" : "0s",
        }}
      />
    </span>
  );
  return (
    <span aria-hidden className="relative block size-[22px]">
      {line(4, 45)}
      {line(-4, -45)}
    </span>
  );
}

/**
 * Header: a fixed bar (shrink-bar — blurs/condenses on scroll) with the wordmark,
 * the ES · PT switcher and the animated hamburger. The menu is the Shelf
 * `navigation/hamburger-overlay`: a dark overlay that unfolds from the top-right
 * corner via a clip-path circle, with the page links rising in on a stagger.
 */
export function SiteHeader({ common }: { common: CommonContent }) {
  const { lang, route } = useCurrentRoute();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll (via Lenis) + Esc to close while the overlay is open.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header>
      <a
        href="#main"
        className="sr-only z-[70] bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {common.skipToContent}
      </a>

      {/* Full-screen overlay nav — clip-path circle unfold from the corner */}
      <nav
        aria-hidden={!open}
        aria-label={common.mainNav}
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto bg-primary text-white",
          !open && "pointer-events-none",
        )}
        style={{
          clipPath: open ? `circle(150% at ${ORIGIN})` : `circle(0% at ${ORIGIN})`,
          transition: "clip-path 0.7s cubic-bezier(0.7, 0, 0.2, 1)",
        }}
        data-lenis-prevent
      >
        <div className="mt-24 flex flex-col">
          {common.nav.map((key, i) => (
            <Link
              key={key}
              href={localizedPath(lang, key)}
              onClick={close}
              tabIndex={open ? 0 : -1}
              aria-current={route === key ? "page" : undefined}
              className="group/item relative isolate overflow-hidden border-t border-white/10 py-6 last:border-b md:py-7"
            >
              <div
                className="flex items-center justify-between px-gutter"
                style={{
                  transform: open ? "translateY(0)" : "translateY(110%)",
                  opacity: open ? 1 : 0,
                  transition:
                    "transform 0.6s cubic-bezier(0.2,0.7,0.2,1), opacity 0.5s ease",
                  transitionDelay: open ? `${0.16 + i * 0.07}s` : "0s",
                }}
              >
                <span
                  className={cn(
                    "font-display text-4xl font-bold tracking-tight transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover/item:pl-4 md:text-6xl",
                    route === key && "text-white/50",
                  )}
                >
                  {common.pages[key]}
                </span>
                <ArrowUpRight className="size-7 -translate-x-2 opacity-0 transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover/item:translate-x-0 group-hover/item:opacity-100" />
              </div>
              <div
                className="absolute bottom-0 -z-10 h-0 w-full transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover/item:h-full"
                style={{ backgroundColor: "color-mix(in oklch, white, transparent 92%)" }}
              />
            </Link>
          ))}
        </div>

        <div
          className="mt-12 mb-12 flex flex-wrap items-center gap-x-8 gap-y-2 px-gutter"
          style={{
            opacity: open ? 1 : 0,
            transition: "opacity 0.5s ease",
            transitionDelay: open ? `${0.16 + common.nav.length * 0.07}s` : "0s",
          }}
        >
          {business.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Top bar (shrink-bar) */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-medium)] ease-[var(--ease-premium)]",
          scrolled && !open ? "bg-background/80 backdrop-blur-md" : "",
        )}
      >
        <div className="flex h-20 items-center justify-between px-gutter">
          <Link
            href={localizedPath(lang, "home")}
            onClick={close}
            // Pill like the other header controls, so the flag-colored
            // letters stay legible over photos and colored heroes.
            className="inline-flex h-11 items-center rounded-full border border-border bg-secondary px-4 font-display text-lg font-bold tracking-tight uppercase sm:text-xl"
            style={{
              textShadow:
                "0 0 1px #000, 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 0 0 #000, -1px 0 0 #000",
            }}
          >
            <span>
              <Wordmark name={business.name} />
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher label={common.changeLanguage} inverted={open} />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? common.closeMenu : common.openMenu}
              aria-expanded={open}
              className={cn(
                "inline-flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)]",
                open
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  : "border-border bg-secondary text-foreground hover:bg-accent",
              )}
            >
              <BurgerIcon open={open} />
            </button>

            <Button
              asChild
              size="lg"
              className="hidden h-11 px-6 text-xs font-semibold tracking-[0.16em] uppercase sm:inline-flex"
            >
              <a href={business.whatsapp.href} target="_blank" rel="noopener noreferrer">
                {common.headerCta}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
