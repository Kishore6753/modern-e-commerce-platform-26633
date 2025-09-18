import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [data, setData] = useState({ items: [] });
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (loading) return;
    if (!user) { setBusy(false); return; }
    (async () => {
      setBusy(true);
      const res = await fetchOrders(user.id);
      if (mounted) { setData(res); setBusy(false); }
    })();
    return () => { mounted = false; };
  }, [user, loading]);

  if (loading || busy) return <Loader text="Loading orders..." />;
  if (!user) return <div className="container empty-state">Please sign in to view your orders.</div>;

  return (
    <div className="container app-surface" style={{padding:'24px', marginTop:16}}>
      <h2 style={{marginTop:0}}>Orders</h2>
      {data.items.length === 0 ? (
        <div className="empty-state">No orders yet.</div>
      ) : (
        <div style={{display:'grid', gap:12}}>
          {data.items.map(o => (
            <div key={o.id} className="card" style={{padding:12, display:'grid', gap:6}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <strong>Order {o.id}</strong>
                <span className="badge">{o.status}</span>
              </div>
              <div className="helper">{new Date(o.createdAt).toLocaleString()} · {o.items} items</div>
              <div><strong>Total: ${o.total.toFixed(2)}</strong></div>
              <div className="helper">Backend placeholder: Replace with real order details from PostgreSQL.</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
