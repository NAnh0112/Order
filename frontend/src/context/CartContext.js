import React, { createContext, useContext, useState } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((product) => product.product_id === item.product_id);
      if (existingItem) {
        return prevCart.map((product) =>
          product.product_id === item.product_id ? { ...product, quantity: product.quantity + 1 } : product
        );
      } else {
        return [...prevCart, item];
      }
    });
  };
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
