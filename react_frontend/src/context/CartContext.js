import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext();

/**
 * PUBLIC_INTERFACE
 * useCart
 * Hook to consume the cart context.
 */
export function useCart() {
  /** This is a public function. */
  return useContext(CartContext);
}

const initial = {
  items: [], // {id, name, price, qty}
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN': return { ...state, isOpen: true };
    case 'CLOSE': return { ...state, isOpen: false };
    case 'TOGGLE': return { ...state, isOpen: !state.isOpen };
    case 'ADD': {
      const { item, qty = 1 } = action;
      const existing = state.items.find(i => i.id === item.id);
      let items;
      if (existing) {
        items = state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i);
      } else {
        items = [...state.items, { ...item, qty }];
      }
      return { ...state, items };
    }
    case 'REMOVE': {
      const items = state.items.filter(i => i.id !== action.id);
      return { ...state, items };
    }
    case 'SET_QTY': {
      const items = state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i);
      return { ...state, items };
    }
    case 'CLEAR': return { ...state, items: [] };
    default: return state;
  }
}

/**
 * PUBLIC_INTERFACE
 * CartProvider
 * Provides cart state and actions to children.
 */
export function CartProvider({ children }) {
  /** This is a public function. */
  const [state, dispatch] = useReducer(reducer, initial);

  const total = useMemo(
    () => state.items.reduce((acc, i) => acc + i.price * i.qty, 0),
    [state.items]
  );

  const value = useMemo(() => ({
    ...state,
    total,
    open: () => dispatch({ type: 'OPEN' }),
    close: () => dispatch({ type: 'CLOSE' }),
    toggle: () => dispatch({ type: 'TOGGLE' }),
    add: (item, qty) => dispatch({ type: 'ADD', item, qty }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
    clear: () => dispatch({ type: 'CLEAR' }),
  }), [state, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
