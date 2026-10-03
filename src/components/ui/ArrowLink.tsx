import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SmartLink } from "@/components/ui/SmartLink";

/** Uppercase text link with a drawn underline + nudging arrow on hover. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:scale-x-100" />
      </span>
      <ArrowRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-1" />
    </SmartLink>
  );
}
