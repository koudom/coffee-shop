<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useMenuStore } from "@/stores/menu";
import { useOrderStore } from "@/stores/order";
import type { OrderStatus, Order } from "@/stores/order";
import type { MenuItem } from "@/data/mockMenu";
import { LogOut, Coffee, ShoppingBag, Plus } from "@lucide/vue";

const auth = useAuthStore();
const menu = useMenuStore();
const orderStore = useOrderStore();
const router = useRouter();

const tab = ref("orders");
const editingItem = ref<MenuItem | null>(null);
const showItemForm = ref(false);
const form = ref({
  name: "",
  description: "",
  price: "",
  category: "coffee",
  image: "",
});
const orderStatuses: OrderStatus[] = ["pending", "making", "ready", "done"];

const kanbanColumns = computed(() => {
  const groups: Record<string, Order[]> = {
    pending: [],
    making: [],
    ready: [],
    done: [],
  };
  orderStore.orders.forEach((o) => {
    if (groups[o.status]) groups[o.status].push(o);
  });
  return groups;
});

function advanceStatus(orderId: string, currentStatus: string) {
  const idx = orderStatuses.indexOf(currentStatus as OrderStatus);
  if (idx < orderStatuses.length - 1) {
    orderStore.updateStatus(orderId, orderStatuses[idx + 1]);
  }
}

function editItem(item: MenuItem) {
  editingItem.value = item;
  form.value = { ...item, price: String(item.price) };
  showItemForm.value = true;
}

function saveItem() {
  if (editingItem.value) {
    editingItem.value.name = form.value.name;
    editingItem.value.description = form.value.description;
    editingItem.value.price = parseFloat(form.value.price);
    editingItem.value.image = form.value.image;
  }
  showItemForm.value = false;
  editingItem.value = null;
}

function newItem() {
  editingItem.value = null;
  form.value = {
    name: "",
    description: "",
    price: "",
    category: "coffee",
    image: "",
  };
  showItemForm.value = true;
}

onMounted(() => menu.fetchMenu());
</script>

<template>
  <div class="layout-admin min-h-screen bg-(--c-bg)">
    <!-- Admin header -->
    <div
      class="sticky top-0 z-30 bg-(--c-surface) border-b border-(--c-divider)"
    >
      <div
        class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <Coffee :size="20" stroke-width="1.75" class="text-(--c-accent)" />
          <span
            class="text-sm font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
            >Admin</span
          >
        </div>
        <button
          class="flex items-center gap-1.5 text-sm cursor-pointer border-none bg-transparent font-medium text-(--c-muted)"
          @click="
            auth.logout();
            router.push('/');
          "
        >
          <LogOut :size="16" stroke-width="2" /> Logout
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 max-w-5xl mx-auto px-4 pt-6 pb-2">
      <button
        class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium cursor-pointer border-none transition-all"
        :class="
          tab === 'orders'
            ? 'bg-(--c-brown) text-(--c-bg)'
            : 'bg-(--c-surface) text-(--c-dark)'
        "
        @click="tab = 'orders'"
      >
        <ShoppingBag :size="16" stroke-width="2" /> Orders
      </button>
      <button
        class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium cursor-pointer border-none transition-all"
        :class="
          tab === 'menu'
            ? 'bg-(--c-brown) text-(--c-bg)'
            : 'bg-(--c-surface) text-(--c-dark)'
        "
        @click="tab = 'menu'"
      >
        <Coffee :size="16" stroke-width="2" /> Menu
      </button>
    </div>

    <!-- Orders kanban -->
    <div v-if="tab === 'orders'" class="max-w-5xl mx-auto px-4 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          v-for="(orders, status) in kanbanColumns"
          :key="status"
          class="p-4 bg-(--c-surface) border border-(--c-divider)"
        >
          <h3
            class="text-xs font-semibold uppercase tracking-wide mb-3 text-(--c-muted)"
          >
            {{ status }} ({{ orders.length }})
          </h3>
          <div class="space-y-2">
            <div
              v-for="order in orders"
              :key="order.id"
              class="p-3 bg-(--c-bg) border border-(--c-divider)"
            >
              <p
                class="text-xs font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
              >
                {{ order.id }}
              </p>
              <p class="text-xs text-(--c-muted) mt-1">
                {{ order.items?.length }} items · ${{ order.total?.toFixed(2) }}
              </p>
              <button
                v-if="status !== 'done'"
                class="mt-2 w-full py-1.5 text-xs font-medium cursor-pointer border-none transition-all bg-(--c-accent) text-(--c-dark)"
                @click="advanceStatus(order.id, status)"
              >
                Move to
                {{
                  orderStatuses[
                    orderStatuses.indexOf(status as OrderStatus) + 1
                  ]
                }}
              </button>
            </div>
            <p
              v-if="orders.length === 0"
              class="text-xs text-center py-4 text-(--c-divider)"
            >
              No orders
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu management -->
    <div v-if="tab === 'menu'" class="max-w-5xl mx-auto px-4 pb-8">
      <button
        class="flex items-center gap-1.5 text-sm font-medium cursor-pointer border-none mb-4 px-4 py-2 bg-(--c-accent) text-(--c-dark)"
        @click="newItem"
      >
        <Plus :size="16" /> Add item
      </button>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="item in menu.items"
          :key="item.id"
          class="bg-(--c-surface) border border-(--c-divider)"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full aspect-video object-cover"
          />
          <div class="p-4">
            <p
              class="font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
            >
              {{ item.name }}
            </p>
            <p class="text-sm mt-1 text-(--c-muted)">
              ${{ item.price.toFixed(2) }}
            </p>
            <div class="flex gap-2 mt-2">
              <button
                class="flex-1 py-1.5 text-xs font-medium cursor-pointer border-none bg-(--c-bg) text-(--c-dark)"
                @click="editItem(item)"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Item form modal -->
    <div
      v-if="showItemForm"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="showItemForm = false"
    >
      <div class="absolute inset-0 bg-black/30" />
      <div
        class="relative w-full max-w-sm p-6 bg-(--c-surface) border border-(--c-divider)"
      >
        <h3
          class="text-lg font-semibold mb-4 font-['Playfair_Display',serif] text-(--c-dark)"
        >
          {{ editingItem ? "Edit" : "Add" }} Item
        </h3>
        <div class="space-y-3">
          <input v-model="form.name" placeholder="Name" class="input-field" />
          <input
            v-model="form.description"
            placeholder="Description"
            class="input-field"
          />
          <input
            v-model="form.price"
            placeholder="Price"
            type="number"
            step="0.01"
            class="input-field"
          />
          <input
            v-model="form.image"
            placeholder="Image URL"
            class="input-field"
          />
          <button
            class="w-full py-2.5 text-sm font-medium cursor-pointer border-none bg-(--c-accent) text-(--c-dark)"
            @click="saveItem"
          >
            {{ editingItem ? "Save" : "Add" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
