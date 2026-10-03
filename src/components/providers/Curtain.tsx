"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { HANDOFF_KEY, introRemaining, setRevealed } from "@/lib/curtain";
import { scrollToTarget } from "@/lib/scroll";
import { business } from "@/lib/data/business";

type Phase = "intro" | "idle" | "covering" | "waiting" | "revealing";

// Yellow and red sweep in from the left, blue from the right — and each
// keeps travelling the same way when it leaves ("a" / "b" in globals.css).
const STRIPES = [
  { color: "var(--flag-yellow)", dir: "a" },
  { color: "var(--flag-blue)", dir: "b" },
  { color: "var(--flag-red)", dir: "a" },
] as const;
const enterOrigin = (i: number) => (i % 2 === 0 ? "left center" : "right center");
const exitOrigin = (i: number) => (i % 2 === 0 ? "right center" : "left center");

/**
 * Page curtain in the flag colors.
 *
 * - First load of the session: the intro is pure CSS (`.curtain-intro`, see
 *   globals.css) so it starts with the first paint, JS or not. This component
 *   only tells the heroes when it opens (`onReveal`) and pauses smooth scroll
 *   meanwhile. Later loads in the session skip it (`introScript`).
 * - Link to another page: the stripes cover the screen (GSAP) while the next
 *   page is prefetched, the route changes underneath (already scrolled to the
 *   top) and the stripes open again — loading time is masked, not frozen.
 * - Link to the other language: same cover, then a full page load (the root
 *   layout and <html lang> change); the next page opens the stripes in CSS
 *   (`data-intro="open"`, flagged through sessionStorage).
 * - Link to the current page (logo/"Inicio" on the home page…): smooth scroll
 *   back to the top/hero instead of a no-op.
 *
 * Reduced motion: no curtain at all, plain navigation.
 */
export function Curtain({ tagline }: { tagline: string }) {
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const ctrl = useRef<{ phase: Phase; reveal: () => void; timer?: number } | null>(null);

  useEffect(() => {
    const el = root.current!;
    const backdrop = el.querySelector("[data-backdrop]");
    const stripes = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-stripe]"));
    const letters = el.querySelectorAll("[data-letter]");
    const label = el.querySelector("[data-tagline]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state: { phase: Phase; reveal: () => void; timer?: number } = {
      phase: "intro",
      reveal,
    };
    ctrl.current = state;

    function reveal() {
      state.phase = "revealing";
      setRevealed(true);
      window.__lenis?.start();
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0, pointerEvents: "none" });
            state.phase = "idle";
          },
        })
        .set(stripes, { transformOrigin: (i: number) => exitOrigin(i) })
        .to(stripes, { scaleX: 0, duration: 0.6, stagger: 0.07, ease: "power4.inOut" });
    }

    function cover(href: string, fullLoad: boolean) {
      state.phase = "covering";
      setRevealed(false);
      window.__lenis?.stop();
      if (!fullLoad) router.prefetch(href);
      // Hand the stripes over from the CSS intro to GSAP.
      el.classList.remove("curtain-intro");
      gsap.set(el, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set([letters, label], { autoAlpha: 0 });

      const go = () => {
        if (state.phase !== "covering") return;
        window.clearTimeout(state.timer);
        state.phase = "waiting";
        if (fullLoad) {
          try {
            sessionStorage.setItem(HANDOFF_KEY, "1");
          } catch {}
          window.location.assign(href);
        } else {
          router.push(href);
        }
        // Never stay stuck covered if the route doesn't change.
        state.timer = window.setTimeout(reveal, 8000);
      };
      gsap
        .timeline({ onComplete: go })
        .set(stripes, { scaleX: 0, transformOrigin: (i: number) => enterOrigin(i) })
        .to(stripes, { scaleX: 1, duration: 0.38, stagger: 0.05, ease: "power4.inOut" });
      // Navigate even if animation frames are throttled (background tab).
      state.timer = window.setTimeout(go, 650);
    }

    // ── Intro (CSS) ──────────────────────────────────────────────────────
    const remaining = introRemaining();
    let introTimer: number | undefined;
    const introDone = () => {
      state.phase = "idle";
      setRevealed(true);
      window.__lenis?.start();
    };
    if (remaining > 0 && !reduced) {
      window.__lenis?.stop();
      introTimer = window.setTimeout(introDone, remaining);
    } else {
      introDone();
    }

    // ── Links ────────────────────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href);
      if (url.origin !== window.location.origin) return;

      if (url.pathname === window.location.pathname) {
        // Same page: in-page anchors keep their own behavior; a plain link
        // to the page we're on (logo, "Inicio"…) goes back to the hero.
        if (!url.hash) {
          e.preventDefault();
          scrollToTarget(0, 0);
        }
        return;
      }
      if (reduced) return;
      // Takes over from next/link (which skips prevented clicks).
      e.preventDefault();
      if (state.phase !== "idle") return;
      const locale = (path: string) => path.split("/")[1];
      cover(
        url.pathname + url.search + url.hash,
        locale(url.pathname) !== locale(window.location.pathname),
      );
    };
    document.addEventListener("click", onClick, true);

    // Back to this page from the bfcache after a full-load switch: it was
    // frozen covered, so open up.
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted || state.phase === "idle") return;
      window.clearTimeout(state.timer);
      reveal();
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(state.timer);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router]);

  // The new page is in (and scrolled to the top by SmoothScroll): open up.
  useEffect(() => {
    const state = ctrl.current;
    if (state?.phase !== "waiting") return;
    window.clearTimeout(state.timer);
    // Next frame, so the new page has painted under the stripes (timer as a
    // fallback when frames are throttled).
    let done = false;
    const open = () => {
      if (done) return;
      done = true;
      state.reveal();
    };
    const id = requestAnimationFrame(open);
    const timer = window.setTimeout(open, 120);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  const chars = business.name.toUpperCase().split("");

  return (
    <div
      ref={root}
      aria-hidden
      className="curtain curtain-intro pointer-events-none fixed inset-0 z-[80] overflow-hidden"
    >
      <div data-backdrop className="absolute inset-0 bg-[#0c0a09]" />
      {STRIPES.map(({ color, dir }, i) => (
        <div
          key={color}
          data-stripe={dir}
          className="absolute inset-x-0 h-[calc(100%/3+1px)]"
          style={{
            top: `calc(${i} * 100% / 3)`,
            backgroundColor: color,
            transform: "scaleX(0)",
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-gutter text-center text-white">
        <span className="block overflow-hidden pb-[0.06em] font-display text-[clamp(2.5rem,11vw,10rem)] leading-[0.9] font-bold tracking-[-0.03em] whitespace-nowrap uppercase [text-shadow:0_6px_30px_rgb(0_0_0/0.25)]">
          {chars.map((ch, i) => (
            <span
              key={i}
              data-letter
              className="inline-block"
              style={{ transform: "translateY(110%)", animationDelay: `${0.25 + i * 0.025}s` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
        <span
          data-tagline
          className="mt-5 text-xs font-semibold tracking-[0.32em] uppercase sm:text-sm"
          style={{ opacity: 0 }}
        >
          {tagline}
        </span>
      </div>
    </div>
  );
}
