import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * One link component for content-driven hrefs: internal paths (`/es/carta`,
 * `#top`) go through next/link, `tel:`/`mailto:` stay plain anchors, and any
 * other absolute URL opens in a new tab. Works as a `Button asChild` child.
 */
export function SmartLink({
  href,
  children,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
