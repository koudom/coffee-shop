<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useOrderStore, type OrderStatus } from "@/stores/order";
import { Trash2, Minus, Plus } from "@lucide/vue";

const router = useRouter();
const cart = useCartStore();
const orderStore = useOrderStore();

const name = ref("");
const phone = ref("");
const submitting = ref(false);

async function placeOrder() {
  submitting.value = true;
  await new Promise((r) => setTimeout(r, 800));
  const id = "#" + Math.floor(1000 + Math.random() * 9000);
  const order = {
    id,
    items: [...cart.items],
    total: cart.total,
    name: name.value,
    phone: phone.value,
    address: "",
    pickupTime: "15",
    status: "pending" as OrderStatus,
    createdAt: new Date().toISOString(),
  };
  orderStore.addOrder(order);
  cart.clear();
  router.push(`/confirmation?id=${id}`);
}

function handleRemove(index: number) {
  cart.removeItem(index);
}
</script>

<template>
  <div class="min-h-screen pt-16 bg-(--c-bg)">
    <div class="max-w-260 mx-auto px-6 max-md:px-4 py-6">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-8">
        <RouterLink
          to="/menu"
          class="flex items-center justify-center w-9 h-9 no-underline shrink-0 bg-(--c-surface) text-(--c-dark) border border-(--c-divider)"
        >
          &larr;
        </RouterLink>
        <h1
          class="text-2xl font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
        >
          Checkout
        </h1>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left: Order summary -->
        <div class="lg:flex-1 order-2 lg:order-1">
          <h2
            class="text-base font-semibold mb-4 font-['Playfair_Display',serif] text-(--c-dark)"
          >
            Order Summary
          </h2>

          <div
            v-if="cart.items.length === 0"
            class="p-6 text-center bg-(--c-surface) border border-(--c-divider)"
          >
            <p class="text-sm text-(--c-muted)">Your cart is empty</p>
          </div>

          <div v-else class="divide-y border-t border-(--c-divider)">
            <div
              v-for="(item, index) in cart.items"
              :key="item.id"
              class="flex gap-4 py-4"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-16 h-16 object-cover shrink-0 border border-(--c-divider)"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate text-(--c-dark)">
                  {{ item.name }}
                </p>
                <p class="text-xs mt-0.5 text-(--c-muted)">
                  ${{ item.price.toFixed(2) }} each
                </p>

                <div class="flex items-center gap-3 mt-2">
                  <div class="flex items-center border border-(--c-divider)">
                    <button
                      class="flex items-center justify-center w-7 h-7 border-none cursor-pointer bg-transparent text-(--c-muted)"
                      @click="cart.updateQty(index, item.qty - 1)"
                    >
                      <Minus :size="12" stroke-width="2.5" />
                    </button>
                    <span
                      class="text-xs font-medium w-7 text-center text-(--c-dark)"
                      >{{ item.qty }}</span
                    >
                    <button
                      class="flex items-center justify-center w-7 h-7 border-none cursor-pointer bg-transparent text-(--c-muted)"
                      @click="cart.updateQty(index, item.qty + 1)"
                    >
                      <Plus :size="12" stroke-width="2.5" />
                    </button>
                  </div>
                  <button
                    class="flex items-center gap-1 text-xs border-none cursor-pointer bg-transparent p-0 text-(--c-muted)"
                    @click="handleRemove(index)"
                  >
                    <Trash2 :size="12" stroke-width="2" />
                    Remove
                  </button>
                </div>
              </div>
              <div class="text-sm font-medium shrink-0 pt-0.5 text-(--c-dark)">
                ${{ (item.price * item.qty).toFixed(2) }}
              </div>
            </div>
          </div>

          <div class="mt-4 p-4 bg-(--c-surface) border border-(--c-divider)">
            <div class="space-y-1.5 text-sm">
              <div class="flex justify-between text-(--c-muted)">
                <span>Subtotal</span>
                <span>${{ cart.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-(--c-muted)">
                <span>Tax (10%)</span>
                <span>${{ cart.tax.toFixed(2) }}</span>
              </div>
              <div
                class="flex justify-between font-semibold pt-2 mt-2 border-t border-(--c-divider) text-(--c-dark)"
              >
                <span>Total</span>
                <span class="font-['Playfair_Display',serif]"
                  >${{ cart.total.toFixed(2) }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Customer details -->
        <div class="lg:w-[320px] order-1 lg:order-2">
          <h2
            class="text-base font-semibold mb-4 font-['Playfair_Display',serif] text-(--c-dark)"
          >
            Your Details
          </h2>

          <div
            class="p-5 space-y-4 bg-(--c-surface) border border-(--c-divider)"
          >
            <div>
              <label class="block text-sm font-medium mb-1.5 text-(--c-dark)"
                >Name</label
              >
              <input
                v-model="name"
                type="text"
                placeholder="Your name"
                class="w-full px-3 py-2.5 text-sm bg-(--c-bg) border border-(--c-divider) text-(--c-dark) outline-none font-['DM_Sans',sans-serif]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5 text-(--c-dark)"
                >Phone</label
              >
              <input
                v-model="phone"
                type="tel"
                placeholder="Phone number"
                class="w-full px-3 py-2.5 text-sm bg-(--c-bg) border border-(--c-divider) text-(--c-dark) outline-none font-['DM_Sans',sans-serif]"
              />
            </div>

            <div class="text-xs leading-relaxed text-(--c-muted)">
              <p>We'll send your order confirmation to these details.</p>
            </div>
          </div>

          <button
            class="w-full mt-4 px-5 py-3 text-sm font-medium border-none cursor-pointer bg-(--c-brown) text-(--c-bg) font-['DM_Sans',sans-serif] transition-[background] duration-180 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--c-brown-mid)"
            :disabled="!name || !phone || submitting || cart.items.length === 0"
            @click="placeOrder"
          >
            <span class="flex items-center justify-center gap-2">
              <svg
                v-if="submitting"
                class="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {{
                submitting
                  ? "Placing order…"
                  : `Place Order — $${cart.total.toFixed(2)}`
              }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
