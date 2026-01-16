import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@/types";

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; size: string; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: number; size: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; size: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" };

const initialState: CartState = {
  items: [],
  total: 0,
  isOpen: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, size, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, size, quantity }];
      }

      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
      };
    }

    case "REMOVE_FROM_CART": {
      const { productId, size } = action.payload;
      const newItems = state.items.filter(
        (item) => !(item.id === productId && item.size === size)
      );
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, size, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_FROM_CART", payload: { productId, size } });
      }

      const newItems = state.items.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      );
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
      };

    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case "CLOSE_CART":
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product, size: string, quantity: number) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, size, quantity } });
  };

  const removeFromCart = (productId: number, size: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId, size } });
  };

  const updateQuantity = (productId: number, size: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
