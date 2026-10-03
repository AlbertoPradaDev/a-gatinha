import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { formatHours } from "@/lib/content";
import { localizedPath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/types/content";

export function ContactPage({ t, lang }: { t: SiteContent; lang: Locale }) {
  return (
    <>
      <PageHero hero={t.contact.hero} tone="red" />
      <ContactSection
        lang={lang}
        content={t.contact}
        hours={formatHours(t.common)}
        privacyHref={localizedPath(lang, "privacy")}
      />
    </>
  );
}
