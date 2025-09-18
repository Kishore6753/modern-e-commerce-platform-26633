import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/api';
import Filters from '../components/Filters';
import Loader from '../components/Loader';

/**
 * PUBLIC_INTERFACE
 * MenPage
 * Displays men's section with two-column layout: left product cards, right filters panel.
 */
export default function MenPage() {
  /** This is a public function. */
  const [filters, setFilters] = useState({ category: "Men's", minPrice: '', maxPrice: '', sort: '' });
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      // Reuse products; since mock has no gender, we simulate a men subset by name heuristics
      const result = await fetchProducts();
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(() => ["Men's"], []);
  const items = useMemo(() => {
    let list = data.items.map((p, idx) => ({
      ...p,
      // Simple heuristic: alternate assignment to "men" to simulate
      gender: idx % 2 === 0 ? 'men' : 'women',
    })).filter(p => p.gender === 'men');

    if (filters.minPrice) list = list.filter(i => i.price >= Number(filters.minPrice));
    if (filters.maxPrice) list = list.filter(i => i.price <= Number(filters.maxPrice));
    switch (filters.sort) {
      case 'price_asc': list = [...list].sort((a,b)=>a.price-b.price); break;
      case 'price_desc': list = [...list].sort((a,b)=>b.price-a.price); break;
      case 'rating_desc': list = [...list].sort((a,b)=>b.rating-a.rating); break;
      default: break;
    }
    return list;
  }, [data.items, filters]);

  return (
    <div className="page-shell">
      <div className="container app-surface page-frame">
        <div className="layout">
          <aside className="filters">
            <Filters values={filters} onChange={setFilters} categories={categories} />
          </aside>

          <section className="content-surface">
            <div className="content-head">
              <div className="breadcrumbs">Catalog / <b>Men</b></div>
            </div>

            <div className="results-toolbar">
              <h2 className="results-title">Men's – {loading ? 'Loading...' : `${items.length} items`}</h2>
              <div className="toolbar-actions">
                <select
                  className="input"
                  style={{height:40, width:200, background:'#fff'}}
                  value={filters.sort}
                  onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                  aria-label="Sort by"
                >
                  <option value="">Sort by: Popularity</option>
                  <option value="rating_desc">Sort by: Rating</option>
                  <option value="price_asc">Sort by: Price (Low to High)</option>
                  <option value="price_desc">Sort by: Price (High to Low)</option>
                </select>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : items.length === 0 ? (
              <div className="empty-state">No items found.</div>
            ) : (
              <div className="grid" aria-live="polite">
                {items.map(p => (
                  <div key={p.id} className="product-card">
                    <div className="product-thumb">
                      {p.image ? <img src={p.image} alt={p.name} /> : <span style={{color:'var(--text-tertiary)'}}>No image</span>}
                    </div>
                    <div className="product-body">
                      <h3 className="product-title" title={p.name}>{p.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
