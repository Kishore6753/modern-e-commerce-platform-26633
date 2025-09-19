const API_BASE = process.env.REACT_APP_API_BASE || "/api";

/**
 * PUBLIC_INTERFACE
 * fetchProducts
 * Retrieves a list of products from the backend. Provides graceful fallback with mock data.
 */
export async function fetchProducts(params = {}) {
  /** This is a public function. */
  const url = new URL(`${API_BASE}/products`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });

  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Backend not available');
    return await res.json();
  } catch (e) {
    console.info('Using mock products due to missing backend:', e.message);
    // Mock data adjusted for clothing-only catalog
    const raw = [
      { id: 'p1', name: 'Coat Suit', price: 69.99, category: 'Apparel', rating: 4.6, image: '/assets/coat_suit.jpg', stock: 12 },
      // New product added to mirror the same tile style as 'Coat Suit'
      { id: 'p7', name: 'Wireless Headphones', price: 119.99, category: 'Electronics', rating: 4.5, image: '/assets/20250919_044955_headphone.jpg', stock: 20 },
      // Fridge image added to appear in the same section/style as other products
      { id: 'p8', name: 'Smart Refrigerator', price: 899.0, category: 'Electronics', rating: 4.6, image: '/assets/20250919_045216_fridge.jpg', stock: 6 },
      // New image added to match the same grid section styling as other products (car image recently uploaded)
      { id: 'p9', name: 'Premium Coffee Maker', price: 149.0, category: 'Home Appliances', rating: 4.4, image: '/assets/20250919_045641_image.png', stock: 15 },
      // Newly added image to match the same grid section and style as other products
      { id: 'p10', name: 'Urban Backpack', price: 59.0, category: 'Accessories', rating: 4.2, image: '/assets/20250919_050518_image.png', stock: 18 },
      { id: 'p2', name: 'Minimalist Summer Dress', price: 89.0, category: 'Apparel', rating: 4.3, image: '', stock: 7 },
      { id: 'p3', name: 'Evening Satin Dress', price: 129.0, category: 'Apparel', rating: 4.8, image: '', stock: 5 },
      { id: 'p4', name: 'Casual Day Dress', price: 49.99, category: 'Apparel', rating: 4.4, image: '', stock: 30 },
      { id: 'p5', name: 'Floral Midi Dress', price: 79.0, category: 'Apparel', rating: 4.5, image: '', stock: 10 },
      { id: 'p6', name: 'Classic Little Black Dress', price: 99.0, category: 'Apparel', rating: 4.7, image: '', stock: 8 }
    ];
    return {
      items: raw,
      total: raw.length,
    };
  }
}

/**
 * PUBLIC_INTERFACE
 * fetchProductById
 * Retrieves product details by id. Falls back to mock item if backend unavailable.
 */
export async function fetchProductById(id) {
  /** This is a public function. */
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Backend not available');
    return await res.json();
  } catch {
    const all = await fetchProducts();
    return all.items.find(p => p.id === id) || null;
  }
}

/**
 * PUBLIC_INTERFACE
 * createOrder
 * Sends a new order to the backend; returns placeholder with instructions when backend is missing.
 */
export async function createOrder(order) {
  /** This is a public function. */
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Backend not available');
    return await res.json();
  } catch (e) {
    return {
      id: `tmp_${Date.now()}`,
      status: 'PENDING_BACKEND',
      message: 'Order created locally. Backend endpoint not yet implemented. Wire this to PostgreSQL later.',
      echo: order,
    };
  }
}

/**
 * PUBLIC_INTERFACE
 * fetchOrders
 * Retrieves user orders. Returns mock orders if backend not present.
 */
export async function fetchOrders(userId) {
  /** This is a public function. */
  try {
    const res = await fetch(`${API_BASE}/orders?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) throw new Error('Backend not available');
    return await res.json();
  } catch {
    return {
      items: [
        { id: 'o1', createdAt: new Date().toISOString(), total: 129.99, status: 'Processing', items: 2 },
        { id: 'o2', createdAt: new Date(Date.now() - 86400000).toISOString(), total: 39.0, status: 'Delivered', items: 1 },
      ]
    };
  }
}
