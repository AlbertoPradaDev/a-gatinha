"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, EASE, DURATION } from "@/lib/gsap";

/**
 * Shared section reveal. Every element marked `data-reveal` inside `scope` rises
 * + fades in (staggered) when the section scrolls into view. Selector strings
 * are scoped to `scope` by useGSAP, so each section only animates its own items.
 *
 * Reduced motion: the branch never runs, so nothing is hidden — content shows
 * immediately. transform/opacity only.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(
          scope.current!.querySelectorAll("[data-reveal]"),
        );
        if (!items.length) return;
        gsap.set(items, { autoAlpha: 0, y: 28 });
        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: DURATION.medium,
          ease: EASE.premium,
          stagger: 0.08,
          scrollTrigger: { trigger: scope.current, start: "top 78%" },
        });
      });
    },
    { scope },
  );
}
