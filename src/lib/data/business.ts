import type { OpeningHours } from "@/types/content";

/**
 * Language-independent facts about the restaurant: name, contact, address,
 * hours, social profiles and legal identifiers. Both language files and the
 * components read from here, so a new client is mostly a matter of editing
 * this file plus `es.ts` / `pt.ts`.
 *
 * Everything below is DEMO DATA for the "Sabor Latino" template — replace
 * phone, WhatsApp, email, address, NIF and social links before going live.
 */

const whatsappNumber = "351910000000";

const hours: OpeningHours[] = [
  { days: ["mon"] },
  { days: ["tue", "wed", "thu"], opens: "12:00", closes: "23:00" },
  { days: ["fri", "sat"], opens: "12:00", closes: "00:00" },
  { days: ["sun"], opens: "12:00", closes: "17:00" },
];

export const business = {
  name: "Sabor Latino",
  /** Company name + tax number shown in the legal pages. */
  legalName: "Sabor Latino, Lda.",
  nif: "500 000 000",
  /** Canonical origin of the deployed site (used for metadataBase). */
  siteUrl: "https://sabor-latino.vercel.app",

  phone: { display: "+351 210 000 000", href: "tel:+351210000000" },
  whatsapp: {
    display: "+351 910 000 000",
    number: whatsappNumber,
    href: `https://wa.me/${whatsappNumber}`,
  },
  email: "hola@saborlatino.pt",

  address: {
    street: "Rua do Exemplo, 123",
    postalCode: "1100-000",
    city: "Lisboa",
    country: "Portugal",
  },
  /** "Cómo llegar" button. */
  mapsUrl: "https://maps.google.com/?q=Baixa+Lisboa",
  /** OpenStreetMap embed — renders without an API key. */
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-9.1500%2C38.7080%2C-9.1300%2C38.7180&layer=mapnik&marker=38.7130%2C-9.1400",
  /** Where "Pedir a domicilio" goes (delivery platform, web shop or WhatsApp). */
  orderUrl: `https://wa.me/${whatsappNumber}`,

  /** Opening hours; a row without times means closed. */
  hours,

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
    { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}` },
  ],

  /** Livro de Reclamações — mandatory link for businesses in Portugal. */
  complaintsBookUrl: "https://www.livroreclamacoes.pt/",

  /** Footer credit. */
  developer: { name: "Alberto Prada", href: "https://www.albertopradadev.com" },
};

export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`;

/** wa.me link with a pre-filled message. */
export function whatsappLink(text: string) {
  return `${business.whatsapp.href}?text=${encodeURIComponent(text)}`;
}
