<script setup lang="ts">
import type { MenuCategory } from "@/data/mockMenu";

defineProps<{
  categories: MenuCategory[];
}>();
const model = defineModel<string>();
</script>

<template>
  <div class="category-tabs">
    <button
      class="shrink-0 px-4 py-1.5 text-sm font-medium cursor-pointer border-none transition-all uppercase tracking-wider"
      :class="
        model === 'all'
          ? 'bg-(--c-brown) text-(--c-bg)'
          : 'bg-transparent text-(--c-muted)'
      "
      @click="model = 'all'"
    >
      All
    </button>
    <button
      v-for="cat in categories"
      :key="cat.id"
      class="shrink-0 px-4 py-1.5 text-sm font-medium cursor-pointer border-none transition-all uppercase tracking-wider"
      :class="
        model === cat.id
          ? 'bg-(--c-brown) text-(--c-bg)'
          : 'bg-transparent text-(--c-muted)'
      "
      @click="model = cat.id"
    >
      {{ cat.label }}
    </button>
  </div>
</template>
