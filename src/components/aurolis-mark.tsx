import { useId } from "react";
import {
  A_PATH,
  A_SHAPE,
  BALL,
  ORBIT_BACK,
  ORBIT_FRONT,
  ORBIT_TRANSFORM,
} from "@/lib/logo-geometry";

type AurolisMarkProps = {
  className?: string;
  title?: string;
  orbitColor?: string;
};

export function AurolisMark({
  className,
  title,
  orbitColor = "#edc5fc",
}: AurolisMarkProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <mask
          id={`${id}b`}
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
          id={`${id}a`}
          maskUnits="userSpaceOnUse"
          x="-8"
          y="-8"
          width="80"
          height="80"
        >
          <rect x="-8" y="-8" width="80" height="80" fill="#fff" />
          <path
            d={ORBIT_FRONT}
            transform={ORBIT_TRANSFORM}
            fill="none"
            stroke="#000"
            strokeWidth="8.6"
            strokeLinecap="round"
          />
          <circle cx={BALL.x} cy={BALL.y} r={BALL.gap} fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${id}b)`}>
        <path
          d={ORBIT_BACK}
          transform={ORBIT_TRANSFORM}
          fill="none"
          stroke={orbitColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <path
        d={A_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="7.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask={`url(#${id}a)`}
      />
      <path
        d={ORBIT_FRONT}
        transform={ORBIT_TRANSFORM}
        fill="none"
        stroke={orbitColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx={BALL.x} cy={BALL.y} r={BALL.r} fill="#e73825" />
    </svg>
  );
}
