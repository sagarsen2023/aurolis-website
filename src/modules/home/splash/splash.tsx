import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  type MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { LogoDrawGroup } from "@/components/logo-draw";
import { Starfield } from "@/components/starfield";
import { WORDMARK_GLYPHS, WORDMARK_TRANSFORM } from "@/constants/wordmark";
import { clamp01, easeInOut } from "@/lib/logo-geometry";
import {
  SPLASH_GLYPHS,
  SPLASH_MARK_TRANSFORM,
  SPLASH_STROKE,
  SPLASH_TIMING,
  SPLASH_VIEWBOX,
} from "@/constants/splash";
import type { SplashGlyph } from "@/types/home/landing.type";

type SplashProps = {
  onLeave: () => void;
  onDone: () => void;
};

type StrokeGlyphProps = {
  glyph: SplashGlyph;
  start: number;
  clock: MotionValue<number>;
};

const DOT_SHARE = 0.86;
const SKIP_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

function StrokeGlyph({ glyph, start, clock }: StrokeGlyphProps) {
  const strokes = useRef<SVGGElement>(null);
  const base = useRef<SVGPathElement>(null);
  const tip = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  const fill = useRef<SVGPathElement>(null);
  const tipLength = useRef(0.2);
  const outline =
    WORDMARK_GLYPHS.find((item) => item.letter === glyph.letter)?.d ?? "";

  const render = useCallback(
    (time: number) => {
      const raw = clamp01((time - start) / SPLASH_TIMING.glyphDuration);
      const progress = easeInOut(raw);
      const drawn = glyph.dot ? clamp01(progress / DOT_SHARE) : progress;
      const dotted = glyph.dot
        ? clamp01((progress - DOT_SHARE) / (1 - DOT_SHARE))
        : 0;
      const head = Math.min(tipLength.current, drawn);
      if (base.current) {
        base.current.style.strokeDasharray = `${drawn} 1`;
        base.current.style.opacity = drawn > 0.001 ? "1" : "0";
      }
      if (tip.current) {
        tip.current.style.strokeDasharray = `${head} 2`;
        tip.current.style.strokeDashoffset = String(-(drawn - head));
        tip.current.style.opacity =
          drawn > 0.001 ? String(1 - clamp01((raw - 0.9) / 0.1)) : "0";
      }
      dot.current?.setAttribute("r", (71 * easeInOut(dotted)).toFixed(1));
      const settle = clamp01(
        (time - start - SPLASH_TIMING.glyphDuration) / SPLASH_TIMING.settle,
      );
      if (fill.current)
        fill.current.style.opacity = String(clamp01(settle * 2));
      if (strokes.current)
        strokes.current.style.opacity = String(1 - clamp01(settle * 2 - 1));
    },
    [glyph.dot, start],
  );

  useLayoutEffect(() => {
    const length = base.current?.getTotalLength() ?? 1000;
    tipLength.current = Math.min(0.32, 190 / length);
    render(clock.get());
  }, [clock, render]);
  useMotionValueEvent(clock, "change", render);

  return (
    <g transform={`translate(${glyph.x} 0)`}>
      <g ref={strokes}>
        <path
          ref={base}
          d={glyph.stroke}
          pathLength={1}
          fill="none"
          stroke="#fff"
          strokeWidth={SPLASH_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0 }}
        />
        <path
          ref={tip}
          d={glyph.stroke}
          pathLength={1}
          fill="none"
          stroke="#8b6cff"
          strokeWidth={SPLASH_STROKE + 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0 }}
        />
        {glyph.dot && (
          <circle
            ref={dot}
            cx={glyph.dot[0]}
            cy={glyph.dot[1]}
            r="0"
            fill="#fff"
          />
        )}
      </g>
      <path ref={fill} d={outline} fill="#fff" style={{ opacity: 0 }} />
    </g>
  );
}

export function Splash({ onLeave, onDone }: SplashProps) {
  const clock = useMotionValue(0);
  const markProgress = useTransform(clock, [...SPLASH_TIMING.mark], [0, 1]);
  const [leaving, setLeaving] = useState(false);
  const left = useRef(false);

  const leave = useCallback(() => {
    if (left.current) return;
    left.current = true;
    setLeaving(true);
    onLeave();
  }, [onLeave]);

  useEffect(() => {
    const controls = animate(clock, SPLASH_TIMING.hold, {
      duration: SPLASH_TIMING.hold,
      ease: "linear",
      onComplete: leave,
    });
    const skip = () => {
      controls.stop();
      clock.set(SPLASH_TIMING.hold);
      leave();
    };
    for (const name of SKIP_EVENTS)
      window.addEventListener(name, skip, { passive: true });
    return () => {
      controls.stop();
      for (const name of SKIP_EVENTS) window.removeEventListener(name, skip);
    };
  }, [clock, leave]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg"
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => {
        if (leaving) onDone();
      }}
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      <Starfield className="absolute inset-0 size-full" density={1.1} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmin] w-[90vmin] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(106,70,255,0.16),transparent)]" />
      <motion.svg
        viewBox={SPLASH_VIEWBOX}
        className="relative w-[min(82vw,780px)] overflow-visible"
        animate={
          leaving
            ? { scale: 1.06, opacity: 0, filter: "blur(12px)" }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      >
        <LogoDrawGroup
          progress={markProgress}
          transform={SPLASH_MARK_TRANSFORM}
          split={0.38}
        />
        <g transform={WORDMARK_TRANSFORM}>
          {SPLASH_GLYPHS.map((glyph, index) => (
            <StrokeGlyph
              key={glyph.letter}
              glyph={glyph}
              clock={clock}
              start={
                SPLASH_TIMING.glyphStart + index * SPLASH_TIMING.glyphStagger
              }
            />
          ))}
        </g>
      </motion.svg>
    </motion.div>
  );
}
