import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  icon?: ReactNode;
};

export function LinkButton({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lav",
        variant === "primary" && "bg-lav text-lav-ink hover:bg-[#f6dcff]",
        variant === "ghost" &&
          "border border-line2 bg-white/[0.04] text-white hover:bg-white/[0.09]",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}
