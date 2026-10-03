"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { SectionIntro, Value } from "@/types/content";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Exactly the footer's colors: each flag color composited under the same
// #0c0a09/72 dark scrim (28% flag over #0c0a09 in sRGB), white text.
const ACTS = [
  { bg: "color-mix(in srgb, var(--flag-yellow) 28%, #0c0a09)", ink: "#ffffff", soft: "rgba(255,255,255,0.9)", eyebrow: "rgba(255,255,255,0.85)" },
  { bg: "color-mix(in srgb, var(--flag-blue) 28%, #0c0a09)", ink: "#ffffff", soft: "rgba(255,255,255,0.9)", eyebrow: "rgba(255,255,255,0.85)" },
  { bg: "color-mix(in srgb, var(--flag-red) 28%, #0c0a09)", ink: "#ffffff", soft: "rgba(255,255,255,0.9)", eyebrow: "rgba(255,255,255,0.85)" },
] as const;

/**
 * "Lo que nos define" — heading, then the Shelf `sections/pinned-act` ported. With motion a
 * panel pins (sticky) while the values cross-fade as you scroll, each on its
 * own flag color (yellow → blue → red), with a progress bar tracking the act.
 * Driven by a plain scroll listener + inline styles (robust; no GSAP).
 * Reduced motion gets a static stacked list in the same flag colors.
 */
export function Values({ intro, items }: { intro: SectionIntro; items: Value[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  useScrollReveal(head);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const acts = Array.from(el.querySelectorAll<HTMLElement>("[data-act]"));
    if (!acts.length) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-el.getBoundingClientRect().top / total) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      const idx = Math.min(acts.length - 1, Math.floor(p * acts.length));
      acts.forEach((a, i) => (a.style.opacity = i === idx ? "1" : "0"));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section>
      <div ref={head} className="border-t border-border px-gutter pt-16 pb-12 sm:pt-20 md:pt-24">
        <SectionHeading {...intro} />
      </div>

      {/* Reduced-motion fallback only: static stacked list, flag colors */}
      <div className="hidden px-gutter pb-16 sm:pb-20 motion-reduce:block">
        <div className="flex flex-col gap-3">
          {items.map((value, i) => {
            const c = ACTS[i % ACTS.length];
            return (
              <div
                key={value.title}
                className="p-8"
                style={{ backgroundColor: c.bg, color: c.ink }}
              >
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed" style={{ color: c.soft }}>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* All sizes (motion): pinned act, background changes per value */}
      <div
        ref={wrap}
        className="relative hidden motion-safe:block"
        style={{ height: `${items.length * 100 + 60}vh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          {items.map((value, i) => {
            const c = ACTS[i % ACTS.length];
            return (
              <div
                key={value.title}
                data-act
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  backgroundColor: c.bg,
                  color: c.ink,
                }}
                className="absolute inset-0"
              >
                <div className="flex h-full w-full flex-col justify-center px-gutter">
                  <span
                    className="text-sm font-semibold tracking-[0.26em] uppercase"
                    style={{ color: c.eyebrow }}
                  >
                    {intro.eyebrow}
                  </span>
                  <div className="mt-10 max-w-4xl">
                    <h3 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.02em]">
                      {value.title}
                    </h3>
                    <p
                      className="mt-6 max-w-2xl text-xl leading-relaxed"
                      style={{ color: c.soft }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* progress bar — mix-blend keeps it visible on any flag color */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[10vh] w-full px-gutter">
            <div className="relative h-px w-full bg-white/25 mix-blend-difference">
              <div
                ref={bar}
                className="absolute inset-0 origin-left bg-white mix-blend-difference"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
