import React, { createContext, useState, useEffect } from 'react'
import AuthContext from './auth-context'
import api from '../api/axiosConfig'

// Crear el contexto
const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user && user.cart ? user.cart : []
  })
  const [total, setTotal]= useState(0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    user.cart = cart
    localStorage.setItem('user', JSON.stringify(user))
    setTotal(processTotal())
  }, [cart])

  const addToCart = (product) => {
    setCart(prevCart => {
      const productIndex = prevCart.findIndex(item => item._id === product._id)
      if (productIndex !== -1) {
        const updatedCart = [...prevCart]
        updatedCart[productIndex].quantity = product.quantity
        return updatedCart
      } else {
        return [...prevCart, product]
      }
    })
    // try {
    //   await api.put(`/api/users/${auth.user._id}/cart`, { _id: product._id, quantity: product.quantity })
    // } catch (error) {
    //   console.error('Error adding to cart:', error)
    //   // Optionally, revert state change if API call fails
    //   setCart(cart)
    // }
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId))
  }

  const updateProductQuantity = (productId, quantity) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart]
      const productIndex = updatedCart.findIndex(item => item._id === productId)
      if (productIndex !== -1) {
        updatedCart[productIndex].quantity = quantity
      }
      return updatedCart
    })
  }

  const increaseQuantity = (productId) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart]
      const productIndex = updatedCart.findIndex(item => item._id === productId)
      if (productIndex !== -1) {
        const isStockAvailable = updatedCart[productIndex].quantity < updatedCart[productIndex].stock
        if (isStockAvailable) updatedCart[productIndex].quantity += 1
      }
      return updatedCart
    })
  }

  const decreaseQuantity = (productId) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart]
      const productIndex = updatedCart.findIndex(item => item._id === productId)
      if (productIndex !== -1) {
        if (updatedCart[productIndex].quantity > 1) updatedCart[productIndex].quantity -= 1
      }
      return updatedCart
    })
  }

  const loadCartFromUser = (user) => {
    setCart(user.cart)
  }

  const processTotal = () => {
    return cart.reduce((acc, product) => acc + product.quantity * product.price, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateProductQuantity, increaseQuantity, decreaseQuantity, total, loadCartFromUser }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext