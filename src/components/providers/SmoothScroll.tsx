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
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    /** Shared Lenis instance for smooth anchor navigation (see SiteHeader). */
    __lenis?: Lenis;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    // A reload always starts at the top (the intro plays over the hero):
    // no browser scroll restoration, and a stale #anchor left in the URL by
    // the menu chips is dropped. A fresh visit to a shared #anchor link still
    // lands on it. In-app back/forward is handled below (pathname effect).
    // Through ScrollTrigger: it re-applies its own remembered value after
    // every refresh, so setting history.scrollRestoration directly won't stick.
    ScrollTrigger.clearScrollMemory("manual");
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = nav?.type === "reload";
    if (isReload && window.location.hash) {
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }
    if (isReload || !window.location.hash) window.scrollTo(0, 0);

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

  // Page change: start the new page at the top (unless it targets an anchor)
  // and re-measure every ScrollTrigger once the new sections have mounted —
  // child effects run before this one, so their triggers already exist.
  useEffect(() => {
    // First load is handled by the mount effect above.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!window.location.hash) {
      window.__lenis?.scrollTo(0, { immediate: true, force: true });
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
