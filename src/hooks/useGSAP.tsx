import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useTextReveal = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { 
          y: 100, 
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)"
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector]);
};

export const useFadeUp = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 30%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector]);
};

export const useParallax = (selector: string, speed: number = 0.5) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      gsap.to(el, {
        y: () => (el as HTMLElement).offsetHeight * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, speed]);
};

export const useStaggerReveal = (containerSelector: string, itemSelector: string) => {
  useEffect(() => {
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach((container) => {
      const items = container.querySelectorAll(itemSelector);
      
      gsap.fromTo(
        items,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [containerSelector, itemSelector]);
};

export const useCharacterSplit = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chars = ref.current.querySelectorAll(".char");
    
    gsap.fromTo(
      chars,
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
};

export const useImageReveal = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
      const wrapper = el.parentElement;
      
      gsap.fromTo(
        el,
        { scale: 1.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper || el,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector]);
};

export const useHorizontalScroll = (selector: string) => {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    gsap.to(el, {
      x: () => -(el.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${el.scrollWidth}`,
        scrub: 1,
        pin: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector]);
};

export { gsap, ScrollTrigger };
