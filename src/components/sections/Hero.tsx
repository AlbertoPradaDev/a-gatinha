"use client";

import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { ArrowRight, CookingPot, Leaf, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/SmartLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { isRevealed, onReveal } from "@/lib/curtain";
import type { HeroContent } from "@/types/content";

/** Icons for the three proof points, in order (labels come from content). */
const featureIcons = [CookingPot, Leaf, Heart];

/**
 * One carousel photo with art direction: a <picture> whose desktop source
 * only matches from `lg`, so each device downloads a single variant (two
 * <Image>s hidden by CSS would both be preloaded for the first slide). The
 * first slide is the LCP: eager + high priority; the rest load at low priority.
 */
function HeroSlide({ slide, first }: { slide: HeroContent["slides"][number]; first: boolean }) {
  const common = { alt: slide.alt, fill: true } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: slide.lg, sizes: "50vw" });
  const { props: mobile } = getImageProps({
    ...common,
    src: slide.sm,
    sizes: "100vw",
    loading: first ? "eager" : "lazy",
    fetchPriority: first ? "high" : "low",
  });
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} sizes="50vw" />
      <img {...mobile} alt={slide.alt} className="object-cover" />
    </picture>
  );
}

/**
 * Hero — light split layout: copy + CTAs + feature row on the left, an
 * auto-rotating product carousel on the right (stacked on mobile: image first,
 * then copy). Bold display headline. GSAP mask-reveal on the headline lines +
 * rise on the surrounding elements; reduced motion paints the final state.
 */
export function Hero({ hero }: { hero: HeroContent }) {
  const { slides, features } = hero;
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Carousel auto-advance (paused under reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      4500,
    );
    return () => clearInterval(id);
  }, [slides.length]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Nothing covers the page (intro already seen, back/forward): show
        // the hero as rendered instead of hiding it and animating it back.
        if (isRevealed()) return;
        const root = scope.current!;
        const lines = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-line]"),
        );
        const rises = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-rise]"),
        );
        // Opacity, not autoAlpha: `visibility: hidden` would drop the copy
        // from the accessibility tree until the animation runs.
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
    <section
      id="top"
      ref={scope}
      className="relative min-h-[100svh] bg-background text-foreground"
    >
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-2">
        {/* Product carousel — first on mobile, right on desktop */}
        <div className="relative order-1 h-[44vh] overflow-hidden border-b border-border lg:order-2 lg:h-auto lg:border-b-0 lg:border-l">
          {slides.map((slide, i) => (
            <div
              key={slide.lg}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-premium)]",
                i === active ? "opacity-100" : "opacity-0",
              )}
            >
              <HeroSlide slide={slide} first={i === 0} />
            </div>
          ))}

          {/* dots — small marks inside 24px buttons (minimum touch target) */}
          <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2">
            {slides.map((slide, i) => (
              <button
                key={slide.lg}
                type="button"
                onClick={() => setActive(i)}
                aria-label={slide.alt}
                aria-current={i === active}
                className="group/dot flex h-8 min-w-6 cursor-pointer items-center justify-center px-1"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full bg-white transition-all duration-300",
                    i === active
                      ? "w-6 opacity-100"
                      : "w-1.5 opacity-60 group-hover/dot:opacity-90",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Copy + CTAs + features — below on mobile, left on desktop */}
        <div className="order-2 flex flex-col justify-center px-gutter py-14 lg:order-1 lg:py-20">
          <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.02em]">
            {hero.headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <span data-line className="inline-block">
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-rise
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {hero.description}
          </p>
          <div data-rise className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full gap-2 px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white sm:w-auto"
            >
              <SmartLink href={hero.secondaryCta.href}>
                <WhatsAppIcon className="size-4" />
                {hero.secondaryCta.label}
              </SmartLink>
            </Button>
          </div>

          {/* Feature row */}
          <div
            data-rise
            className="mt-14 grid grid-cols-3 border-t border-border pt-7 lg:flex lg:gap-12 lg:border-t lg:pt-7"
          >
            {features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div
                  key={f.line1 + f.line2}
                  className={cn(
                    "flex flex-col gap-2 px-3 first:pl-0 sm:px-4 lg:px-0",
                    i > 0 && "border-l border-border lg:border-l-0",
                  )}
                >
                  <Icon className="size-5 text-foreground" strokeWidth={1.5} />
                  <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
                    {f.line1}
                    <br />
                    {f.line2}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
