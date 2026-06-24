"use client";

import { useRef } from "react";
import { ArrowUpRight, ArrowRight, MapPin, Clock } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { cta } from "@/lib/data/cta";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Location / closing section. The heading is the Shelf `scroll/scrub-reveal`:
 * its words light up (dim → full) tied to the section's scroll progress — no
 * pin, so the block stays compact above the address, hours and live map.
 * Mobile / reduced-motion render the heading at full opacity.
 */
export function CTA() {
  const scope = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>(
          scope.current!.querySelectorAll("[data-cta-word]"),
        );
        gsap.set(words, { opacity: 0.18 });
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top 82%",
          end: "bottom 45%",
          scrub: true,
          onUpdate: (self) => {
            const reach = self.progress * 1.1 * words.length;
            words.forEach((w, i) =>
              gsap.set(w, { opacity: 0.18 + 0.82 * clamp(reach - i) }),
            );
          },
        });
      });
    },
    { scope },
  );

  return (
    <section
      id="location"
      ref={scope}
      className="relative border-t border-border py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        {/* Left: heading + details */}
        <div>
          <span className="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Dónde Estamos
          </span>

          <h2
            ref={headingRef}
            className="mt-5 font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.98] font-bold tracking-[-0.02em]"
          >
            {cta.heading.split(" ").map((word, i) => (
              <span key={i} data-cta-word>
                {word}{" "}
              </span>
            ))}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {cta.body}
          </p>

          <div className="mt-8 flex items-start gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-brand" />
            <p className="font-medium">{cta.address}</p>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Clock className="mt-1 size-5 shrink-0 text-brand" />
            <dl className="grid gap-1.5">
              {cta.hours.map((h) => (
                <div key={h.day} className="flex gap-x-6 text-sm sm:text-base">
                  <dt className="w-40 shrink-0 text-muted-foreground">{h.day}</dt>
                  <dd className="font-medium tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group h-12 px-8 text-xs font-semibold tracking-[0.16em] uppercase"
            >
              <a href={cta.primary.href} target="_blank" rel="noopener noreferrer">
                {cta.primary.label}
                <ArrowUpRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
            <a
              href={cta.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 px-2 text-xs font-semibold tracking-[0.16em] text-foreground uppercase"
            >
              <span className="relative">
                {cta.secondary.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:scale-x-100" />
              </span>
              <ArrowRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right: live map */}
        <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted lg:aspect-[5/6]">
          <iframe
            src={cta.mapSrc}
            title="Mapa — Snack-Bar A Gatinha, Queluz"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[0.2]"
          />
        </div>
      </div>
    </section>
  );
}
