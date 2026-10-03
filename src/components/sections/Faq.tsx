"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "@/lib/tone";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { FaqContent } from "@/types/content";

/**
 * FAQ: heading (+ "ask us anything" link) on the left, native <details>
 * accordion on the right — accessible and works without JavaScript.
 */
export function Faq({ faq, tone }: { faq: FaqContent; tone?: Tone }) {
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  return (
    <section ref={scope} className={cn("py-16 sm:py-20 md:py-24", toneClass(tone))}>
      <div className="grid gap-12 px-gutter lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading {...faq.intro} />
          {faq.cta && (
            <div data-reveal className="mt-8">
              <ArrowLink href={faq.cta.href}>{faq.cta.label}</ArrowLink>
            </div>
          )}
        </div>

        <div className="border-t border-border">
          {faq.items.map((item) => (
            <details
              key={item.question}
              data-reveal
              // Opening changes the page height: re-measure later scroll triggers.
              onToggle={() => ScrollTrigger.refresh()}
              className="group border-b border-border"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="font-display text-lg font-semibold tracking-tight md:text-xl">
                  {item.question}
                </span>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-[var(--duration-fast)] group-hover:bg-muted">
                  <Plus className="size-4 transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-open:rotate-45" />
                </span>
              </summary>
              <div className="max-w-2xl pb-7">
                <p className="leading-relaxed text-muted-foreground">{item.answer}</p>
                {item.link && (
                  <ArrowLink href={item.link.href} className="mt-5">
                    {item.link.label}
                  </ArrowLink>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
