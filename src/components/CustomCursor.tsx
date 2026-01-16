import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CustomCursorProps {
  interactiveElements?: string;
  hoverScale?: number;
  hoverBackgroundColor?: string;
  zindex?: string;
  className?: string;
}

const CustomCursor = ({
  interactiveElements = "a, button, .cursor-hover",
  hoverScale = 2.5,
  hoverBackgroundColor = "rgba(255, 59, 48, 0.3)",
  zindex = "z-[9999]",
  className = "fixed w-6 h-6 rounded-full border-2 border-white pointer-events-none mix-blend-difference hidden md:block"
}: CustomCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Mouse enter handler for interactive elements
    const handleMouseEnterLink = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: hoverScale,
          backgroundColor: hoverBackgroundColor,
          duration: 0.3,
        });
      }
    };

    // Mouse leave handler for interactive elements
    const handleMouseLeaveLink = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: "rgba(255, 255, 255, 0)",
          duration: 0.3,
        });
      }
    };

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Add hover interactions to all interactive elements
    const interactiveElementsList = document.querySelectorAll(interactiveElements);
    interactiveElementsList.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterLink);
      el.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElementsList.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterLink);
        el.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
    };
  }, [interactiveElements, hoverScale, hoverBackgroundColor]);

  return (
    <div
      ref={cursorRef}
      className={`${className} ${zindex}`}
      style={{
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;
