import type { SiteConfig } from "@/types/content";

/**
 * Site-wide content for Snack-Bar A Gatinha (Venezuelan food, Queluz · Lisboa).
 * Phone + WhatsApp are placeholders carried over from the original site — swap
 * `wa.me/351000000000` and the footer phone once the real number is available.
 */
export const site: SiteConfig = {
  name: "A Gatinha",
  tagline: "Comida Venezolana",
  nav: [
    { label: "Nosotros", href: "#about" },
    { label: "Galería", href: "#menu" },
    { label: "Ubicación", href: "#location" },
  ],
  cta: { label: "WhatsApp", href: "https://wa.me/351000000000" },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/snackbaragatinha" },
    { label: "WhatsApp", href: "https://wa.me/351000000000" },
  ],
  email: "hola@agatinha.pt",
};
