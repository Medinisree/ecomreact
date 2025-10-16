import React, { useEffect, useState } from 'react'
import API from '../api'

export default function Admin(){
  const [orders, setOrders] = useState([])

  const fetch = async () => {
    const res = await API.get('/orders')
    setOrders(res.data)
  }

  useEffect(()=>{ fetch() }, [])

  const updateStatus = async (orderId, status) => {
    await API.patch(`/orders/${orderId}`, { status })
    fetch()
  }

  return (
    <div className="container container-small">
      <h3>Admin - Orders</h3>
      <table className="table">
        <thead><tr><th>ID</th><th>User</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map(o=>(
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.userId}</td>
              <td>{o.status}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>updateStatus(o.id,'Shipped')}>Shipped</button>
                <button className="btn btn-sm btn-outline-success" onClick={()=>updateStatus(o.id,'Delivered')}>Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
