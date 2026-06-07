<script setup lang="ts">
import { ref } from "vue";
import type { MenuItem } from "@/data/mockMenu";
import { Plus } from "@lucide/vue";

const props = defineProps<{
  item: MenuItem;
}>();
const emit = defineEmits<{
  (e: "add", item: MenuItem): void;
  (e: "showDetail", item: MenuItem): void;
}>();

const imageLoaded = ref(false);
</script>

<template>
  <div
    class="group flex flex-col overflow-hidden transition-all duration-200 cursor-pointer bg-(--c-surface) border border-(--c-divider) hover:-translate-y-0.5 hover:shadow-(--shadow-card)"
    @dblclick="emit('showDetail', item)"
  >
    <div class="relative aspect-video overflow-hidden">
      <div v-if="!imageLoaded" class="absolute inset-0 skeleton-pulse"></div>
      <img
        :src="item.image"
        :alt="item.name"
        class="w-full h-full object-cover transition-opacity duration-300"
        :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
        @load="imageLoaded = true"
      />
    </div>
    <div class="flex flex-col flex-1 p-4">
      <div class="flex-1">
        <h3
          class="font-['Playfair_Display',serif] font-semibold text-lg text-(--c-dark) m-0 mb-1"
        >
          {{ item.name }}
        </h3>
        <p
          class="line-clamp-2 font-['DM_Sans',sans-serif] font-normal text-[13px] text-(--c-muted) leading-[1.4] m-0 mb-2"
        >
          {{ item.description }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <span
          class="font-['DM_Sans',sans-serif] font-medium text-base text-(--c-accent)"
          >${{ item.price.toFixed(2) }}</span
        >
        <button
          class="bg-(--c-brown) text-(--c-bg) border-none cursor-pointer px-4 py-2 font-['DM_Sans',sans-serif] font-medium text-[13px] flex items-center gap-1 transition-[background] duration-180 h-9 hover:bg-(--c-brown-mid)"
          @click="emit('add', item)"
        >
          <Plus :size="14" stroke-width="2.5" />
          Add
        </button>
      </div>
    </div>
  </div>
</template>
