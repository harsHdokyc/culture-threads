import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Zap } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "CHAOS PACK",
    price: 799,
    image: product1,
    tag: "BESTSELLER",
    tagColor: "#FF3B30",
    description: "Pack of 3 • Limited Edition",
    soldCount: 1234,
  },
  {
    id: 2,
    name: "STRIPE RIOT",
    price: 599,
    image: product2,
    tag: "NEW DROP",
    tagColor: "#FFD60A",
    description: "Single pair • Just Dropped",
    soldCount: 567,
  },
  {
    id: 3,
    name: "GEOMETRIC REBELS",
    price: 649,
    image: product3,
    tag: null,
    tagColor: null,
    description: "Single pair • Trending",
    soldCount: 890,
  },
];

const FeaturedDrop = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation with rotation
      gsap.fromTo(
        ".featured-header",
        {
          x: -80,
          opacity: 0,
          rotateY: -45,
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Products staggered reveal with 3D effect
      const productCards = productsRef.current?.querySelectorAll(".product-reveal");
      productCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateX: 45,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Image parallax
      const images = productsRef.current?.querySelectorAll(".product-img-wrap");
      images?.forEach((imgWrap) => {
        const img = imgWrap.querySelector("img");
        if (img) {
          gsap.to(img, {
            y: -40,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: imgWrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });

      // Floating badges
      gsap.to(".product-badge", {
        y: -5,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative section-container bg-black py-32 md:py-40 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-yellow-500/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-red-500/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Decorative Text */}
      <div className="absolute top-20 left-12 text-white/5 text-[120px] font-black leading-none pointer-events-none hidden md:block rotate-12">
        01
      </div>

      {/* Section Header */}
      <div
        ref={headerRef}
        className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24"
        style={{ perspective: "1000px" }}
      >
        <div className="featured-header">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-yellow-500 to-transparent" />
            <p className="text-xs font-bold tracking-[0.3em] text-yellow-500 uppercase">
              01 — FEATURED
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-4">
            THE <span className="text-yellow-500">DROP</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl">
            Limited releases. When they're gone, they're gone forever.
          </p>
        </div>

        <Link
          to="/shop"
          className="featured-header group flex items-center gap-3 px-8 py-4 border-2 border-white text-white font-black text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all transform hover:scale-105 active:scale-95"
        >
          <span>VIEW ALL</span>
          <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Product Grid - Asymmetrical */}
      <div
        ref={productsRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
        style={{ perspective: "2000px" }}
      >
        {/* Large Featured Product */}
        <div
          className="product-reveal md:col-span-7 group"
          onMouseEnter={() => setHoveredProduct(products[0].id)}
          onMouseLeave={() => setHoveredProduct(null)}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Link to={`/product/${products[0].id}`} className="block">
            {/* Image Container */}
            <div className="product-img-wrap relative aspect-[4/5] md:aspect-[4/4] overflow-hidden bg-zinc-900 mb-6">
              <img
                src={products[0].image}
                alt={products[0].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Tag Badge */}
              {products[0].tag && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="product-badge absolute top-6 left-6 px-6 py-3 font-black text-xs uppercase tracking-wider text-white z-20"
                  style={{ backgroundColor: products[0].tagColor }}
                >
                  {products[0].tag}
                </motion.div>
              )}

              {/* Quick Actions Overlay */}
              <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-4 text-sm font-bold mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>{products[0].soldCount} sold</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Limited</span>
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-0 h-0 group-hover:w-16 group-hover:h-16 transition-all duration-300 border-b-2 border-r-2 border-white/30" />
            </div>

            {/* Product Info */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl md:text-3xl font-black tracking-tight group-hover:text-yellow-500 transition-colors">
                  {products[0].name}
                </h3>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-black">₹{products[0].price}</p>
                  <p className="text-xs text-gray-600 line-through">₹{Math.floor(products[0].price * 1.3)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{products[0].description}</p>
            </div>
          </Link>
        </div>

        {/* Stacked Products */}
        <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
          {products.slice(1).map((product, index) => (
            <div
              key={product.id}
              className="product-reveal group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link to={`/product/${product.id}`} className="block">
                {/* Image Container */}
                <div className="product-img-wrap relative aspect-[4/3] overflow-hidden bg-zinc-900 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Tag Badge */}
                  {product.tag && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                      className="product-badge absolute top-4 left-4 px-4 py-2 font-black text-xs uppercase tracking-wider text-black z-20"
                      style={{ backgroundColor: product.tagColor }}
                    >
                      {product.tag}
                    </motion.div>
                  )}

                  {/* Quick Add Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="px-6 py-3 bg-white text-black font-black text-sm uppercase tracking-wider hover:bg-yellow-500 transition-colors transform hover:scale-110 active:scale-95">
                      QUICK ADD
                    </button>
                  </div>

                  {/* Sold Count */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md text-xs font-bold">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span>{product.soldCount}</span>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 left-0 w-0 h-0 group-hover:w-12 group-hover:h-12 transition-all duration-300 border-t-2 border-l-2 border-white/30" />
                </div>

                {/* Product Info */}
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg md:text-xl font-black tracking-tight group-hover:text-yellow-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg md:text-xl font-black">₹{product.price}</p>
                  </div>
                  <p className="text-xs text-gray-500">{product.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mt-20 md:mt-32 text-center"
      >
        <Link
          to="/shop"
          className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-yellow-500 hover:text-black transition-all transform hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>SHOP ALL PRODUCTS</span>
          <span className="text-xl">→</span>
        </Link>
      </motion.div>

      <style>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default FeaturedDrop;