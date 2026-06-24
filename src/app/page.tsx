import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { CinematicShowcase } from "@/components/sections/CinematicShowcase";
import { Features } from "@/components/sections/Features";
import { Work } from "@/components/sections/Work";
import { CTA } from "@/components/sections/CTA";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CinematicShowcase />
        <Features />
        <Work />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}
