<script setup lang="ts">
import { ref } from "vue";
import { useOrderStore } from "@/stores/order";
import AppBadge from "@/components/shared/AppBadge.vue";
import InvoiceModal from "@/components/order/InvoiceModal.vue";
import { ArrowLeft, Package, Receipt } from "@lucide/vue";

const orderStore = useOrderStore();
const invoiceOrder = ref<(typeof orderStore.orders)[number] | null>(null);
</script>

<template>
  <div class="min-h-screen pt-16">
    <div class="max-w-300 mx-auto px-12 max-md:px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <h1
          class="text-2xl font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
        >
          My Orders
        </h1>
        <RouterLink
          to="/menu"
          class="text-sm font-medium no-underline text-(--c-accent)"
        >
          <ArrowLeft :size="14" class="inline mr-1" /> Back to menu
        </RouterLink>
      </div>

      <div v-if="orderStore.orders.length === 0" class="text-center py-16">
        <Package
          :size="48"
          stroke-width="1.5"
          class="mx-auto mb-4 text-(--c-muted)"
        />
        <p class="text-sm text-(--c-muted)">No orders yet</p>
      </div>

      <div v-else class="max-w-2xl space-y-3">
        <div
          v-for="order in orderStore.orders"
          :key="order.id"
          class="p-4 bg-(--c-surface) border border-(--c-divider)"
        >
          <div class="flex items-center justify-between mb-2">
            <span
              class="font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
              >{{ order.id }}</span
            >
            <AppBadge :status="order.status" />
          </div>
          <p class="text-xs text-(--c-muted) mb-2">
            {{ new Date(order.createdAt).toLocaleDateString() }}
          </p>
          <div
            class="flex items-center justify-between text-sm text-(--c-dark)"
          >
            <span>{{ order.items.length }} items</span>
            <div class="flex items-center gap-3">
              <span class="font-semibold font-['Playfair_Display',serif]"
                >${{ order.total?.toFixed(2) }}</span
              >
              <button
                class="flex items-center gap-1.5 text-xs font-medium border-none cursor-pointer bg-transparent p-0 text-(--c-accent)"
                @click="invoiceOrder = order"
              >
                <Receipt :size="14" stroke-width="2" />
                Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      <InvoiceModal
        :order="invoiceOrder"
        :open="!!invoiceOrder"
        @close="invoiceOrder = null"
      />
    </div>
  </div>
</template>
