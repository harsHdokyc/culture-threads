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
    <section ref={sectionRef} className="section-container bg-background">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        {/* Left Content */}
        <div className="giveback-left md:col-span-5">
          <p className="body-sm text-muted-foreground mb-4">03 — GIVE BACK</p>
          <h2 className="headline-lg mb-6">
            <span className="text-accent-yellow">2%</span> OF EVERY
            <br />
            ORDER GOES BACK
          </h2>
        </div>

        {/* Right Content */}
        <div className="giveback-right md:col-span-6 md:col-start-7">
          <p className="body-lg text-muted-foreground mb-8">
            To grassroots sports programs across India. No drama. No performative charity. 
            Just socks funding what matters.
          </p>
          <div className="flex items-center gap-8">
            <div>
              <span className="stat-number font-display text-4xl md:text-5xl font-bold">12K+</span>
              <p className="text-muted-foreground text-sm mt-1">Kids supported</p>
            </div>
            <div className="w-px h-16 bg-border" />
            <div>
              <span className="stat-number font-display text-4xl md:text-5xl font-bold">₹8L</span>
              <p className="text-muted-foreground text-sm mt-1">Contributed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider mt-24 md:mt-32" />
    </section>
  );
};

export default GiveBack;
