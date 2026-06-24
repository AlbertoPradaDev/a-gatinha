"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CookingPot, Leaf, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP, EASE, DURATION } from "@/lib/gsap";
import { hero } from "@/lib/data/hero";

/** Inline WhatsApp glyph (lucide has no brand mark). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.523 5.276l-.999 3.648 3.965-1.223zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

const slides = [
  { lg: "/images/hero-lg-1.webp", sm: "/images/hero-sm-1.webp", alt: "Cachapa venezolana con queso de mano" },
  { lg: "/images/hero-lg-2.webp", sm: "/images/hero-sm-2.webp", alt: "Arepas venezolanas recién hechas" },
  { lg: "/images/hero-lg-3.webp", sm: "/images/hero-sm-3.webp", alt: "Cachapa de maíz tierno" },
];

const features = [
  { Icon: CookingPot, line1: "Hecho", line2: "al momento" },
  { Icon: Leaf, line1: "Ingredientes", line2: "de calidad" },
  { Icon: Heart, line1: "Sabor que te", line2: "hace sentir en casa" },
];

/**
 * Hero — light split layout: copy + CTAs + feature row on the left, an
 * auto-rotating product carousel on the right (stacked on mobile: image first,
 * then copy). Bold display headline. GSAP mask-reveal on the headline lines +
 * rise on the surrounding elements; reduced motion paints the final state.
 */
export function Hero() {
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
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current!;
        const lines = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-line]"),
        );
        const rises = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-rise]"),
        );
        gsap.set(lines, { yPercent: 115 });
        gsap.set(rises, { autoAlpha: 0, y: 28 });
        const tl = gsap.timeline({ defaults: { ease: EASE.premium } });
        tl.to(lines, { yPercent: 0, duration: DURATION.slow * 0.8, stagger: 0.12 }, 0.1)
          .to(rises, { autoAlpha: 1, y: 0, duration: DURATION.medium, stagger: 0.08 }, 0.45);
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
      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 lg:grid-cols-2">
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
              <Image
                src={slide.sm}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover lg:hidden"
              />
              <Image
                src={slide.lg}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="50vw"
                className="hidden object-cover lg:block"
              />
            </div>
          ))}

          {/* dots */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.lg}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full bg-white transition-all duration-300",
                  i === active ? "w-6 opacity-100" : "w-1.5 opacity-60 hover:opacity-90",
                )}
              />
            ))}
          </div>
        </div>

        {/* Copy + CTAs + features — below on mobile, left on desktop */}
        <div className="order-2 flex flex-col justify-center px-6 py-14 lg:order-1 lg:px-10 lg:py-20">
          <h1 className="mt-7 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.02em]">
            {hero.headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <span data-line className="inline-block">
                  {line.text}
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
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full gap-2 px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white sm:w-auto"
            >
              <a href={hero.secondaryCta.href} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                {hero.secondaryCta.label}
              </a>
            </Button>
          </div>

          {/* Feature row */}
          <div
            data-rise
            className="mt-14 grid grid-cols-3 border-t border-border pt-7 lg:flex lg:gap-12 lg:border-t lg:pt-7"
          >
            {features.map((f, i) => (
              <div
                key={f.line1 + f.line2}
                className={cn(
                  "flex flex-col gap-2 px-3 first:pl-0 sm:px-4 lg:px-0",
                  i > 0 && "border-l border-border lg:border-l-0",
                )}
              >
                <f.Icon className="size-5 text-foreground" strokeWidth={1.5} />
                <span className="text-xs leading-snug text-muted-foreground sm:text-sm">
                  {f.line1}
                  <br />
                  {f.line2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
