import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-socks.jpg";
import heroVideo from "@/assets/herobg.mp4";
import { Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to(".hero-bg-video", {
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

  // Set video volume to 30%
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      setUserInteracted(true);
    }
  };

  // Optimize video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = async () => {
      setCanPlayVideo(true);
      setIsVideoLoaded(true);
      
      // Try to play video
      if (video) {
        try {
          // Try unmuted first
          video.muted = false;
          await video.play();
          setIsMuted(false);
        } catch (error) {
          try {
            // Fallback to muted
            video.muted = true;
            await video.play();
            setIsMuted(true);
          } catch (mutedError) {
            // Video failed to play even muted
          }
        }
      }
    };

    const handleLoadStart = () => {
      setIsVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);

    // Set video optimization attributes
    video.preload = 'metadata';
    video.setAttribute('playsinline', '');

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, []);

  // Lazy load video when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !canPlayVideo) {
            videoRef.current.load();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [canPlayVideo]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-end pb-4 sm:pb-6 md:pb-8 lg:pb-12 pt-12 sm:pt-16 md:pt-20 lg:pt-24 overflow-hidden">
      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-20 p-2 sm:p-2.5 md:p-3 bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
        )}
      </button>

      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Fallback image while video loads */}
        {!isVideoLoaded && (
          <img
            src={heroImage}
            alt="Street style socks"
            className="absolute inset-0 w-full h-full object-cover object-center scale-100"
          />
        )}
        
        <video
          ref={videoRef}
          src={heroVideo}
          loop
          muted={false}
          playsInline
          preload="metadata"
          className={`hero-bg-video w-full h-full object-cover object-center scale-100 transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container w-full">
        <div ref={textRef} className="max-w-3xl sm:max-w-4xl md:max-w-5xl">
          <div className="overflow-hidden">
            <p className="hero-line body-sm text-muted-foreground mb-2 sm:mb-3 text-xs sm:text-sm">
              CULTURE ON YOUR FEET
            </p>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line headline-xl mb-2 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              NOT YOUR
              <br />
              <span className="text-accent-red">BASIC</span> SOCKS
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="hero-line body-lg text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md mb-4 sm:mb-6 text-sm sm:text-base">
              Made for the ones who don't blend in. Street-ready. Culture-first. 100% Indian.
            </p>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a href="#shop" className="btn-editorial text-xs sm:text-sm">
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
