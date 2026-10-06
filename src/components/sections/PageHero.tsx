"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toneBg, type Tone } from "@/lib/tone";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/SmartLink";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { isRevealed, onReveal } from "@/lib/curtain";
import type { PageHeroContent } from "@/types/content";

/**
 * Top of every inner page: eyebrow, display headline (same mask-reveal as the
 * home hero), intro and up to two CTAs. With an `image` it becomes the home
 * hero's split layout (photo right on desktop, on top on mobile). `tone` paints
 * it in a flag color.
 */
export function PageHero({ hero, tone }: { hero: PageHeroContent; tone?: Tone }) {
  const scope = useRef<HTMLElement>(null);
  const { image } = hero;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Nothing covers the page (intro already seen, back/forward): show
        // the hero as rendered instead of hiding it and animating it back.
        if (isRevealed()) return;
        const root = scope.current!;
        const lines = root.querySelectorAll("[data-line]");
        const rises = root.querySelectorAll("[data-rise]");
        gsap.set(lines, { yPercent: 115 });
        gsap.set(rises, { opacity: 0, y: 28 });
        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.premium } });
        tl.to(lines, { yPercent: 0, duration: 0.75, stagger: 0.08 }, 0)
          .to(rises, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.2);
        // Start as the page curtain opens (intro / page transition).
        return onReveal(() => tl.play());
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className={cn("relative border-b border-border", toneBg(tone))}>
      <div className={cn("grid grid-cols-1", image && "lg:min-h-[86svh] lg:grid-cols-2")}>
        {image && (
          <div className="relative order-1 h-[42vh] overflow-hidden border-b border-border lg:order-2 lg:h-auto lg:border-b-0 lg:border-l">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              // LCP of the page (`priority` is deprecated in Next 16).
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div
          className={cn(
            "order-2 flex flex-col justify-end px-gutter pb-14 lg:order-1 lg:pb-20",
            image ? "pt-12 lg:pt-36" : "pt-36 sm:pt-44",
          )}
        >
          <span
            data-rise
            className="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase"
          >
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.02em]">
            {hero.title.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <span data-line className="inline-block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-rise
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {hero.intro}
          </p>

          {(hero.primaryCta || hero.secondaryCta) && (
            <div data-rise className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {hero.primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className="group h-12 w-full px-8 text-xs font-semibold tracking-[0.16em] uppercase sm:w-auto"
                >
                  <SmartLink href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                    <ArrowRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-0.5" />
                  </SmartLink>
                </Button>
              )}
              {hero.secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full px-7 text-xs font-semibold tracking-[0.16em] uppercase sm:w-auto"
                >
                  <SmartLink href={hero.secondaryCta.href}>
                    {hero.secondaryCta.label}
                  </SmartLink>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
