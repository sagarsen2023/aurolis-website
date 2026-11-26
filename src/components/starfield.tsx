import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Star = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  phase: number;
  tint: string;
};

type StarfieldProps = {
  className?: string;
  density?: number;
};

const TINTS = [
  "255,255,255",
  "255,255,255",
  "255,255,255",
  "237,197,252",
  "185,163,255",
];

export function Starfield({ className, density = 1 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let stars: Star[] = [];
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;

    const seed = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.round(((width * height) / 5200) * density);
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.08;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: big ? 0.9 + Math.random() * 0.8 : 0.35 + Math.random() * 0.55,
          alpha: big ? 0.7 + Math.random() * 0.3 : 0.25 + Math.random() * 0.5,
          speed: 0.6 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        };
      });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = reduce
          ? 1
          : 0.6 + 0.4 * Math.sin(time * 0.001 * star.speed + star.phase);
        context.fillStyle = `rgba(${star.tint},${(star.alpha * twinkle).toFixed(3)})`;
        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fill();
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (visible && !reduce) frame = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(() => {
      seed();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(loop);
    });
    intersectionObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [density, reduce]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
