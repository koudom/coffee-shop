# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check with vue-tsc + build with Vite (runs `vue-tsc -b --noEmit && vite build`)
- `npm run preview` — Preview production build with Vite
- `npm run format` — Format all files with Prettier
- `npm run format:check` — Check formatting with Prettier
- `Dockerfile` — Multi-stage build: Node 20 Alpine → `npm ci && npm run build` → Nginx Alpine, serves static SPA on `$PORT` (default 8080)
- `docker-compose.yml` (if present) — Orchestrates multi-container setup

## Tech Stack

- **Vue 3** with `<script setup>` Composition API throughout
- **TypeScript 6** (strict mode: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- **Vite 8** with `@vitejs/plugin-vue` and `@tailwindcss/vite`
- **Pinia** for state management (auth, menu, cart, order stores)
- **Vue Router 4** with lazy-loaded routes and route meta for auth guards
- **Tailwind CSS 4** (imported via `@import "tailwindcss"` in style.css, no config file)
- **Lucide Vue** for iconography
- **Prettier** for formatting

## Project Architecture

```
src/
├── main.ts                # App bootstrap: createApp + Pinia + Router
├── App.vue                # Root shell: AppNav + RouterView with fade transition
├── style.css              # Global CSS variables, typography, utility classes (override Tailwind)
├── router/index.ts        # Route definitions with meta guards (requiresAuth, requiresAdmin)
├── types/route.d.ts       # Vue Router module augmentation for RouteMeta
├── data/mockMenu.ts       # Static menu data (categories + items)
├── stores/
│   ├── auth.ts            # Auth store — mock login/register/logout, token in localStorage
│   ├── menu.ts            # Menu store — async fetchMenu with simulated delay
│   ├── cart.ts            # Cart store — add/remove/updateQty/clear, persisted to sessionStorage
│   ├── cartNav.ts         # Reactive ref for cart sidebar open state
│   └── order.ts           # Order store — CRUD orders with status management
├── views/                 # Page-level components (Home, Menu, Checkout, Confirmation, OrderHistory, Login, Register, Admin)
├── components/
│   ├── shared/            # Reusable UI: AppNav, AppButton, AppInput, AppBadge, QtyControl, SkeletonCard
│   ├── menu/              # Menu page: CategoryTabs, MenuItem, ItemDetailModal
│   ├── cart/              # Cart: CartSidebar (desktop), CartDrawer (mobile), CartItem
│   └── order/             # Order: InvoiceModal
└── assets/                # Static images (hero.png, svg logos)
```

## Key Design Decisions

- **Desktop-first** responsive layout: 3-column menu grid + 380px cart sidebar on desktop, 2-column tablet, 1-column mobile with bottom drawer cart
- **Warm brutalist editorial** aesthetic: square edges (no border-radius), espresso-brown + cream palette, Playfair Display headings + DM Sans body
- **Mock auth** with hardcoded users: `admin@roastandrye.com`/`admin123` (admin role), `jane@example.com`/`password` (customer role). Token stored in localStorage.
- **Cart persisted** to sessionStorage, orders persisted to sessionStorage, auth to localStorage
- **Route guards**: `requiresAuth` redirects to login (preserving redirect query), `requiresAdmin` redirects home
- **No external UI libraries** — all components built from scratch per design spec in `docs/skill.md`
- **@ alias** maps to `./src` (configured in vite.config.ts and tsconfig)

## Design System Reference

Full design spec in `docs/skill.md`. Key rules:

- Colors: use CSS custom properties from `style.css` only (no hardcoded hex)
- Fonts: Playfair Display (headings), DM Sans (body/UI), DM Mono (order numbers)
- Spacing: multiples of 8px (`--s1` through `--s7`)
- Icons: Lucide only
- Cards/buttons: no border-radius (intentional square edges)
- Transitions: 200ms ease preferred, no bouncing
