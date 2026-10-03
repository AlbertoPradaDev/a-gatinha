import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { cn } from "@/lib/utils";
import { inter, spaceGrotesk } from "@/lib/fonts";
import { getContent } from "@/lib/content";
import { business } from "@/lib/data/business";
import { hasLocale, htmlLang, locales, ogLocale } from "@/i18n/config";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Curtain } from "@/components/providers/Curtain";
import { introScript } from "@/lib/curtain";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";

// Only the configured languages exist; anything else under /[lang] is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getContent(lang).common;

  return {
    metadataBase: new URL(business.siteUrl),
    title: { default: meta.title, template: meta.titleTemplate },
    description: meta.description,
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      siteName: business.name,
      locale: ogLocale[lang],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

/**
 * Root layout (one per language). Orchestrates only: fonts, smooth scroll,
 * header/footer, the page curtain and the global film grain. Pages render
 * inside <main>.
 */
export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { common } = getContent(lang);

  return (
    <html
      lang={htmlLang[lang]}
      suppressHydrationWarning
      className={cn("h-full antialiased", inter.variable, spaceGrotesk.variable)}
    >
      <head>
        {/* Before first paint: skip the intro if this session already saw it. */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-full">
        <SmoothScroll>
          <SiteHeader common={common} />
          <main id="main">{children}</main>
          <SiteFooter common={common} />
        </SmoothScroll>
        {/* Intro on load + flag-stripe transitions between pages. After
            SmoothScroll so its effects run once Lenis exists. */}
        <Curtain tagline={`${common.tagline} · ${business.address.city}`} />
        {/* Global film grain (Shelf backgrounds/noise-grain) — a tactile film
            over the whole surface at very low opacity. No blend mode: a blended
            fixed layer forces a full repaint on every scroll frame. */}
        <div
          aria-hidden
          className="bg-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.035]"
        />
      </body>
    </html>
  );
}
