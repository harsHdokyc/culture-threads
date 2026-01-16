import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-socks.jpg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to(".hero-bg-image", {
        y: 150,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal animation
      const lines = textRef.current?.querySelectorAll(".hero-line");
      lines?.forEach((line, index) => {
        gsap.fromTo(
          line,
          { 
            y: 120, 
            opacity: 0,
            clipPath: "inset(100% 0% 0% 0%)"
          },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            delay: 0.2 + index * 0.15,
            ease: "power3.out",
          }
        );
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-end pb-16 md:pb-24 pt-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Street style socks"
          className="hero-bg-image w-full h-full object-cover object-center scale-100"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full">
        <div ref={textRef} className="max-w-5xl">
          <div className="overflow-hidden">
            <p className="hero-line body-sm text-muted-foreground mb-4 md:mb-6">
              CULTURE ON YOUR FEET
            </p>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line headline-xl mb-6 md:mb-8">
              NOT YOUR
              <br />
              <span className="text-accent-red">BASIC</span> SOCKS
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="hero-line body-lg text-muted-foreground max-w-md mb-10">
              Made for the ones who don't blend in. Street-ready. Culture-first. 100% Indian.
            </p>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a href="#shop" className="btn-editorial">
                EXPLORE THE DROP
              </a>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
