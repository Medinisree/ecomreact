import React from 'react'

export default function SearchSort({ q, setQ, sort, setSort, categories, selectedCat, setSelectedCat }) {
  return (
    <div className="d-flex gap-2 mb-3 flex-wrap">
      <input className="form-control" style={{maxWidth:320}} placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
      <select className="form-select" value={selectedCat} onChange={e=>setSelectedCat(e.target.value)} style={{maxWidth:190}}>
        <option value="">All Categories</option>
        {categories.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
      <select className="form-select" value={sort} onChange={e=>setSort(e.target.value)} style={{maxWidth:200}}>
        <option value="">Sort</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
        <option value="stock_desc">Stock: High → Low</option>
      </select>
    </div>
  )
}
