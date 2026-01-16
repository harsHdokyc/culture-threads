import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield, ShoppingBag, User, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Checkout = () => {
  const { state, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      // Redirect to success page or show success message
      alert("Order placed successfully!");
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <CustomCursor />
        <Header />
        <div className="section-container py-32 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-8 text-gray-600" />
          <h1 className="text-4xl md:text-6xl font-black mb-4">YOUR CART IS EMPTY</h1>
          <p className="text-xl text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK TO SHOP
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px] animate-pulse delay-2000" />
      </div>

      <Header />

      <div className="section-container py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO CART
          </Link>
          <h1 className="text-5xl md:text-7xl font-black mb-4">
            CHECK<span className="text-red-500">OUT</span>
          </h1>
          <p className="text-xl text-gray-400">Secure checkout powered by chaos</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Contact Information */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-black text-red-500/20 rotate-12">
                01
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-black">CONTACT INFO</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="PHONE NUMBER"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-black text-yellow-500/20 -rotate-12">
                02
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-black">SHIPPING ADDRESS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="FIRST NAME"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="LAST NAME"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="STREET ADDRESS"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 transition-colors md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="CITY"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="STATE"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP CODE"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-black text-cyan-500/20 rotate-12">
                03
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-cyan-500" />
                  <h2 className="text-2xl font-black">PAYMENT</h2>
                </div>
                <div className="space-y-6">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="CARD NUMBER"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="CARDHOLDER NAME"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-32 space-y-6">
              {/* Order Summary */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                <h2 className="text-2xl font-black mb-6">ORDER SUMMARY</h2>
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                      <div>
                        <p className="font-black text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">Size: {item.size} × {item.quantity}</p>
                      </div>
                      <p className="font-black">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">SUBTOTAL</span>
                    <span>₹{state.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">SHIPPING</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">TAX</span>
                    <span>₹{Math.floor(state.total * 0.18)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-black pt-4 border-t border-white/10">
                    <span>TOTAL</span>
                    <span className="text-red-500">₹{state.total + Math.floor(state.total * 0.18)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm">SECURE PAYMENT</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">FREE SHIPPING</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">30-DAY RETURNS</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full py-4 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    PLACE ORDER
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Checkout;
