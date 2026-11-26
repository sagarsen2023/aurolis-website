import { lazy, Suspense, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { AppWindow } from "@/components/app-window";
import { Starfield } from "@/components/starfield";
import { Wordmark } from "@/components/wordmark";
import { useInView } from "@/hooks/use-in-view";
import { CtaCard } from "./cta-card";

const HeroBlob = lazy(() =>
  import("./hero-blob").then((module) => ({ default: module.HeroBlob })),
);

type HeroProps = {
  revealed: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function intro(revealed: boolean, delay: number, distance = 48) {
  return {
    initial: { opacity: 0, y: distance, filter: "blur(12px)" },
    animate: revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 1.2, delay, ease: EASE },
  };
}

export function Hero({ revealed }: HeroProps) {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(section, "0px");
  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : 420]);
  const titleY = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : 300]);
  const titleOpacity = useTransform(scrollY, [0, 560], [1, reduce ? 1 : 0]);
  const windowY = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : -170]);
  const rotateX = useTransform(scrollY, [0, 760], [reduce ? 0 : 30, 0]);
  const rotateY = useTransform(scrollY, [0, 760], [reduce ? 0 : -12, 0]);
  const rotateZ = useTransform(scrollY, [0, 760], [reduce ? 0 : 7, 0]);
  const windowScale = useTransform(scrollY, [0, 760], [reduce ? 1 : 0.9, 1]);

  return (
    <section
      ref={section}
      id="top"
      aria-label="Aurolis"
      className="relative isolate min-h-[100svh] overflow-clip"
    >
      <motion.div
        style={{ y: backdropY }}
        className="absolute inset-x-0 top-0 -z-10 h-[130svh]"
      >
        <div className="absolute top-[-34svh] left-1/2 h-[90svh] w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(150,120,255,0.55),rgba(106,70,255,0.22)_45%,transparent)]" />
        <Starfield className="absolute inset-0 size-full" />
        <motion.div
          {...intro(revealed, 0.1, 80)}
          className="absolute top-[57svh] left-1/2 aspect-square w-[max(150vw,620px)] -translate-1/2 sm:w-[min(1180px,118vw)]"
        >
          <Suspense fallback={null}>
            <HeroBlob active={inView && revealed} reduced={reduce} />
          </Suspense>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative px-6 pt-[clamp(104px,15svh,170px)]"
      >
        <motion.div
          {...intro(revealed, 0)}
          className="flex flex-col items-center text-center"
        >
          <h1 className="w-[min(74vw,560px)]">
            <Wordmark className="block h-auto w-full drop-shadow-[0_8px_40px_rgba(80,40,200,0.45)]" />
          </h1>
          <p className="mt-3 text-[clamp(16px,1.5vw,20px)] font-medium text-white/90 sm:mt-4">
            The local-first API client
          </p>
        </motion.div>
      </motion.div>

      <div className="relative mx-auto mt-[clamp(36px,7svh,76px)] w-[min(880px,90vw)] pb-[22svh] [perspective:1700px]">
        <motion.div
          style={{ y: windowY, rotateX, rotateY, rotateZ, scale: windowScale }}
          className="origin-[50%_20%] [transform-style:preserve-3d]"
        >
          <motion.div {...intro(revealed, 0.28, 120)}>
            <AppWindow eager />
          </motion.div>
        </motion.div>
      </div>

      <motion.aside
        {...intro(revealed, 0.55, 24)}
        aria-label="Download"
        className="absolute top-[calc(100svh-92px)] right-4 left-4 z-10 sm:top-[calc(100svh-104px)] sm:right-[max(3vw,20px)] sm:left-auto sm:w-[400px]"
      >
        <CtaCard />
      </motion.aside>
    </section>
  );
}
