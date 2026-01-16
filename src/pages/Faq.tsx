import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, Package, CreditCard, Truck, RotateCcw, Shield, Gift } from "lucide-react";
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
      
      {/* Scattered Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-9xl font-black text-red-500/5 rotate-12">?</div>
        <div className="absolute top-20 right-20 text-8xl font-black text-yellow-500/5 -rotate-6">!</div>
        <div className="absolute bottom-20 left-20 text-7xl font-black text-cyan-500/5 rotate-45">?</div>
        <div className="absolute bottom-40 right-40 text-6xl font-black text-green-500/5 -rotate-12">!</div>
        <div className="absolute top-1/2 left-1/3 text-8xl font-black text-purple-500/5 rotate-6">?</div>
        <div className="absolute top-1/3 right-1/3 text-7xl font-black text-pink-500/5 -rotate-45">!</div>
        
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-2000" />
      </div>

      <Header />

      <div className="section-container py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-red-500" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              FREQUENTLY ASKED
              <span className="text-red-500"> QUESTIONS</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about SOKZ. Can't find what you're looking for? 
            <a href="/contact" className="text-white underline ml-2">Hit us up</a>
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {faqCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`group px-6 py-3 border-2 font-black text-sm tracking-wider uppercase transition-all ${
                  activeCategory === index
                    ? `bg-${category.color}-500 text-white border-${category.color}-500`
                    : "border-white/20 hover:border-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.title}
              </motion.button>
            );
          })}
        </div>

        {/* Questions */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqCategories[activeCategory].questions.map((faq, qIndex) => (
            <motion.div
              key={qIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: qIndex * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(activeCategory, qIndex)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-black text-lg pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openQuestions[`${activeCategory}-${qIndex}`] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openQuestions[`${activeCategory}-${qIndex}`] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-300 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 p-8 bg-gradient-to-r from-red-500/10 to-yellow-500/10 border border-white/10 rounded-lg"
        >
          <h3 className="text-2xl font-black mb-4">STILL NEED HELP?</h3>
          <p className="text-gray-400 mb-6">Our crew is here to help you 24/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@sokz.in"
              className="px-6 py-3 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all"
            >
              EMAIL US
            </a>
            <a
              href="tel:+911234567890"
              className="px-6 py-3 border-2 border-white text-white font-black text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all"
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
