import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

export default function App(){
  return (
    <>
      <Navbar />
      <div className="py-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </div>
    </>
  )
}
