<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import QtyControl from "@/components/shared/QtyControl.vue";
import { Trash2 } from "@lucide/vue";

const cart = useCartStore();
defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open">
        <div class="drawer-overlay" @click="emit('close')" />
        <div class="cart-drawer">
          <div class="drawer-handle" />
          <h2
            class="font-['Playfair_Display',serif] font-bold text-[22px] text-(--c-bg) m-0 mb-6"
          >
            Your Order
          </h2>

          <div v-if="cart.items.length === 0" class="text-center py-12">
            <p class="text-sm text-(--c-muted)">Your order is empty</p>
            <p
              class="text-[13px] text-(--c-muted) font-['Playfair_Display',serif] italic"
            >
              Browse the menu to add items
            </p>
          </div>

          <div v-else class="space-y-4">
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

            <div class="pt-4 space-y-2 border-t border-white/10">
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
                class="block w-full text-center no-underline bg-(--c-accent) text-(--c-dark) py-3.5 font-['DM_Sans',sans-serif] font-medium text-sm mt-2"
                @click="emit('close')"
              >
                Checkout — ${{ cart.total.toFixed(2) }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active {
  transition: transform 260ms ease-out;
}
.drawer-leave-active {
  transition: transform 200ms ease-in;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}
</style>
