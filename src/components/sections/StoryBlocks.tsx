"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { toneBg, type Tone } from "@/lib/tone";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { StoryBlock } from "@/types/content";

/** The About story: one row per chapter — eyebrow + title left, text right. */
export function StoryBlocks({ blocks, tone }: { blocks: StoryBlock[]; tone?: Tone }) {
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  return (
    <section ref={scope} className={toneBg(tone)}>
      {blocks.map((block, i) => (
        <div
          key={block.title}
          className={cn(
            "grid gap-8 px-gutter py-16 sm:py-20 md:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20",
            i > 0 && "border-t border-border",
          )}
        >
          <div>
            <span
              data-reveal
              className="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase"
            >
              {block.eyebrow}
            </span>
            <h2
              data-reveal
              className="mt-5 max-w-[14ch] font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.02em]"
            >
              {block.title}
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pt-12">
            {block.paragraphs.map((text) => (
              <p
                key={text}
                data-reveal
                className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
