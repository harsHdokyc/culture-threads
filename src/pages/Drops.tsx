import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { FadeReveal } from "@/components/animations";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import heroImage from "@/assets/hero-socks.jpg";

gsap.registerPlugin(ScrollTrigger);

const drops = [
  {
    id: 1,
    title: "STREET HEAT",
    subtitle: "DROP 003",
    description: "Inspired by Mumbai's street markets. Chaos made wearable.",
    image: product1,
    status: "AVAILABLE NOW",
    date: "JAN 2026",
    color: "#FF3B30",
  },
  {
    id: 2,
    title: "NEON DELHI",
    subtitle: "DROP 002",
    description: "Late nights. Bright lights. The city that never sleeps.",
    image: product2,
    status: "SOLD OUT",
    date: "DEC 2025",
    color: "#00D9FF",
  },
  {
    id: 3,
    title: "FIRST STEPS",
    subtitle: "DROP 001",
    description: "Where it all began. The OG collection.",
    image: product3,
    status: "ARCHIVE",
    date: "OCT 2025",
    color: "#FFD60A",
  },
];

const Drops = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const dropCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Enhanced hero parallax with multiple layers
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(".drops-hero-bg", { y: 120, scale: 1.1, ease: "none" }, 0)
      .to(".hero-overlay", { opacity: 0.95, ease: "none" }, 0)
      .to(".hero-content", { y: -60, opacity: 0.3, ease: "none" }, 0);

    // Staggered card reveal with magnetic effect
    const cards = dropCardsRef.current?.querySelectorAll(".drop-card");
    cards?.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          rotateX: 15,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Magnetic hover effect
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.02,
          z: 50,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          z: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    // Floating animation for status badges
    gsap.to(".status-badge", {
      y: -5,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor hoverScale={3} hoverBackgroundColor="rgba(255, 59, 48, 0.2)" />

      <Header />

      {/* Enhanced Hero with layered parallax */}
      <section
        ref={heroRef}
        className="relative section-container bg-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Drops"
            className="drops-hero-bg w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          
          {/* Animated grain overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <div className="w-full h-full animate-grain bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
          </div>
        </div>

        <div className="relative z-10 section-container w-full">
          <div className="max-w-4xl mx-auto">
            <FadeReveal direction="up" delay={0.1}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <p className="text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-red-500">
                  LIMITED RELEASES
                </p>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6">
                THE <span className="text-red-500">DROP</span>
              </h1>
            </FadeReveal>
            <FadeReveal direction="up" delay={0.2}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed">
                  Limited collections. Once they're gone, they're gone.
                </p>
              </div>
            </FadeReveal>
            <FadeReveal direction="up" delay={0.3}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6">
                NEON <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-gradient inline-block pr-4">
                  DELHI
                </span>
              </h1>
            </FadeReveal>
            <FadeReveal direction="up" delay={0.4}>
              <div className="flex flex-wrap gap-4 mt-10">
                <div className="px-6 py-3 border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-gray-400 mb-1">CURRENT DROP</p>
                  <p className="text-lg font-bold">AVAILABLE</p>
                </div>
                <div className="px-6 py-3 border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-gray-400 mb-1">NEXT DROP</p>
                  <p className="text-2xl font-bold">FEB 2026</p>
                </div>
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* Enhanced Drops List */}
      <section className="py-20 md:py-32">
        <div className="section-container py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-4 sm:mb-6">
              ALL <span className="text-red-500">DROPS</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Each drop tells a story. Each pair is a statement.
            </p>
          </div>

          <div ref={dropCardsRef} className="space-y-0">
            {drops.map((drop, index) => (
              <div
                key={drop.id}
                className="drop-card border-t border-white/10"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link
                  to={drop.status === "AVAILABLE NOW" ? `/shop` : "#"}
                  className={`grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-12 md:gap-12 lg:gap-16 py-12 md:py-20 group relative ${
                    drop.status !== "AVAILABLE NOW"
                      ? "opacity-40 pointer-events-none"
                      : ""
                  }`}
                >
                  {/* Accent line on hover */}
                  <div
                    className="absolute left-0 top-0 w-1 h-0 group-hover:h-full transition-all duration-700 ease-out"
                    style={{ backgroundColor: drop.color }}
                  />

                  {/* Image with reveal effect */}
                  <div className="lg:col-span-5 relative overflow-hidden">
                    <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                      <img
                        src={drop.image}
                        alt={drop.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Color overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-multiply"
                        style={{ backgroundColor: drop.color }}
                      />

                      {/* Animated border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 transition-all duration-500" />
                    </div>

                    {/* Drop number overlay */}
                    <div className="absolute top-6 right-6 text-white/10 group-hover:text-white/20 transition-colors duration-300">
                      <span className="text-8xl font-black leading-none">
                        {drop.id}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-4 flex flex-col justify-center lg:pl-8">
                    <div className="mb-4">
                      <p className="text-xs font-bold tracking-[0.3em] text-gray-500 mb-2">
                        {drop.subtitle}
                      </p>
                      <div className="h-px w-16 bg-gradient-to-r from-white/50 to-transparent mb-4" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight group-hover:tracking-wide transition-all duration-300">
                      {drop.title}
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                      {drop.description}
                    </p>

                    {drop.status === "AVAILABLE NOW" && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold">SHOP NOW</span>
                        <div className="w-12 h-px bg-white group-hover:w-20 transition-all duration-300" />
                        <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                          →
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status & Meta */}
                  <div className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end gap-4">
                    <div
                      className={`status-badge px-6 py-3 text-xs font-black tracking-[0.2em] uppercase relative overflow-hidden ${
                        drop.status === "AVAILABLE NOW"
                          ? "bg-red-500 text-white"
                          : drop.status === "SOLD OUT"
                          ? "bg-zinc-800 text-zinc-500"
                          : "border-2 border-zinc-700 text-zinc-600"
                      }`}
                    >
                      {drop.status === "AVAILABLE NOW" && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      )}
                      <span className="relative z-10">{drop.status}</span>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">RELEASED</p>
                      <p className="text-2xl font-bold">{drop.date}</p>
                    </div>

                    {drop.status === "SOLD OUT" && (
                      <div className="mt-4 p-4 border border-zinc-800 backdrop-blur-sm">
                        <p className="text-xs text-gray-500 mb-2">
                          WANT THIS BACK?
                        </p>
                        <button className="text-xs font-semibold text-white hover:text-red-500 transition-colors">
                          NOTIFY ME →
                        </button>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Upcoming Section */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-black via-red-950/10 to-black">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-red-500/30 rounded-full blur-[100px] sm:blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-yellow-500/20 rounded-full blur-[100px] sm:blur-[150px] animate-pulse delay-1000" />
        </div>

        <div className="section-container relative z-10">
          <FadeReveal direction="up">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <p className="text-xs font-bold tracking-[0.3em] text-red-500">
                    COMING SOON
                  </p>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping delay-75" />
                </div>
                </div>
              </div>

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                DROP{" "}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 animate-gradient">
                  004
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-400 mb-4 leading-relaxed">
                Something raw is coming.
              </p>
              <p className="text-lg text-gray-500 mb-12">
                Be the first to know. Limited pairs only.
              </p>
            </div>
          </FadeReveal>

          <FadeReveal direction="up" delay={0.2}>
            <div className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="flex-1 px-6 py-5 bg-black border-2 border-white/20 text-white font-bold text-sm tracking-wider placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors backdrop-blur-sm"
                />
                <button className="px-10 py-5 bg-white text-black font-black text-sm tracking-wider hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">
                  NOTIFY ME
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-4 text-center">
                Join 50K+ crew members. No spam, just drops.
              </p>
            </div>
          </FadeReveal>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </main>
  );
};

export default Drops;