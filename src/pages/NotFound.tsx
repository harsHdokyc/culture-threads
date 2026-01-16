import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Home, ArrowLeft, Search, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLHeadingElement>(null);
  const [randomLinks, setRandomLinks] = useState<Array<{ label: string; path: string }>>([]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    // Generate random suggested links
    const suggestions = [
      { label: "SHOP ALL SOCKS", path: "/shop" },
      { label: "OUR STORY", path: "/story" },
      { label: "THE DROPS", path: "/drops" },
      { label: "JOIN THE CREW", path: "/community" },
    ];
    setRandomLinks(suggestions.sort(() => Math.random() - 0.5).slice(0, 2));
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch effect on 404
      const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      glitchTimeline
        .to(glitchRef.current, {
          x: -5,
          skewX: -20,
          duration: 0.05,
        })
        .to(glitchRef.current, {
          x: 5,
          skewX: 20,
          duration: 0.05,
        })
        .to(glitchRef.current, {
          x: -2,
          skewX: 10,
          duration: 0.05,
        })
        .to(glitchRef.current, {
          x: 0,
          skewX: 0,
          duration: 0.05,
        });

      // Floating animation for decorative elements
      gsap.to(".float-404", {
        y: -20,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // Rotate animation for icons
      gsap.to(".rotate-icon", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Entry animations
      gsap.fromTo(
        ".animate-in",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9996] opacity-[0.02]">
        <div className="w-full h-full animate-grain bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/30 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="float-404 absolute top-20 left-20 text-white/5 text-9xl font-black rotate-12">
          ?
        </div>
        <div className="float-404 absolute bottom-40 right-20 text-white/5 text-9xl font-black -rotate-12">
          !
        </div>
        <div className="float-404 absolute top-1/2 left-40 text-white/5 text-6xl font-black rotate-45">
          404
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* 404 Glitch Text */}
        <div className="animate-in mb-8">
          <h1
            ref={glitchRef}
            className="text-[200px] md:text-[300px] font-black leading-none tracking-tighter mb-0"
            style={{
              textShadow: `
                3px 3px 0 #ff3b30,
                -3px -3px 0 #00d9ff,
                6px 6px 0 #ffd60a
              `,
            }}
          >
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="animate-in mb-6">
          <div className="inline-block px-6 py-3 bg-red-500 border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
            <p className="text-lg md:text-xl font-black tracking-wider uppercase">
              PAGE NOT FOUND
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="animate-in mb-12">
          <p className="text-xl md:text-2xl text-gray-400 mb-4">
            Looks like you wandered off the path...
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            This page doesn't exist, got deleted, or you typed the URL wrong. Either way,
            let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="animate-in flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/"
            className="group px-8 py-5 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
          >
            <Home className="w-5 h-5" />
            <span>TAKE ME HOME</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group px-8 py-5 border-2 border-white text-white font-black text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>GO BACK</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="animate-in">
          <p className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase mb-6">
            OR TRY THESE
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {randomLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                <Link
                  to={link.path}
                  className="px-6 py-3 bg-white/5 border border-white/20 text-sm font-bold tracking-wider uppercase hover:bg-white/10 hover:border-white transition-all"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Error Code */}
        <div className="animate-in mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-gray-600 font-mono">
            ERROR_CODE: 404 | PATH: {location.pathname} | TIMESTAMP:{" "}
            {new Date().toISOString()}
          </p>
        </div>
      </div>

      {/* Rotating Icon Decoration */}
      <div className="rotate-icon absolute bottom-8 right-8 opacity-20 pointer-events-none hidden md:block">
        <Search className="w-24 h-24 text-white" />
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
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </main>
  );
};

export default NotFound;