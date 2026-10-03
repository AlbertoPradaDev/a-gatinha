/**
 * Smooth in-page scrolling that goes through Lenis when it's running (so the
 * virtual scroll and ScrollTrigger stay in sync) and falls back to native
 * scrolling under reduced motion. `target` is a selector, an element or a Y.
 * Element targets are resolved to an absolute Y from the real layout, so the
 * result doesn't depend on Lenis' internal position being up to date.
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  offset = -80,
) {
  const el =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;

  const y =
    typeof el === "number"
      ? el + offset
      : el.getBoundingClientRect().top + window.scrollY + offset;
  const top = Math.max(0, y);

  if (window.__lenis) {
    // force: also when Lenis is paused (e.g. the nav overlay just closed).
    window.__lenis.scrollTo(top, { force: true });
  } else {
    window.scrollTo({ top, behavior: "smooth" });
  }
}
