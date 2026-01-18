"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContextProvider = createContext();

export function CartContext({ children, initialCart }) {
  const [cart, setCart] = useState(initialCart || { items: [] });

  // Update cart when initialCart changes (e.g., after server-side updates)
  useEffect(() => {
    if (initialCart && initialCart !== cart) {
      setCart(initialCart);
    }
  }, [initialCart]);

  return (
    <CartContextProvider.Provider value={{ cart, setCart }}>
      {children}
    </CartContextProvider.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContextProvider);
  if (!context) {
    throw new Error('useCart must be used within a CartContext');
  }
  return context;
};
