import { useState } from "react";
import type { PlatformId } from "@/types/home/landing.type";

type NavigatorWithHints = Navigator & {
  userAgentData?: { platform?: string; mobile?: boolean };
};

function detectPlatform(): PlatformId | null {
  if (typeof navigator === "undefined") return null;
  const hints = (navigator as NavigatorWithHints).userAgentData;
  const agent = navigator.userAgent;
  if (hints?.mobile || /android|iphone|ipad|ipod/i.test(agent)) return null;
  const source = hints?.platform || agent;
  if (/mac/i.test(source)) return "mac";
  if (/win/i.test(source)) return "windows";
  if (/linux|x11|cros/i.test(source)) return "linux";
  return null;
}

export function usePlatform() {
  const [platform] = useState(detectPlatform);
  return platform;
}
