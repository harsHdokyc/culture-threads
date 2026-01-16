import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Users, Heart, TrendingUp } from "lucide-react";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const communityStats = [
  { icon: Users, value: "50K+", label: "CREW MEMBERS", color: "#FF3B30" },
  { icon: Heart, value: "2.3M", label: "TOTAL LIKES", color: "#FFD60A" },
  { icon: TrendingUp, value: "12", label: "CITIES", color: "#00D9FF" },
];

const instagramPosts = [
  { id: 1, handle: "@rahul.streets", likes: "2.3K", image: lifestyle1 },
  { id: 2, handle: "@maya_style", likes: "1.8K", image: lifestyle2 },
  { id: 3, handle: "@urban.vibes", likes: "3.1K", image: lifestyle1 },
  { id: 4, handle: "@street.king", likes: "2.7K", image: lifestyle2 },
];

const Community = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".community-header",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Grid items with stagger
      const gridItems = gridRef.current?.querySelectorAll(".grid-item");
      gridItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            scale: 0.8,
            opacity: 0,
            y: 60,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.3)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll(".stat-counter");
      statItems?.forEach((item) => {
        const valueElement = item.querySelector(".stat-value");
        const value = valueElement?.textContent || "";
        
        gsap.fromTo(
          item,
          {
            scale: 0,
            rotation: -45,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Floating animation for hashtag
      gsap.to(".float-hashtag", {
        y: -15,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative section-container bg-black py-32 md:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-500/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-yellow-500/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Decorative Hashtag */}
      <div className="float-hashtag absolute top-20 right-12 text-white/5 text-[120px] font-black leading-none pointer-events-none hidden md:block">
        #
      </div>

      {/* Section Header */}
      <div className="community-header relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-red-500 to-transparent" />
            <p className="text-xs font-bold tracking-[0.3em] text-red-500 uppercase">
              COMMUNITY
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            THE <span className="text-red-500">CREW</span>
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-xl">
            You are the brand. Tag us and become part of the movement.
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-black text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95"
        >
          <Instagram className="w-5 h-5" />
          <span>@SOKZ.IN</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>

      
      {/* Community Grid */}
      <div ref={gridRef} className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Large Featured Image */}
        <div className="grid-item col-span-2 row-span-2 group relative overflow-hidden bg-zinc-900 cursor-pointer">
          <img
            src={lifestyle1}
            alt="Street style"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm font-bold mb-2">{instagramPosts[0].handle}</p>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span className="text-sm font-bold">{instagramPosts[0].likes}</span>
            </div>
          </div>

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white text-xs font-black uppercase tracking-wider">
            FEATURED
          </div>
        </div>

        {/* Secondary Image */}
        <div className="grid-item col-span-2 aspect-square group relative overflow-hidden bg-zinc-900 cursor-pointer">
          <img
            src={lifestyle2}
            alt="Urban walk"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm font-bold mb-2">{instagramPosts[1].handle}</p>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span className="text-sm font-bold">{instagramPosts[1].likes}</span>
            </div>
          </div>
        </div>

        {/* Join CTA Block */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="grid-item aspect-square bg-gradient-to-br from-red-500 to-red-600 flex flex-col items-center justify-center p-6 relative overflow-hidden group cursor-pointer"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
          
          <Instagram className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
          <span className="font-black text-2xl md:text-3xl text-center leading-tight">
            JOIN
            <br />
            THE
            <br />
            CREW
          </span>
        </motion.div>

        {/* Stats Block */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="grid-item aspect-square bg-gradient-to-br from-yellow-500 to-yellow-600 flex flex-col items-center justify-center p-6 relative overflow-hidden group cursor-default"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
          
          <span className="text-6xl md:text-7xl font-black text-black group-hover:scale-110 transition-transform">
            50K+
          </span>
          <span className="text-xs font-bold tracking-wider text-black/70 mt-2 uppercase">
            AND COUNTING
          </span>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mt-20 md:mt-32 text-center max-w-3xl mx-auto"
      >
        <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 mb-8">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">
            TAG US • GET FEATURED
          </span>
        </div>

        <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          YOUR SOCKS.
          <br />
          <span className="text-red-500">YOUR STORY.</span>
        </h3>

        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          Tag <span className="text-white font-bold">@sokz.in</span> or use{" "}
          <span className="text-white font-bold">#SOKZCREW</span> for a chance to be
          featured. Best fits get free socks for life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <Instagram className="w-5 h-5" />
            <span>TAG US NOW</span>
          </a>

          <button className="px-10 py-5 border-2 border-white text-white font-black text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95">
            VIEW GALLERY
          </button>
        </div>
      </motion.div>

      <style>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Community;