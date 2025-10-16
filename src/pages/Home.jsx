import React, { useEffect, useState } from 'react'
import API from '../api'
import ProductCard from '../components/ProductCard'
import { useStore } from '../contexts/StoreContext'
import SearchSort from '../components/SearchSort'

export default function Home(){
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [q,setQ] = useState('')
  const [sort,setSort] = useState('')
  const [selectedCat,setSelectedCat] = useState('')
  const { addToCart, addToWishlist } = useStore()

  useEffect(()=>{ API.get('/products').then(r=>setProducts(r.data)) ; API.get('/categories').then(r=>setCategories(r.data || [])) },[])

  const onAddToCart = (product) => {
    const ok = addToCart(product,1)
    if(!ok) alert('Product out of stock')
  }
  const onAddToWishlist = (product) => {
    const ok = addToWishlist(product)
    if(!ok) alert('Cannot add out of stock')
  }

  let shown = products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
  if(selectedCat) shown = shown.filter(p => p.category === selectedCat)
  if(sort === 'price_asc') shown = shown.sort((a,b)=>a.price-b.price)
  if(sort === 'price_desc') shown = shown.sort((a,b)=>b.price-a.price)
  if(sort === 'stock_desc') shown = shown.sort((a,b)=>b.stock-a.stock)

  return (
    <div className="container container-small">
      <h3 className="mb-3">Products</h3>
      <SearchSort q={q} setQ={setQ} sort={sort} setSort={setSort} categories={categories} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
      <div className="row g-3">
        {shown.map(p=>(
          <div key={p.id} className="col-md-4">
            <ProductCard product={p} onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
          </div>
        ))}
      </div>
    </div>
  )
}
