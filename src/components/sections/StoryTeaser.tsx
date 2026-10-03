"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "@/lib/tone";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { StoryTeaserContent } from "@/types/content";

/** "Nuestra historia" teaser on the home page: photo + short story → About. */
export function StoryTeaser({ story, tone }: { story: StoryTeaserContent; tone?: Tone }) {
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  return (
    <section ref={scope} className={cn("py-16 sm:py-20 md:py-24", toneClass(tone))}>
      <div className="grid gap-12 px-gutter lg:grid-cols-2 lg:items-center lg:gap-20">
        <figure data-reveal className="relative aspect-[4/5] overflow-hidden border border-border bg-muted sm:aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 pt-16 pb-6 text-sm font-semibold tracking-[0.18em] text-white uppercase">
            {story.caption}
          </figcaption>
        </figure>

        <div>
          <SectionHeading {...story.intro} />
          <div className="mt-6 flex max-w-xl flex-col gap-4">
            {story.paragraphs.map((text) => (
              <p
                key={text}
                data-reveal
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {text}
              </p>
            ))}
          </div>
          <div data-reveal className="mt-10">
            <ArrowLink href={story.link.href}>{story.link.label}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
