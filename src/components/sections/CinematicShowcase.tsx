"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { showcase } from "@/lib/data/showcase";

/**
 * Cinematic scroll reveal. A pinned (sticky) viewport holds an image that opens
 * from a centred window to full-bleed as you scroll — clip-path expands, the
 * inner image eases out of a slow zoom, a scrim lifts, and a caption settles in.
 * Driven by ScrollTrigger scrub over the section's height (so the smooth Lenis
 * scroll "scrubs" the reveal). transform/opacity/clip-path only.
 *
 * Reduced motion: the image is shown full-bleed, statically (no scrub).
 */
export function CinematicShowcase() {
  const scope = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const f = frame.current!;
      const im = inner.current!;
      const caption = scope.current!.querySelector("[data-caption]");
      const scrim = scope.current!.querySelector("[data-scrim]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(f, { clipPath: "inset(14% 16% round 0px)" });
        gsap.set(im, { scale: 1.25 });
        gsap.set(caption, { autoAlpha: 0, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        tl.to(f, { clipPath: "inset(0% 0% round 0px)", ease: "none" }, 0)
          .to(im, { scale: 1, ease: "none" }, 0)
          .to(scrim, { autoAlpha: 0, ease: "none" }, 0)
          .to(caption, { autoAlpha: 1, y: 0, ease: "none" }, 0.55);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(f, { clipPath: "inset(0% 0% round 0px)" });
        gsap.set(im, { scale: 1 });
        gsap.set(scrim, { autoAlpha: 0 });
        gsap.set(caption, { autoAlpha: 1, y: 0 });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative h-[200vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          ref={frame}
          className="absolute inset-0 overflow-hidden [will-change:clip-path]"
        >
          <div ref={inner} className="relative h-full w-full [will-change:transform]">
            <Image
              src={showcase.imageMobile}
              alt={showcase.alt}
              fill
              sizes="100vw"
              className="object-cover md:hidden"
            />
            <Image
              src={showcase.imageDesktop}
              alt={showcase.alt}
              fill
              sizes="100vw"
              className="hidden object-cover md:block"
            />
          </div>

          <div data-scrim aria-hidden className="absolute inset-0 bg-black/45" />

          <div
            data-caption
            className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col gap-2 px-6 pb-12 text-white lg:px-10"
          >
            <span className="text-xs font-semibold tracking-[0.22em] text-white/70 uppercase">
              {showcase.eyebrow}
            </span>
            <p className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
              {showcase.caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
