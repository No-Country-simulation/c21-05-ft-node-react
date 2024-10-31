import React, { createContext, useState, useContext } from 'react';
import AuthContext from './auth-context';
import api from '../api/axiosConfig';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(auth.user ? auth.user.favorites : []);

  const addToFavorites = async (product) => {
    setFavorites([...favorites, product]);
    try {
      await api.put(`/api/users/${auth.user._id}/favorites`, { product_id: product._id });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Optionally, revert state change if API call fails
      setFavorites(favorites);
    }
  };

  const removeFromFavorites = async (productId) => {
    setFavorites(favorites.filter(product => product._id !== productId));
    try {
      await api.delete(`/api/users/${auth.user._id}/favorites/${productId}`);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      // Optionally, revert state change if API call fails
      setFavorites([...favorites, favorites.find(product => product._id === productId)]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
