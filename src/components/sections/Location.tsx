"use client";

import { useRef } from "react";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { business, fullAddress } from "@/lib/data/business";
import type { HoursRow } from "@/lib/content";
import type { LocationContent } from "@/types/content";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Location / closing section. The heading is the Shelf `scroll/scrub-reveal`:
 * its words light up (dim → full) tied to the section's scroll progress — no
 * pin, so the block stays compact above the address, hours and live map.
 * The dimming only applies once the heading is on screen.
 * Reduced motion renders the heading at full opacity.
 */
export function Location({
  content,
  hours,
}: {
  content: LocationContent;
  hours: HoursRow[];
}) {
  const scope = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>(
          scope.current!.querySelectorAll("[data-cta-word]"),
        );
        // No dimmed state until the heading reaches the viewport: the words
        // keep full contrast for assistive tech / audits and below the fold.
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top bottom",
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
      <div className="grid gap-14 px-gutter lg:grid-cols-2 lg:items-stretch lg:gap-20">
        {/* Left: heading + details */}
        <div>
          <span className="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            {content.eyebrow}
          </span>

          <h2
            ref={headingRef}
            className="mt-5 font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.98] font-bold tracking-[-0.02em]"
          >
            {content.heading.split(" ").map((word, i) => (
              <span key={i} data-cta-word>
                {word}{" "}
              </span>
            ))}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {content.body}
          </p>

          <div className="mt-8 flex items-start gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-brand" />
            <p className="font-medium">{fullAddress}</p>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Clock className="mt-1 size-5 shrink-0 text-brand" />
            <dl className="grid gap-1.5">
              {hours.map((h) => (
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
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                {content.directions}
                <ArrowUpRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
            <ArrowLink href={business.whatsapp.href} className="h-12 px-2">
              {content.whatsapp}
            </ArrowLink>
          </div>
        </div>

        {/* Right: live map */}
        <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted lg:aspect-auto lg:min-h-[36rem]">
          <iframe
            src={business.mapEmbed}
            title={content.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[0.2]"
          />
        </div>
      </div>
    </section>
  );
}
