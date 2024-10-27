import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axiosConfig'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null
  })

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem('token', auth.token)
      localStorage.setItem('user', JSON.stringify(auth.user))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [auth])

  const setUserType = async (usertype) => {
    try {
      if (userType === 'administrator' || userType === 'seller' || userType === 'buyer') {
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: {
            ...prevAuth.user,
            user_type: userType
          }
        }))
        // Update localStorage
        const updatedUser = { ...auth.user, user_type: userType }
        localStorage.setItem('user', JSON.stringify(updatedUser))
      } else {
        throw new Error(`${userType} no es un tipo de usuario válido.`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const setShopId = (shopId) => {
    try {
      if (shopId) {
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: {
            ...prevAuth.user,
            shop_id: shopId
          }
        }))
        // Update localStorage
        const updatedUser = { ...auth.user, shop_id: shopId }
        localStorage.setItem('user', JSON.stringify(updatedUser))
      } else {
        throw new Error(`ShopId: ${shopId} no es un un Id válido.`)
      }
    } catch (error) {
      console.error(error)
    }

  }

  const login = (data) => {
    setAuth({
      token: data.token,
      user: data.user,
    })
  }

  const logout = () => {
    setAuth({
      token: null,
      user: null,
    })
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, setUserType, setShopId }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
