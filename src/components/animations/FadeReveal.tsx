import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
  trigger?: string;
  start?: string;
  end?: string;
  ease?: string;
  once?: boolean;
}

const FadeReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  stagger = 0,
  trigger,
  start = "top 90%",
  end = "top 20%",
  ease = "power2.out",
  once = false,
}: FadeRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const directions = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const elements = stagger > 0 
      ? ref.current.querySelectorAll(".fade-child") 
      : [ref.current];

    // Set initial state immediately to prevent flash
    gsap.set(elements, {
      opacity: 0,
      ...directions[direction],
    });

    const scrollTriggerConfig = {
      trigger: trigger ? ref.current.closest(trigger) || ref.current : ref.current,
      start,
      end,
      toggleActions: once ? "play none none none" : "play none none reverse",
    };

    const animation = gsap.to(elements, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: scrollTriggerConfig,
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [direction, delay, duration, distance, stagger, trigger, start, end, ease, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default FadeReveal;
