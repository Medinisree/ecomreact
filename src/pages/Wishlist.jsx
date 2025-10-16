import React from 'react'
import { useStore } from '../contexts/StoreContext'

export default function Wishlist(){
  const { wishlist, removeFromWishlist, addToCart } = useStore()
  return (
    <div className="container container-small">
      <h3>Wishlist</h3>
      {wishlist.length===0 ? <div className="empty-state">No items in wishlist</div> : (
        <div className="row g-3">
          {wishlist.map(p=>(
            <div key={p.id} className="col-md-4">
              <div className="card">
                <img src={p.image} className="product-image" alt={p.title}/>
                <div className="card-body">
                  <h5>{p.title}</h5>
                  <p>${p.price}</p>
                  <button className="btn btn-sm btn-primary me-2" onClick={()=> { addToCart(p); removeFromWishlist(p.id) }}>Add to cart</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>removeFromWishlist(p.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
