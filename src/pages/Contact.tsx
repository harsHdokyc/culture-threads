import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight, Clock, Users, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "EMAIL US",
      value: "hello@sokz.in",
      description: "Get response within 24 hours",
      color: "red",
      delay: 0.1
    },
    {
      icon: Phone,
      title: "CALL US",
      value: "+91 123 456 7890",
      description: "Mon-Sat, 10AM-7PM IST",
      color: "yellow",
      delay: 0.2
    },
    {
      icon: MapPin,
      title: "VISIT US",
      value: "Mumbai, India",
      description: "Come say hi to the crew",
      color: "cyan",
      delay: 0.3
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#E4405F" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "HAPPY CUSTOMERS" },
    { icon: Star, value: "4.9/5", label: "AVERAGE RATING" },
    { icon: Clock, value: "24H", label: "RESPONSE TIME" },
  ];

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
              CONTACT
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight mb-4 sm:mb-6">
            GET IN
            <span className="text-red-500"> TOUCH</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl">
            Got questions? Feedback? Or just wanna say hi? We're all ears. 
            Hit us up and let's start a conversation.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 mb-16 sm:mb-20 md:mb-24"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center border-b border-white/10 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-6 last:border-r-0"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">{stat.value}</div>
                <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-7"
          >
            <div className="border border-white/10 p-6 sm:p-8 md:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 sm:mb-8">SEND US A MESSAGE</h2>
                
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm sm:text-base"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="YOUR EMAIL"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm sm:text-base"
                    required
                  />
                </div>
                
                <input
                  type="text"
                  name="subject"
                  placeholder="SUBJECT"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm sm:text-base"
                  required
                />
                
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none text-sm sm:text-base"
                  required
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-4 bg-white text-black font-black text-xs sm:text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-5 space-y-6 sm:space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-4 sm:space-y-5">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                const colorClasses = {
                  red: "bg-red-500/20 text-red-500",
                  yellow: "bg-yellow-500/20 text-yellow-500",
                  cyan: "bg-cyan-500/20 text-cyan-500",
                };
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: method.delay }}
                    className="border border-white/10 p-5 sm:p-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${colorClasses[method.color as keyof typeof colorClasses]}`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-xs sm:text-sm tracking-wider uppercase mb-2 text-gray-500">
                          {method.title}
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl font-black mb-1">{method.value}</p>
                        <p className="text-xs sm:text-sm text-gray-400">{method.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="border border-white/10 p-5 sm:p-6">
              <h3 className="font-black text-xs sm:text-sm tracking-wider uppercase mb-4 text-gray-500">
                FOLLOW US
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all group"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: social.color }} />
                      <span className="font-black text-xs sm:text-sm">{social.label}</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Response */}
            <div className="border border-white/10 p-5 sm:p-6 bg-white/5">
              <h3 className="font-black text-xs sm:text-sm tracking-wider uppercase mb-3 text-gray-500">
                RESPONSE TIME
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                Most queries answered within 2-4 hours during business hours. 
                Emergency? Mark your email as URGENT.
              </p>
              <div className="text-xs sm:text-sm text-gray-400 space-y-1">
                <p>Business Hours: Mon-Sat, 10AM-7PM IST</p>
                <p>Sunday: Emergency support only</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;
