import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [shouldShow, setShouldShow] = useState(() => {
    // Show loader on page refresh/reload
    if (typeof window === 'undefined') return false;
    
    // Check navigation type to detect page refresh or initial load
    let navigationType: string | number | null = null;
    
    // Try modern PerformanceNavigationTiming API
    try {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        navigationType = navEntries[0].type; // 'reload' or 'navigate'
      }
    } catch (e) {
      // Fallback to legacy API
      try {
        const legacyNav = (performance as any).navigation;
        if (legacyNav) {
          navigationType = legacyNav.type; // 1 = reload, 0 = navigate
        }
      } catch (e2) {
        // Both APIs failed
      }
    }
    
    // Show loader on:
    // 1. Page reload (refresh) - navigationType === 'reload' or 1
    // 2. Initial page load - navigationType === 'navigate' or 0 (but only if it's a full page load, not React Router)
    // Don't show on React Router navigation (which doesn't cause full page reload, so this component won't remount)
    
    if (navigationType === 'reload' || navigationType === 1) {
      return true; // Page refresh
    }
    
    // For initial load, check if there's a session flag
    // If no flag exists, it's the first load in this session
    const hasSessionFlag = sessionStorage.getItem('sokz_loader_shown');
    if (!hasSessionFlag && (navigationType === 'navigate' || navigationType === 0 || navigationType === null)) {
      sessionStorage.setItem('sokz_loader_shown', 'true');
      return true; // Initial page load
    }
    
    return false; // React Router navigation or subsequent loads
  });

  useEffect(() => {
    if (!shouldShow) {
      onComplete?.();
      return;
    }

    const loadTimeline = gsap.timeline({
      onComplete: () => {
        setShouldShow(false);
        onComplete?.();
      },
    });

    loadTimeline
      .to(".loader-bar", {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(".loader", {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
      });
  }, [shouldShow, onComplete]);

  if (!shouldShow) return null;

  return (
    <div className="loader fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
          SOKZ
        </h1>
        <div className="relative w-64 h-1 bg-white/10 overflow-hidden">
          <div
            className="loader-bar absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-4 tracking-widest">
          LOADING EXPERIENCE
        </p>
      </div>
    </div>
  );
};

export default Loader;
