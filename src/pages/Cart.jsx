import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../contexts/StoreContext'
import API from '../api'

export default function Cart(){
  const { cart, removeFromCart, updateQty } = useStore()
  const [productsStock, setProductsStock] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    (async ()=> {
      const res = await API.get('/products')
      const map = {}
      res.data.forEach(p=>map[p.id]=p.stock)
      setProductsStock(map)
    })()
  }, [])

  const subtotal = cart.reduce((s,p)=> s + p.price * p.qty, 0)

  return (
    <div className="container container-small">
      <h3>Your Cart</h3>
      {cart.length===0 ? <div className="empty-state">No items. <Link to="/">Browse products</Link></div> : (
        <>
          <table className="table">
            <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th></th></tr></thead>
            <tbody>
              {cart.map(item=>(
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <input type="number" min="1" value={item.qty} style={{width:80}} onChange={e=>{
                      const v = Math.max(1, Number(e.target.value))
                      if (productsStock[item.id] && v > productsStock[item.id]) { alert('Not enough stock'); return }
                      updateQty(item.id, v)
                    }} />
                  </td>
                  <td>${(item.price*item.qty).toFixed(2)}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={()=>removeFromCart(item.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
          <button className="btn btn-success" onClick={()=>navigate('/checkout')}>Proceed to Checkout</button>
        </>
      )}
    </div>
  )
}
