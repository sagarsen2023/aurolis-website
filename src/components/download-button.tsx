import { ArrowDownToLine } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import { PLATFORMS } from "@/constants/downloads";
import { SITE_LINKS } from "@/constants/site";
import { usePlatform } from "@/hooks/use-platform";

type DownloadButtonProps = {
  size?: "md" | "lg";
  className?: string;
};

export function DownloadButton({
  size = "md",
  className,
}: DownloadButtonProps) {
  const detected = usePlatform();
  const platform = PLATFORMS.find((item) => item.id === detected);
  const Icon = platform?.icon ?? ArrowDownToLine;
  return (
    <LinkButton
      href={platform ? SITE_LINKS.latestRelease : "#download"}
      size={size}
      className={className}
      icon={<Icon className="size-[1.05em]" aria-hidden />}
    >
      {platform ? `Download for ${platform.name}` : "Download now"}
    </LinkButton>
  );
}
