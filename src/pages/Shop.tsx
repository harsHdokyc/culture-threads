import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Grid3x3, LayoutGrid } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { FadeReveal, MaskReveal } from "@/components/animations";
import CustomCursor from "@/components/CustomCursor";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const allProducts = [
  { id: 1, name: "CHAOS PACK", price: 799, image: product1, category: "packs", tag: "BESTSELLER", new: false },
  { id: 2, name: "STRIPE RIOT", price: 599, image: product2, category: "singles", tag: "NEW", new: true },
  { id: 3, name: "GEOMETRIC REBELS", price: 649, image: product3, category: "singles", tag: null, new: false },
  { id: 4, name: "NEON NIGHTS", price: 549, image: product2, category: "singles", tag: null, new: true },
  { id: 5, name: "RETRO WAVE PACK", price: 899, image: product1, category: "packs", tag: "LIMITED", new: false },
  { id: 6, name: "MONO CHROME", price: 499, image: product3, category: "basics", tag: null, new: false },
  { id: 7, name: "STREET CRED", price: 599, image: product2, category: "singles", tag: null, new: false },
  { id: 8, name: "BASICS BUNDLE", price: 699, image: product1, category: "packs", tag: null, new: false },
];

const categories = [
  { id: "all", label: "ALL", count: allProducts.length },
  { id: "singles", label: "SINGLES", count: allProducts.filter(p => p.category === "singles").length },
  { id: "packs", label: "PACKS", count: allProducts.filter(p => p.category === "packs").length },
  { id: "basics", label: "BASICS", count: allProducts.filter(p => p.category === "basics").length },
  { id: "new", label: "NEW", count: allProducts.filter(p => p.new).length },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [gridSize, setGridSize] = useState<3 | 4>(4);
  const [sortBy, setSortBy] = useState("featured");
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const filteredProducts = activeCategory === "all"
    ? allProducts
    : activeCategory === "new"
    ? allProducts.filter(p => p.new)
    : allProducts.filter(p => p.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // featured - keep original order
  });

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".shop-title",
        { y: 60, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, delay: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(
        ".shop-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        ".shop-count",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.3, ease: "back.out(1.7)" }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Animate products on filter change
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".product-card-animate");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  }, [sortedProducts, gridSize]);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9996] opacity-[0.02]">
        <div className="w-full h-full animate-grain bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      <Header />

      {/* Hero */}
      <section
        ref={heroRef}
        className="pt-40 pb-20 section-container relative overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="relative z-10">
          <p className="shop-subtitle text-xs font-bold tracking-[0.3em] text-red-500 mb-6">
            THE COLLECTION
          </p>
          <h1 className="shop-title text-7xl md:text-9xl font-black leading-none tracking-tighter mb-6">
            ALL
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-gradient">
              SOCKS
            </span>
          </h1>
          <div className="shop-count inline-block px-6 py-3 bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-sm font-bold">
              {sortedProducts.length} PRODUCTS AVAILABLE
            </span>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="section-container pt-0 pb-12 sticky top-20 z-40 bg-black/80 backdrop-blur-xl border-y border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative px-6 py-3 font-black text-xs tracking-wider uppercase border-2 transition-all ${
                  activeCategory === cat.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/20 hover:border-white"
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                <span className="ml-2 text-[10px] opacity-50">({cat.count})</span>
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-white -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Sort & Grid Controls */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/20 text-white text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-white cursor-pointer hover:bg-white/10 transition-all"
            >
              <option value="featured" className="bg-black">FEATURED</option>
              <option value="price-low" className="bg-black">PRICE: LOW TO HIGH</option>
              <option value="price-high" className="bg-black">PRICE: HIGH TO LOW</option>
              <option value="name" className="bg-black">NAME: A-Z</option>
            </select>

            {/* Grid Size Toggle */}
            <div className="flex gap-2 border border-white/20 p-1">
              <button
                onClick={() => setGridSize(3)}
                className={`p-2 transition-all ${
                  gridSize === 3 ? "bg-white text-black" : "text-white/50 hover:text-white"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridSize(4)}
                className={`p-2 transition-all ${
                  gridSize === 4 ? "bg-white text-black" : "text-white/50 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-container pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${gridSize}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={gridRef}
            className={`grid gap-6 ${
              gridSize === 3
                ? "grid-cols-2 md:grid-cols-3"
                : "grid-cols-2 md:grid-cols-4"
            }`}
          >
            {sortedProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card-animate group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Tag */}
                  {product.tag && (
                    <span
                      className={`absolute top-4 left-4 px-4 py-2 text-xs font-black uppercase tracking-wider z-20 ${
                        product.tag === "NEW"
                          ? "bg-yellow-500 text-black"
                          : product.tag === "BESTSELLER"
                          ? "bg-red-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {product.tag}
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-sm font-bold mb-2 block">QUICK VIEW</span>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold">S</span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold">M</span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold">L</span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold">XL</span>
                      </div>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 group-hover:w-12 group-hover:h-12 transition-all duration-300 border-t-2 border-r-2 border-white/30" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm md:text-base font-black tracking-tight group-hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg font-black text-gray-400">
                      ₹{product.price}
                    </span>
                    <span className="text-xs text-gray-600 group-hover:text-white transition-colors">
                      VIEW →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl font-black mb-4">NO SOCKS FOUND</p>
            <p className="text-gray-500 mb-8">Try a different filter</p>
            <button
              onClick={() => setActiveCategory("all")}
              className="px-8 py-4 bg-white text-black font-black text-sm tracking-wider hover:bg-red-500 hover:text-white transition-all"
            >
              VIEW ALL PRODUCTS
            </button>
          </div>
        )}
      </section>

      <Marquee />
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
      `}</style>
    </main>
  );
};

export default Shop;