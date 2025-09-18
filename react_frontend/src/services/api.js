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
    // Mock data
    return {
      items: [
        { id: 'p1', name: 'Ocean Breeze Hoodie', price: 69.99, category: 'Apparel', rating: 4.6, image: '', stock: 12 },
        { id: 'p2', name: 'Minimalist Watch', price: 129.0, category: 'Accessories', rating: 4.3, image: '', stock: 7 },
        { id: 'p3', name: 'Ergo Wireless Mouse', price: 39.0, category: 'Electronics', rating: 4.1, image: '', stock: 20 },
        { id: 'p4', name: 'Ceramic Mug Set', price: 24.99, category: 'Home', rating: 4.7, image: '', stock: 30 },
        { id: 'p5', name: 'Canvas Backpack', price: 79.0, category: 'Apparel', rating: 4.5, image: '', stock: 10 },
        { id: 'p6', name: 'Noise-cancelling Headphones', price: 199.0, category: 'Electronics', rating: 4.8, image: '', stock: 5 }
      ],
      total: 6,
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
