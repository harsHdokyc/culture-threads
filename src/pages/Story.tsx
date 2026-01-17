import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { FadeReveal, TextReveal, MaskReveal } from "@/components/animations";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: "01",
    title: "NO BORING",
    description: "We killed beige. Every design starts with 'would this make someone stop and stare?' If not, it's out.",
    icon: "🔥",
  },
  {
    number: "02",
    title: "MADE HERE",
    description: "100% designed and manufactured in India. No outsourcing. No shortcuts. Every thread is intentional.",
    icon: "🇮🇳",
  },
  {
    number: "03",
    title: "CULTURE FIRST",
    description: "We don't follow trends. We follow streets, studios, and the chaos of real life.",
    icon: "🎨",
  },
  {
    number: "04",
    title: "GIVE BACK",
    description: "2% of every order goes to grassroots sports programs. Because culture starts from the ground up.",
    icon: "❤️",
  },
];

const timeline = [
  { year: "2024", event: "The Idea", description: "Two friends frustrated with boring socks" },
  { year: "2025 Q1", event: "First Drop", description: "Chaos Pack launches in Mumbai" },
  { year: "2025 Q2", event: "Going Viral", description: "50K followers in 3 months" },
  { year: "2025 Q4", event: "Pan India", description: "Shipping to 12 cities" },
  { year: "2026", event: "Today", description: "100K+ pairs sold, just getting started" },
];

const Story = () => {
  const valuesRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Epic hero text animation
      const heroLines = heroTextRef.current?.querySelectorAll(".story-hero-line");
      heroLines?.forEach((line, index) => {
        gsap.fromTo(
          line,
          {
            y: 150,
            opacity: 0,
            rotateX: -60,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.15,
            ease: "power3.out",
          }
        );
      });

      // Values animation with more drama
      const valueItems = valuesRef.current?.querySelectorAll(".value-item");
      valueItems?.forEach((item, index) => {
        const number = item.querySelector(".value-number");
        const content = item.querySelector(".value-content");

        gsap.fromTo(
          number,
          { scale: 0, rotation: -45, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          content,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Timeline animation
      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
      timelineItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            y: 80,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>(".story-parallax-img").forEach((img) => {
        gsap.to(img, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Floating decorative elements
      gsap.to(".float-decoration", {
        y: -30,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    });

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

      <Header />

      {/* Hero with cinematic reveal */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-20 sm:pb-24 md:pb-32 section-container relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-red-500/40 rounded-full blur-[100px] sm:blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-yellow-500/30 rounded-full blur-[100px] sm:blur-[150px] animate-pulse delay-1000" />
        </div>

        <div ref={heroTextRef} className="relative z-10 max-w-5xl" style={{ perspective: "2000px" }}>
          <p className="story-hero-line text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-red-500 mb-6 sm:mb-8">
            OUR STORY
          </p>

          <h1 className="mb-12 overflow-hidden">
            <div className="story-hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter mb-2 sm:mb-4">
              WE STARTED WITH A
            </div>
            <div className="story-hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-gradient">
              SIMPLE QUESTION
            </div>
          </h1>

          <p className="story-hero-line text-xl sm:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-light text-gray-400 max-w-2xl sm:max-w-3xl leading-tight">
            Why are socks so{" "}
            <span className="font-black italic text-white line-through">boring</span>
            ?
          </p>
        </div>

        {/* Floating decorations */}
        <div className="float-decoration absolute top-16 sm:top-20 right-16 sm:right-20 text-white/5 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black pointer-events-none hidden md:block">
          ?
        </div>
      </section>

      {/* Origin Story - Split Layout */}
      <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />

        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 md:gap-20 items-center">
            {/* Image */}
            <div className="lg:col-span-6 relative overflow-hidden">
              <div className="aspect-[4/5] relative">
                <img
                  src={lifestyle1}
                  alt="Founder"
                  className="story-parallax-img w-full h-full object-cover"
                />
                {/* Image border effect */}
                <div className="absolute inset-0 border-2 sm:border-4 border-white/10" />
                <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-full h-full border-2 sm:border-4 border-red-500/30 -z-10" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                  <div className="h-px w-12 sm:w-14 md:w-16 bg-yellow-500" />
                  <p className="text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-yellow-500">
                    2025, MUMBAI
                  </p>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-tight">
                  IT STARTED IN A
                  <br />
                  <span className="text-yellow-500">HOSTEL ROOM</span>
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-400 leading-relaxed">
                <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold">
                  Two friends. Zero budget. One obsession.
                </p>
                <p>
                  We saw streetwear exploding. Sneaker culture taking over. But feet? Still
                  stuck in 2005.
                </p>
                <p>
                  So we started designing. In between classes. After internships. At 2 AM
                  when we should've been sleeping.
                </p>
                <p className="text-white font-semibold">
                  SOKZ was born not from a business plan, but from frustration. From wanting
                  something that didn't exist.
                </p>
              </div>

              <div className="pt-6 sm:pt-8 flex gap-6 sm:gap-8 md:gap-12">
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-red-500 mb-1 sm:mb-2">2024</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">FOUNDED</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-500 mb-1 sm:mb-2">50K+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">CREW MEMBERS</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-cyan-500 mb-1 sm:mb-2">100K+</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">PAIRS SOLD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 section-container relative">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-red-500" />
            <p className="text-xs font-bold tracking-[0.3em] text-red-500">THE JOURNEY</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            FROM <span className="text-red-500">IDEA</span> TO{" "}
            <span className="text-yellow-500">MOVEMENT</span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`timeline-item grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Left/Right content */}
                <div
                  className={`${
                    index % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16 md:col-start-2"
                  }`}
                >
                  <span className="text-6xl md:text-7xl font-black text-white/10 block mb-4">
                    {item.year}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black mb-4">{item.event}</h3>
                  <p className="text-lg text-gray-400">{item.description}</p>
                </div>

                {/* Timeline dot */}
                <div
                  className={`hidden md:block ${
                    index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"
                  }`}
                >
                  <div className="absolute left-1/2 -translate-x-1/2">
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-black" />
                    <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 section-container bg-zinc-900/50 relative overflow-hidden">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-cyan-500" />
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-500">WHAT WE BELIEVE</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            THE <span className="text-red-500">CODE</span>
          </h2>
        </div>

        <div ref={valuesRef} className="space-y-0">
          {values.map((value, index) => (
            <div
              key={value.number}
              className="value-item grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-16 border-t border-white/10 group hover:bg-white/5 transition-all duration-500"
            >
              {/* Number */}
              <div className="md:col-span-2 value-number">
                <div className="relative inline-block">
                  <span className="text-7xl md:text-8xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                    {value.number}
                  </span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
                    {value.icon}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-3 value-content">
                <h3 className="text-3xl md:text-4xl font-black group-hover:text-red-500 transition-colors">
                  {value.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-7 value-content">
                <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission - Full Width */}
      <section className="py-32 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
              <span className="block mb-4">CULTURE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
                ON YOUR
              </span>
              <span className="block">FEET</span>
            </h2>
          </div>

          <div className="space-y-8">
            <p className="text-xl text-gray-400 leading-relaxed">
              We're not just selling socks. We're building a movement. A crew of people who
              refuse to blend in. Who see fashion as self-expression, not conformity.
            </p>
            <p className="text-lg text-gray-500">
              Every pair tells a story. Every design challenges the status quo. Every purchase
              supports grassroots culture.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span>JOIN THE MOVEMENT</span>
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Photo - Cinematic */}
      <section className="section-container pb-32">
        <div className="relative aspect-[21/9] overflow-hidden">
          <img
            src={lifestyle2}
            alt="The Team"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl">
              <p className="text-xs font-bold tracking-[0.3em] text-gray-400 mb-3">
                THE SOKZ CREW
              </p>
              <p className="text-2xl md:text-4xl font-black">
                Mumbai, 2026 —{" "}
                <span className="text-gray-400">Just getting started</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
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
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </main>
  );
};

export default Story;