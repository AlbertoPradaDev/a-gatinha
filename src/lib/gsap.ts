/**
 * Central GSAP setup. Import gsap + plugins from here ONLY, never directly,
 * so plugins are registered exactly once and the motion tokens stay in sync.
 *
 * The values below mirror the motion tokens in `app/globals.css` (@theme):
 *   --ease-premium  -> EASE.premium
 *   --duration-fast/medium/slow -> DURATION.fast/medium/slow (ms -> seconds)
 * Edit them in one place if the tokens change.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

// Registration is idempotent; running it at module load (client-only, since
// every consumer is a 'use client' component) guarantees a single setup.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

// cubic-bezier(0.16, 1, 0.3, 1) === --ease-premium, expressed as an SVG path.
CustomEase.create("premium", "M0,0 C0.16,1 0.3,1 1,1");

export const EASE = {
  /** matches --ease-premium exactly */
  premium: "premium",
} as const;

/** seconds; mirrors --duration-* tokens (ms) in globals.css */
export const DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.2,
} as const;

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
