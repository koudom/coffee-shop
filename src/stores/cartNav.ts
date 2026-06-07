import { ref } from "vue";

export const cartSidebarOpen = ref(false);

export function toggleCartSidebar() {
  cartSidebarOpen.value = !cartSidebarOpen.value;
}
