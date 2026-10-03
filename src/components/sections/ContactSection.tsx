"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/SmartLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { business, fullAddress, whatsappLink } from "@/lib/data/business";
import type { Locale } from "@/i18n/config";
import type { HoursRow } from "@/lib/content";
import type { ContactContent } from "@/types/content";

const fieldClass =
  "w-full rounded-none border border-input bg-background px-4 text-base outline-none transition-colors duration-[var(--duration-fast)] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25";

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-semibold tracking-[0.16em] uppercase">
        {label}
        {hint && (
          <span className="ml-2 font-normal tracking-normal text-muted-foreground normal-case">
            ({hint})
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

/**
 * Contact page body. The form has no backend: it composes the inquiry and
 * hands it to WhatsApp (wa.me with pre-filled text) or the visitor's email
 * app (mailto:), so nothing is stored by the site. Next to it, the direct
 * channels: phone, WhatsApp, email, address and opening hours.
 */
export function ContactSection({
  lang,
  content,
  hours,
  privacyHref,
}: {
  lang: Locale;
  content: ContactContent;
  hours: HoursRow[];
  privacyHref: string;
}) {
  const { form, channels } = content;
  const scope = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  useScrollReveal(scope);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const date = get("date");
    const prettyDate = date
      ? new Date(`${date}T12:00:00`).toLocaleDateString(lang, { dateStyle: "full" })
      : "";

    const text = [
      form.messageIntro,
      "",
      ...[
        [form.name, get("name")],
        [form.phone, get("phone")],
        [form.email, get("email")],
        [form.reason, get("reason")],
        [form.date, prettyDate],
        [form.guests, get("guests")],
      ]
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`),
      "",
      get("message"),
    ].join("\n");

    if (submitter?.value === "email") {
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(form.emailSubject)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    }
    setSent(true);
  };

  return (
    <section ref={scope} className="py-16 sm:py-20 md:py-24">
      <div className="grid gap-14 px-gutter lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div data-reveal aria-live="polite">
          {sent ? (
            <div className="border border-border bg-card p-8 md:p-12">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {form.sent.title}
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                {form.sent.body}
              </p>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setSent(false)}
                className="mt-8 h-12 px-7 text-xs font-semibold tracking-[0.16em] uppercase"
              >
                {form.sent.again}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              // Fallback before hydration / without JS: hand the fields to the
              // email app instead of a GET that would put them in the URL.
              action={`mailto:${business.email}`}
              method="post"
              encType="text/plain"
              className="grid gap-6 sm:grid-cols-2"
            >
              <Field label={form.name}>
                <input name="name" required autoComplete="name" className={cn(fieldClass, "h-12")} />
              </Field>
              <Field label={form.phone} hint={form.optional}>
                <input name="phone" type="tel" autoComplete="tel" className={cn(fieldClass, "h-12")} />
              </Field>
              <Field label={form.email} hint={form.optional}>
                <input name="email" type="email" autoComplete="email" className={cn(fieldClass, "h-12")} />
              </Field>
              <Field label={form.reason}>
                <select name="reason" defaultValue={form.reasons[0]} className={cn(fieldClass, "h-12 cursor-pointer")}>
                  {form.reasons.map((reason) => (
                    <option key={reason}>{reason}</option>
                  ))}
                </select>
              </Field>
              <Field label={form.date} hint={form.optional}>
                <input name="date" type="date" className={cn(fieldClass, "h-12")} />
              </Field>
              <Field label={form.guests} hint={form.optional}>
                <input name="guests" type="number" min={1} inputMode="numeric" className={cn(fieldClass, "h-12")} />
              </Field>
              <Field label={form.message} className="sm:col-span-2">
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={form.messagePlaceholder}
                  className={cn(fieldClass, "resize-y py-3")}
                />
              </Field>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <Button
                  type="submit"
                  value="whatsapp"
                  size="lg"
                  className="h-12 gap-2 px-8 text-xs font-semibold tracking-[0.16em] uppercase"
                >
                  <WhatsAppIcon className="size-4" />
                  {form.sendWhatsapp}
                </Button>
                <Button
                  type="submit"
                  value="email"
                  variant="outline"
                  size="lg"
                  className="h-12 gap-2 px-7 text-xs font-semibold tracking-[0.16em] uppercase"
                >
                  <Mail className="size-4" />
                  {form.sendEmail}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground sm:col-span-2">
                {form.privacyNote}{" "}
                <SmartLink href={privacyHref} className="underline underline-offset-4 hover:text-foreground">
                  {form.privacyLink}
                </SmartLink>
                .
              </p>
            </form>
          )}
        </div>

        <aside data-reveal className="lg:border-l lg:border-border lg:pl-12">
          <h2 className="font-display text-2xl font-bold tracking-tight">{channels.title}</h2>
          <dl className="mt-8 flex flex-col divide-y divide-border border-y border-border">
            {[
              { label: channels.phone, value: business.phone.display, href: business.phone.href },
              { label: channels.whatsapp, value: business.whatsapp.display, href: business.whatsapp.href },
              { label: channels.email, value: business.email, href: `mailto:${business.email}` },
            ].map((row) => (
              <div key={row.label} className="py-5">
                <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {row.label}
                </dt>
                <dd className="mt-1.5">
                  <SmartLink href={row.href} className="text-lg font-medium hover:text-brand">
                    {row.value}
                  </SmartLink>
                </dd>
              </div>
            ))}
            <div className="py-5">
              <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {channels.address}
              </dt>
              <dd className="mt-1.5">
                <p className="text-lg font-medium">{fullAddress}</p>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {channels.directions}
                  <ArrowUpRight className="size-4" />
                </a>
              </dd>
            </div>
            <div className="py-5">
              <dt className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {channels.hours}
              </dt>
              <dd className="mt-2 grid gap-1.5">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span className="font-medium tabular-nums">{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
