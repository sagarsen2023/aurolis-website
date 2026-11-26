import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  icon?: ReactNode;
};

export function LinkButton({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lav",
        size === "md" && "min-h-11 rounded-xl px-5 text-[15px]",
        size === "lg" && "min-h-13 rounded-2xl px-6 text-[16px]",
        variant === "primary" &&
          "bg-lav text-lav-ink shadow-[0_10px_40px_-12px_rgba(237,197,252,0.7)] hover:bg-[#f6dcff]",
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
