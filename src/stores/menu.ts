import { defineStore } from "pinia";
import { ref } from "vue";
import {
  categories as categoryData,
  menuItems as itemData,
  type MenuCategory,
  type MenuItem,
} from "@/data/mockMenu";

export const useMenuStore = defineStore("menu", () => {
  const categories = ref<MenuCategory[]>([]);
  const items = ref<MenuItem[]>([]);
  const loading = ref(false);

  async function fetchMenu(): Promise<void> {
    loading.value = true;
    await new Promise((r) => setTimeout(r, 600));
    categories.value = categoryData;
    items.value = itemData;
    loading.value = false;
  }

  return { categories, items, loading, fetchMenu };
});
