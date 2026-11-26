import { LinkButton } from "@/components/link-button";
import { SITE_LINKS } from "@/constants/site";

export function CtaCard() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[rgba(26,23,30,0.62)] py-2.5 pr-2.5 pl-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div className="min-w-0">
        <p className="text-[15px] font-medium text-white">
          Free and open source
        </p>
        <p className="mt-0.5 text-[13px] text-white/60">
          For macOS, Windows and Linux
        </p>
      </div>
      <LinkButton href={SITE_LINKS.releases}>Get Aurolis</LinkButton>
    </div>
  );
}
