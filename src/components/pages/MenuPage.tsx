import { PageHero } from "@/components/sections/PageHero";
import { MenuList } from "@/components/sections/MenuList";
import { CtaBand } from "@/components/sections/CtaBand";
import type { SiteContent } from "@/types/content";

export function MenuPage({ t }: { t: SiteContent }) {
  const { menu } = t;
  return (
    <>
      <PageHero hero={menu.hero} tone="yellow" />
      <MenuList
        label={menu.categoriesLabel}
        categories={menu.categories}
        tags={menu.tags}
        note={menu.note}
      />
      <CtaBand cta={menu.cta} />
    </>
  );
}
