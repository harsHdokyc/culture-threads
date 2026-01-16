import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Instagram, Twitter, Facebook, ArrowRight, Clock, Users, Star } from "lucide-react";
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
      
      {/* Scattered Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-9xl font-black text-red-500/5 rotate-12">@</div>
        <div className="absolute top-20 right-20 text-8xl font-black text-yellow-500/5 -rotate-6">#</div>
        <div className="absolute bottom-20 left-20 text-7xl font-black text-cyan-500/5 rotate-45">@</div>
        <div className="absolute bottom-40 right-40 text-6xl font-black text-green-500/5 -rotate-12">#</div>
        <div className="absolute top-1/2 left-1/3 text-8xl font-black text-purple-500/5 rotate-6">@</div>
        <div className="absolute top-1/3 right-1/3 text-7xl font-black text-pink-500/5 -rotate-45">#</div>
        
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
            <MessageCircle className="w-8 h-8 text-red-500" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              GET IN
              <span className="text-red-500"> TOUCH</span>
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Got questions? Feedback? Or just wanna say hi? We're all ears. 
            Hit us up and let's start a conversation.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                className="text-center"
              >
                <Icon className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-3xl md:text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-black text-red-500/20 rotate-12">
                SEND
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Send className="w-6 h-6 text-red-500" />
                  SEND US A MESSAGE
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="YOUR NAME"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="YOUR EMAIL"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                  </div>
                  
                  <input
                    type="text"
                    name="subject"
                    placeholder="SUBJECT"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                  
                  <textarea
                    name="message"
                    placeholder="YOUR MESSAGE"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                    required
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: method.delay }}
                    className="group relative"
                  >
                    <div className="absolute -top-4 -left-4 text-4xl font-black text-white/5 rotate-12">
                      {index + 1}
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-lg hover:bg-white/10 transition-all group-hover:scale-105">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-${method.color}-500/20`}>
                          <Icon className={`w-6 h-6 text-${method.color}-500`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-sm tracking-wider uppercase mb-2">
                            {method.title}
                          </h3>
                          <p className="text-lg font-black mb-1">{method.value}</p>
                          <p className="text-xs text-gray-400">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-4xl font-black text-white/5 rotate-12">
                #
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
                <h3 className="font-black text-sm tracking-wider uppercase mb-4">
                  FOLLOW THE CHAOS
                </h3>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white transition-all group"
                      >
                        <Icon className="w-5 h-5" style={{ color: social.color }} />
                        <span className="font-black text-sm">{social.label}</span>
                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-4xl font-black text-white/5 rotate-12">
                !
              </div>
              <div className="bg-gradient-to-r from-red-500/10 to-yellow-500/10 border border-white/10 p-6 rounded-lg">
                <h3 className="font-black text-sm tracking-wider uppercase mb-2">
                  QUICK RESPONSE
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Most queries answered within 2-4 hours during business hours. 
                  Emergency? Mark your email as URGENT.
                </p>
                <div className="text-xs text-gray-400">
                  <p>Business Hours: Mon-Sat, 10AM-7PM IST</p>
                  <p>Sunday: Emergency support only</p>
                </div>
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
