/**
 * Background "tone" a section can be painted in (classes in globals.css).
 * Pages pick the tone per section, so the color rhythm of each page lives in
 * `components/pages/`, not inside the sections.
 */
export type Tone = "light" | "cream" | "yellow" | "blue" | "red";

/** Just the color class (`""` for the default light page background). */
export function toneBg(tone: Tone = "light") {
  return tone === "light" ? "" : `tone-${tone}`;
}

/**
 * Class for a stacked section in `tone`. Light sections keep the hairline
 * divider from the previous one; colored ones don't need it.
 */
export function toneClass(tone: Tone = "light") {
  return tone === "light" ? "border-t border-border" : toneBg(tone);
}
