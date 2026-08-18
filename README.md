# OZA MEDIKA — Website & Healthcare Reservation System (Prototype)

A working prototype built with **Next.js 14 (App Router) + React + TypeScript + Tailwind CSS**.
All user-facing text is in Bahasa Indonesia; code/schema/comments are in English.

## What's included

- **Public site**: homepage, individual MCU reservation (with packages + form + auto booking number),
  corporate MCU request (with CSV template download), medicine catalog + cart + checkout (pickup/delivery,
  dummy payment methods), and a public order/reservation tracking page with status timeline.
- **Admin dashboard** (`/admin`, mock login): summary stats, and management tables for MCU reservations,
  corporate requests, and medicine orders — each with a status dropdown that updates state live.
- **Mock "database"**: `lib/store.ts` persists everything to the browser's `localStorage` and generates
  sequential booking/request/order numbers (`OZA-MCU-2026-0001`, `OZA-CORP-2026-0001`, `OZA-MED-2026-0001`).
- **Mock notification service**: `notify()` in `lib/store.ts` simulates WhatsApp notifications (logs to
  console + an internal log) — structured so it's a one-function swap for a real WhatsApp Business API call.

## How to run it

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**.

- Public site: `http://localhost:3000/`
- Admin dashboard: `http://localhost:3000/admin`
  - Login: `admin@ozamedika.id` / `admin123`

Data lives in your browser's localStorage, so try the full flow end-to-end:
1. Book an MCU at `/mcu` → note the booking number shown.
2. Go to `/admin/mcu`, find it, change its status.
3. Go to `/lacak`, search the booking number (or the WhatsApp number you entered) → see the status reflected.
4. Add medicines to cart at `/obat` → checkout at `/checkout` → track the order the same way.

To reset all demo data, clear localStorage for the site (DevTools → Application → Local Storage), or
open an incognito window.

## Project structure

```
app/
  (site)/          # public pages, wrapped with Navbar + Footer
    page.tsx        # homepage
    mcu/             # individual MCU reservation
    corporate/       # corporate MCU request
    obat/            # medicine catalog
    keranjang/       # cart
    checkout/        # checkout + success page
    lacak/           # tracking
  admin/            # admin dashboard (separate layout, mock auth guard)
components/         # Navbar, Footer, Button, StatusBadge
lib/
  types.ts          # shared TypeScript types / suggested DB entities
  mockData.ts        # MCU packages + medicine catalog (dummy data)
  store.ts           # mock "database" (localStorage) + number generators + notify()
  cart-context.tsx    # cart state (React Context, persisted to localStorage)
```

## What to extend first

1. **Real database.** `lib/store.ts` is intentionally the *only* place that touches persistence. Swap its
   internals for Supabase/PostgreSQL calls (the `types.ts` entities map almost directly to tables) and
   every page keeps working unchanged.
2. **Real auth.** `/admin/login` is a hardcoded check — replace with Supabase Auth / NextAuth and add
   role-based access before this goes anywhere near production.
3. **Real WhatsApp notifications.** Every state change already calls `notify(event, payload)` — point that
   function at the WhatsApp Business API (or a queue) instead of `console.log`.
4. **Corporate participant file parsing.** The corporate form currently only captures the uploaded file's
   *name*; wire in a CSV/XLSX parser (e.g. `papaparse`/`xlsx`) to actually read participant rows.
5. **Product/inventory management UI in admin.** The spec calls for full CRUD on medicines (add/edit/delete,
   stock, images) — the admin sidebar structure is ready for an `/admin/produk` page following the same table
   pattern as the other admin pages.
6. **Real payments & delivery fee.** Checkout uses a flat dummy delivery fee and placeholder payment methods —
   swap in a payment gateway (Midtrans/Xendit are common for ID) and a distance-based fee via Google Maps
   Distance Matrix API.
