import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  orbits?: boolean;
};

export function GlowCard({
  children,
  className,
  innerClassName,
  orbits = false,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-[22px] bg-[linear-gradient(150deg,rgba(237,197,252,0.6),rgba(255,255,255,0.08)_32%,rgba(255,255,255,0.05)_70%,rgba(185,163,255,0.25))] p-px shadow-[0_30px_80px_-28px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[21px] bg-[linear-gradient(160deg,#211e24,#141216_70%)]",
          innerClassName,
        )}
      >
        {orbits && (
          <svg
            viewBox="0 0 200 200"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            aria-hidden
            className="pointer-events-none absolute -right-16 -bottom-20 size-64"
          >
            {[0, 40, 80, 120].map((angle) => (
              <ellipse
                key={angle}
                cx="100"
                cy="100"
                rx="90"
                ry="34"
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
          </svg>
        )}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
