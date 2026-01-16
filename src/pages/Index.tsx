import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedDrop from "@/components/FeaturedDrop";
import BrandStory from "@/components/BrandStory";
import GiveBack from "@/components/GiveBack";
import Community from "@/components/Community";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure page starts at top on initial load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // Page load animation
    const loadTimeline = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    loadTimeline
      .to(".loader-bar", {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(".loader", {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
      });

    const ctx = gsap.context(() => {
      // Enhanced parallax with multiple speeds
      gsap.utils
        .toArray<HTMLElement>(".parallax-section")
        .forEach((section, index) => {
          const speed = index % 2 === 0 ? "40%" : "20%";

          gsap.to(section, {
            backgroundPositionY: speed,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

      // Smooth reveal animations for sections
      gsap.utils
        .toArray<HTMLElement>(".reveal-section")
        .forEach((section, index) => {
          gsap.fromTo(
            section,
            {
              y: 100,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // Staggered content reveals
      gsap.utils
        .toArray<HTMLElement>(".stagger-children")
        .forEach((container) => {
          const children = container.querySelectorAll(".stagger-item");

          gsap.fromTo(
            children,
            {
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

      // Scale animations for cards/images
      gsap.utils.toArray<HTMLElement>(".scale-in").forEach((element) => {
        gsap.fromTo(
          element,
          {
            scale: 0.85,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Slide in from sides
      gsap.utils.toArray<HTMLElement>(".slide-left").forEach((element) => {
        gsap.fromTo(
          element,
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".slide-right").forEach((element) => {
        gsap.fromTo(
          element,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Rotate in animations
      gsap.utils.toArray<HTMLElement>(".rotate-in").forEach((element) => {
        gsap.fromTo(
          element,
          {
            rotateY: 45,
            opacity: 0,
            scale: 0.9,
          },
          {
            rotateY: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Floating animations for decorative elements
      gsap.utils.toArray<HTMLElement>(".float").forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Progress indicator
      gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      // Section transitions with color changes
      const sections = gsap.utils.toArray<HTMLElement>(".color-section");
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to("body", {
              backgroundColor: section.dataset.bgColor || "#000000",
              duration: 0.6,
              ease: "power2.inOut",
            });
          },
          onEnterBack: () => {
            gsap.to("body", {
              backgroundColor: section.dataset.bgColor || "#000000",
              duration: 0.6,
              ease: "power2.inOut",
            });
          },
        });
      });
    }, mainRef);

    // Custom cursor tracking
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

    // Cursor interactions
    const handleMouseEnterLink = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 2.5,
          backgroundColor: "rgba(255, 59, 48, 0.3)",
          duration: 0.3,
        });
      }
    };

    const handleMouseLeaveLink = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: "rgba(255, 255, 255, 0)",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Add cursor interactions to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .cursor-hover"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterLink);
      el.addEventListener("mouseleave", handleMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterLink);
        el.removeEventListener("mouseleave", handleMouseLeaveLink);
      });
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Page Loader */}
      {isLoading && (
        <div className="loader fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
              SOKZ
            </h1>
            <div className="relative w-64 h-1 bg-white/10 overflow-hidden">
              <div
                className="loader-bar absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-4 tracking-widest">
              LOADING EXPERIENCE
            </p>
          </div>
        </div>
      )}

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full border-2 border-white pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[9997] bg-white/5">
        <div
          className="progress-bar h-full bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9996] opacity-[0.03]">
        <div className="w-full h-full animate-grain bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Header - Moved outside main for proper z-index stacking */}
      <Header />

      <main
        ref={mainRef}
        className="min-h-screen bg-black text-white relative overflow-hidden"
      >
        {/* Background ambient elements */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-2000" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="reveal-section">
            <Hero />
          </div>

          <div className="reveal-section">
            <Marquee />
          </div>

          <div className="reveal-section parallax-section scale-in color-section" data-bg-color="#000000">
            <FeaturedDrop />
          </div>

          <div className="reveal-section slide-left color-section" data-bg-color="#0a0a0a">
            <BrandStory />
          </div>

          <div className="reveal-section parallax-section rotate-in color-section" data-bg-color="#000000">
            <GiveBack />
          </div>

          <div className="reveal-section stagger-children color-section" data-bg-color="#0a0a0a">
            <Community />
          </div>

          <div className="reveal-section">
            <Marquee />
          </div>

          <Footer />
        </div>

        {/* Decorative floating elements */}
        <div className="fixed pointer-events-none opacity-5">
          <div className="float absolute top-20 right-20 text-white text-9xl font-black">
            ★
          </div>
          <div className="float absolute bottom-40 left-20 text-white text-9xl font-black delay-500">
            ●
          </div>
          <div className="float absolute top-1/2 right-40 text-white text-9xl font-black delay-1000">
            ◆
          </div>
        </div>

              </main>

      <style>{`
        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -10%);
          }
          20% {
            transform: translate(-15%, 5%);
          }
          30% {
            transform: translate(7%, -25%);
          }
          40% {
            transform: translate(-5%, 25%);
          }
          50% {
            transform: translate(-15%, 10%);
          }
          60% {
            transform: translate(15%, 0%);
          }
          70% {
            transform: translate(0%, 15%);
          }
          80% {
            transform: translate(3%, 35%);
          }
          90% {
            transform: translate(-10%, 10%);
          }
        }

        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        @media (max-width: 768px) {
          .float {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Index;