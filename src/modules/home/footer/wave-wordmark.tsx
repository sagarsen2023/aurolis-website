import { lazy, Suspense, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Wordmark } from "@/components/wordmark";
import { useInView } from "@/hooks/use-in-view";

const WaveCanvas = lazy(() =>
  import("./wave-canvas").then((module) => ({ default: module.WaveCanvas })),
);

export function WaveWordmark() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(section, "100px");
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const shift = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : -0.18, reduce ? 0 : 0.18],
  );
  const markY = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : 90, reduce ? 0 : -90],
  );
  const markOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.4],
    [reduce ? 1 : 0, 1],
  );

  return (
    <section
      ref={section}
      aria-label="Aurolis"
      className="relative grid h-[100svh] min-h-[560px] place-items-center overflow-hidden"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)]">
        <Suspense fallback={null}>
          <WaveCanvas active={inView} reduced={reduce} shift={shift} />
        </Suspense>
      </div>
      <motion.div
        style={{ y: markY, opacity: markOpacity }}
        className="relative flex flex-col items-center px-4 text-center"
      >
        <p className="text-[clamp(15px,1.4vw,19px)] font-medium text-white/90">
          Your requests, your repository
        </p>
        <Wordmark className="mt-3 h-auto w-[min(86vw,980px)] drop-shadow-[0_10px_50px_rgba(20,10,60,0.9)]" />
      </motion.div>
    </section>
  );
}
