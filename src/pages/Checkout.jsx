import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useStore } from '../contexts/StoreContext'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const { user } = useAuth()
  const { cart, placeOrder } = useStore()
  const [addresses, setAddresses] = useState([])
  const [selected, setSelected] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    (async () => {
      const id = user ? user.uid : 'guest'
      const res = await API.get(`/users?id=${id}`)
      if (res.data.length) {
        const u = res.data[0]
        setAddresses(u.addresses || [])
        setSelected((u.addresses||[])[0] || null)
      } else {
        setAddresses([{id:'g', label:'Home', line1:'123 Main', city:'City', pincode:'000000'}])
        setSelected({id:'g', label:'Home', line1:'123 Main', city:'City', pincode:'000000'})
      }
    })()
  }, [user])

  const confirmOrder = async () => {
    if (!selected) return alert('select address')
    if (cart.length === 0) return alert('Cart is empty')
    const items = cart.map(c => ({ productId: c.id, title: c.title, qty: c.qty, price: c.price }))
    try {
      const res = await placeOrder({ userId: user ? user.uid : 'guest', items, address: selected })
      alert('Order placed. ID: ' + res.id)
      nav('/dashboard')
    } catch (err) {
      console.error(err)
      alert('Failed to place order')
    }
  }

  return (
    <div className="container container-small">
      <h3>Checkout</h3>
      {cart.length===0 ? <div className="empty-state">Your cart is empty</div> : (
        <>
          <h5>Select Address</h5>
          <div className="list-group mb-3">
            {addresses.map(a=>(
              <label key={a.id} className={`list-group-item ${selected && selected.id===a.id ? 'active' : ''}`}>
                <input type="radio" name="addr" className="me-2" checked={selected && selected.id===a.id} onChange={()=>setSelected(a)} />
                <strong>{a.label}</strong> - {a.line1} {a.city} {a.pincode}
              </label>
            ))}
          </div>
          <button className="btn btn-success" onClick={confirmOrder}>Confirm Order</button>
        </>
      )}
    </div>
  )
}
