---
name: coffee-shop-vuejs-design
description: >
  Design and build system specification for a modern, desktop-first coffee shop web ordering app using Vue 3.
  Use this skill whenever building, styling, or scaffolding any part of the coffee shop ordering project —
  including the menu page, cart, confirmation screen, components, layout, color system, typography, or
  responsive behavior. Trigger this skill at the start of every new component or view build, even if the
  user only asks about one small piece. This skill ensures every output is visually cohesive and on-brand.
---

# Coffee Shop Web Order — Design Skill

A complete design system and implementation guide for building a modern, desktop-first coffee shop web order app in Vue 3. Every AI agent working on any part of this project must read this skill first and follow it precisely for visual consistency.

---

## 1. Design Direction

**Aesthetic**: Warm brutalist editorial — the intersection of a specialty coffee zine and a high-end menu board. Clean, confident, slightly moody. Not a generic SaaS app. Not a pastel "cute café" UI.

**Personality**: Intentional. Craft-focused. Unhurried. Every detail feels considered.

**One unforgettable thing**: A rich espresso-brown and warm cream palette with sharp typographic hierarchy — like a physical menu card reimagined for the web.

---

## 2. Color System

Use these CSS custom properties in every component and view. Define them globally in `src/assets/main.css` or `App.vue`.

```css
:root {
  /* Core palette */
  --c-bg: #f5f0e8; /* warm cream — page background */
  --c-surface: #fdfaf4; /* lighter cream — cards, panels */
  --c-dark: #1c1208; /* near-black espresso — headings, borders */
  --c-brown: #3b1f0a; /* deep coffee brown — primary action */
  --c-brown-mid: #6b3a1f; /* medium roast — hover states */
  --c-accent: #c8873a; /* caramel — highlights, badges, active */
  --c-muted: #8c7b6b; /* warm grey — secondary text */
  --c-divider: #d9cebf; /* soft divider lines */
  --c-white: #ffffff;

  /* Semantic */
  --c-text-primary: var(--c-dark);
  --c-text-secondary: var(--c-muted);
  --c-btn-primary-bg: var(--c-brown);
  --c-btn-primary-fg: var(--c-bg);
  --c-btn-hover-bg: var(--c-brown-mid);
  --c-tag-bg: var(--c-accent);
  --c-tag-fg: var(--c-white);
  --c-cart-badge: var(--c-accent);
}
```

---

## 3. Typography

Import from Google Fonts in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap"
  rel="stylesheet"
/>
```

| Role               | Font             | Weight | Usage                      |
| ------------------ | ---------------- | ------ | -------------------------- |
| Display / Headings | Playfair Display | 700    | Shop name, section headers |
| Sub-headings       | Playfair Display | 600    | Item names, page titles    |
| Body / UI          | DM Sans          | 400    | Descriptions, labels, nav  |
| UI emphasis        | DM Sans          | 500    | Button text, prices, tabs  |
| Monospace detail   | DM Mono          | 400    | Order numbers, item codes  |

```css
/* Global base styles */
body {
  font-family: "DM Sans", sans-serif;
  background-color: var(--c-bg);
  color: var(--c-text-primary);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3 {
  font-family: "Playfair Display", serif;
}
```

---

## 4. Layout System

### Desktop (primary)

- Max content width: `1200px`, centered with `auto` margins
- Navbar: full-width, `64px` tall, sticky top
- Main layout: two-column on menu page — `minmax(0, 1fr)` menu + `380px` cart sidebar
- Generous padding: `48px` horizontal on desktop

### Responsive breakpoints

```css
/* Mobile-first breakpoints */
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
```

On mobile (`< 768px`):

- Single column layout
- Cart becomes a bottom drawer / slide-up sheet
- Navbar stays sticky; cart icon opens drawer
- Padding reduces to `16px` horizontal

---

## 5. Component Design Specs

### NavBar

- Background: `var(--c-dark)`
- Logo: Playfair Display 700, `var(--c-bg)` color
- Height: `64px`
- Cart icon: right-aligned with a badge (`var(--c-accent)`) showing item count
- Subtle bottom border: `1px solid rgba(255,255,255,0.08)`

### Category Tabs

- Horizontal scrollable row below navbar
- Active tab: `var(--c-brown)` background, `var(--c-bg)` text, no border-radius (flat/blocky)
- Inactive tab: transparent, `var(--c-muted)` text
- DM Sans 500, `14px`, uppercase, letter-spacing `0.08em`
- Underline indicator OR solid pill — pick one and stay consistent

### MenuItem Card

- Background: `var(--c-surface)`
- Border: `1px solid var(--c-divider)`
- No border-radius (square/sharp edges — editorial feel)
- Image: 16:9 ratio, `object-fit: cover`, full width of card
- Item name: Playfair Display 600, `18px`
- Price: DM Sans 500, `var(--c-accent)`, `16px`
- Description: DM Sans 400, `var(--c-muted)`, `13px`, max 2 lines clamp
- Add button: full-width bottom, `var(--c-brown)` bg, `var(--c-bg)` text, 40px tall, no border-radius
- Hover state: card lifts `translateY(-2px)`, subtle shadow, button bg shifts to `var(--c-brown-mid)`
- Transition: `200ms ease`

### Cart Sidebar (Desktop) / Drawer (Mobile)

- Background: `var(--c-dark)`
- Text: `var(--c-bg)` and `var(--c-muted)` for secondary
- Title: Playfair Display 700, `22px`, `var(--c-bg)`
- Cart items: list with qty controls (`−` / `+`), item name, line total
- Divider: `1px solid rgba(255,255,255,0.1)`
- Totals section: subtotal, tax, total in DM Sans
- Total line: DM Sans 500, `var(--c-accent)`, slightly larger
- CTA button: full-width, `var(--c-accent)` bg, `var(--c-dark)` text, `48px` tall, DM Sans 500

### Qty Controls

- Three-cell: `[−]` `[n]` `[+]`
- Square buttons, `32px`, `var(--c-divider)` border
- Count centered in DM Mono

### Buttons (global)

```css
.btn-primary {
  background: var(--c-btn-primary-bg);
  color: var(--c-btn-primary-fg);
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.04em;
  border: none;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 0; /* intentionally square */
  transition:
    background 180ms ease,
    transform 120ms ease;
}
.btn-primary:hover {
  background: var(--c-btn-hover-bg);
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
}
```

---

## 6. Motion & Interaction

Keep animations purposeful and fast. No bouncing, no excessive easing.

| Interaction          | Animation                                             |
| -------------------- | ----------------------------------------------------- |
| Page transition      | `opacity 200ms ease` fade                             |
| Card hover           | `translateY(-2px)` + shadow `200ms ease`              |
| Add to cart          | Cart badge bumps: `scale(1.3) → scale(1)` quick pulse |
| Cart drawer (mobile) | `translateY(100%) → translateY(0)` `260ms ease-out`   |
| Item added flash     | Brief `var(--c-accent)` border flash on card          |
| Tab switch           | Instant — no animation needed                         |

Use Vue's `<Transition>` component for route changes and drawer.

---

## 7. Iconography

Use **Lucide Vue Next** (`lucide-vue-next`) for all icons — lightweight, consistent stroke style.

Key icons:

- Cart: `ShoppingCart`
- Add: `Plus`
- Remove: `Minus`
- Delete item: `Trash2`
- Confirm / check: `CheckCircle2`
- Close drawer: `X`
- Coffee cup (logo accent): `Coffee`

```bash
npm install lucide-vue-next
```

```vue
<script setup>
import { ShoppingCart, Plus, Minus } from "lucide-vue-next";
</script>
```

---

## 8. Spacing Scale

Use multiples of `8px` throughout:

| Token  | Value  | Usage                        |
| ------ | ------ | ---------------------------- |
| `--s1` | `4px`  | Tight inner gaps             |
| `--s2` | `8px`  | Small padding, icon gaps     |
| `--s3` | `16px` | Component padding            |
| `--s4` | `24px` | Section gaps                 |
| `--s5` | `32px` | Large gaps                   |
| `--s6` | `48px` | Page-level padding (desktop) |
| `--s7` | `64px` | Hero / section spacers       |

---

## 9. Empty & Edge States

Every view must handle these:

- **Empty cart**: Icon + "Your order is empty" in Playfair italic + "Browse the menu" link
- **No items in category**: "Nothing here yet" message
- **Loading state** (if async): Skeleton cards using `var(--c-divider)` animated shimmer
- **Confirm page**: Large `CheckCircle2` icon in `var(--c-accent)`, order number in DM Mono

---

## 10. Vue-Specific Implementation Notes

- Use **Vue 3 Composition API** with `<script setup>` syntax throughout
- **Pinia** for cart and menu stores — no prop drilling
- **Vue Router** with `<RouterView>` wrapped in `<Transition name="fade">`
- Scoped styles in every component with `<style scoped>`
- Global styles (variables, resets, typography base) in `src/assets/main.css`
- No external UI libraries (Vuetify, Element Plus, etc.) — build all components from scratch per this spec

---

## 11. File Conventions

```
src/
├── assets/
│   └── main.css         ← all CSS variables + global base styles
├── components/
│   ├── NavBar.vue
│   ├── MenuItem.vue
│   ├── CartSidebar.vue  ← desktop sidebar
│   ├── CartDrawer.vue   ← mobile bottom drawer
│   ├── QtyControl.vue
│   └── CategoryTabs.vue
├── views/
│   ├── MenuView.vue
│   ├── CartView.vue     ← mobile cart full-page fallback
│   └── ConfirmView.vue
├── stores/
│   ├── cartStore.js
│   └── menuStore.js
├── data/
│   └── menu.js
└── router/index.js
```

---

## 12. Quick Design Checklist

Before shipping any component, verify:

- [ ] Uses only CSS variables from this spec (no hardcoded hex)
- [ ] Uses correct font families per role
- [ ] No border-radius on cards or buttons (intentional)
- [ ] Responsive: tested at 375px (mobile) and 1280px (desktop)
- [ ] Hover/active states implemented on all interactive elements
- [ ] Empty states handled
- [ ] Icons from Lucide only

---

See `references/menu-data.md` for the mock menu structure and `references/responsive-patterns.md` for detailed mobile layout patterns.
