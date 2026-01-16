import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeReveal, MaskReveal, TextReveal } from "@/components/animations";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "CHAOS PACK", price: 799, image: product1, category: "packs", tag: "BESTSELLER", description: "Three pairs of pure chaos for your feet. Bold patterns, premium cotton, and statement-making designs.", sizes: ["S", "M", "L", "XL"], reviews: 4.9, reviewCount: 234 },
  { id: 2, name: "STRIPE RIOT", price: 599, image: product2, category: "singles", tag: "NEW", description: "Stripes that break the rules. Asymmetric patterns meet premium comfort.", sizes: ["S", "M", "L", "XL"], reviews: 4.8, reviewCount: 156 },
  { id: 3, name: "GEOMETRIC REBELS", price: 649, image: product3, category: "singles", tag: null, description: "Mathematical precision meets street attitude. Sharp angles, sharper style.", sizes: ["S", "M", "L", "XL"], reviews: 4.7, reviewCount: 189 },
  { id: 4, name: "NEON NIGHTS", price: 549, image: product2, category: "singles", tag: null, description: "Glow in the dark energy for night owls. UV reactive threads.", sizes: ["S", "M", "L", "XL"], reviews: 4.9, reviewCount: 267 },
  { id: 5, name: "RETRO WAVE PACK", price: 899, image: product1, category: "packs", tag: "LIMITED", description: "80s nostalgia meets 2020s comfort. Three pairs of synthwave dreams.", sizes: ["S", "M", "L", "XL"], reviews: 5.0, reviewCount: 98 },
  { id: 6, name: "MONO CHROME", price: 499, image: product3, category: "basics", tag: null, description: "Black, white, and everything in between. Essential contrast.", sizes: ["S", "M", "L", "XL"], reviews: 4.6, reviewCount: 312 },
  { id: 7, name: "STREET CRED", price: 599, image: product2, category: "singles", tag: null, description: "Earned on the streets, worn with pride. Urban culture on cotton.", sizes: ["S", "M", "L", "XL"], reviews: 4.8, reviewCount: 201 },
  { id: 8, name: "BASICS BUNDLE", price: 699, image: product1, category: "packs", tag: null, description: "Three essential pairs for everyday rebellion. Comfort without compromise.", sizes: ["S", "M", "L", "XL"], reviews: 4.7, reviewCount: 178 },
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const product = products.find((p) => p.id === Number(id)) || products[0];
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);
  const images = [product.image, product.image, product.image];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    if (!imageRef.current || !detailsRef.current) return;

    const ctx = gsap.context(() => {
      // Enhanced parallax on product image
      gsap.to(".product-hero-image", {
        y: 150,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Staggered details reveal
      gsap.fromTo(
        ".detail-item",
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Related products animation
      gsap.fromTo(
        ".related-card",
        {
          scale: 0.8,
          opacity: 0,
          y: 80,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: ".related-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  const handleAddToBag = () => {
    if (!selectedSize) {
      // Shake size selector
      gsap.fromTo(
        ".size-selector",
        { x: 0 },
        { x: -10, duration: 0.1, repeat: 5, yoyo: true }
      );
      return;
    }

    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 rounded-full border-2 border-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9996] opacity-[0.02]">
        <div className="w-full h-full animate-grain bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      <Header />

      {/* Back Button with Animation */}
      <div className="section-container pt-28 pb-6">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors font-black text-xs tracking-wider uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO SHOP
        </Link>
      </div>

      {/* Product Hero */}
      <section className="section-container pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Image Gallery with Enhanced Interactions */}
          <div ref={imageRef} className="lg:col-span-7 relative">
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-6">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    src={images[activeImage]}
                    alt={product.name}
                    className="product-hero-image w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/70 transition-all hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Tag */}
                {product.tag && (
                  <motion.span
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="absolute top-6 left-6 bg-red-500 text-white px-6 py-3 font-black text-xs uppercase tracking-wider z-10"
                  >
                    {product.tag}
                  </motion.span>
                )}

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all group"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        isLiked ? "fill-white" : ""
                      } group-hover:scale-110`}
                    />
                  </button>
                  <button className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/20">
                  <span className="text-xs font-bold tracking-wider">
                    {activeImage + 1} / {images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square flex-1 overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? "border-white scale-105"
                        : "border-white/20 opacity-50 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {activeImage === i && (
                      <div className="absolute inset-0 border-2 border-white animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div ref={detailsRef} className="lg:col-span-5" style={{ perspective: "1000px" }}>
            {/* Category & Rating */}
            <div className="detail-item flex items-center justify-between mb-6">
              <span className="text-xs font-bold tracking-[0.3em] text-gray-500">
                {product.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(product.reviews) ? "text-yellow-500" : "text-gray-700"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.reviews} ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="detail-item text-5xl md:text-6xl font-black mb-6 leading-none tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="detail-item mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-red-500">₹{product.price}</span>
                <span className="text-sm text-gray-500 line-through">₹{Math.floor(product.price * 1.3)}</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-500 text-xs font-bold uppercase">
                  23% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="detail-item text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="detail-item size-selector mb-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold tracking-[0.3em] uppercase">SELECT SIZE</p>
                <button className="text-xs text-gray-500 hover:text-white underline">SIZE GUIDE</button>
              </div>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative w-16 h-16 border-2 font-black text-sm transition-all ${
                      selectedSize === size
                        ? "bg-white text-black border-white scale-110"
                        : "border-white/20 hover:border-white hover:scale-105"
                    }`}
                  >
                    {size}
                    {selectedSize === size && (
                      <motion.div
                        layoutId="size-indicator"
                        className="absolute inset-0 bg-white -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-xs text-gray-500 mt-3">👆 Select a size to continue</p>
              )}
            </div>

            {/* Quantity */}
            <div className="detail-item mb-10">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4">QUANTITY</p>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-white/20 hover:border-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-black w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-white/20 hover:border-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="detail-item mb-12">
              <button
                onClick={handleAddToBag}
                disabled={!selectedSize}
                className={`relative w-full py-5 font-black text-sm tracking-wider uppercase flex items-center justify-center gap-3 overflow-hidden transition-all ${
                  selectedSize
                    ? "bg-white text-black hover:bg-red-500 hover:text-white"
                    : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                } ${addedToBag ? "bg-green-500 text-white" : ""}`}
              >
                <AnimatePresence mode="wait">
                  {addedToBag ? (
                    <motion.span
                      key="added"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      ✓ ADDED TO BAG
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      ADD TO BAG — ₹{product.price * quantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Free shipping on orders over ₹999 • 30-day returns
              </p>
            </div>

            {/* Product Details Grid */}
            <div className="detail-item pt-10 border-t border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">
                    MATERIAL
                  </p>
                  <p className="text-sm">85% Cotton<br/>12% Polyester<br/>3% Elastane</p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">
                    CARE
                  </p>
                  <p className="text-sm">Machine wash cold<br/>Tumble dry low</p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">
                    ORIGIN
                  </p>
                  <p className="text-sm">Designed & Made<br/>in India 🇮🇳</p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">
                    WARRANTY
                  </p>
                  <p className="text-sm">Lifetime quality<br/>guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="related-section section-container pb-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            YOU MAY ALSO <span className="text-yellow-500">LIKE</span>
          </h2>
          <Link
            to="/shop"
            className="text-xs font-bold tracking-wider uppercase text-gray-500 hover:text-white transition-colors"
          >
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((relProduct, index) => (
            <Link
              key={relProduct.id}
              to={`/product/${relProduct.id}`}
              className="related-card group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-4">
                <img
                  src={relProduct.image}
                  alt={relProduct.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {relProduct.tag && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 text-xs font-bold uppercase">
                    {relProduct.tag}
                  </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-sm font-bold">VIEW PRODUCT →</span>
                </div>
              </div>
              <h3 className="text-lg font-black tracking-tight group-hover:text-red-500 transition-colors">
                {relProduct.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-black text-gray-400">₹{relProduct.price}</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs text-yellow-500">★</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
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
      `}</style>
    </main>
  );
};

export default Product;