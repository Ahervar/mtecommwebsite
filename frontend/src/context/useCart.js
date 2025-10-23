import { useContext } from "react";
import { CartContext } from "./CartContext.jsx";

/**
 * Custom hook to consume the CartContext.
 * Provides easy access to all cart state and modification functions.
 * @returns {object} Cart context values (cartItems, cartCount, cartTotal, addItem, removeItem, clearItem, clearAll)
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};