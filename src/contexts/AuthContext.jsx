import React, { createContext, useContext, useEffect, useState } from 'react'
import { loginWithGoogle, logout as fbLogout } from '../firebase'
import API from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    if (user) {
      (async () => {
        try {
          const res = await API.get(`/users?id=${user.uid}`)
          if (!res.data.length) {
            await API.post('/users', {
              id: user.uid,
              name: user.displayName,
              addresses: [{ id: 'addr1', label: 'Home', line1: '', city: '', pincode: '' }]
            })
          }
        } catch (e) {
          console.error(e)
        }
      })()
    }
  }, [user])

  const login = async () => {
    try {
      const u = await loginWithGoogle()
      setUser({ uid: u.uid, displayName: u.displayName, email: u.email, photoURL: u.photoURL })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const logout = async () => {
    await fbLogout()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
