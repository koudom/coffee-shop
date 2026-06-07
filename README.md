# Drift Coffee — Coffee Shop SPA

A warm brutalist coffee shop single-page application built with Vue 3, TypeScript, and Vite.

## About

Drift Coffee is a demo coffee shop web app featuring:

- **Menu browsing** — Browse coffee and food items by category
- **Shopping cart** — Add/remove items, adjust quantities, persisted to session storage
- **Checkout** — Place orders and view order history
- **Authentication** — Mock login with admin and customer roles
- **Admin panel** — Manage menu items, view orders, manage users

Built with a warm brutalist editorial aesthetic: square edges, espresso-brown and cream palette, Playfair Display headings, DM Sans body text.

## Tech Stack

- **Vue 3** — Composition API with `<script setup>`
- **TypeScript 6** — Strict mode
- **Vite 8** — Build tool with `@vitejs/plugin-vue` and `@tailwindcss/vite`
- **Pinia** — State management
- **Vue Router 4** — Lazy-loaded routes with auth guards
- **Tailwind CSS 4** — Utility-first styling
- **Lucide Vue** — Icons

## Setup

```bash
# Install dependencies
npm ci

# Start dev server
npm run dev

# Format code
npm run format
```

### Build & Preview

```bash
# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

### Docker

```bash
# Build image (multi-stage: Node 20 Alpine → Nginx Alpine)
docker build -t coffee-shop .

# Run container (serves on PORT, default 8080)
docker run -p 8080:8080 coffee-shop
```

## Default Accounts

| Email                 | Password | Role     |
| --------------------- | -------- | -------- |
| admin@roastandrye.com | admin123 | Admin    |
| jane@example.com      | password | Customer |

The login form auto-fills with the customer account by default.
Drift Coffee
# coffee-shop
