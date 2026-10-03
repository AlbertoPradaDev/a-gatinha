"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { DishTag, MenuCategory, MenuItem } from "@/types/content";

/** Fixed header (80px) + sticky chip bar (~61px): where a category lands. */
const BAR_BOTTOM = 141;

/**
 * One dish. Phones: a list row — square thumbnail left, text right. From `sm`
 * up the same markup becomes a grid card — photo on top (4:3), text below.
 */
function DishCard({ item, tags }: { item: MenuItem; tags: Record<DishTag, string> }) {
  return (
    <li
      data-reveal
      className="group flex gap-4 border-b border-border py-4 sm:flex-col sm:gap-0 sm:border sm:bg-card sm:py-0 sm:text-card-foreground"
    >
      <div className="relative size-24 shrink-0 overflow-hidden bg-muted sm:aspect-[4/3] sm:size-auto sm:w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 96px"
          className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-premium)] group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg leading-tight font-semibold tracking-tight sm:text-xl">
            {item.name}
          </h3>
          {item.price && (
            <span className="shrink-0 font-display font-semibold text-brand tabular-nums sm:text-lg">
              {item.price}
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:line-clamp-none sm:flex-1 sm:text-base">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <ul className="mt-2.5 flex flex-wrap gap-1.5 sm:mt-4">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-brand-muted px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.08em] text-brand uppercase"
              >
                {tags[tag]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/** One category: title + description, then its dishes; revealed as it enters. */
function CategoryBlock({
  category,
  tinted,
  tags,
}: {
  category: MenuCategory;
  tinted: boolean;
  tags: Record<DishTag, string>;
}) {
  const scope = useRef<HTMLDivElement>(null);
  useScrollReveal(scope);

  return (
    <div
      ref={scope}
      id={category.id}
      className={cn("scroll-mt-40 px-gutter py-12 md:py-16", tinted && "tone-cream")}
    >
      <div
        data-reveal
        className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10"
      >
        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-bold tracking-[-0.02em]">
          {category.title}
        </h2>
        {category.description && (
          <p className="max-w-sm leading-relaxed text-muted-foreground md:text-right">
            {category.description}
          </p>
        )}
      </div>

      <ul className="mt-6 border-t border-border sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-4 sm:border-t-0 lg:grid-cols-3 xl:grid-cols-4">
        {category.items.map((item) => (
          <DishCard key={item.name} item={item} tags={tags} />
        ))}
      </ul>
    </div>
  );
}

/**
 * The full menu: a sticky row of category chips (scroll-spy highlights the one
 * in view, clicking smooth-scrolls to it) over the categories, alternating
 * light / cream backgrounds, each a grid of dish cards with photo, price and
 * dietary tags.
 */
export function MenuList({
  label,
  categories,
  tags,
  note,
}: {
  label: string;
  categories: MenuCategory[];
  tags: Record<DishTag, string>;
  note: string;
}) {
  const [active, setActive] = useState(categories[0]?.id);
  const chips = useRef<HTMLUListElement>(null);

  // Scroll-spy: the last category whose top has passed under the chip bar.
  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= BAR_BOTTOM + 40) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [categories]);

  // Keep the active chip visible in the horizontally scrolling bar (mobile).
  useEffect(() => {
    const list = chips.current;
    const chip = list?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!list || !chip) return;
    list.scrollTo({ left: chip.offsetLeft - list.offsetWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <section className="pb-16 sm:pb-20 md:pb-24">
      <nav
        aria-label={label}
        className="sticky top-20 z-30 border-b border-border bg-background/90 backdrop-blur-md"
      >
        <ul
          ref={chips}
          className="flex gap-2 overflow-x-auto px-gutter py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => (
            <li key={c.id} data-chip={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(`#${c.id}`, -BAR_BOTTOM);
                  history.replaceState(null, "", `#${c.id}`);
                }}
                aria-current={active === c.id ? "true" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-full border px-4 text-xs font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-[var(--duration-fast)]",
                  active === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((category, i) => (
        <CategoryBlock key={category.id} category={category} tinted={i % 2 === 1} tags={tags} />
      ))}

      <p className="mt-12 max-w-3xl px-gutter text-sm leading-relaxed text-muted-foreground">
        {note}
      </p>
    </section>
  );
}
