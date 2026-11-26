import { useCallback, useId, useLayoutEffect, useRef } from "react";
import { type MotionValue, useMotionValueEvent } from "motion/react";
import {
  A_PATH,
  A_SHAPE,
  BALL,
  BALL_REST_ANGLE,
  clamp01,
  easeInOut,
  isFront,
  orbitPoint,
  orbitTrail,
} from "@/lib/logo-geometry";

type LogoDrawGroupProps = {
  progress: MotionValue<number>;
  split?: number;
  ghost?: boolean;
  transform?: string;
};

type LogoDrawProps = Omit<LogoDrawGroupProps, "transform"> & {
  className?: string;
  title?: string;
};

const START_ANGLE = BALL_REST_ANGLE - 360;
const EMPTY = "M0 0";

const setCircle = (
  circle: SVGCircleElement | null,
  x: number,
  y: number,
  r: number,
) => {
  if (!circle) return;
  circle.setAttribute("cx", x.toFixed(2));
  circle.setAttribute("cy", y.toFixed(2));
  circle.setAttribute("r", Math.max(0, r).toFixed(2));
};

export function LogoDrawGroup({
  progress,
  split = 0.4,
  ghost = false,
  transform,
}: LogoDrawGroupProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const letter = useRef<SVGPathElement>(null);
  const glow = useRef<SVGPathElement>(null);
  const back = useRef<SVGPathElement>(null);
  const front = useRef<SVGPathElement>(null);
  const frontCut = useRef<SVGPathElement>(null);
  const ball = useRef<SVGCircleElement>(null);
  const ballBehind = useRef<SVGCircleElement>(null);
  const ballCut = useRef<SVGCircleElement>(null);
  const halo = useRef<SVGCircleElement>(null);

  const render = useCallback(
    (value: number) => {
      const drawn = easeInOut(clamp01(value / split));
      const orbit = clamp01((value - split) / (1 - split));
      const travelled = easeInOut(orbit);
      if (letter.current) {
        letter.current.style.strokeDasharray = `${drawn} 1`;
        letter.current.style.opacity = drawn > 0.001 ? "1" : "0";
      }
      if (glow.current) {
        glow.current.style.strokeDasharray = `${drawn} 1`;
        glow.current.style.opacity =
          drawn > 0.001 ? String(0.9 - 0.62 * travelled) : "0";
      }
      const angle = START_ANGLE + 360 * travelled;
      const trail =
        orbit > 0 ? orbitTrail(START_ANGLE, angle) : { front: "", back: "" };
      back.current?.setAttribute("d", trail.back || EMPTY);
      front.current?.setAttribute("d", trail.front || EMPTY);
      frontCut.current?.setAttribute("d", trail.front || EMPTY);
      const [x, y] = orbit >= 1 ? [BALL.x, BALL.y] : orbitPoint(angle);
      const grown = orbit > 0 ? Math.min(1, orbit / 0.08) : 0;
      const inFront = isFront(angle);
      setCircle(ball.current, x, y, inFront ? BALL.r * grown : 0);
      setCircle(ballBehind.current, x, y, inFront ? 0 : BALL.r * grown);
      setCircle(ballCut.current, x, y, inFront ? BALL.gap * grown : 0);
      setCircle(halo.current, x, y, inFront ? 11 * grown : 0);
      if (halo.current)
        halo.current.style.opacity = String(orbit < 1 ? 0.9 : 0);
    },
    [split],
  );

  useLayoutEffect(() => render(progress.get()), [progress, render]);
  useMotionValueEvent(progress, "change", render);

  return (
    <g transform={transform}>
      <defs>
        <mask
          id={`${id}shape`}
          maskUnits="userSpaceOnUse"
          x="-8"
          y="-8"
          width="80"
          height="80"
        >
          <rect x="-8" y="-8" width="80" height="80" fill="#fff" />
          <path
            d={A_SHAPE}
            fill="#000"
            stroke="#000"
            strokeWidth="13.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
        <mask
          id={`${id}cut`}
          maskUnits="userSpaceOnUse"
          x="-8"
          y="-8"
          width="80"
          height="80"
        >
          <rect x="-8" y="-8" width="80" height="80" fill="#fff" />
          <path
            ref={frontCut}
            d={EMPTY}
            fill="none"
            stroke="#000"
            strokeWidth="8.6"
            strokeLinecap="round"
          />
          <circle ref={ballCut} r="0" fill="#000" />
        </mask>
        <radialGradient id={`${id}halo`}>
          <stop offset="0" stopColor="#ff6a4d" stopOpacity="0.75" />
          <stop offset="1" stopColor="#e73825" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>
      {ghost && (
        <path
          d={A_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="7.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <g mask={`url(#${id}shape)`}>
        <path
          ref={back}
          d={EMPTY}
          fill="none"
          stroke="#edc5fc"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle ref={ballBehind} r="0" fill="#e73825" />
      </g>
      <path
        ref={glow}
        d={A_PATH}
        pathLength={1}
        fill="none"
        stroke="#b9a3ff"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${id}blur)`}
        style={{ opacity: 0 }}
      />
      <path
        ref={letter}
        d={A_PATH}
        pathLength={1}
        fill="none"
        stroke="#fff"
        strokeWidth="7.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask={`url(#${id}cut)`}
        style={{ opacity: 0 }}
      />
      <path
        ref={front}
        d={EMPTY}
        fill="none"
        stroke="#edc5fc"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle ref={halo} r="0" fill={`url(#${id}halo)`} />
      <circle ref={ball} r="0" fill="#e73825" />
    </g>
  );
}

export function LogoDraw({ className, title, ...props }: LogoDrawProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      <LogoDrawGroup {...props} />
    </svg>
  );
}
