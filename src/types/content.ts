/**
 * Content model for the site. Every page and section renders from these typed
 * shapes; the copy lives in `lib/data/es.ts` and `lib/data/pt.ts` (one file per
 * language, same shape) and the language-independent facts (phone, address,
 * hours…) in `lib/data/business.ts`. To repurpose the template for a new
 * restaurant, edit those files — never the components.
 *
 * Links: `href` is either an internal path built with `localizedPath()` (starts
 * with `/`, rendered with next/link) or an absolute external URL (opens in a
 * new tab).
 */

import type { RouteKey } from "@/i18n/routes";

export interface Link {
  label: string;
  href: string;
}

/** Per-page <title> and meta description. */
export interface PageMeta {
  title: string;
  description: string;
}

/** Reusable section heading (eyebrow + title + optional intro). */
export interface SectionIntro {
  eyebrow: string;
  title: string;
  intro?: string;
}

export interface Question {
  question: string;
  answer: string;
  /** Optional follow-up link shown under the answer. */
  link?: Link;
}

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

/** A row of opening hours; no `opens`/`closes` means closed those days. */
export interface OpeningHours {
  /** Consecutive days, in order (rendered as "Mon – Fri"). */
  days: DayKey[];
  opens?: string;
  closes?: string;
}

/* ── Shared (header, footer, labels) ─────────────────────────────────────── */

export interface CommonContent {
  /** Default title/description, used by pages without their own. */
  meta: PageMeta & { titleTemplate: string };
  /** Short descriptor shown with the wordmark. */
  tagline: string;
  /** Label for every page, used by the nav, footer and language switcher. */
  pages: Record<RouteKey, string>;
  /** Pages listed in the header overlay and footer, in order. */
  nav: RouteKey[];
  /** aria-label of the main navigation. */
  mainNav: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  /** aria-label of the language switcher. */
  changeLanguage: string;
  /** Header button (opens WhatsApp). */
  headerCta: string;
  days: Record<DayKey, string>;
  closed: string;
  footer: {
    blurb: string;
    whatsapp: string;
    navHeading: string;
    contactHeading: string;
    followHeading: string;
    rights: string;
    developedBy: string;
    complaintsBook: string;
    backToTop: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    cta: Link;
  };
}

/* ── Building blocks shared by several pages ─────────────────────────────── */

/** Top of every inner page. */
export interface PageHeroContent {
  eyebrow: string;
  /** Display headline, one array entry per line (staggered reveal). */
  title: string[];
  intro: string;
  primaryCta?: Link;
  secondaryCta?: Link;
  /** Optional photo on the right (stacked above the copy on mobile). */
  image?: { src: string; alt: string };
}

/** Closing call-to-action band at the bottom of inner pages. */
export interface CtaBandContent {
  eyebrow: string;
  title: string;
  body: string;
  primary: Link;
  secondary?: Link;
}

export interface FaqContent {
  intro: SectionIntro;
  items: Question[];
  /** "Ask us anything" style link next to the heading. */
  cta?: Link;
}

/* ── Home ────────────────────────────────────────────────────────────────── */

export interface HeroContent {
  /** Display headline, one array entry per line. */
  headline: string[];
  description: string;
  primaryCta: Link;
  secondaryCta: Link;
  slides: { lg: string; sm: string; alt: string }[];
  /** Three short proof points under the CTAs (icons live in the component). */
  features: { line1: string; line2: string }[];
}

/** One of the ways to enjoy the food (eat in, take away, delivery). */
export interface Offering {
  /** Icon shown on the card (the glyphs live in the component). */
  icon: "dine-in" | "takeaway" | "delivery";
  title: string;
  tags: string[];
  description: string;
  link: Link;
}

export interface Dish {
  title: string;
  category: string;
  image: string;
}

export interface ShowcaseContent {
  imageMobile: string;
  imageDesktop: string;
  alt: string;
  eyebrow: string;
  caption: string;
}

export interface StoryTeaserContent {
  intro: SectionIntro;
  paragraphs: string[];
  link: Link;
  image: { src: string; alt: string };
  /** Small caption over the photo (e.g. the founders' names). */
  caption: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  /** Where the review comes from / what they booked. */
  source: string;
}

export interface LocationContent {
  eyebrow: string;
  heading: string;
  body: string;
  directions: string;
  whatsapp: string;
  mapTitle: string;
}

export interface HomeContent {
  meta: PageMeta;
  hero: HeroContent;
  offerings: { intro: SectionIntro; items: Offering[] };
  dishes: { intro: SectionIntro; items: Dish[]; cta: Link };
  showcase: ShowcaseContent;
  story: StoryTeaserContent;
  testimonials: { intro: SectionIntro; items: Testimonial[] };
  faq: FaqContent;
  location: LocationContent;
}

/* ── Menu ────────────────────────────────────────────────────────────────── */

export type DishTag = "veg" | "vegan" | "gf" | "spicy";

export interface MenuItem {
  name: string;
  description: string;
  /** Photo: a path under /public or an https URL allowed in next.config. */
  image: string;
  /** Display price, already formatted ("8,50 €"). Optional. */
  price?: string;
  tags?: DishTag[];
}

export interface MenuCategory {
  /** Anchor id (`/carta#arepas`). */
  id: string;
  title: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuContent {
  meta: PageMeta;
  hero: PageHeroContent;
  /** aria-label of the category jump list. */
  categoriesLabel: string;
  categories: MenuCategory[];
  tags: Record<DishTag, string>;
  /** Seasonal / allergens / VAT disclaimer under the menu. */
  note: string;
  cta: CtaBandContent;
}

/* ── About ───────────────────────────────────────────────────────────────── */

export interface StoryBlock {
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

export interface Value {
  title: string;
  description: string;
}

export interface AboutContent {
  meta: PageMeta;
  hero: PageHeroContent;
  story: StoryBlock[];
  values: { intro: SectionIntro; items: Value[] };
  cta: CtaBandContent;
}

/* ── Contact ─────────────────────────────────────────────────────────────── */

export interface ContactFormContent {
  name: string;
  phone: string;
  email: string;
  reason: string;
  reasons: string[];
  date: string;
  guests: string;
  message: string;
  messagePlaceholder: string;
  optional: string;
  sendWhatsapp: string;
  sendEmail: string;
  privacyNote: string;
  privacyLink: string;
  /** Shown after submitting; WhatsApp/email opens in a new tab. */
  sent: { title: string; body: string; again: string };
  /** Labels used inside the composed WhatsApp/email message. */
  messageIntro: string;
  emailSubject: string;
}

export interface ContactContent {
  meta: PageMeta;
  hero: PageHeroContent;
  form: ContactFormContent;
  channels: {
    title: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    directions: string;
    hours: string;
  };
}

/* ── Legal ───────────────────────────────────────────────────────────────── */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalContent {
  meta: PageMeta;
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/* ── Everything for one language ─────────────────────────────────────────── */

export interface SiteContent {
  common: CommonContent;
  home: HomeContent;
  menu: MenuContent;
  about: AboutContent;
  contact: ContactContent;
  privacy: LegalContent;
  terms: LegalContent;
}
