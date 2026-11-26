import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { LogoDraw } from "@/components/logo-draw";

export function LogoOrbit() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const drawn = useTransform(scrollYProgress, [0.04, 0.74], [0, 1]);
  const finished = useMotionValue(1);
  const glow = useTransform(scrollYProgress, [0, 0.3, 0.75], [0.15, 0.55, 1]);
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.74, 0.9],
    [reduce ? 1 : 0, 1],
  );
  const captionY = useTransform(
    scrollYProgress,
    [0.74, 0.9],
    [reduce ? 0 : 28, 0],
  );

  return (
    <section
      ref={section}
      id="about"
      aria-labelledby="about-title"
      className={reduce ? "relative" : "relative h-[270svh]"}
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24">
        <motion.div
          style={{ opacity: reduce ? 1 : glow }}
          className="pointer-events-none absolute top-1/2 left-1/2 size-[min(110vw,820px)] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(106,70,255,0.2),rgba(106,70,255,0.06)_55%,transparent)]"
        />
        <LogoDraw
          progress={reduce ? finished : drawn}
          ghost
          title="The Aurolis mark"
          className="relative w-[min(58vw,340px)]"
        />
        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="relative mt-10 max-w-[36rem] text-center"
        >
          <h2
            id="about-title"
            className="text-[clamp(28px,3.6vw,44px)] leading-[1.08] font-medium tracking-[-0.025em] text-balance"
          >
            An API client that lives in your repository
          </h2>
          <p className="mx-auto mt-4 max-w-[30rem] text-[17px] leading-relaxed text-white/65">
            Collections, examples and environments are plain files in a git
            repository on your machine. There is no Aurolis server in between.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
