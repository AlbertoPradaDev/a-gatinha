import type { CtaContent } from "@/types/content";

/**
 * Location / closing section. The heading drives the scrub-reveal; the address,
 * hours and map render beneath it. Maps uses the keyless `?q=…&output=embed`
 * form so no API key is needed.
 */
export const cta: CtaContent = {
  heading: "Ven a probarlo en Queluz.",
  body: "Te esperamos con una arepa recién hecha. Escríbenos por WhatsApp o pásate a vernos.",
  primary: { label: "Cómo llegar", href: "https://maps.google.com/?q=Snack-Bar+A+Gatinha+Queluz" },
  secondary: { label: "WhatsApp", href: "https://wa.me/351000000000" },
  address: "Queluz, Lisboa · Portugal",
  hours: [
    { day: "Lunes – Viernes", time: "08:00 – 22:00" },
    { day: "Sábado", time: "09:00 – 23:00" },
    { day: "Domingo", time: "10:00 – 20:00" },
  ],
  // OpenStreetMap embed — renders reliably without an API key. Centered on
  // Queluz; the "Cómo llegar" button points at the exact place on Google Maps.
  mapSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=-9.2645%2C38.7516%2C-9.2445%2C38.7616&layer=mapnik&marker=38.7566%2C-9.2545",
};
