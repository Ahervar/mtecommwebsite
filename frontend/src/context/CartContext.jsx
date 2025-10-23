import React, { createContext, useState, useEffect, useMemo } from "react";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getCartTotalQuantity,
  getCartTotalPrice,
} from "../utils/cartUtils"; // Import the utility functions

// 1. Create the Context
export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  clearAll: () => {},
});

// Helper function to load cart from localStorage
const getInitialCart = () => {
  try {
    const serializedCart = localStorage.getItem("mehul_cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// 2. Create the Provider Component
export const CartProvider = ({ children }) => {
  // Rename 'cart' to 'cartItems' for clarity
  const [cartItems, setCartItems] = useState(getInitialCart);

  // --- Derived State (Calculated values) ---

  // Calculate the total quantity of items
  const cartCount = useMemo(
    () => getCartTotalQuantity(cartItems),
    [cartItems]
  );

  // Calculate the total price of the cart
  const cartTotal = useMemo(
    () => getCartTotalPrice(cartItems),
    [cartItems]
  );

  // --- Cart Modification Handlers ---

  const addItem = (product) => {
    setCartItems((prevCartItems) => addItemToCart(prevCartItems, product));
  };

  const removeItem = (productId) => {
    setCartItems((prevCartItems) => removeItemFromCart(prevCartItems, productId));
  };

  const clearItem = (productId) => {
    setCartItems((prevCartItems) => clearItemFromCart(prevCartItems, productId));
  };

  const clearAll = () => {
    setCartItems([]);
  };

  // --- Side Effect (Persistence) ---

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("mehul_cart", JSON.stringify(cartItems));
  }, [cartItems]);


  // --- Context Value ---

  // Memoize the value to prevent unnecessary re-renders in consumers
  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      addItem,
      removeItem,
      clearItem,
      clearAll,
    }),
    [cartItems, cartCount, cartTotal]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};