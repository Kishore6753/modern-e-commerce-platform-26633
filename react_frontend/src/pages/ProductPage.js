import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../services/api';
import Loader from '../components/Loader';
import ProductModal from '../components/ProductModal';

export default function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const p = await fetchProductById(productId);
      if (mounted) setProduct(p);
    })();
    return () => { mounted = false; };
  }, [productId]);

  if (!product) return <Loader text="Loading product..." />;

  return <ProductModal product={product} onClose={() => window.history.back()} />;
}
