import { APP_SCREENSHOT } from "@/constants/site";
import { cn } from "@/lib/cn";

type AppWindowProps = {
  className?: string;
  sizes?: string;
  eager?: boolean;
};

export function AppWindow({
  className,
  sizes = "(min-width: 1024px) 900px, 92vw",
  eager = false,
}: AppWindowProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[14px] bg-panel p-px shadow-[0_50px_120px_-30px_rgba(106,70,255,0.55),0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:rounded-[18px]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(145deg,rgba(237,197,252,0.7),rgba(255,255,255,0.08)_30%,rgba(255,255,255,0.04)_70%,rgba(185,163,255,0.35))]" />
      <img
        src={APP_SCREENSHOT.src}
        srcSet={APP_SCREENSHOT.srcSet}
        sizes={sizes}
        width={APP_SCREENSHOT.width}
        height={APP_SCREENSHOT.height}
        alt={APP_SCREENSHOT.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="relative block h-auto w-full rounded-[13px] sm:rounded-[17px]"
      />
      <div className="pointer-events-none absolute inset-px rounded-[13px] bg-[linear-gradient(160deg,rgba(255,255,255,0.08),transparent_35%)] sm:rounded-[17px]" />
    </figure>
  );
}
