import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  return (
    <div className="card position-relative h-100">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      <span className={`badge badge-stock bg-${product.stock>0?'success':'danger'}`}>
        {product.stock>0 ? `${product.stock} in stock` : 'Out of stock'}
      </span>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="text-muted small">{product.category}</p>
        <p className="card-text">{product.description}</p>
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-primary flex-grow-1" onClick={()=>onAddToCart(product)} disabled={product.stock<=0}>Add to Cart</button>
          <button className="btn btn-outline-secondary" onClick={()=>onAddToWishlist(product)} disabled={product.stock<=0}>♡</button>
        </div>
      </div>
    </div>
  )
}
