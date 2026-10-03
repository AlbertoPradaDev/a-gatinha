"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, EASE, DURATION } from "@/lib/gsap";
import { isRevealed, onReveal } from "@/lib/curtain";

/**
 * Shared section reveal. Every element marked `data-reveal` inside `scope` rises
 * + fades in (staggered) when the section scrolls into view. Selector strings
 * are scoped to `scope` by useGSAP, so each section only animates its own items.
 *
 * A section already on screen when it mounts is never hidden after the fact:
 * if the page curtain covers it, it animates in as the curtain opens; if not,
 * it simply stays as rendered (no flash of content disappearing).
 *
 * Reduced motion: the branch never runs, so nothing is hidden — content shows
 * immediately. transform/opacity only.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current!;
        const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]"));
        if (!items.length) return;

        const inView = root.getBoundingClientRect().top < window.innerHeight * 0.78;
        if (inView) {
          if (isRevealed()) return;
          gsap.set(items, { opacity: 0, y: 28 });
          const tween = gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: DURATION.medium,
            ease: EASE.premium,
            stagger: 0.08,
            paused: true,
          });
          return onReveal(() => tween.play());
        }

        gsap.set(items, { opacity: 0, y: 28 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: DURATION.medium,
          ease: EASE.premium,
          stagger: 0.08,
          scrollTrigger: { trigger: root, start: "top 78%" },
        });
      });
    },
    { scope },
  );
}
