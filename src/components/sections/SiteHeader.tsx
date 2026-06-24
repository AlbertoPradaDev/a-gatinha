"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data/site";

// Anchor for the overlay's circular unfold — top-right, where the burger sits.
const ORIGIN = "calc(100% - 2.25rem) 2.5rem";

/**
 * Header: a fixed bar (shrink-bar — blurs/condenses on scroll) with the wordmark
 * and the same animated hamburger button. The menu is the Shelf
 * `navigation/hamburger-overlay`: a dark overlay that unfolds from the top-right
 * corner via a clip-path circle, with the row-links rising in on a stagger. The
 * burger button itself is unchanged.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [topLine, animateTop] = useAnimate();
  const [bottomLine, animateBottom] = useAnimate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hamburger → ✕ (unchanged choreography).
  useEffect(() => {
    if (open) {
      animateTop([
        [topLine.current, { translateY: 4 }],
        [topLine.current, { rotate: 45 }],
      ]);
      animateBottom([
        [bottomLine.current, { translateY: -4 }],
        [bottomLine.current, { rotate: -45 }],
      ]);
    } else {
      animateTop([
        [topLine.current, { rotate: 0 }],
        [topLine.current, { translateY: 0 }],
      ]);
      animateBottom([
        [bottomLine.current, { rotate: 0 }],
        [bottomLine.current, { translateY: 0 }],
      ]);
    }
  }, [open, animateTop, animateBottom, topLine, bottomLine]);

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

  const go = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    window.__lenis?.start();
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
    <header>
      {/* Full-screen overlay nav — clip-path circle unfold from the corner */}
      <nav
        aria-hidden={!open}
        aria-label="Main navigation"
        className={cn(
          "fixed inset-0 z-40 bg-primary text-white",
          !open && "pointer-events-none",
        )}
        style={{
          clipPath: open ? `circle(150% at ${ORIGIN})` : `circle(0% at ${ORIGIN})`,
          transition: "clip-path 0.7s cubic-bezier(0.7, 0, 0.2, 1)",
        }}
      >
        <div className="mt-24 flex flex-col">
          {site.nav.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              tabIndex={open ? 0 : -1}
              className="group/item relative isolate overflow-hidden border-t border-white/10 py-7 last:border-b"
            >
              <div
                className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10"
                style={{
                  transform: open ? "translateY(0)" : "translateY(110%)",
                  opacity: open ? 1 : 0,
                  transition:
                    "transform 0.6s cubic-bezier(0.2,0.7,0.2,1), opacity 0.5s ease",
                  transitionDelay: open ? `${0.16 + i * 0.07}s` : "0s",
                }}
              >
                <span className="font-display text-4xl font-bold tracking-tight transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover/item:pl-4 md:text-6xl">
                  {link.label}
                </span>
                <ArrowUpRight className="size-7 -translate-x-2 opacity-0 transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover/item:translate-x-0 group-hover/item:opacity-100" />
              </div>
              <div
                className="absolute bottom-0 -z-10 h-0 w-full transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover/item:h-full"
                style={{ backgroundColor: "color-mix(in oklch, white, transparent 92%)" }}
              />
            </a>
          ))}
        </div>

        <div
          className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-6 lg:px-10"
          style={{
            opacity: open ? 1 : 0,
            transition: "opacity 0.5s ease",
            transitionDelay: open ? `${0.16 + site.nav.length * 0.07}s` : "0s",
          }}
        >
          {site.socials.map((s) => (
            <a
              key={s.href}
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
          scrolled && !open ? "bg-background/70 backdrop-blur-xl" : "",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a
            href="#"
            onClick={(e) => go(e, "#")}
            aria-label={site.name}
            className="font-display text-xl font-bold tracking-tight uppercase"
            style={{
              textShadow:
                "0 0 1px #000, 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 0 0 #000, -1px 0 0 #000",
            }}
          >
            {site.name
              .toUpperCase()
              .split("")
              .map((ch, idx, arr) => {
                  if (ch === " ") return <span key={idx}>{" "}</span>;
                  const li = arr.slice(0, idx).filter((c) => c !== " ").length;
                  const color = li < 2 ? "#FCD016" : li < 5 ? "#2c6bf0" : "#ef3b54";
                  return (
                    <span key={idx} style={{ color }}>
                      {ch}
                    </span>
                  );
                })}
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className={cn(
                "inline-flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)]",
                open
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                  : "border-border bg-secondary text-foreground hover:bg-accent",
              )}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <motion.rect
                  ref={topLine}
                  x="3" y="7" width="18" height="2" rx="1"
                  fill="currentColor"
                  style={{ transformOrigin: "12px 8px" }}
                />
                <motion.rect
                  ref={bottomLine}
                  x="3" y="15" width="18" height="2" rx="1"
                  fill="currentColor"
                  style={{ transformOrigin: "12px 16px" }}
                />
              </svg>
            </button>

            <Button
              asChild
              size="lg"
              className="hidden h-11 px-6 text-xs font-semibold tracking-[0.16em] uppercase sm:inline-flex"
            >
              <a href={site.cta.href} target="_blank" rel="noopener noreferrer">
                {site.cta.label}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
