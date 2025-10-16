import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useStore } from '../contexts/StoreContext'

export default function Navbar(){
  const { user, login, logout } = useAuth()
  const { cart, wishlist } = useStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-light bg-white ${scrolled ? 'shadow-active' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">EcomTask</Link>
        <div>
          <Link className="btn btn-sm btn-outline-primary me-2" to="/wishlist">Wishlist ({wishlist.length})</Link>
          <Link className="btn btn-sm btn-outline-success me-2" to="/cart">Cart ({cart.length})</Link>
          <Link className="btn btn-sm btn-outline-secondary me-2" to="/admin">Admin</Link>
          {user ? (
            <>
              <Link className="btn btn-sm btn-info text-white me-2" to="/dashboard">Hi, {user.displayName?.split(' ')[0]}</Link>
              <button className="btn btn-sm btn-danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary" onClick={login}>Login with Google</button>
          )}
        </div>
      </div>
    </nav>
  )
}
