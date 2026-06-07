<script setup lang="ts">
import { watch, onUnmounted, computed } from "vue";
import type { Order } from "@/stores/order";
import { Printer, X } from "@lucide/vue";

const props = defineProps<{
  order: Order | null;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const subtotal = computed(() =>
  props.order ? props.order.items.reduce((s, i) => s + i.price * i.qty, 0) : 0
);

const tax = computed(() => subtotal.value * 0.1);

function print() {
  window.print();
}

watch(
  () => props.open,
  (val) => {
    document.body.style.overflow = val ? "hidden" : "";
  }
);

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="invoice">
      <div
        v-if="open && order"
        class="invoice-overlay"
        @click.self="emit('close')"
      >
        <div
          class="invoice-card"
          role="dialog"
          aria-modal="true"
          aria-label="Invoice"
        >
          <div
            class="no-print sticky top-0 z-1 flex justify-end gap-2 pt-3 pr-3"
          >
            <button
              class="invoice-action-btn"
              @click="emit('close')"
              aria-label="Close"
            >
              <X :size="18" stroke-width="2" />
            </button>
            <button
              class="invoice-action-btn"
              @click="print"
              aria-label="Print invoice"
            >
              <Printer :size="18" stroke-width="2" />
            </button>
          </div>

          <div class="px-8 pb-8">
            <div class="text-center mb-6">
              <h2
                class="font-['Playfair_Display',serif] font-bold text-2xl text-(--c-dark) m-0 mb-0.5"
              >
                Coffee Shop
              </h2>
              <p
                class="font-['DM_Sans',sans-serif] text-xs tracking-widest uppercase text-(--c-muted) m-0"
              >
                Invoice
              </p>
            </div>

            <div class="flex justify-between mb-5">
              <div>
                <p
                  class="text-[11px] tracking-[0.08em] uppercase text-(--c-muted) m-0 mb-0.5"
                >
                  Order
                </p>
                <p
                  class="text-sm font-medium text-(--c-dark) m-0 font-['DM_Mono','DM_Sans',monospace]"
                >
                  {{ order.id }}
                </p>
              </div>
              <div>
                <p
                  class="text-[11px] tracking-[0.08em] uppercase text-(--c-muted) m-0 mb-0.5"
                >
                  Date
                </p>
                <p
                  class="text-sm font-medium text-(--c-dark) m-0 font-['DM_Mono','DM_Sans',monospace]"
                >
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </p>
              </div>
            </div>

            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th
                    class="text-[11px] tracking-[0.08em] uppercase text-(--c-muted) font-medium pb-2 text-left border-b border-(--c-divider)"
                  >
                    Item
                  </th>
                  <th
                    class="text-[11px] tracking-[0.08em] uppercase text-(--c-muted) font-medium pb-2 text-right w-10 border-b border-(--c-divider)"
                  >
                    Qty
                  </th>
                  <th
                    class="text-[11px] tracking-[0.08em] uppercase text-(--c-muted) font-medium pb-2 text-right w-15 border-b border-(--c-divider)"
                  >
                    Price
                  </th>
                  <th
                    class="text-[11px] tracking-[0.08em] uppercase text-(--c-muted) font-medium pb-2 text-right w-15 border-b border-(--c-divider)"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.items" :key="item.id">
                  <td
                    class="text-sm text-(--c-dark) py-2 border-b border-(--c-divider)"
                  >
                    {{ item.name }}
                  </td>
                  <td
                    class="text-sm text-(--c-dark) py-2 border-b border-(--c-divider) text-right"
                  >
                    {{ item.qty }}
                  </td>
                  <td
                    class="text-sm text-(--c-dark) py-2 border-b border-(--c-divider) text-right"
                  >
                    ${{ item.price.toFixed(2) }}
                  </td>
                  <td
                    class="text-sm text-(--c-dark) py-2 border-b border-(--c-divider) text-right"
                  >
                    ${{ (item.price * item.qty).toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="ml-auto w-50">
              <div
                class="flex justify-between text-[13px] text-(--c-dark) py-1"
              >
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div
                class="flex justify-between text-[13px] text-(--c-dark) py-1"
              >
                <span>Tax (10%)</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div
                class="flex justify-between font-bold text-[15px] text-(--c-dark) pt-2 mt-1 border-t-2 border-(--c-dark)"
              >
                <span>Total</span>
                <span>${{ order.total.toFixed(2) }}</span>
              </div>
            </div>

            <p class="text-center text-[13px] text-(--c-muted) mt-6 italic m-0">
              Thank you for your order!
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.invoice-overlay {
  position: fixed;
  inset: 0;
  z-index: 600;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.invoice-card {
  background: var(--c-bg);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.invoice-action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 150ms ease;
}

.invoice-action-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Transition */
.invoice-enter-active {
  transition: opacity 250ms ease;
}
.invoice-enter-active .invoice-card {
  transition:
    transform 250ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 250ms ease;
}
.invoice-leave-active {
  transition: opacity 200ms ease;
}
.invoice-leave-active .invoice-card {
  transition:
    transform 200ms ease,
    opacity 200ms ease;
}
.invoice-enter-from {
  opacity: 0;
}
.invoice-enter-from .invoice-card {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}
.invoice-leave-to {
  opacity: 0;
}
.invoice-leave-to .invoice-card {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}

/* Print styles */
@media print {
  :deep(body *) {
    visibility: hidden;
  }

  .invoice-overlay {
    position: static;
    background: none;
    padding: 0;
    display: block;
  }

  .invoice-card {
    max-width: 100%;
    max-height: none;
    overflow: visible;
    position: static;
  }

  .no-print {
    display: none !important;
  }

  :deep(.invoice-card),
  :deep(.invoice-card *),
  .invoice-card,
  .invoice-card * {
    visibility: visible;
  }

  .invoice-overlay {
    position: absolute;
    inset: auto;
  }
}
</style>
