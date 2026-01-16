import { useEffect, useRef, useLayoutEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

const ImageReveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: ImageRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const clipPaths = {
    up: {
      overlayInitial: "inset(0% 0% 0% 0%)",
      overlayFinal: "inset(0% 0% 100% 0%)",
    },
    down: {
      overlayInitial: "inset(0% 0% 0% 0%)",
      overlayFinal: "inset(100% 0% 0% 0%)",
    },
    left: {
      overlayInitial: "inset(0% 0% 0% 0%)",
      overlayFinal: "inset(0% 0% 0% 100%)",
    },
    right: {
      overlayInitial: "inset(0% 0% 0% 0%)",
      overlayFinal: "inset(0% 100% 0% 0%)",
    },
  };

  useLayoutEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;
    
    const image = containerRef.current.querySelector("img, .reveal-content");
    gsap.set(overlayRef.current, { clipPath: clipPaths[direction].overlayInitial });
    if (image) {
      gsap.set(image, { scale: 1.2, opacity: 0 });
    }
  }, [direction]);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const image = containerRef.current.querySelector("img, .reveal-content");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(overlay, { 
      clipPath: clipPaths[direction].overlayFinal, 
      duration: 0.7, 
      delay,
      ease: "power2.inOut" 
    });

    if (image) {
      tl.to(image, { 
        scale: 1, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.3");
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [direction, delay]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-accent-red z-10"
      />
      {children}
    </div>
  );
};

export default ImageReveal;
