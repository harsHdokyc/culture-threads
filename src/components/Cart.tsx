import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { state, removeFromCart, updateQuantity, toggleCart, closeCart } = useCart();

  const handleQuantityChange = (productId: number, size: string, newQuantity: number) => {
    updateQuantity(productId, size, newQuantity);
  };

  const handleRemoveItem = (productId: number, size: string) => {
    removeFromCart(productId, size);
  };

  return (
    <>
      {/* Cart Overlay */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9995]"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black text-white z-[9996] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-black tracking-tight">
                CART ({state.items.length})
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400 mb-4">Your cart is empty</p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="inline-block px-6 py-3 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>
              ) : (
                state.items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-sm mb-1 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-400 mb-2">Size: {item.size}</p>
                      <p className="text-lg font-black text-red-500">₹{item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-white/20 hover:border-white transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black">TOTAL</span>
                  <span className="text-2xl font-black text-red-500">₹{state.total}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full py-4 bg-white text-black font-black text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  PROCEED TO CHECKOUT
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="block w-full py-3 border-2 border-white text-white font-black text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all text-center"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
