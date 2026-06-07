import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>(
    JSON.parse(sessionStorage.getItem("cart") ?? "[]")
  );

  const itemCount = computed(() => items.value.reduce((s, i) => s + i.qty, 0));
  const subtotal = computed(() =>
    items.value.reduce((s, i) => s + i.price * i.qty, 0)
  );
  const tax = computed(() => subtotal.value * 0.1);
  const total = computed(() => subtotal.value + tax.value);

  function addItem(item: CartItem): void {
    const existing = items.value.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += item.qty;
    } else {
      items.value.push({ ...item });
    }
    persist();
  }

  function removeItem(index: number): void {
    items.value.splice(index, 1);
    persist();
  }

  function updateQty(index: number, qty: number): void {
    if (qty < 1) return removeItem(index);
    items.value[index].qty = qty;
    persist();
  }

  function clear(): void {
    items.value = [];
    sessionStorage.removeItem("cart");
  }

  function persist(): void {
    sessionStorage.setItem("cart", JSON.stringify(items.value));
  }

  return {
    items,
    itemCount,
    subtotal,
    tax,
    total,
    addItem,
    removeItem,
    updateQty,
    clear,
  };
});
