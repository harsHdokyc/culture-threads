import { useEffect, useRef, useLayoutEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
}

const ScaleReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  initialScale = 0.9,
}: ScaleRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, {
      opacity: 0,
      scale: initialScale,
    });
  }, [initialScale]);

  useEffect(() => {
    if (!ref.current) return;

    const animation = gsap.to(ref.current, {
      opacity: 1,
      scale: 1,
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
  }, [delay, duration, initialScale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScaleReveal;
