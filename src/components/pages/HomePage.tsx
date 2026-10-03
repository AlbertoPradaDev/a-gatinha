import { Hero } from "@/components/sections/Hero";
import { Offerings } from "@/components/sections/Offerings";
import { DishGallery } from "@/components/sections/DishGallery";
import { CinematicShowcase } from "@/components/sections/CinematicShowcase";
import { StoryTeaser } from "@/components/sections/StoryTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Location } from "@/components/sections/Location";
import { formatHours } from "@/lib/content";
import type { SiteContent } from "@/types/content";

export function HomePage({ t }: { t: SiteContent }) {
  const { home } = t;
  return (
    <>
      <Hero hero={home.hero} />
      <Offerings {...home.offerings} tone="yellow" />
      <DishGallery {...home.dishes} />
      <CinematicShowcase showcase={home.showcase} />
      <StoryTeaser story={home.story} tone="blue" />
      <Testimonials {...home.testimonials} tone="cream" />
      <Faq faq={home.faq} />
      <Location content={home.location} hours={formatHours(t.common)} />
    </>
  );
}
