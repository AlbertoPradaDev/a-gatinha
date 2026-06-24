import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types/content";

/**
 * Section heading: a brand-ticked uppercase eyebrow, a display title, and an
 * optional intro. Parts are marked `data-reveal` so the parent section's
 * useScrollReveal animates them in. Presentational only (no client code).
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionIntro & { align?: "left" | "center"; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span
        data-reveal
        className={cn(
          "text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase",
          align === "center" && "text-center",
        )}
      >
        {eyebrow}
      </span>

      <h2
        data-reveal
        className="mt-5 max-w-[18ch] font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-bold tracking-[-0.02em]"
      >
        {title}
      </h2>

      {intro && (
        <p
          data-reveal
          className={cn(
            "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
