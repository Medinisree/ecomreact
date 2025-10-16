import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useStore } from '../contexts/StoreContext'

export default function Dashboard(){
  const { user } = useAuth()
  const { orders, fetchOrders } = useStore()

  useEffect(() => {
    if (user) fetchOrders(user.uid)
    else fetchOrders('guest')
  }, [user])

  return (
    <div className="container container-small">
      <h3>My Dashboard</h3>
      <p>Welcome {user ? user.displayName : 'Guest'}</p>

      <h5>Order History</h5>
      {orders.length===0 ? <div className="empty-state">No orders yet</div> : (
        <div className="list-group">
          {orders.map(o=>(
            <div key={o.id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>
                  <strong>Order #{o.id}</strong> - {new Date(o.createdAt).toLocaleString()}<br/>
                  Status: <span className="badge bg-warning text-dark">{o.status}</span>
                  <ul>
                    {o.items.map(it=> <li key={it.productId}>{it.title} x {it.qty}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
