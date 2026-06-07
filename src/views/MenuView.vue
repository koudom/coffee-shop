<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useMenuStore } from "@/stores/menu";
import { useCartStore } from "@/stores/cart";
import type { MenuItem } from "@/data/mockMenu";
import MenuItemComp from "@/components/menu/MenuItem.vue";
import CategoryTabs from "@/components/menu/CategoryTabs.vue";
import ItemDetailModal from "@/components/menu/ItemDetailModal.vue";
import CartSidebar from "@/components/cart/CartSidebar.vue";
import CartDrawer from "@/components/cart/CartDrawer.vue";
import SkeletonCard from "@/components/shared/SkeletonCard.vue";
import { ShoppingCart, Check } from "@lucide/vue";
import { cartSidebarOpen, toggleCartSidebar } from "@/stores/cartNav";

const menu = useMenuStore();
const cart = useCartStore();

const activeCategory = ref("all");
const drawerOpen = ref(false);
const detailItem = ref<MenuItem | null>(null);
const toast = ref<{ show: boolean; name: string }>({ show: false, name: "" });
let toastTimer: ReturnType<typeof setTimeout> | null = null;

const filteredItems = computed(() => {
  if (activeCategory.value === "all") return menu.items;
  return menu.items.filter((p) => p.category === activeCategory.value);
});

function openDrawer() {
  drawerOpen.value = true;
}
function closeDrawer() {
  drawerOpen.value = false;
}
function addItem(item: MenuItem) {
  cart.addItem({ ...item, qty: 1 });
  if (toastTimer) clearTimeout(toastTimer);
  toast.value = { show: true, name: item.name };
  toastTimer = setTimeout(() => {
    toast.value = { show: false, name: "" };
  }, 2000);
}

function showDetail(item: MenuItem) {
  detailItem.value = item;
}

function closeDetail() {
  detailItem.value = null;
}

onMounted(() => {
  menu.fetchMenu();
});
</script>

<template>
  <div class="min-h-screen pt-16">
    <!-- Mobile / tablet header -->
    <div class="lg:hidden px-4 pt-6 pb-2">
      <h1
        class="text-2xl font-semibold mb-4 font-['Playfair_Display',serif] text-(--c-dark)"
      >
        Menu
      </h1>
      <CategoryTabs v-model="activeCategory" :categories="menu.categories" />
    </div>

    <!-- Desktop layout -->
    <div class="menu-layout">
      <!-- Left column: items -->
      <div class="menu-column">
        <!-- Desktop header -->
        <div class="hidden lg:flex items-center justify-between px-0 pt-8 pb-2">
          <div>
            <h1
              class="text-2xl font-semibold mb-4 font-['Playfair_Display',serif] text-(--c-dark)"
            >
              Menu
            </h1>
            <CategoryTabs
              v-model="activeCategory"
              :categories="menu.categories"
            />
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="menu.loading" class="menu-grid">
          <SkeletonCard v-for="i in 6" :key="i" />
        </div>

        <!-- Empty state -->
        <div v-else-if="filteredItems.length === 0" class="text-center py-16">
          <p class="text-sm text-(--c-muted)">Nothing here yet</p>
        </div>

        <!-- Items grid -->
        <TransitionGroup v-else name="grid" tag="div" class="menu-grid">
          <MenuItemComp
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
            @add="addItem"
            @show-detail="showDetail"
          />
        </TransitionGroup>

        <div class="pb-8" />
      </div>

      <!-- Desktop cart sidebar -->
      <CartSidebar :open="cartSidebarOpen" @toggle="toggleCartSidebar" />
    </div>

    <!-- Cart FAB (tablet + mobile) -->
    <button
      v-if="cart.itemCount > 0"
      class="cart-fab lg:hidden!"
      @click="openDrawer"
    >
      <ShoppingCart :size="18" stroke-width="2" />
      <span>Cart</span>
      <span class="badge">{{ cart.itemCount }}</span>
    </button>

    <!-- Cart Drawer (tablet + mobile) -->
    <CartDrawer :open="drawerOpen" @close="closeDrawer" />

    <!-- Item detail modal -->
    <ItemDetailModal :item="detailItem" @close="closeDetail" />

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="toast.show" class="toast-notification">
        <Check :size="16" stroke-width="2.5" />
        <span>{{ toast.name }} added to order</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.menu-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  min-height: calc(100vh - 64px);
}

@media (max-width: 1023px) {
  .menu-layout {
    padding: 0;
  }
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 32px 32px 32px 0;
  align-content: start;
}

@media (max-width: 1199px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1023px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px 16px 80px;
  }
}

@media (max-width: 767px) {
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px 16px 80px;
  }
}

.grid-enter-active,
.grid-leave-active {
  transition: all 200ms ease;
}
.grid-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.grid-move {
  transition: transform 200ms ease;
}

.toast-notification {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 300;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--c-dark);
  color: var(--c-bg);
  padding: 12px 20px;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.toast-enter-active {
  transition: all 260ms ease-out;
}
.toast-leave-active {
  transition: all 200ms ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(16px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(16px);
}
</style>
