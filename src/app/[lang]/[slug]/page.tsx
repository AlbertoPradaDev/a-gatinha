import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { hasLocale } from "@/i18n/config";
import { routeFromSlug, slugParams } from "@/i18n/routes";
import { MenuPage } from "@/components/pages/MenuPage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ContactPage } from "@/components/pages/ContactPage";
import { LegalBody } from "@/components/sections/LegalBody";

/**
 * Every page except the home, under its localized slug (`/es/nosotros`,
 * `/pt/sobre-nos`…). The slug → page mapping lives in `i18n/routes.ts`; all
 * of them are prerendered and any other slug is a 404 (global-not-found).
 */
export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  return hasLocale(params.lang) ? slugParams(params.lang) : [];
}

async function resolve(params: PageProps<"/[lang]/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return null;
  const route = routeFromSlug(lang, slug);
  if (!route || route === "home") return null;
  return { lang, route };
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const resolved = await resolve(params);
  if (!resolved) return {};
  const { meta } = getContent(resolved.lang)[resolved.route];
  return { title: meta.title, description: meta.description };
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const resolved = await resolve(params);
  if (!resolved) notFound();
  const { lang, route } = resolved;
  const t = getContent(lang);

  switch (route) {
    case "menu":
      return <MenuPage t={t} />;
    case "about":
      return <AboutPage t={t} />;
    case "contact":
      return <ContactPage t={t} lang={lang} />;
    case "privacy":
      return <LegalBody content={t.privacy} />;
    case "terms":
      return <LegalBody content={t.terms} />;
  }
}
