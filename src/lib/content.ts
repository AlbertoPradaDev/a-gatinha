import type { Locale } from "@/i18n/config";
import type { CommonContent, OpeningHours, SiteContent } from "@/types/content";
import { business } from "@/lib/data/business";
import { es } from "@/lib/data/es";
import { pt } from "@/lib/data/pt";

const content: Record<Locale, SiteContent> = { es, pt };

/**
 * All copy for one language. Called from Server Components (layouts/pages),
 * which pass each section only the slice it renders — so the other language
 * never reaches the client bundle.
 */
export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export interface HoursRow {
  day: string;
  time: string;
}

/** `business.hours` as display rows: "Martes – Jueves · 12:00 – 23:00". */
export function formatHours(
  common: CommonContent,
  hours: OpeningHours[] = business.hours,
): HoursRow[] {
  return hours.map(({ days, opens, closes }) => {
    const first = common.days[days[0]];
    const last = common.days[days[days.length - 1]];
    return {
      day: days.length > 1 ? `${first} – ${last}` : first,
      time: opens && closes ? `${opens} – ${closes}` : common.closed,
    };
  });
}
