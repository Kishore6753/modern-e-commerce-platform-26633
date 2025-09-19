import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoriesBar from './components/CategoriesBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';
import { createOrder } from './services/api';
import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import FashionPage from './pages/categories/FashionPage';
import ElectronicsPage from './pages/categories/ElectronicsPage';
import FoodPage from './pages/categories/FoodPage';
import GroceryPage from './pages/categories/GroceryPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0,0); }, [pathname]);
  return null;
}

function RoutedApp() {
  const [authOpen, setAuthOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();

  const checkout = async () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    const order = {
      userId: user.id,
      items: items.map(i => ({ id: i.id, qty: i.qty, price: i.price })),
      amount: total,
      currency: 'USD',
      paymentProvider: 'placeholder',
    };
    const res = await createOrder(order);
    clear();
    alert(`Order placed (placeholder): ${res.id}\nNote: Connect payment + backend for real processing.`);
    nav('/orders');
  };

  const routes = useMemo(() => ([
    { path: '/', element: <Home searchQuery={search} /> },
    { path: '/men', element: <MenPage /> },
    { path: '/women', element: <WomenPage /> },
    { path: '/fashion', element: <FashionPage /> },
    { path: '/electronics', element: <ElectronicsPage /> },
    { path: '/food', element: <FoodPage /> },
    { path: '/grocery', element: <GroceryPage /> },
    { path: '/product/:id', element: <DynamicProduct /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/orders', element: <OrdersPage /> },
  ]), [search]);

  return (
    <>
      {/* Top header with brand, search, sign-in, cart */}
      <Navbar
        onSearchChange={setSearch}
        onOpenAuth={() => setAuthOpen(true)}
      />
      {/* New categories row directly under navbar */}
      <CategoriesBar />
      <ScrollToTop />
      <Routes>
        {routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
      </Routes>
      <Footer />
      <CartSidebar onCheckout={checkout} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

function DynamicProduct() {
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  return <ProductPage productId={id} />;
}

/**
 * PUBLIC_INTERFACE
 * AppShell
 * Top-level app component with router.
 */
export default function AppShell() {
  /** This is a public function. */
  return (
    <BrowserRouter>
      <RoutedApp />
    </BrowserRouter>
  );
}
