import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "chars" | "words" | "lines";
}

const TextReveal = ({
  children,
  className = "",
  delay = 0,
  as: Component = "span",
  splitBy = "chars",
}: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Use layoutEffect to set initial state before paint
  useLayoutEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    
    const chars = containerRef.current.querySelectorAll(".reveal-char");
    gsap.set(chars, { y: 60, opacity: 0 });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".reveal-char");

    const animation = gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      delay: delay,
      stagger: splitBy === "chars" ? 0.015 : splitBy === "words" ? 0.06 : 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        hasAnimated.current = true;
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay, splitBy]);

  const splitText = () => {
    if (splitBy === "chars") {
      return children.split("").map((char, i) => (
        <span
          key={i}
          className="reveal-char inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
    
    if (splitBy === "words") {
      return children.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em]">
          <span className="reveal-char inline-block">
            {word}
          </span>
        </span>
      ));
    }

    return (
      <span className="reveal-char inline-block">
        {children}
      </span>
    );
  };

  return (
    <Component ref={containerRef as any} className={`overflow-hidden ${className}`}>
      <span className="inline-block">{splitText()}</span>
    </Component>
  );
};

export default TextReveal;
