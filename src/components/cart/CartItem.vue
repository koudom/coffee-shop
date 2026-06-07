<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/stores/cart";
import type { CartItem } from "@/stores/cart";
import QtyControl from "@/components/shared/QtyControl.vue";
import { Trash2 } from "@lucide/vue";

defineProps<{
  item: CartItem;
  index: number;
}>();
const cart = useCartStore();
const imageLoaded = ref(false);
</script>

<template>
  <div class="flex gap-4 p-4 bg-(--c-surface) border border-(--c-divider)">
    <div class="relative w-20 h-20 shrink-0 overflow-hidden">
      <div v-if="!imageLoaded" class="absolute inset-0 skeleton-pulse"></div>
      <img
        :src="item.image"
        :alt="item.name"
        class="w-full h-full object-cover transition-opacity duration-300"
        :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
        @load="imageLoaded = true"
      />
    </div>
    <div class="flex-1 min-w-0 flex flex-col justify-between">
      <div class="flex items-start justify-between">
        <div>
          <p
            class="font-['Playfair_Display',serif] font-semibold text-base text-(--c-dark) m-0"
          >
            {{ item.name }}
          </p>
          <p
            class="font-['DM_Sans',sans-serif] font-medium text-sm text-(--c-accent) mt-0.5 m-0"
          >
            ${{ item.price.toFixed(2) }}
          </p>
        </div>
        <button
          class="flex items-center justify-center cursor-pointer border-none bg-transparent shrink-0 w-7 h-7 text-(--c-muted)"
          @click="cart.removeItem(index)"
        >
          <Trash2 :size="14" stroke-width="2" />
        </button>
      </div>
      <div class="flex items-center justify-between mt-2">
        <QtyControl
          :model-value="item.qty"
          :min="0"
          @update:model-value="cart.updateQty(index, $event)"
        />
        <span
          class="font-['DM_Sans',sans-serif] font-medium text-[15px] text-(--c-accent)"
          >${{ (item.price * item.qty).toFixed(2) }}</span
        >
      </div>
    </div>
  </div>
</template>
