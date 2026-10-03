/**
 * Shared state between the page curtain (components/providers/Curtain.tsx)
 * and the entrance animations: a hero waits behind the curtain and starts the
 * moment it opens.
 *
 * The intro on a full load is pure CSS (`.curtain-intro` keyframes in
 * globals.css), so it starts with the first paint instead of waiting for the
 * JavaScript to download and hydrate. This module only reads how far along it
 * is; page transitions (GSAP) mark the page as covered while they run.
 */

type Listener = () => void;

/** sessionStorage key: the intro already played in this browser session. */
export const INTRO_KEY = "sl-intro";

/**
 * sessionStorage key: the previous page left the stripes covering the screen
 * (language switch = full page load); the next load opens them in CSS.
 */
export const HANDOFF_KEY = "sl-handoff";

/** When the intro's stripes start leaving (ms) — keep in sync with globals.css. */
export const INTRO_EXIT_MS = 1350;

/**
 * Runs in <head> before the first paint and sets `<html data-intro>`:
 * - "open": arriving from a language switch, the stripes start closed and
 *   open (the handoff flag is consumed);
 * - "done": the session already saw the intro, the curtain stays hidden and
 *   the page is there at once;
 * - unset: first load, the intro plays and the session is marked.
 */
export const introScript = `try{var d=document.documentElement,s=sessionStorage;if(s.getItem("${HANDOFF_KEY}")){s.removeItem("${HANDOFF_KEY}");d.dataset.intro="open"}else if(s.getItem("${INTRO_KEY}"))d.dataset.intro="done";else s.setItem("${INTRO_KEY}","1")}catch(e){}`;

/**
 * Milliseconds until the CSS intro starts uncovering the page; 0 once it has,
 * or when it isn't running (intro skipped, reduced motion, server).
 */
export function introRemaining(): number {
  if (typeof document === "undefined") return 0;
  // "open" uncovers the page from the start; "done" never covers it.
  if (document.documentElement.dataset.intro) return 0;
  const stripe = document.querySelector<HTMLElement>(".curtain-intro [data-stripe]");
  const anim = stripe?.getAnimations?.()[0];
  if (!anim) return 0;
  return Math.max(0, INTRO_EXIT_MS - Number(anim.currentTime ?? 0));
}

// A page transition is covering the screen.
let covered = false;
const listeners = new Set<Listener>();

/** True when nothing covers the page (entrance animations can be skipped). */
export function isRevealed() {
  return !covered && introRemaining() === 0;
}

/** Run `cb` when the page is revealed (now, if it already is). */
export function onReveal(cb: Listener) {
  if (isRevealed()) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function setRevealed(value: boolean) {
  covered = !value;
  if (!value) return;
  const pending = [...listeners];
  listeners.clear();
  pending.forEach((cb) => cb());
}
