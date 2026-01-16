import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRight, Target, Heart, Zap } from "lucide-react";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const BrandStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content slide-in animation
      gsap.fromTo(
        ".brand-content",
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
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image reveal with scale
      gsap.fromTo(
        ".brand-image",
        {
          scale: 0.8,
          opacity: 0,
          rotateY: 45,
        },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      
      
      // Parallax on images
      const images = imageRef.current?.querySelectorAll(".parallax-img");
      images?.forEach((img) => {
        gsap.to(img, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-container bg-black py-32 md:py-40 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      
      {/* Section Header */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Content */}
        <div ref={contentRef} className="brand-content flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-red-500 to-transparent" />
            <p className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase">
              WHO WE ARE
            </p>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            CULTURE 
            <span className="text-red-500"> FIRST.</span>
            <br />
            ALWAYS.
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Born in the streets of India, SOKZ isn't just about socks. We're about making a statement. 
              Every thread tells a story of rebellion, creativity, and the unapologetic spirit of youth culture.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We design for the misfits, the trendsetters, the ones who'd rather stand out than blend in. 
              This isn't fashion. This is attitude.
            </p>
          </div>

          
          {/* CTA */}
          <motion.a
            href="#community"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-black text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-4 h-4" />
            <span>JOIN THE MOVEMENT</span>
          </motion.a>
        </div>

        {/* Images */}
        <div ref={imageRef} className="brand-image flex-1 relative">
          <div className="relative aspect-[4/5] lg:aspect-[3/4]">
            {/* Main Image */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img
                src={lifestyle1}
                alt="Street culture lifestyle"
                className="parallax-img w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating Image */}
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square overflow-hidden rounded-lg border-4 border-black">
              <img
                src={lifestyle2}
                alt="Urban lifestyle"
                className="parallax-img w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent" />
            </div>

            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="absolute top-6 left-6 px-6 py-3 bg-red-500 text-white font-black text-xs uppercase tracking-wider"
            >
              Since 2024
            </motion.div>
          </div>
        </div>
      </div>

      
      <style>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default BrandStory;
