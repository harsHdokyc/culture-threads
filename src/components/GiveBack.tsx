import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GiveBack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content slide in
      gsap.fromTo(
        ".giveback-left",
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Right content slide in
      gsap.fromTo(
        ".giveback-right",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Stats counter animation
      const statNumbers = sectionRef.current?.querySelectorAll(".stat-number");
      statNumbers?.forEach((stat) => {
        gsap.fromTo(
          stat,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-container bg-background py-16 sm:py-20 md:py-24">
      <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-12 md:gap-8 items-center">
        {/* Left Content */}
        <div className="giveback-left md:col-span-5">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
            <div className="h-px w-12 sm:w-14 md:w-16 bg-gradient-to-r from-red-500 to-transparent" />
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-red-500 uppercase">GIVE BACK</p>
          </div>
          <h2 className="headline-lg mb-4 sm:mb-6">
            <span className="text-accent-red">2%</span> OF EVERY
            <br />
            ORDER GOES BACK
          </h2>
        </div>

        {/* Right Content */}
        <div className="giveback-right md:col-span-6 md:col-start-7">
          <p className="body-lg text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
            To grassroots sports programs across India. No drama. No performative charity. 
            Just socks funding what matters.
          </p>
          <div className="flex items-center gap-6 sm:gap-8">
            <div>
              <span className="stat-number font-display text-3xl sm:text-4xl md:text-5xl font-bold">12K+</span>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">Kids supported</p>
            </div>
            <div className="w-px h-12 sm:h-14 md:h-16 bg-border" />
            <div>
              <span className="stat-number font-display text-3xl sm:text-4xl md:text-5xl font-bold">₹8L</span>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">Contributed</p>
            </div>
          </div>
        </div>
      </div>

          </section>
  );
};

export default GiveBack;
