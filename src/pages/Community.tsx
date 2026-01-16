import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Marquee from "@/components/Marquee";
import { FadeReveal, TextReveal, ScaleReveal } from "@/components/animations";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const communityImages = [
  { id: 1, image: lifestyle1, handle: "@rahul.streets", likes: "2.3K" },
  { id: 2, image: product1, handle: "@maya_fashion", likes: "1.8K" },
  { id: 3, image: lifestyle2, handle: "@vikram.k", likes: "3.1K" },
  { id: 4, image: product2, handle: "@priya.style", likes: "2.7K" },
  { id: 5, image: product3, handle: "@arjun.runs", likes: "1.5K" },
  { id: 6, image: lifestyle1, handle: "@sneha.urban", likes: "2.9K" },
];

const stats = [
  { value: "50K+", label: "CREW MEMBERS", color: "#FF3B30" },
  { value: "12", label: "CITIES", color: "#00D9FF" },
  { value: "100K+", label: "PAIRS SOLD", color: "#FFD60A" },
  { value: "4.9", label: "AVG RATING", color: "#34C759" },
];

const reviews = [
  {
    text: "Finally, socks that match my energy. Been waiting for something like this.",
    author: "RAHUL M.",
    location: "MUMBAI",
    rating: 5,
  },
  {
    text: "The quality is insane. Washed them 20 times, still look fresh. Worth every rupee.",
    author: "PRIYA K.",
    location: "DELHI",
    rating: 5,
  },
  {
    text: "My sneaker collection finally has socks that deserve them. No more boring basics.",
    author: "ARJUN S.",
    location: "BANGALORE",
    rating: 5,
  },
];

const CommunityPage = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced stats animation with counter effect
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      statItems?.forEach((item, index) => {
        const valueElement = item.querySelector(".stat-value");
        const value = valueElement?.textContent || "";

        gsap.fromTo(
          item,
          { 
            y: 80, 
            opacity: 0, 
            scale: 0.8,
            rotateX: 45 
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            delay: index * 0.12,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            onStart: () => {
              // Counter animation for numeric values
              if (valueElement && /\d/.test(value)) {
                const endValue = parseInt(value.replace(/[^\d]/g, ""));
                const suffix = value.replace(/[\d.+]/g, "");
                let currentValue = 0;
                const increment = endValue / 50;

                const counter = setInterval(() => {
                  currentValue += increment;
                  if (currentValue >= endValue) {
                    valueElement.textContent = value;
                    clearInterval(counter);
                  } else {
                    valueElement.textContent =
                      Math.floor(currentValue) + suffix;
                  }
                }, 30);
              }
            },
          }
        );

        // Continuous floating animation
        gsap.to(item, {
          y: -10,
          duration: 2 + index * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3,
        });
      });

      // Enhanced grid animation with 3D effect
      const gridItems = gridRef.current?.querySelectorAll(".grid-item");
      gridItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            scale: 0.6,
            opacity: 0,
            rotateY: 45,
            z: -100,
          },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            z: 0,
            duration: 0.9,
            delay: index * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Staggered reviews with slide-in effect
      const reviewItems = reviewsRef.current?.querySelectorAll(".review-item");
      reviewItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { 
            x: index % 2 === 0 ? -100 : 100, 
            opacity: 0,
            rotateX: 20
          },
          {
            x: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Parallax effect on scroll
      gsap.to(".parallax-slow", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-fast", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
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

      <Header />

      {/* Enhanced Hero */}
      <section className="pt-40 pb-24 section-container relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-red-500/30 to-transparent blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/20 to-transparent blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10">
          <FadeReveal direction="up">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-red-500 to-transparent" />
              <p className="text-xs font-bold tracking-[0.3em] text-red-500">
                THE CREW
              </p>
            </div>
          </FadeReveal>

          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter">
            <div className="block">YOU ARE</div>
            <TextReveal splitBy="words" className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-gradient">
              THE BRAND
            </TextReveal>
          </h1>

          <FadeReveal direction="up" delay={0.3}>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              SOKZ is nothing without the people who wear it.{" "}
              <span className="text-white font-semibold">
                This page is for you.
              </span>
            </p>
          </FadeReveal>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-12 text-white/5 text-[200px] font-black leading-none pointer-events-none parallax-slow">
          #
        </div>
      </section>

      {/* Enhanced Stats with color accents */}
      <section className="py-24 section-container">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          style={{ perspective: "1000px" }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-item text-center group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative inline-block">
                <span
                  className="stat-value block font-black text-5xl md:text-7xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
              
              <p className="text-xs font-bold tracking-[0.25em] text-gray-500 group-hover:text-white transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider with animation */}
      <div className="mx-6 md:mx-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Enhanced Community Grid */}
      <section className="parallax-section py-24 section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <FadeReveal direction="up">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <p className="text-xs font-bold tracking-[0.3em] text-gray-500">
                  TAGGED
                </p>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                  #SOKZCREW
                </span>
              </h2>
            </div>
          </FadeReveal>

          <FadeReveal direction="up" delay={0.2}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-white text-white font-black text-xs tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3"
            >
              <span>FOLLOW @SOKZ.IN</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </FadeReveal>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          style={{ perspective: "2000px" }}
        >
          {communityImages.map((item, index) => (
            <div
              key={item.id}
              className="grid-item relative aspect-square overflow-hidden group cursor-pointer bg-zinc-900"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={() => setActiveImage(item.id)}
              onMouseLeave={() => setActiveImage(null)}
            >
              <img
                src={item.image}
                alt={item.handle}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">
                    <span className="text-xs font-bold">❤️ {item.likes}</span>
                  </div>
                </div>

                <div>
                  <p className="font-black text-lg mb-2">{item.handle}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-300">VIEW POST</span>
                    <div className="w-8 h-px bg-white" />
                  </div>
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-0 h-0 group-hover:w-16 group-hover:h-16 transition-all duration-500"
                style={{
                  borderTop: "2px solid white",
                  borderLeft: "2px solid white",
                }}
              />
            </div>
          ))}
        </div>

        <FadeReveal direction="up" className="mt-12 text-center">
          <button className="px-10 py-4 border-2 border-white/30 text-white font-bold text-sm tracking-wider hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105">
            LOAD MORE →
          </button>
        </FadeReveal>
      </section>

      {/* Enhanced Feature Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTQgMHYyaDJ2LTJoLTJ6bTQgMHYyaDJ2LTJoLTJ6bTQgMHYyaDJ2LTJoLTJ6bTQgMHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        </div>

        <div className="section-container relative z-10">
          <ScaleReveal className="text-center max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="inline-block px-6 py-2 bg-black/20 backdrop-blur-sm border border-white/30 mb-6">
                <span className="text-xs font-bold tracking-[0.3em]">
                  JOIN THE MOVEMENT
                </span>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              WANT TO BE
              <br />
              <span className="text-black">FEATURED?</span>
            </h2>

            <p className="text-xl md:text-2xl mb-4 font-medium">
              Tag us @sokz.in or use #SOKZCREW
            </p>
            <p className="text-lg opacity-90 mb-12">
              Best fits get featured + free socks + bragging rights
            </p>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-5 bg-black text-white font-black uppercase tracking-wider text-sm border-2 border-black hover:bg-transparent hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95 gap-3"
            >
              <span>TAG US NOW</span>
              <span className="text-xl">📸</span>
            </a>
          </ScaleReveal>
        </div>

        {/* Floating elements */}
        <div className="parallax-fast absolute top-12 left-12 text-white/10 text-9xl font-black pointer-events-none">
          ★
        </div>
        <div className="parallax-slow absolute bottom-12 right-12 text-white/10 text-9xl font-black pointer-events-none">
          ♥
        </div>
      </section>

      {/* Enhanced Reviews */}
      <section className="py-24 section-container">
        <FadeReveal direction="up" className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-yellow-500 to-transparent" />
            <p className="text-xs font-bold tracking-[0.3em] text-yellow-500">
              REAL TALK
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            WHAT THE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
              CREW
            </span>{" "}
            SAYS
          </h2>
        </FadeReveal>

        <div
          ref={reviewsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          style={{ perspective: "1000px" }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="review-item group relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card background with gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-xl" />

              <div className="relative border-t-2 border-white/10 pt-8 group-hover:border-yellow-500/50 transition-colors duration-500">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-500 text-lg transform group-hover:scale-125 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-300 group-hover:text-white transition-colors">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center font-black text-lg">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="font-black text-sm">{review.author}</p>
                    <p className="text-gray-500 text-xs tracking-wider">
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Decorative quote mark */}
                <div className="absolute top-0 right-0 text-white/5 text-8xl font-black leading-none pointer-events-none group-hover:text-white/10 transition-colors">
                  "
                </div>
              </div>
            </div>
          ))}
        </div>

        <FadeReveal direction="up" className="mt-16 text-center">
          <p className="text-gray-500 mb-6">
            Loved by 50,000+ crew members across India
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 border-2 border-black flex items-center justify-center font-bold text-sm"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-2">
              + 49,995 more people
            </span>
          </div>
        </FadeReveal>
      </section>

      <Marquee />
      <Footer />

      <style>{`       
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
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

export default CommunityPage;