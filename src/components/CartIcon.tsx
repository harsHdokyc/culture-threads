import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartIcon = () => {
  const { state, toggleCart } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={toggleCart}
      className="group relative p-2 sm:p-2.5 md:p-3 border-2 border-white/20 hover:border-white hover:bg-white/10 transition-all"
    >
      <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
      
      {/* Item Count Badge */}
      {itemCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 bg-red-500 text-white text-[10px] sm:text-xs font-black rounded-full flex items-center justify-center"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </motion.div>
      )}
    </button>
  );
};

export default CartIcon;
