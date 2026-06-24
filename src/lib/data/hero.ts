import type { HeroContent } from "@/types/content";

/**
 * Hero content. `headline` renders line-by-line for the mask-reveal. The hero is
 * a light split layout (copy left, product carousel right) with a feature row.
 */
export const hero: HeroContent = {
  eyebrow: "Auténtico sabor venezolano",
  headline: [{ text: "El sabor" }, { text: "de casa." }],
  description:
    "Cocina venezolana auténtica, hecha al momento con ingredientes de calidad y el toque de siempre.",
  primaryCta: { label: "Ver carta", href: "#menu" },
  secondaryCta: { label: "Pedir por WhatsApp", href: "https://wa.me/351000000000" },
  stats: [],
  trustedByLabel: "",
  trustedBy: [],
};
