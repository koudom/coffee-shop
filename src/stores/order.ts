import { defineStore } from "pinia";
import { ref } from "vue";
import type { CartItem } from "@/stores/cart";

export type OrderStatus = "pending" | "making" | "ready" | "done";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  name: string;
  phone: string;
  address: string;
  pickupTime: string;
  status: OrderStatus;
  createdAt: string;
}

export const useOrderStore = defineStore("order", () => {
  const orders = ref<Order[]>(
    JSON.parse(sessionStorage.getItem("orders") ?? "[]")
  );

  function addOrder(order: Order): void {
    orders.value.unshift(order);
    sessionStorage.setItem("orders", JSON.stringify(orders.value));
  }

  function updateStatus(orderId: string, status: OrderStatus): void {
    const order = orders.value.find((o) => o.id === orderId);
    if (order) order.status = status;
    sessionStorage.setItem("orders", JSON.stringify(orders.value));
  }

  return { orders, addOrder, updateStatus };
});
