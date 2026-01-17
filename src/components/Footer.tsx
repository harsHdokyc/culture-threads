import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Products", href: "/shop" },
      { label: "New Drops", href: "/drops" },
      { label: "Best Sellers", href: "/shop?filter=bestsellers" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
    company: [
      { label: "Our Story", href: "/story" },
      { label: "Community", href: "/community" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#E4405F" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />

      {/* Main Footer Content */}
      <div className="section-container relative z-10 py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-12 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            {/* Logo */}
            <Link to="/" className="group inline-block mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter group-hover:scale-105 transition-transform">
                <span className="text-white">SOKZ</span>
              </h2>
            </Link>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-md">
              Culture on your feet. Not your average socks brand.
            </p>

            {/* Newsletter */}
            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-gray-600 uppercase mb-3 sm:mb-4">
                JOIN THE CREW
              </p>
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors"
                />
                <button className="px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
                  →
                </button>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-2 sm:mt-3">
                Get exclusive drops, early access, and 10% off your first order.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <a href="mailto:hello@sokz.in" className="hover:text-white transition-colors">
                  hello@sokz.in
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <a href="tel:+911234567890" className="hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          <div className="md:col-span-7 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
            {/* Shop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase mb-6">
                SHOP
              </p>
              <nav className="space-y-3 sm:space-y-4">
                {footerLinks.shop.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase mb-6">
                COMPANY
              </p>
              <nav className="space-y-3 sm:space-y-4">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase mb-6">
                SUPPORT
              </p>
              <nav className="space-y-3 sm:space-y-4">
                {footerLinks.support.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-xs sm:text-sm font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </div>
        </div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 sm:mb-14 md:mb-16"
        >
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] text-gray-600 uppercase mb-4 sm:mb-6 text-center">
            FOLLOW THE MOVEMENT
          </p>
          <div className="flex justify-center gap-3 sm:gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center border-2 border-white/20 hover:border-white transition-all transform hover:scale-110 active:scale-95"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 sm:mb-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col gap-4 sm:gap-6 md:flex-row md:justify-between md:items-center md:gap-6"
        >
          {/* Copyright */}
          <div className="flex flex-col gap-2 sm:gap-4 md:flex-row md:items-center md:gap-4 text-xs sm:text-sm text-gray-600 text-center md:text-left items-center md:items-center">
            <p>© {currentYear} SOKZ. All rights reserved.</p>
            <span className="hidden md:block">•</span>
            <p className="text-xs sm:text-sm">Made with ❤️ in India</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              to="/privacy"
              className="text-xs sm:text-sm text-gray-600 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs sm:text-sm text-gray-600 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/shipping"
              className="text-xs sm:text-sm text-gray-600 hover:text-white transition-colors"
            >
              Shipping Policy
            </Link>
          </div>
        </motion.div>
      </div>

      
      <style>{`
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;