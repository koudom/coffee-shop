# Responsive Layout Patterns

## Breakpoint Strategy

This app is **desktop-first** in design intent, but fully responsive. Use these breakpoints:

```css
/* In main.css */
:root {
  --bp-mobile: 767px; /* max-width for mobile styles */
  --bp-tablet: 1023px; /* max-width for tablet */
}
```

```css
/* Typical usage */
@media (max-width: 767px) {
  /* mobile  */
}
@media (max-width: 1023px) {
  /* tablet  */
}
```

---

## Page Layout: MenuView

### Desktop (≥ 1024px)

```
┌─────────────────────────────────────────────────────┐
│                    NavBar (sticky)                  │
├───────────────────────────────────┬─────────────────┤
│ Category Tabs                     │                 │
├───────────────────────────────────┤   Cart Sidebar  │
│                                   │   (sticky,      │
│   Menu Grid (3 columns)           │    380px wide)  │
│   [card] [card] [card]            │                 │
│   [card] [card] [card]            │                 │
│                                   │                 │
└───────────────────────────────────┴─────────────────┘
```

CSS:

```css
.menu-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  min-height: calc(100vh - 64px);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px 32px 32px 0;
  align-content: start;
}

.cart-sidebar {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  border-left: 1px solid var(--c-divider);
}
```

### Tablet (768px – 1023px)

```
┌──────────────────────────────────────┐
│             NavBar (sticky)          │
├──────────────────────────────────────┤
│ Category Tabs                        │
├──────────────────────────────────────┤
│  Menu Grid (2 columns)               │
│  [card] [card]                       │
│  [card] [card]                       │
└──────────────────────────────────────┘
         [Cart FAB bottom-right]
```

- Sidebar hidden → floating cart button (FAB)
- Grid becomes 2 columns
- Cart opens as bottom drawer

```css
@media (max-width: 1023px) {
  .menu-layout {
    grid-template-columns: 1fr;
    padding: 0 24px;
  }
  .cart-sidebar {
    display: none;
  }
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cart-fab {
    display: flex;
  }
}
```

### Mobile (≤ 767px)

```
┌─────────────────────┐
│  NavBar (sticky)    │
├─────────────────────┤
│  Category Tabs      │
│  (horizontal scroll)│
├─────────────────────┤
│  Menu Grid          │
│  (1 column)         │
│  [card]             │
│  [card]             │
└─────────────────────┘
  [Cart FAB bottom-right, fixed]
```

```css
@media (max-width: 767px) {
  .menu-layout {
    padding: 0 16px;
  }
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

---

## Cart FAB (Floating Action Button) — Tablet + Mobile

Shown when sidebar is hidden. Fixed position, bottom-right.

```css
.cart-fab {
  display: none; /* shown via media query */
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  background: var(--c-brown);
  color: var(--c-bg);
  border: none;
  padding: 14px 20px;
  cursor: pointer;
  align-items: center;
  gap: 10px;
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(28, 18, 8, 0.3);
  transition:
    background 200ms ease,
    transform 150ms ease;
}
.cart-fab:hover {
  background: var(--c-brown-mid);
  transform: translateY(-2px);
}
.cart-fab .badge {
  background: var(--c-accent);
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}
```

---

## Cart Bottom Drawer — Tablet + Mobile

Slides up from the bottom. Full width, 80vh max height.

```html
<Transition name="drawer">
  <div class="cart-drawer" v-if="drawerOpen">
    <div class="drawer-handle"></div>
    <div class="drawer-content">
      <!-- same content as CartSidebar -->
    </div>
  </div>
</Transition>
<div class="drawer-overlay" v-if="drawerOpen" @click="closeDrawer"></div>
```

```css
.cart-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  background: var(--c-dark);
  max-height: 80vh;
  overflow-y: auto;
  padding: 16px 20px 32px;
}

.drawer-handle {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 0 auto 20px;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 199;
}

/* Transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 260ms ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}
```

---

## Category Tabs — Mobile Scroll

On mobile, tabs must scroll horizontally without a scrollbar visible:

```css
.category-tabs {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding: 12px 16px;
}
.category-tabs::-webkit-scrollbar {
  display: none;
}
```

---

## NavBar — Responsive

Desktop:

- Logo left, cart icon right with badge
- `padding: 0 48px`

Mobile:

- Same layout, reduced padding `0 16px`
- Logo font-size slightly smaller

```css
@media (max-width: 767px) {
  .navbar {
    padding: 0 16px;
  }
  .navbar-logo {
    font-size: 20px;
  }
}
```

---

## Vue Router Transitions

```css
/* Global page fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

```html
<!-- App.vue -->
<RouterView v-slot="{ Component }">
  <Transition name="fade" mode="out-in">
    <component :is="Component" />
  </Transition>
</RouterView>
```
