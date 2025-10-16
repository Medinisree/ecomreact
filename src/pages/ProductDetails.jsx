import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api'
import { useStore } from '../contexts/StoreContext'

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart, addToWishlist } = useStore()
  const nav = useNavigate()

  useEffect(()=>{ API.get(`/products/${id}`).then(r => setProduct(r.data)).catch(()=>{}) },[id])

  if(!product) return <div className="container"><p>Loading...</p></div>

  return (
    <div className="container container-small">
      <div className="product-hero mt-3">
        <div>
          <img src={product.image} alt={product.title} />
        </div>
        <div>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-primary">${product.price.toFixed(2)}</h4>
          <p>{product.description}</p>
          <p>Stock: {product.stock}</p>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary" onClick={() => { addToCart(product,1); nav('/cart') }} disabled={product.stock<=0}>Add to Cart</button>
            <button className="btn btn-outline-secondary" onClick={() => addToWishlist(product)} disabled={product.stock<=0}>Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}
