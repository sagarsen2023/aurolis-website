import { lazy, Suspense, useRef } from "react";
import { GitBranch } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { AppWindow } from "@/components/app-window";
import { DownloadButton } from "@/components/download-button";
import { GithubIcon } from "@/components/github-icon";
import { LinkButton } from "@/components/link-button";
import { Starfield } from "@/components/starfield";
import { GIT_HOSTS, IMPORT_SOURCES } from "@/constants/downloads";
import { SITE_LINKS } from "@/constants/site";
import { useInView } from "@/hooks/use-in-view";

const HeroBlob = lazy(() =>
  import("./hero-blob").then((module) => ({ default: module.HeroBlob })),
);

type HeroProps = {
  revealed: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function intro(revealed: boolean, delay: number, distance = 36) {
  return {
    initial: { opacity: 0, y: distance, filter: "blur(10px)" },
    animate: revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 1.1, delay, ease: EASE },
  };
}

function LogoGroup({
  label,
  items,
}: Readonly<{
  label: string;
  items: ReadonlyArray<{
    name: string;
    icon: (typeof GIT_HOSTS)[number]["icon"];
  }>;
}>) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      <span className="text-[13px] text-white/45">{label}</span>
      {items.map((item) => (
        <span
          key={item.name}
          className="flex items-center gap-2 text-[15px] font-medium text-white/70"
        >
          <item.icon className="size-[18px]" aria-hidden />
          {item.name}
        </span>
      ))}
    </div>
  );
}

export function Hero({ revealed }: HeroProps) {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(section, "0px");
  const { scrollY } = useScroll();
  const still = (value: number) => (reduce ? 0 : value);
  const backdropY = useTransform(scrollY, [0, 1000], [0, still(380)]);
  const copyY = useTransform(scrollY, [0, 1000], [0, still(160)]);
  const copyOpacity = useTransform(scrollY, [0, 400], [1, reduce ? 1 : 0]);
  const windowY = useTransform(scrollY, [0, 1000], [0, still(-120)]);
  const rotateX = useTransform(scrollY, [0, 700], [still(16), 0]);
  const windowScale = useTransform(scrollY, [0, 700], [reduce ? 1 : 0.94, 1]);
  const leftChipY = useTransform(scrollY, [0, 1000], [0, still(-260)]);
  const rightChipY = useTransform(scrollY, [0, 1000], [0, still(-60)]);

  return (
    <section
      ref={section}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip"
    >
      <motion.div
        style={{ y: backdropY }}
        className="absolute inset-x-0 top-0 -z-10 h-[150svh]"
      >
        <div className="absolute top-[-38svh] left-1/2 h-[95svh] w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(150,120,255,0.5),rgba(106,70,255,0.18)_45%,transparent)]" />
        <Starfield className="absolute inset-0 size-full" />
        <motion.div
          {...intro(revealed, 0.2, 80)}
          className="absolute top-[86svh] left-1/2 aspect-square w-[max(150vw,620px)] -translate-1/2 opacity-80 sm:w-[min(1240px,120vw)]"
        >
          <Suspense fallback={null}>
            <HeroBlob active={inView && revealed} reduced={reduce} />
          </Suspense>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative mx-auto flex max-w-[1000px] flex-col items-center px-5 pt-[clamp(120px,18svh,180px)] text-center"
      >
        <motion.h1
          {...intro(revealed, 0)}
          id="hero-title"
          className="text-[clamp(40px,5.8vw,80px)] leading-[1] font-medium tracking-[-0.045em] text-balance"
        >
          The open-source API client{" "}
          <span className="font-serif font-normal tracking-[-0.02em] italic">
            built on git
          </span>
        </motion.h1>

        <motion.p
          {...intro(revealed, 0.16)}
          className="mt-6 max-w-[660px] text-[clamp(16px,1.35vw,19px)] leading-relaxed text-pretty text-white/70"
        >
          Send REST, GraphQL, WebSocket and Socket.IO requests from a fast
          desktop app. Every collection is a folder of plain files in a git
          repository you own, so your team reviews API changes the way it
          reviews code.
        </motion.p>

        <motion.div
          {...intro(revealed, 0.24)}
          className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <DownloadButton size="lg" />
          <LinkButton
            href={SITE_LINKS.repository}
            variant="ghost"
            size="lg"
            icon={<GithubIcon className="size-[1.05em]" />}
          >
            Star on GitHub
          </LinkButton>
        </motion.div>

        <motion.p
          {...intro(revealed, 0.3, 16)}
          className="mt-5 text-[13px] text-white/50"
        >
          Free and open source · macOS, Windows and Linux
        </motion.p>
      </motion.div>

      <div className="relative mx-auto mt-[clamp(48px,8svh,88px)] w-[min(1120px,92vw)] [perspective:2200px]">
        <motion.div
          style={{ y: windowY, rotateX, scale: windowScale }}
          className="origin-top [transform-style:preserve-3d]"
        >
          <motion.div {...intro(revealed, 0.34, 120)}>
            <AppWindow eager sizes="(min-width: 1200px) 1120px, 92vw" />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: leftChipY }}
          className="pointer-events-none absolute top-[58%] -left-[3%] hidden md:block"
        >
          <motion.div
            {...intro(revealed, 0.6, 30)}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(24,21,28,0.78)] px-4 py-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <span className="size-2.5 rounded-full bg-[#6fdc8c] shadow-[0_0_12px_#6fdc8c]" />
            <span className="font-mono text-[13px] text-white">
              201 Created
            </span>
            <span className="text-[13px] text-white/50">160 ms · 244 B</span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: rightChipY }}
          className="pointer-events-none absolute top-[14%] -right-[3%] hidden md:block"
        >
          <motion.div
            {...intro(revealed, 0.7, 30)}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(24,21,28,0.78)] py-3 pr-3 pl-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <GitBranch className="size-4 text-vio" aria-hidden />
            <span className="text-[13px] text-white">
              Commit &amp; sync on main
            </span>
            <span className="rounded-lg bg-lav px-2 py-0.5 text-[12px] font-semibold text-lav-ink">
              10 changes
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto flex max-w-[1100px] flex-col items-center gap-5 px-5 pt-[clamp(48px,7vw,88px)] pb-[clamp(64px,9vw,120px)] lg:flex-row lg:justify-center lg:gap-14">
        <LogoGroup label="Imports from" items={IMPORT_SOURCES} />
        <span aria-hidden className="hidden h-6 w-px bg-white/15 lg:block" />
        <LogoGroup label="Syncs with" items={GIT_HOSTS} />
      </div>
    </section>
  );
}
