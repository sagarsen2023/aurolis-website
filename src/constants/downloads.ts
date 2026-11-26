import type { IconType } from "react-icons";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa6";
import {
  SiBitbucket,
  SiGithub,
  SiGitlab,
  SiHoppscotch,
  SiPostman,
} from "react-icons/si";
import type { PlatformId } from "@/types/home/landing.type";

export const PLATFORMS: ReadonlyArray<{
  id: PlatformId;
  name: string;
  icon: IconType;
}> = [
  {
    id: "mac",
    name: "macOS",
    icon: FaApple,
  },
  {
    id: "windows",
    name: "Windows",
    icon: FaWindows,
  },
  {
    id: "linux",
    name: "Linux",
    icon: FaLinux,
  },
];

export const IMPORT_SOURCES: ReadonlyArray<{ name: string; icon: IconType }> = [
  { name: "Postman", icon: SiPostman },
  { name: "Hoppscotch", icon: SiHoppscotch },
];

export const GIT_HOSTS: ReadonlyArray<{ name: string; icon: IconType }> = [
  { name: "GitHub", icon: SiGithub },
  { name: "GitLab", icon: SiGitlab },
  { name: "Bitbucket", icon: SiBitbucket },
];
