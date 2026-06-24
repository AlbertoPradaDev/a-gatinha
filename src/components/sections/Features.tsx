"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, servicesIntro } from "@/lib/data/services";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Each pillar carries a dark, footer-level background with a subtle flag tint
// (yellow → blue → red), white text throughout.
const ACTS = [
  { bg: "color-mix(in oklch, var(--flag-yellow) 33.33%, #0c0a09)", ink: "#ffffff", soft: "rgba(255,255,255,0.78)", eyebrow: "rgba(255,255,255,0.7)" },
  { bg: "color-mix(in oklch, var(--flag-blue) 33.33%, #0c0a09)", ink: "#ffffff", soft: "rgba(255,255,255,0.78)", eyebrow: "rgba(255,255,255,0.7)" },
  { bg: "color-mix(in oklch, var(--flag-red) 33.33%, #0c0a09)", ink: "#ffffff", soft: "rgba(255,255,255,0.78)", eyebrow: "rgba(255,255,255,0.7)" },
] as const;

/**
 * "Lo que nos define" — Shelf `sections/pinned-act` ported. On md+ with motion a
 * panel pins (sticky) while the three pillars cross-fade as you scroll, each on
 * its own flag color (yellow → blue → red), with a progress bar tracking the act.
 * Driven by a plain scroll listener + inline styles (robust; no GSAP). Mobile and
 * reduced-motion get a static stacked list in the same flag colors.
 */
export function Features() {
  const wrap = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

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
    <section id="about">
      {/* Reduced-motion fallback only: static stacked list, flag colors */}
      <div className="mx-auto hidden max-w-7xl px-6 py-16 sm:py-20 lg:px-10 motion-reduce:block">
        <SectionHeading {...servicesIntro} />
        <div className="mt-12 flex flex-col gap-3">
          {services.map((service, i) => {
            const c = ACTS[i % ACTS.length];
            return (
              <div
                key={service.title}
                className="p-8"
                style={{ backgroundColor: c.bg, color: c.ink }}
              >
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed" style={{ color: c.soft }}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* All sizes (motion): pinned act, background changes per pillar */}
      <div
        ref={wrap}
        className="relative hidden motion-safe:block"
        style={{ height: `${services.length * 100 + 60}vh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          {services.map((service, i) => {
            const c = ACTS[i % ACTS.length];
            return (
              <div
                key={service.title}
                data-act
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transition: "opacity 0.4s ease",
                  backgroundColor: c.bg,
                  color: c.ink,
                }}
                className="absolute inset-0"
              >
                <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 lg:px-10">
                  <span
                    className="text-sm font-semibold tracking-[0.26em] uppercase"
                    style={{ color: c.eyebrow }}
                  >
                    {servicesIntro.eyebrow}
                  </span>
                  <div className="mt-10 max-w-4xl">
                    <h3 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.02em]">
                      {service.title}
                    </h3>
                    <p
                      className="mt-6 max-w-2xl text-xl leading-relaxed"
                      style={{ color: c.soft }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* progress bar — mix-blend keeps it visible on any flag color */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[10vh] mx-auto w-full max-w-7xl px-6 lg:px-10">
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
