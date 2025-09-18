import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import ProductModal from '../components/ProductModal';
import Loader from '../components/Loader';

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

  return (
    <div className="container layout">
      <div className="filters">
        <Filters values={filters} onChange={setFilters} categories={categories} />
      </div>
      <main>
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
      </main>
      <ProductModal product={openProduct} onClose={() => setOpenProduct(null)} />
    </div>
  );
}
