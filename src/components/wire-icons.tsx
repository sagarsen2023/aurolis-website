type WireIconProps = {
  className?: string;
};

const RIPPLES = [0, 1, 2, 3, 4, 5];
const SPOKES = [0, 30, 60, 90, 120, 150];
const MERIDIANS = [0.2, 0.45, 0.7, 0.92];
const PARALLELS = [-9, 0, 9];

export function WireSignal({ className }: WireIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden
      className={className}
    >
      {RIPPLES.map((step) => (
        <circle
          key={step}
          cx={14 + step * 2.4}
          cy="24"
          r={4 + step * 3.1}
          opacity={1 - step * 0.12}
        />
      ))}
    </svg>
  );
}

export function WireOrbit({ className }: WireIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden
      className={className}
    >
      {SPOKES.map((angle) => (
        <ellipse
          key={angle}
          cx="24"
          cy="24"
          rx="19"
          ry="7"
          transform={`rotate(${angle} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WireSphere({ className }: WireIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden
      className={className}
    >
      <circle cx="24" cy="24" r="17" />
      {MERIDIANS.map((ratio) => (
        <ellipse key={ratio} cx="24" cy="24" rx={17 * ratio} ry="17" />
      ))}
      {PARALLELS.map((offset) => (
        <ellipse
          key={offset}
          cx="24"
          cy={24 + offset}
          rx={Math.sqrt(289 - offset * offset)}
          ry="3.2"
        />
      ))}
    </svg>
  );
}
