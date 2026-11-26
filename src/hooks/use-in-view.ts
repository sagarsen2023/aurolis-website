import { type RefObject, useEffect, useState } from "react";

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  margin = "200px",
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: margin,
      },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin]);

  return inView;
}
