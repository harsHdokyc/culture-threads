import { useEffect, useRef, useLayoutEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

const MaskReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
}: MaskRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const clipPaths = {
    up: {
      initial: "inset(100% 0% 0% 0%)",
      final: "inset(0% 0% 0% 0%)",
    },
    down: {
      initial: "inset(0% 0% 100% 0%)",
      final: "inset(0% 0% 0% 0%)",
    },
    left: {
      initial: "inset(0% 100% 0% 0%)",
      final: "inset(0% 0% 0% 0%)",
    },
    right: {
      initial: "inset(0% 0% 0% 100%)",
      final: "inset(0% 0% 0% 0%)",
    },
  };

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, {
      clipPath: clipPaths[direction].initial,
      opacity: 0,
    });
  }, [direction]);

  useEffect(() => {
    if (!ref.current) return;

    const animation = gsap.to(ref.current, {
      clipPath: clipPaths[direction].final,
      opacity: 1,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default MaskReveal;
