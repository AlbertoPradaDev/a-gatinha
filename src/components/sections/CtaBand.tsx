"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";
import { toneClass, type Tone } from "@/lib/tone";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { CtaBandContent } from "@/types/content";

/**
 * Closing call to action of the inner pages ("Tu mesa te espera", "Pedir
 * ahora"…): big statement on the left, body + buttons on the right, painted in
 * a flag color (red by default) so it reads as the end of the page.
 */
export function CtaBand({ cta, tone = "red" }: { cta: CtaBandContent; tone?: Tone }) {
  const scope = useRef<HTMLElement>(null);
  useScrollReveal(scope);

  return (
    <section
      ref={scope}
      className={cn("py-16 sm:py-20 md:py-28", toneClass(tone))}
    >
      <div className="grid gap-10 px-gutter lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-20">
        <div>
          <span
            data-reveal
            className="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase"
          >
            {cta.eyebrow}
          </span>
          <h2
            data-reveal
            className="mt-5 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-bold tracking-[-0.02em]"
          >
            {cta.title}
          </h2>
        </div>

        <div>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-muted-foreground">
            {cta.body}
          </p>
          <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="group h-12 w-full px-8 text-xs font-semibold tracking-[0.16em] uppercase sm:w-auto"
            >
              <SmartLink href={cta.primary.href}>
                {cta.primary.label}
                <ArrowRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-0.5" />
              </SmartLink>
            </Button>
            {cta.secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 w-full bg-transparent px-7 text-xs font-semibold tracking-[0.16em] uppercase sm:w-auto"
              >
                <SmartLink href={cta.secondary.href}>{cta.secondary.label}</SmartLink>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
