import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useSmoothScroll(enabled: boolean, paused: boolean) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const instance = new Lenis({
      anchors: { offset: -24 },
      lerp: 0.1,
      wheelMultiplier: 0.9,
    });
    lenis.current = instance;
    let frame = 0;
    const loop = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", paused);
    if (paused) lenis.current?.stop();
    else lenis.current?.start();
  }, [enabled, paused]);
}
