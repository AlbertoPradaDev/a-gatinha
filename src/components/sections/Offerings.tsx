"use client";

import { useRef } from "react";
import { Bike, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "@/lib/tone";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Offering, SectionIntro } from "@/types/content";

const icons: Record<Offering["icon"], typeof Bike> = {
  "dine-in": UtensilsCrossed,
  takeaway: ShoppingBag,
  delivery: Bike,
};

/**
 * "Lo que hacemos" — the ways to get the food (eat in, take away, delivery)
 * as cards with an icon, their tags and a link to where that journey goes.
 */
export function Offerings({
  intro,
  items,
  tone,
}: {
  intro: SectionIntro;
  items: Offering[];
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
        {items.map((item) => {
          const Icon = icons[item.icon];
          return (
            <article
              key={item.title}
              data-reveal
              className="flex flex-col border border-border bg-card p-8 text-card-foreground lg:p-10"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-8 font-display text-3xl font-bold tracking-tight md:text-4xl">
                {item.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex-1 leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ArrowLink href={item.link.href} className="mt-8 self-start">
                {item.link.label}
              </ArrowLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}
