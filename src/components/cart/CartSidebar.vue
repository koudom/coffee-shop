<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import QtyControl from "@/components/shared/QtyControl.vue";
import { Trash2, X } from "@lucide/vue";

const cart = useCartStore();
defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  (e: "toggle"): void;
}>();
</script>

<template>
  <Transition name="sidebar">
    <aside v-if="open" class="cart-sidebar">
      <div class="flex items-center justify-between mb-6">
        <h2
          class="font-['Playfair_Display',serif] font-bold text-[22px] text-(--c-bg) m-0"
        >
          Your Order
        </h2>
        <button
          class="flex items-center justify-center cursor-pointer border-none bg-transparent w-7 h-7 text-(--c-muted)"
          @click="emit('toggle')"
        >
          <X :size="18" stroke-width="2" />
        </button>
      </div>

      <div v-if="cart.items.length === 0" class="text-center py-12">
        <p class="text-sm text-(--c-muted)">Your order is empty</p>
        <p
          class="text-[13px] text-(--c-muted) font-['Playfair_Display',serif] italic"
        >
          Browse the menu to add items
        </p>
      </div>

      <div v-else class="flex flex-col h-[calc(100%-56px)]">
        <div class="flex-1 space-y-4 overflow-y-auto">
          <div
            v-for="(item, index) in cart.items"
            :key="item.id"
            class="flex items-center gap-3 pb-4 border-b border-white/10"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-14 h-14 object-cover shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <p class="text-(--c-bg) text-sm font-medium m-0 mb-1">
                  {{ item.name }}
                </p>
                <button
                  class="flex items-center justify-center cursor-pointer border-none bg-transparent shrink-0 w-6 h-6 text-(--c-muted)"
                  @click="cart.removeItem(index)"
                >
                  <Trash2 :size="13" stroke-width="2" />
                </button>
              </div>
              <div class="flex items-center justify-between">
                <QtyControl
                  :model-value="item.qty"
                  @update:model-value="cart.updateQty(index, $event)"
                />
                <span
                  class="font-['DM_Sans',sans-serif] font-medium text-sm text-(--c-accent) whitespace-nowrap"
                >
                  ${{ (item.price * item.qty).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 space-y-2 shrink-0 border-t border-white/10">
          <div class="flex justify-between text-sm text-(--c-muted)">
            <span>Subtotal</span>
            <span>${{ cart.subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm text-(--c-muted)">
            <span>Tax (10%)</span>
            <span>${{ cart.tax.toFixed(2) }}</span>
          </div>
          <div
            class="flex justify-between pt-2 text-(--c-accent) font-['DM_Sans',sans-serif] font-medium text-lg"
          >
            <span>Total</span>
            <span>${{ cart.total.toFixed(2) }}</span>
          </div>
          <RouterLink
            to="/checkout"
            class="block w-full text-center no-underline bg-(--c-accent) text-(--c-dark) py-3.5 font-['DM_Sans',sans-serif] font-medium text-sm mt-2 transition-opacity duration-180 hover:opacity-85"
          >
            Checkout — ${{ cart.total.toFixed(2) }}
          </RouterLink>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.sidebar-enter-active {
  transition: transform 260ms ease-out;
}
.sidebar-leave-active {
  transition: transform 200ms ease-in;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(100%);
}
</style>
