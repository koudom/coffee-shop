<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { Coffee, ShoppingCart, Menu, X } from "@lucide/vue";
import { toggleCartSidebar } from "@/stores/cartNav";

const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();

const dropdownOpen = ref(false);

function toggle() {
  dropdownOpen.value = !dropdownOpen.value;
}

function close() {
  dropdownOpen.value = false;
}

function navigate(path: string) {
  close();
  router.push(path);
}

function handleLogout() {
  auth.logout();
  close();
  router.push("/");
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-40 h-16 bg-(--c-dark) border-b border-white/8"
  >
    <div
      class="max-w-300 mx-auto flex items-center justify-between h-full px-12 max-md:px-4"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-2 no-underline"
        @click="close"
      >
        <Coffee :size="22" stroke-width="1.75" class="text-(--c-accent)" />
        <span
          class="font-['Playfair_Display',serif] font-bold text-(--c-bg) text-[22px] tracking-[-0.01em]"
          >The UC Coffee_333</span
        >
      </RouterLink>

      <div class="flex items-center gap-2">
        <button
          class="relative flex items-center justify-center w-9 h-9 border-none cursor-pointer bg-transparent text-(--c-bg)"
          @click="toggleCartSidebar"
          aria-label="Cart"
        >
          <ShoppingCart :size="20" stroke-width="1.75" />
          <span
            v-if="cart.itemCount > 0"
            class="absolute bg-(--c-accent) text-white text-[10px] font-bold min-w-4 h-4 flex items-center justify-center -top-0.5 -right-0.5"
            >{{ cart.itemCount }}</span
          >
        </button>

        <div class="relative">
          <button
            class="flex items-center justify-center w-9 h-9 border-none cursor-pointer bg-transparent text-(--c-bg)"
            @click="toggle"
            aria-label="Menu"
          >
            <Menu v-if="!dropdownOpen" :size="20" stroke-width="1.75" />
            <X v-else :size="20" stroke-width="1.75" />
          </button>

          <Transition name="nav-dropdown">
            <div
              v-if="dropdownOpen"
              class="absolute right-0 top-full mt-2 min-w-50 bg-(--c-dark) border border-white/10"
            >
              <button class="nav-dd-btn" @click="navigate('/menu')">
                Menu
              </button>
              <button class="nav-dd-btn" @click="navigate('/orders')">
                Order History
              </button>

              <div class="h-px mx-3 bg-white/8"></div>

              <template v-if="auth.isLoggedIn">
                <div class="px-4 py-2.5">
                  <span
                    class="block text-[11px] tracking-[0.06em] uppercase text-white/40 mb-px"
                    >Signed in as</span
                  >
                  <span
                    class="block text-[13px] text-(--c-bg) font-['DM_Sans',sans-serif]"
                    >{{ auth.user?.name || auth.user?.email }}</span
                  >
                </div>
                <div class="h-px mx-3 bg-white/8"></div>
                <button
                  v-if="auth.isAdmin"
                  class="nav-dd-btn"
                  @click="navigate('/admin')"
                >
                  Admin
                </button>
                <button class="nav-dd-btn" @click="handleLogout">
                  Log out
                </button>
              </template>
              <template v-else>
                <button class="nav-dd-btn" @click="navigate('/login')">
                  Log in
                </button>
                <button class="nav-dd-btn" @click="navigate('/register')">
                  Register
                </button>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-dd-btn {
  display: block;
  width: 100%;
  padding: 12px 16px;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  color: var(--c-bg);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 150ms ease;
}
.nav-dd-btn:hover {
  background: rgba(255, 255, 255, 0.06);
}

.nav-dropdown-enter-active {
  transition: all 180ms ease-out;
}
.nav-dropdown-leave-active {
  transition: all 120ms ease-in;
}
.nav-dropdown-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.nav-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
