import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import CartIcon from "./CartIcon";
import Cart from "./Cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const navLinks = [
    { label: "SHOP", href: "/shop", color: "#FF3B30" },
    { label: "DROPS", href: "/drops", color: "#FFD60A" },
    { label: "STORY", href: "/story", color: "#00D9FF" },
    { label: "COMMUNITY", href: "/community", color: "#34C759" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Initial entrance animations on mount
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: -20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          delay: 0.2,
        }
      );
    }

    // Nav links entrance
    gsap.fromTo(
      ".nav-link-item",
      {
        y: -30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.4,
      }
    );

    // CTA button entrance
    gsap.fromTo(
      ".cta-button",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: 0.8,
      }
    );
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/40 backdrop-blur-2xl border-b border-white/20 shadow-lg shadow-black/20 py-2"
            : "bg-black/30 backdrop-blur-xl border-b border-white/10 py-3"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(16px) saturate(180%)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(16px) saturate(180%)",
          backgroundColor: scrolled ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-center justify-between px-2 sm:px-3 md:px-4 lg:px-6 w-full">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="group relative font-black text-base sm:text-lg md:text-xl tracking-tighter"
          >
              <span className="relative z-10 inline-block group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-base sm:text-lg md:text-xl">SO</span>
                <span className="text-white text-base sm:text-lg md:text-xl">KZ</span>
              </span>
            {/* Logo glow effect */}
            <span className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-r from-red-500 to-yellow-500" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 sm:gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onMouseEnter={() => setActiveLink(link.label)}
                  onMouseLeave={() => setActiveLink(null)}
                  className="nav-link-item relative px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors group"
                >
                  {/* Link text */}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive ? "text-white" : "text-gray-500 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: link.color }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Hover background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"
                    style={{
                      backgroundColor: `${link.color}10`,
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {/* Cart Icon (Desktop) */}
            <CartIcon />

            {/* CTA Button (Desktop) */}
            <Link
              to="/shop"
              className="cta-button hidden md:flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white text-black font-black text-[10px] sm:text-xs tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span className="text-xs sm:text-sm">SHOP NOW</span>
              <span className="text-xs sm:text-sm">→</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-64 sm:max-w-72 md:max-w-80 bg-black border-l border-white/10 z-50 md:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 border-b border-white/10">
                <span className="font-black text-base sm:text-lg tracking-tighter">
                  <span className="text-white text-base sm:text-lg md:text-xl">SO</span>
                  <span className="text-white text-base sm:text-lg md:text-xl">KZ</span>
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-5">
                {/* Nav Links */}
                <nav className="space-y-0.5 sm:space-y-1 mb-4 sm:mb-6 md:mb-8">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.href;
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`group block py-3 sm:py-4 px-3 sm:px-4 rounded-lg transition-all ${
                            isActive
                              ? "bg-white/10 border-l-4"
                              : "hover:bg-white/5 hover:translate-x-2"
                          }`}
                          style={{
                            borderColor: isActive ? link.color : "transparent",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl sm:text-3xl font-black tracking-tight">
                              {link.label}
                            </span>
                            <span
                              className="text-xl sm:text-2xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
                              style={{ color: link.color }}
                            >
                              →
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  {/* Shop Now */}
                  <Link
                    to="/shop"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 sm:gap-3 w-full py-4 sm:py-5 bg-white text-black font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all"
                  >
                    <span className="text-xs sm:text-sm">SHOP NOW</span>
                  </Link>

                </motion.div>

                {/* Social Links or Extra Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-white/10"
                >
                  <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-gray-600 uppercase mb-3 sm:mb-4">
                    FOLLOW US
                  </p>
                  <div className="flex gap-3 sm:gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-gray-500 hover:text-white transition-colors"
                    >
                      INSTAGRAM
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-gray-500 hover:text-white transition-colors"
                    >
                      TWITTER
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Component */}
      <Cart />
    </>
  );
};

export default Header;