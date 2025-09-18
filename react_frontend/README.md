# Ocean Shop – Modern E‑commerce React Frontend

A minimalist, production‑ready React frontend for a modern e‑commerce platform with Supabase authentication, product catalogue, filters, cart, and order views. Uses an "Ocean Professional" theme.

## Features
- Supabase auth (magic link): sign in/up, sign out
- Product catalogue grid with side filters and search
- Product detail modal and deep link route
- Shopping cart (sidebar + dedicated page), totals
- Orders page (requires auth) with placeholder backend
- REST service layer with graceful mock fallbacks
- Ocean Professional minimalist styling (no heavy UI frameworks)
- Clean architecture for easy wiring to real backend and PostgreSQL later

## Quick start
1) Install
   npm install

2) Set environment variables
   cp .env.example .env
   # Edit .env to include your Supabase URL and anon key

3) Run
   npm start
   Open http://localhost:3000

## Environment variables
- REACT_APP_SUPABASE_URL: Supabase project URL
- REACT_APP_SUPABASE_KEY: Supabase anon key
- REACT_APP_API_BASE: Optional backend base URL (defaults to /api)
- REACT_APP_SITE_URL: Optional redirect URL for Supabase emails (defaults to window.location.origin)

## Project structure
src/
  components/        Reusable UI (Navbar, Filters, ProductCard, Modals, CartSidebar, Footer)
  context/           Global state (AuthContext, CartContext)
  pages/             Route pages (Home, Orders, Product, Cart)
  services/          API and Auth wrappers (REST placeholders with mock fallback)
  supabaseClient.js  Supabase client factory
  AppShell.js        Router and app composition
  styles.css         Theme and minimalist styles
  App.js, index.js   Entrypoints

## Backend integration notes
- All REST calls are made in src/services/api.js. Replace placeholders with real endpoints as backend becomes available.
- createOrder includes a payment integration placeholder; wire to your payment provider (e.g., Stripe) and backend order creation endpoint.
- For PostgreSQL wiring, connect your backend to Supabase/Postgres and update API_BASE.

## Accessibility and UX
- Semantic roles for modals, cart, and messages.
- Keyboard and screen reader friendly controls.

## Testing
- Basic render test in App.test.js (expand with your own suites).

License: MIT
