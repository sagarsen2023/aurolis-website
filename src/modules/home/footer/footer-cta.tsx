import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { AppWindow } from "@/components/app-window";
import { GithubIcon } from "@/components/github-icon";
import { LinkButton } from "@/components/link-button";
import { Starfield } from "@/components/starfield";
import { SITE_LINKS } from "@/constants/site";

export function FooterCta() {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: panel,
    offset: ["start end", "end start"],
  });
  const shotY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : 90, reduce ? 0 : -70],
  );
  const shotRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? -8 : -12, -6],
  );

  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="scroll-mt-24 px-[max(4vw,16px)]"
    >
      <div
        ref={panel}
        className="relative mx-auto max-w-[1220px] rounded-[30px] bg-[linear-gradient(140deg,rgba(237,197,252,0.5),rgba(255,255,255,0.08)_30%,rgba(255,255,255,0.05)_60%,rgba(231,56,37,0.45))] p-px"
      >
        <div className="relative grid overflow-hidden rounded-[29px] bg-[#0e0c11] md:min-h-[460px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Starfield className="absolute inset-0 size-full" density={0.8} />
          <div className="pointer-events-none absolute -right-[10%] -bottom-[40%] h-[120%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(106,70,255,0.55),rgba(106,70,255,0.12)_55%,transparent)]" />
          <div className="relative z-10 flex flex-col justify-center px-7 pt-12 pb-6 sm:px-12 md:py-16 md:pl-16">
            <h2
              id="download-title"
              className="text-[clamp(32px,4.2vw,54px)] leading-[1.04] font-medium tracking-[-0.03em] text-balance"
            >
              Your API workspace starts here
            </h2>
            <p className="mt-4 max-w-[26rem] text-[17px] leading-relaxed text-white/70">
              Download Aurolis, choose a folder, and your first request is a
              file you own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={SITE_LINKS.releases}>Get Aurolis</LinkButton>
              <LinkButton
                href={SITE_LINKS.repository}
                variant="ghost"
                icon={<GithubIcon className="size-4" />}
              >
                View source
              </LinkButton>
            </div>
          </div>
          <div className="relative h-[280px] sm:h-[360px] md:h-auto">
            <motion.div
              style={{ y: shotY, rotate: shotRotate }}
              className="absolute top-[14%] left-[8%] w-[150%] origin-top-left sm:w-[125%] md:top-[18%] md:left-[4%] md:w-[150%]"
            >
              <AppWindow sizes="(min-width: 768px) 1000px, 150vw" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
