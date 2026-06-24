/**
 * Content model for the landing template. Every section renders from these
 * typed shapes; the actual copy/links live in `lib/data/`. To repurpose the
 * template for a new client, edit the data files — never the components.
 */

export interface CTA {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

/** A single line of a multi-line display headline. */
export interface HeadlineLine {
  text: string;
  /** Render in the brand accent + italic display face (one word/line max). */
  accent?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SiteConfig {
  /** Brand/wordmark shown in the header and footer. */
  name: string;
  /** Short descriptor used near the wordmark. */
  tagline: string;
  nav: NavLink[];
  /** Primary header CTA. */
  cta: CTA;
  /** External profiles, shown in the nav overlay + footer. */
  socials: NavLink[];
  /** Contact email, shown in the footer. */
  email: string;
}

/** Reusable section heading (eyebrow + title + optional intro). */
export interface SectionIntro {
  eyebrow: string;
  title: string;
  intro?: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  category: string;
  /** Optional thumbnail path under /public; falls back to a placeholder. */
  image?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface OpeningHour {
  day: string;
  time: string;
}

export interface CtaContent {
  heading: string;
  body: string;
  primary: CTA;
  secondary: CTA;
  /** Street/area shown in the location block. */
  address: string;
  /** Opening hours rows. */
  hours: OpeningHour[];
  /** Google Maps embed src (keyless `?q=…&output=embed` form). */
  mapSrc: string;
}

export interface ShowcaseContent {
  /** Image shown on small screens (portrait-friendly). */
  imageMobile: string;
  /** Image shown from md up (landscape). */
  imageDesktop: string;
  alt: string;
  /** Small uppercase label over the revealed image. */
  eyebrow: string;
  /** One-line caption shown as the image finishes revealing. */
  caption: string;
}

export interface HeroContent {
  /** Small uppercase line above the headline. */
  eyebrow: string;
  /** Display headline, split across lines for the staggered reveal. */
  headline: HeadlineLine[];
  description: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  stats: Stat[];
  trustedByLabel: string;
  /** Wordmark-style client names for the proof row. */
  trustedBy: string[];
}
