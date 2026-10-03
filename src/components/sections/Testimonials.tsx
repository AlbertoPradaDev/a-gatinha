"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "@/lib/tone";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SectionIntro, Testimonial } from "@/types/content";

/** Customer quotes: three bordered cards with an oversized opening quote. */
export function Testimonials({
  intro,
  items,
  tone,
}: {
  intro: SectionIntro;
  items: Testimonial[];
  tone?: Tone;
}) {
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  return (
    <section ref={scope} className={cn("py-16 sm:py-20 md:py-24", toneClass(tone))}>
      <div className="px-gutter">
        <SectionHeading {...intro} />
      </div>

      <div className="mt-12 grid gap-4 px-gutter md:mt-16 md:grid-cols-3">
        {items.map((item) => (
          <figure
            key={item.author}
            data-reveal
            className="flex flex-col border border-border bg-card p-8 text-card-foreground lg:p-10"
          >
            <span
              aria-hidden
              className="font-display text-6xl leading-none font-bold text-brand"
            >
              “
            </span>
            <blockquote className="mt-2 flex-1 text-lg leading-relaxed">
              {item.quote}
            </blockquote>
            <figcaption className="mt-8 border-t border-border pt-5">
              <span className="block font-display font-semibold tracking-tight">
                {item.author}
              </span>
              <span className="mt-1 block text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {item.source}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
