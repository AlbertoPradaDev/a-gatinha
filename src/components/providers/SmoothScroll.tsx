"use client";

/**
 * Lenis smooth scroll, integrated with GSAP so ScrollTrigger reads Lenis'
 * virtual scroll position. Mounted once in the root layout around {children}.
 *
 * Why a client provider (not next/dynamic ssr:false): in the Next.js App
 * Router `ssr: false` is NOT allowed inside Server Components (layout/page),
 * and Lenis only ever touches `window` inside this effect — which runs on the
 * client only. So a thin 'use client' boundary is the correct, error-free path.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    /** Shared Lenis instance for smooth anchor navigation (see SiteHeader). */
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect the user's OS-level motion preference: no hijacked scroll.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      // easeOutExpo — the JS sibling of --ease-premium for scroll feel.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // We drive rAF via GSAP's ticker below, so Lenis must not run its own.
      autoRaf: false,
    });
    window.__lenis = lenis;

    // Keep ScrollTrigger in lockstep with Lenis, driven by GSAP's ticker.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fonts and late images shift layout — recompute trigger positions once
    // webfonts are ready so reveals fire at the correct scroll offsets.
    let cancelled = false;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
