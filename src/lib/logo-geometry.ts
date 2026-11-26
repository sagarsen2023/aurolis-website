export const A_PATH = "M15 53 L28.6 16.2 Q32 8.4 35.4 16.2 L49 53";

export const A_SHAPE = `${A_PATH} Z`;

export const ORBIT_BACK = "M-27.5 0 A27.5 7.6 0 0 1 27.5 0";

export const ORBIT_FRONT = "M27.5 0 A27.5 7.6 0 0 1 -27.5 0";

export const ORBIT_TRANSFORM = "translate(32 37) rotate(-12)";

export const BALL = { x: 55.65, y: 36.09, r: 3.9, gap: 6.7 };

export const BALL_REST_ANGLE = 32;

const ORBIT = {
  cx: 32,
  cy: 37,
  rx: 27.5,
  ry: 7.6,
  tilt: (-12 * Math.PI) / 180,
};

const STEP = 4;

export type Point = [number, number];

export function orbitPoint(angle: number): Point {
  const t = (angle * Math.PI) / 180;
  const x = ORBIT.rx * Math.cos(t);
  const y = ORBIT.ry * Math.sin(t);
  const cos = Math.cos(ORBIT.tilt);
  const sin = Math.sin(ORBIT.tilt);
  return [ORBIT.cx + x * cos - y * sin, ORBIT.cy + x * sin + y * cos];
}

export function isFront(angle: number) {
  return Math.sin((angle * Math.PI) / 180) > 0;
}

const format = ([x, y]: Point) => `${x.toFixed(2)} ${y.toFixed(2)}`;

export function orbitTrail(from: number, to: number) {
  const trail = { front: "", back: "" };
  if (to <= from) return trail;
  const marks = new Set<number>([from, to]);
  for (let angle = Math.ceil(from / STEP) * STEP; angle < to; angle += STEP)
    marks.add(angle);
  for (let angle = Math.ceil(from / 180) * 180; angle < to; angle += 180)
    marks.add(angle);
  const angles = [...marks].sort((a, b) => a - b);
  const last = { front: Number.NaN, back: Number.NaN };
  for (let index = 1; index < angles.length; index += 1) {
    const start = angles[index - 1];
    const end = angles[index];
    const side = isFront((start + end) / 2) ? "front" : "back";
    if (last[side] !== start) trail[side] += `M${format(orbitPoint(start))}`;
    trail[side] += `L${format(orbitPoint(end))}`;
    last[side] = end;
  }
  return trail;
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

export const easeOut = (t: number) => 1 - (1 - t) ** 3;
