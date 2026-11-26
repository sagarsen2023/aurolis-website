import type { ComponentType } from "react";
import { cn } from "@/lib/cn";

type IconBadgeProps = {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  tone?: "ring" | "lav" | "dark" | "coral";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = { sm: "size-9", md: "size-10", lg: "size-11" };

export function IconBadge({
  icon: Icon,
  tone = "ring",
  size = "lg",
  className,
}: IconBadgeProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        SIZES[size],
        tone === "ring" &&
          "border border-lav/70 bg-white/[0.04] text-lav shadow-[0_0_24px_-4px_rgba(237,197,252,0.45)]",
        tone === "lav" &&
          "bg-lav text-lav-ink shadow-[0_0_30px_-4px_rgba(237,197,252,0.6)]",
        tone === "dark" && "border border-white/10 bg-[#2a272e] text-white/85",
        tone === "coral" &&
          "border border-coral/80 bg-[#2a1f22] text-[#ff8a75] shadow-[0_0_24px_-6px_rgba(231,56,37,0.6)]",
        className,
      )}
    >
      <Icon className="size-[45%]" strokeWidth={1.6} />
    </span>
  );
}
