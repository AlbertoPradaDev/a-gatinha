import { PageHero } from "@/components/sections/PageHero";
import { StoryBlocks } from "@/components/sections/StoryBlocks";
import { Values } from "@/components/sections/Values";
import { CtaBand } from "@/components/sections/CtaBand";
import type { SiteContent } from "@/types/content";

export function AboutPage({ t }: { t: SiteContent }) {
  const { about } = t;
  return (
    <>
      <PageHero hero={about.hero} tone="blue" />
      <StoryBlocks blocks={about.story} tone="cream" />
      <Values {...about.values} />
      <CtaBand cta={about.cta} />
    </>
  );
}
