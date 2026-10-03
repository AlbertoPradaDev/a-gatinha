"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Dish, Link, SectionIntro } from "@/types/content";

/** Image (or placeholder) + hover overlay/arrow. Reused across both layouts. */
function DishMedia({ dish, className }: { dish: Dish; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border bg-muted",
        className,
      )}
    >
      <Image
        src={dish.image}
        alt={dish.title}
        fill
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 52vw, min(calc(100vw - 48px), 624px)"
        className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-premium)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-foreground/0 transition-colors duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:bg-foreground/5" />
      <span className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-background text-foreground opacity-0 transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:opacity-100">
        <ArrowUpRight className="size-5" />
      </span>
    </div>
  );
}

/**
 * Signature dishes, linking to the full menu. Desktop (md+, motion) = Shelf
 * `sections/horizontal-gallery` (sticky pin + ScrollTrigger scrub slides the
 * track sideways). Mobile (and reduced-motion desktop) = Shelf
 * `sections/sticky-stack` — pure-CSS cards that sticky-pin and stack over one
 * another (no scroll-jacking, robust on touch).
 */
export function DishGallery({
  intro,
  items,
  cta,
}: {
  intro: SectionIntro;
  items: Dish[];
  cta: Link;
}) {
  const scope = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useScrollReveal(scope);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const t = track.current!;
          gsap.to(t, {
            x: () => -(t.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: pin.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        },
      );
    },
    { scope },
  );

  return (
    <section ref={scope} className="py-16 sm:py-20 md:py-24">
      <div className="flex flex-col gap-8 px-gutter md:flex-row md:items-end md:justify-between">
        <SectionHeading {...intro} />
        <div data-reveal className="shrink-0">
          <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
        </div>
      </div>

      {/* Mobile + reduced-motion: sticky stack — cards pin at the top and pile on scroll */}
      <div className="mx-auto mt-10 max-w-2xl px-gutter pb-8 motion-safe:md:hidden">
        {items.map((dish) => (
          <article key={dish.title} className="group sticky top-24 mb-8">
            <div className="overflow-hidden border border-border bg-card shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.18)]">
              <DishMedia dish={dish} className="aspect-[4/3] border-0" />
              <div className="flex items-baseline justify-between gap-4 p-5">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {dish.title}
                </h3>
                <span className="text-right text-sm text-muted-foreground">
                  {dish.category}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop, motion: horizontal pinned gallery */}
      <div
        ref={pin}
        className="relative mt-16 hidden motion-safe:md:block md:h-[320vh]"
      >
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <div
            ref={track}
            className="flex gap-8 px-gutter [will-change:transform]"
          >
            {items.map((dish) => (
              <article
                key={dish.title}
                className="group w-[52vw] flex-shrink-0 lg:w-[40vw]"
              >
                <DishMedia dish={dish} className="h-[58vh]" />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {dish.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {dish.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
