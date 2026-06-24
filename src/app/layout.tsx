import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

// Space Grotesk (display/headings) + Inter (body): modern, confident, warm —
// energetic without over-formalizing a casual snack-bar.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://snack-bar-a-gatinha.vercel.app"),
  title: {
    default: "A Gatinha — Comida Venezolana en Queluz",
    template: "%s — A Gatinha",
  },
  description:
    "Sabor venezolano auténtico en Queluz. Arepas, cachapas, empanadas y tequeños hechos al momento.",
  openGraph: {
    type: "website",
    title: "A Gatinha — Comida Venezolana en Queluz",
    description:
      "Sabor venezolano auténtico en Queluz. Arepas, cachapas, empanadas y tequeños.",
    siteName: "A Gatinha",
    locale: "es_ES",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn("h-full antialiased", inter.variable, spaceGrotesk.variable)}
    >
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
        {/* Global film grain (Shelf backgrounds/noise-grain) — a tactile film
            over the whole light surface, multiply-blended at very low opacity. */}
        <div
          aria-hidden
          className="bg-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.045] mix-blend-multiply"
        />
      </body>
    </html>
  );
}
