import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Package, CreditCard, Truck, RotateCcw, Shield, Gift } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const faqCategories = [
  {
    icon: Package,
    title: "PRODUCT",
    color: "red",
    questions: [
      {
        q: "What makes SOKZ socks different?",
        a: "Our socks are crafted with premium 85% cotton blend, feature bold cultural designs, and are limited edition drops. Each pair tells a story and is made to stand out."
      },
      {
        q: "How do I choose the right size?",
        a: "We offer sizes S, M, L, XL. Check our size guide for exact measurements. Most adults fit M or L. Our socks are designed to be comfortable and stretchy."
      },
      {
        q: "Are the designs printed or woven?",
        a: "Our designs are high-quality woven patterns that won't fade or crack. The colors are part of the fabric itself, ensuring long-lasting vibrancy."
      },
      {
        q: "Do you have kids' sizes?",
        a: "Currently we focus on adult sizes, but our Small size fits most older kids and teens. We're planning to launch a kids' collection soon!"
      }
    ]
  },
  {
    icon: CreditCard,
    title: "PAYMENT",
    color: "yellow",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, Amex), debit cards, UPI, net banking, and popular digital wallets. All payments are 100% secure."
      },
      {
        q: "Do you offer EMI options?",
        a: "Yes! We offer EMI on orders above ₹999 through all major credit cards. No extra charges - pay in easy monthly installments."
      },
      {
        q: "Is COD available?",
        a: "Cash on Delivery is available for orders up to ₹5000. You'll need to pay ₹50 extra for COD service. Pre-paid orders get free shipping!"
      },
      {
        q: "How secure is my payment?",
        a: "We use industry-standard SSL encryption and PCI DSS compliance. Your payment details are never stored on our servers. 100% secure checkout guaranteed."
      }
    ]
  },
  {
    icon: Truck,
    title: "SHIPPING",
    color: "cyan",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery: 3-5 business days. Express delivery: 1-2 business days. We process orders within 24 hours. You'll get tracking details once shipped."
      },
      {
        q: "Is shipping really free?",
        a: "Yes! Free shipping on all orders above ₹999. For orders below ₹999, shipping is just ₹49. Express shipping available at ₹99."
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we ship within India only. But we're planning to expand globally soon. Sign up for our newsletter to get international shipping updates!"
      },
      {
        q: "Can I track my order?",
        a: "Absolutely! You'll get a tracking number via email and SMS as soon as your order ships. Real-time tracking available on our website."
      }
    ]
  },
  {
    icon: RotateCcw,
    title: "RETURNS",
    color: "green",
    questions: [
      {
        q: "What's your return policy?",
        a: "30-day hassle-free returns. If you're not satisfied, return for full refund or exchange. Items must be unworn, unwashed, with tags attached."
      },
      {
        q: "How do I initiate a return?",
        a: "Go to 'My Orders' in your account, select the order, and click 'Return'. We'll arrange pickup from your doorstep. No questions asked!"
      },
      {
        q: "Who pays for return shipping?",
        a: "We do! Free return pickups across India. No extra charges for returns. Refunds processed within 5-7 business days after we receive the item."
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes! Size exchanges are free. Just select 'Exchange' instead of 'Refund'. We'll send the new size while picking up the original."
      }
    ]
  },
  {
    icon: Shield,
    title: "QUALITY",
    color: "purple",
    questions: [
      {
        q: "How long do the socks last?",
        a: "Our socks are built to last! With proper care, they'll stay vibrant and comfortable for 12+ months. Anti-bacterial treatment prevents odor buildup."
      },
      {
        q: "Are they machine washable?",
        a: "Yes! Machine wash cold (30°C), gentle cycle. Don't bleach, don't iron. Air dry recommended for best longevity. They'll look new wash after wash."
      },
      {
        q: "Do colors fade over time?",
        a: "Our premium dyeing process ensures colors stay vibrant. Minimal fading even after 50+ washes. Much better than typical printed socks."
      },
      {
        q: "What if I get defective items?",
        a: "Rare, but if it happens - we'll replace immediately, no questions asked. Just send us a photo within 7 days of delivery. Quality guaranteed!"
      }
    ]
  },
  {
    icon: Gift,
    title: "REWARDS",
    color: "pink",
    questions: [
      {
        q: "Do you have a loyalty program?",
        a: "Yes! SOKZ Crew members get exclusive drops, early access, birthday discounts, and points on every purchase. Join the movement!"
      },
      {
        q: "How do I get featured?",
        a: "Tag @sokz.in with your sock style! Best fits get featured on our page, win free socks, and become SOKZ ambassadors. #SOKZCREW"
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Premium gift wrapping available at ₹49. Includes custom SOKZ box, personalized message, and crew stickers. Perfect for gifting!"
      },
      {
        q: "Are there student discounts?",
        a: "Yes! Students get 15% off with valid ID. Sign up with your .edu email or show student card at checkout. Culture for the next generation!"
      }
    ]
  }
];

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <Header />

      <div className="section-container py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <div className="h-[2px] w-12 sm:w-14 md:w-16 bg-gradient-to-r from-red-500 to-transparent" />
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-red-500 uppercase">
              FAQ
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight mb-4 sm:mb-6">
            FREQUENTLY ASKED
            <span className="text-red-500"> QUESTIONS</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
            Everything you need to know about SOKZ. Can't find what you're looking for?{" "}
            <a href="/contact" className="text-white hover:text-red-500 transition-colors underline">Hit us up</a>
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12 sm:mb-16 md:mb-20">
          {faqCategories.map((category, index) => {
            const Icon = category.icon;
            const colorClasses = {
              red: "bg-red-500 text-white border-red-500",
              yellow: "bg-yellow-500 text-black border-yellow-500",
              cyan: "bg-cyan-500 text-white border-cyan-500",
              green: "bg-green-500 text-white border-green-500",
              purple: "bg-purple-500 text-white border-purple-500",
              pink: "bg-pink-500 text-white border-pink-500",
            };
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-4 sm:px-5 py-2 sm:py-3 border-2 font-black text-xs sm:text-sm tracking-wider uppercase transition-all ${
                  activeCategory === index
                    ? colorClasses[category.color as keyof typeof colorClasses]
                    : "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.title}
              </motion.button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="space-y-3 sm:space-y-4">
          {faqCategories[activeCategory].questions.map((faq, qIndex) => {
            const isOpen = openQuestions[`${activeCategory}-${qIndex}`];
            return (
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: qIndex * 0.05 }}
                className="border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(activeCategory, qIndex)}
                  className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-black text-sm sm:text-base md:text-lg flex-1">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base text-gray-300 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 sm:mt-20 md:mt-24 border border-white/10 p-8 sm:p-10 md:p-12 bg-white/5"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">STILL NEED HELP?</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">Our crew is here to help you 24/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <a
              href="mailto:hello@sokz.in"
              className="flex-1 py-3 sm:py-4 bg-white text-black font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 sm:gap-3"
            >
              EMAIL US
            </a>
            <a
              href="tel:+911234567890"
              className="flex-1 py-3 sm:py-4 border-2 border-white text-white font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 sm:gap-3"
            >
              CALL US
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
};

export default Faq;
