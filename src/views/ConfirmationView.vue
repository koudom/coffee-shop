<script setup lang="ts">
import { useRoute } from "vue-router";
import { useOrderStore } from "@/stores/order";
import { computed, ref } from "vue";
import { CheckCircle2 } from "@lucide/vue";
import InvoiceModal from "@/components/order/InvoiceModal.vue";

const route = useRoute();
const orderStore = useOrderStore();
const order = computed(
  () => orderStore.orders.find((o) => o.id === route.query.id) ?? null
);
const invoiceOpen = ref(false);
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-sm w-full text-center">
      <CheckCircle2
        :size="56"
        stroke-width="1.5"
        class="mx-auto mb-4 text-(--c-accent)"
      />

      <h1
        class="text-2xl font-semibold mb-2 font-['Playfair_Display',serif] text-(--c-dark)"
      >
        Order Confirmed!
      </h1>

      <p class="text-sm text-(--c-muted) mb-2">Your order is being prepared.</p>
      <p class="text-sm text-(--c-muted) mb-6">Estimated wait: 12–15 minutes</p>

      <div v-if="order" class="mb-6">
        <p class="font-['DM_Mono',monospace] text-xl text-(--c-accent) mb-1">
          {{ order.id }}
        </p>
        <p class="text-sm text-(--c-muted)">Save this order number</p>
      </div>

      <div
        v-if="order"
        class="text-left p-4 mb-6 bg-(--c-surface) border border-(--c-divider)"
      >
        <div
          v-for="item in order.items"
          :key="item.id"
          class="flex justify-between text-sm py-1.5 text-(--c-dark)"
        >
          <span>{{ item.qty }}x {{ item.name }}</span>
          <span>${{ (item.price * item.qty).toFixed(2) }}</span>
        </div>
        <div
          class="flex justify-between font-semibold pt-3 mt-3 border-t border-(--c-divider) text-(--c-dark)"
        >
          <span>Total</span>
          <span>${{ order.total.toFixed(2) }}</span>
        </div>
      </div>

      <button
        v-if="order"
        class="btn-primary no-underline inline-block w-full text-center mb-3 bg-(--c-surface) text-(--c-dark) border border-(--c-divider)"
        @click="invoiceOpen = true"
      >
        View Invoice
      </button>

      <RouterLink
        to="/menu"
        class="btn-primary no-underline inline-block w-full text-center"
      >
        Order again
      </RouterLink>
      <RouterLink
        to="/orders"
        class="block mt-3 text-sm font-medium no-underline text-(--c-accent)"
      >
        View order history
      </RouterLink>

      <InvoiceModal
        :order="order"
        :open="invoiceOpen"
        @close="invoiceOpen = false"
      />
    </div>
  </div>
</template>
