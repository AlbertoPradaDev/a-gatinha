import type { LegalContent } from "@/types/content";

/**
 * Privacy / terms page: plain, readable long-form text (no motion) in a
 * narrow column, with the section headings in a sticky side index on desktop.
 */
export function LegalBody({ content }: { content: LegalContent }) {
  return (
    <article className="px-gutter pt-36 pb-20 sm:pt-44 md:pb-28">
      <header className="max-w-3xl">
        <span className="text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          {content.eyebrow}
        </span>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-bold tracking-[-0.02em]">
          {content.title}
        </h1>
        <p className="mt-5 text-sm text-muted-foreground">{content.updated}</p>
        <p className="mt-8 text-lg leading-relaxed">{content.intro}</p>
      </header>

      <div className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-[1fr_2.2fr] lg:gap-20">
        <nav aria-label={content.title} className="hidden lg:block">
          <ol className="sticky top-28 flex flex-col gap-3 text-sm">
            {content.sections.map((section, i) => (
              <li key={section.heading}>
                <a
                  href={`#s${i + 1}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex max-w-3xl flex-col gap-12">
          {content.sections.map((section, i) => (
            <section key={section.heading} id={`s${i + 1}`} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.paragraphs.map((text) => (
                  <p key={text} className="leading-relaxed text-muted-foreground">
                    {text}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
