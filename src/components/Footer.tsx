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
      <div className="section-container relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            {/* Logo */}
            <Link to="/" className="group inline-block mb-6">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter group-hover:scale-105 transition-transform">
                <span className="text-white">SO</span>
                <span className="text-red-500">KZ</span>
              </h2>
            </Link>

            <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-md">
              Culture on your feet. Not your average socks brand.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase mb-4">
                JOIN THE CREW
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-white text-sm font-bold uppercase tracking-wider placeholder:text-gray-600 focus:outline-none focus:border-white transition-colors"
                />
                <button className="px-6 py-3 bg-white text-black font-black text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
                  →
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Get exclusive drops, early access, and 10% off your first order.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@sokz.in" className="hover:text-white transition-colors">
                  hello@sokz.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <a href="tel:+911234567890" className="hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
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
              <nav className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-sm font-bold text-gray-400 hover:text-white transition-colors"
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
              <nav className="space-y-4">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-sm font-bold text-gray-400 hover:text-white transition-colors"
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
              <nav className="space-y-4">
                {footerLinks.support.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block text-sm font-bold text-gray-400 hover:text-white transition-colors"
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
          className="mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-gray-600 uppercase mb-6 text-center">
            FOLLOW THE MOVEMENT
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-14 h-14 flex items-center justify-center border-2 border-white/20 hover:border-white transition-all transform hover:scale-110 active:scale-95"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600">
            <p>© {currentYear} SOKZ. All rights reserved.</p>
            <span className="hidden md:block">•</span>
            <p>Made with ❤️ in India</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/privacy"
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/shipping"
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              Shipping Policy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Brand Stamp */}
      <div className="relative z-10 py-8 border-t border-white/10 bg-white/5">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>100% AUTHENTIC</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300" />
                <span>MADE IN INDIA</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-700" />
                <span>LIMITED DROPS</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-6 opacity-50"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-6 opacity-50"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                alt="Amex"
                className="h-6 opacity-50"
              />
            </div>
          </div>
        </div>
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