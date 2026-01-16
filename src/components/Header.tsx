import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initialScrollY, setInitialScrollY] = useState(0);
  const [userInitiatedScroll, setUserInitiatedScroll] = useState(false);
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
    // Initialize scroll position on mount
    const currentScrollY = window.scrollY;
    setInitialScrollY(currentScrollY);
    setIsInitialized(true);
    
    // Only set hasScrolled if there's actual scroll restoration beyond a small threshold
    if (currentScrollY > 50) {
      setHasScrolled(true);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      
      // Detect user-initiated scrolling (significant change from initial position)
      const scrollDelta = Math.abs(scrollY - initialScrollY);
      if (scrollDelta > 30 && !userInitiatedScroll) {
        setUserInitiatedScroll(true);
      }
      
      // Show header only after user has started scrolling
      if ((userInitiatedScroll && scrollY > 10) || (!userInitiatedScroll && scrollY > 50)) {
        setHasScrolled(true);
      }
      
      // Hide header when back at top (with small threshold)
      if (scrollY <= 5 && hasScrolled) {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, initialScrollY, userInitiatedScroll]);

  useEffect(() => {
    // Only run animations when header becomes visible
    if (hasScrolled && logoRef.current) {
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
    if (hasScrolled) {
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
    }
  }, [hasScrolled]);

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
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hasScrolled ? 0 : -100,
          opacity: hasScrolled ? 1 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-black/80 backdrop-blur-md border-b border-white/5 py-4"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="group relative font-black text-2xl md:text-3xl tracking-tighter"
          >
            <span className="relative z-10 inline-block group-hover:scale-110 transition-transform duration-300">
              <span className="text-white">SO</span>
              <span className="text-red-500">KZ</span>
            </span>
            {/* Logo glow effect */}
            <span className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-r from-red-500 to-yellow-500" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onMouseEnter={() => setActiveLink(link.label)}
                  onMouseLeave={() => setActiveLink(null)}
                  className="nav-link-item relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors group"
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
          <div className="flex items-center gap-3">
            {/* Search Icon (Desktop) */}
            <button className="hidden md:block p-2 text-gray-500 hover:text-white transition-colors hover:scale-110 active:scale-95">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon (Desktop) */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 relative group">
              <ShoppingBag className="w-5 h-5" />
              {/* Cart badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center group-hover:scale-125 transition-transform">
                0
              </span>
            </button>

            {/* CTA Button (Desktop) */}
            <Link
              to="/shop"
              className="cta-button hidden md:flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-xs tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span>SHOP NOW</span>
              <span className="text-sm">→</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95"
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
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
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
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black border-l border-white/10 z-50 md:hidden overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
                <span className="font-black text-2xl tracking-tighter">
                  <span className="text-white">SO</span>
                  <span className="text-red-500">KZ</span>
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="px-6 py-8">
                {/* Nav Links */}
                <nav className="space-y-2 mb-12">
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
                          className={`group block py-4 px-4 rounded-lg transition-all ${
                            isActive
                              ? "bg-white/10 border-l-4"
                              : "hover:bg-white/5 hover:translate-x-2"
                          }`}
                          style={{
                            borderColor: isActive ? link.color : "transparent",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-3xl font-black tracking-tight">
                              {link.label}
                            </span>
                            <span
                              className="text-2xl opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
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
                    className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>SHOP NOW</span>
                  </Link>

                  {/* Search */}
                  <button className="flex items-center justify-center gap-3 w-full py-5 border-2 border-white/20 text-white font-black text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all">
                    <Search className="w-5 h-5" />
                    <span>SEARCH</span>
                  </button>
                </motion.div>

                {/* Social Links or Extra Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <p className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase mb-4">
                    FOLLOW US
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-gray-500 hover:text-white transition-colors"
                    >
                      INSTAGRAM
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-gray-500 hover:text-white transition-colors"
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
    </>
  );
};

export default Header;