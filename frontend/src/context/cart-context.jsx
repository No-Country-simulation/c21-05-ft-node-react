import React, { createContext, useState, useContext } from 'react';
import AuthContext from './auth-context';
import api from '../api/axiosConfig';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [cart, setCart] = useState(auth.user ? auth.user.cart : []);

  const addToCart = async (product) => {
    setCart([...cart, product]);
    try {
      await api.put(`/api/users/${auth.user._id}/cart`, { product_id: product._id, quantity: 1 });
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Optionally, revert state change if API call fails
      setCart(cart);
    }
  };

  const removeFromCart = async (productId) => {
    setCart(cart.filter(product => product._id !== productId));
    try {
      await api.delete(`/api/users/${auth.user._id}/cart/${productId}`);
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Optionally, revert state change if API call fails
      setCart([...cart, cart.find(product => product._id === productId)]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
