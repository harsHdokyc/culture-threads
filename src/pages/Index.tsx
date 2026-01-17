import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
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
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    // Ensure page starts at top on initial load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!animationsReady || !mainRef.current) return;

    const ctx = gsap.context(() => {
        // Enhanced parallax with multiple speeds
      const parallaxSections = gsap.utils.toArray<HTMLElement>(".parallax-section");
      parallaxSections.forEach((section, index) => {
        if (!section) return;
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
      const revealSections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      revealSections.forEach((section, index) => {
        if (!section) return;
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
          if (children.length === 0) return;

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
      const scaleElements = gsap.utils.toArray<HTMLElement>(".scale-in");
      scaleElements.forEach((element) => {
        if (!element) return;
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
      const slideLeftElements = gsap.utils.toArray<HTMLElement>(".slide-left");
      slideLeftElements.forEach((element) => {
        if (!element) return;
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

      const slideRightElements = gsap.utils.toArray<HTMLElement>(".slide-right");
      slideRightElements.forEach((element) => {
        if (!element) return;
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
      const rotateElements = gsap.utils.toArray<HTMLElement>(".rotate-in");
      rotateElements.forEach((element) => {
        if (!element) return;
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
      const floatElements = gsap.utils.toArray<HTMLElement>(".float");
      floatElements.forEach((element, index) => {
        if (!element) return;
        gsap.to(element, {
          y: -20,
          duration: 2 + index * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Progress indicator
      const progressBar = document.querySelector(".progress-bar");
      if (progressBar && mainRef.current) {
        gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
      }

      // Section transitions with color changes
      const sections = gsap.utils.toArray<HTMLElement>(".color-section");
      const bodyElement = document.body;
      if (bodyElement) {
        sections.forEach((section, index) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              gsap.to(bodyElement, {
                backgroundColor: section.dataset.bgColor || "#000000",
                duration: 0.6,
                ease: "power2.inOut",
              });
            },
            onEnterBack: () => {
              gsap.to(bodyElement, {
                backgroundColor: section.dataset.bgColor || "#000000",
                duration: 0.6,
                ease: "power2.inOut",
              });
            },
          });
        });
      }
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, [animationsReady]);

  return (
    <>
      {/* Loader */}
      <Loader onComplete={() => setAnimationsReady(true)} />

      {/* Custom Cursor */}
      <CustomCursor zindex="z-[9998]" />

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
        className="min-h-screen bg-black text-white relative"
      >
        {/* Background ambient elements */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-red-500/30 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-yellow-500/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-cyan-500/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] animate-pulse delay-2000" />
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
          <div className="float absolute top-16 sm:top-20 right-16 sm:right-20 text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black">
            ★
          </div>
          <div className="float absolute bottom-32 sm:bottom-40 left-16 sm:left-20 text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black delay-500">
            ●
          </div>
          <div className="float absolute top-1/2 right-32 sm:right-40 text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black delay-1000">
            ◆
          </div>
        </div>

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

          @media (max-width: 640px) {
            .float {
              display: none;
            }
          }
          
          @media (max-width: 768px) {
            .float {
              display: none;
            }
          }
        `}</style>
      </main>
    </>
  );
};

export default Index;