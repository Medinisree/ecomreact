import React, { createContext, useContext, useEffect, useState } from 'react'
import API from '../api'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || [])
  const [orders, setOrders] = useState([])

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('wishlist', JSON.stringify(wishlist)), [wishlist])

  const addToCart = (product, qty = 1) => {
    if (product.stock <= 0) return false
    setCart(prev => {
      const found = prev.find(p => p.id === product.id)
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p)
      return [...prev, { ...product, qty }]
    })
    return true
  }

  const removeFromCart = id => setCart(prev => prev.filter(p => p.id !== id))
  const updateQty = (id, qty) => setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p))

  const addToWishlist = product => {
    if (product.stock <= 0) return false
    setWishlist(prev => {
      if (prev.find(p => p.id === product.id)) return prev
      return [...prev, product]
    })
    return true
  }
  const removeFromWishlist = id => setWishlist(prev => prev.filter(p => p.id !== id))

  const fetchOrders = async userId => {
    const res = await API.get(`/orders?userId=${userId}`)
    setOrders(res.data)
  }

  const placeOrder = async ({ userId, items, address }) => {
    const order = { userId, items, address, status: 'On Process', createdAt: new Date().toISOString() }
    const res = await API.post('/orders', order)
    // update stock
    for (const it of items) {
      try {
        const p = await API.get(`/products/${it.productId}`)
        if (p.data) {
          await API.patch(`/products/${it.productId}`, { stock: Math.max(0, p.data.stock - it.qty) })
        }
      } catch (e) {
        console.error(e)
      }
    }
    setCart([])
    return res.data
  }

  return (
    <StoreContext.Provider value={{
      cart, wishlist, orders,
      addToCart, removeFromCart, updateQty,
      addToWishlist, removeFromWishlist,
      fetchOrders, placeOrder, setOrders
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
