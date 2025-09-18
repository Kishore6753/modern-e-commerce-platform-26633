import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import ProductModal from '../components/ProductModal';
import Loader from '../components/Loader';
import bannerImg from '../assets/banner.png';

export default function Home({ searchQuery }) {
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '', sort: '' });
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [openProduct, setOpenProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const result = await fetchProducts({ q: searchQuery });
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [searchQuery]);

  const categories = useMemo(() => {
    const set = new Set(data.items.map(i => i.category).filter(Boolean));
    return Array.from(set);
  }, [data.items]);

  const filtered = useMemo(() => {
    let items = data.items;
    if (filters.category) items = items.filter(i => i.category === filters.category);
    if (filters.minPrice) items = items.filter(i => i.price >= Number(filters.minPrice));
    if (filters.maxPrice) items = items.filter(i => i.price <= Number(filters.maxPrice));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q));
    }
    switch (filters.sort) {
      case 'price_asc': items = [...items].sort((a,b)=>a.price-b.price); break;
      case 'price_desc': items = [...items].sort((a,b)=>b.price-a.price); break;
      case 'rating_desc': items = [...items].sort((a,b)=>b.rating-a.rating); break;
      default: break;
    }
    return items;
  }, [data.items, filters, searchQuery]);

  const resultsTitle = (() => {
    const q = filters.category || searchQuery || '';
    if (!loading) {
      if (q) return `Found ${filtered.length} results for ${q}`;
      return `Found ${filtered.length} results`;
    }
    return 'Loading results...';
  })();

  return (
    <div className="page-shell">
      {/* Promotional banner placed under categories strip */}
      <div
        className="top-banner"
        role="img"
        aria-label="Promotional banner"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.0), rgba(255,255,255,0.0)), url(${bannerImg})`,
        }}
      >
        <span className="sr-only">Welcome to Your Market – seasonal offers and new arrivals</span>
      </div>

      <div className="container app-surface page-frame">
        <div className="layout">
          <div className="filters">
            <Filters values={filters} onChange={setFilters} categories={categories} />
          </div>

          <section className="content-surface">
            <div className="content-head">
              <div className="breadcrumbs">Catalog / <b>{filters.category || 'All'}</b></div>
            </div>

            <div className="results-toolbar">
              <h2 className="results-title">{resultsTitle}</h2>
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
                <button className="icon-btn" aria-label="Grid view">▦</button>
                <button className="icon-btn" aria-label="List view">≣</button>
                <button className="icon-btn" aria-label="More options">⋮</button>
              </div>
            </div>

            {loading ? <Loader /> : (
              filtered.length === 0 ? (
                <div className="empty-state">No products found. Try adjusting filters.</div>
              ) : (
                <div className="grid" aria-live="polite">
                  {filtered.map(p => (
                    <ProductCard key={p.id} product={p} onOpen={setOpenProduct} />
                  ))}
                </div>
              )
            )}
          </section>
        </div>
      </div>

      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
    </div>
  );
}
