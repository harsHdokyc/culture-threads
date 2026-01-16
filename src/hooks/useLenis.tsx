import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const useLenis = () => {
  useEffect(() => {
    if (lenisInstance) return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisInstance;
};

export const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
  lenisInstance?.scrollTo(target, options);
};

export default useLenis;
