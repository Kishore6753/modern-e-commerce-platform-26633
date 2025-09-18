import React from 'react';

export default function Filters({ values, onChange, categories }) {
  const update = (patch) => onChange({ ...values, ...patch });

  // Provide flexible categories; default to All when not provided
  const available = Array.isArray(categories) && categories.length > 0 ? categories : ['All'];
  const normalizedCategory = values.category || available[0];

  return (
    <aside className="filters card" aria-label="Filters">
      <div className="filter-header">
        <h3>Filters</h3>
      </div>

      <div className="filter-section">
        <h4>Category</h4>
        <select
          value={normalizedCategory}
          onChange={e => update({ category: e.target.value })}
          aria-label="Category"
        >
          {available.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="filter-section">
        <h4>Price</h4>
        <div style={{display:'grid', gap:8, gridTemplateColumns:'1fr 1fr'}}>
          <input className="input" placeholder="Min" type="number" value={values.minPrice} onChange={e => update({ minPrice: e.target.value })} />
          <input className="input" placeholder="Max" type="number" value={values.maxPrice} onChange={e => update({ maxPrice: e.target.value })} />
        </div>
      </div>

      <div className="filter-section">
        <h4>Sort</h4>
        <select value={values.sort} onChange={e => update({ sort: e.target.value })} aria-label="Sort">
          <option value="">Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Rating</option>
        </select>
      </div>

      <div className="filter-section">
        <button
          className="btn ghost"
          onClick={() => onChange({ category: available[0], minPrice:'', maxPrice:'', sort:'' })}
        >
          Clear filters
        </button>
      </div>
    </aside>
  );
}
