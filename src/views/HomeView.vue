<script setup lang="ts">
import { useMenuStore } from "@/stores/menu";
import { computed, ref } from "vue";

const menu = useMenuStore();
menu.fetchMenu();

const featured = computed(() => menu.items.slice(0, 3));
const loadedImages = ref<Set<number>>(new Set());

function onImageLoad(id: number) {
  loadedImages.value.add(id);
}
</script>

<template>
  <div class="min-h-screen pt-16">
    <div class="max-w-300 mx-auto px-12 max-md:px-4 py-8">
      <div class="text-center mb-12 pt-12">
        <h1
          class="text-5xl font-bold mb-2 font-['Playfair_Display',serif] text-(--c-dark)"
        >
          Coffee UC
        </h1>
        <p class="text-base text-(--c-muted) mb-8">
          Specialty coffee, crafted daily. new flever!
        </p>
        <RouterLink to="/menu" class="btn-primary no-underline inline-block">
          View Menu
        </RouterLink>
      </div>

      <div v-if="featured.length" class="max-w-3xl mx-auto">
        <h2
          class="text-xl font-semibold mb-4 font-['Playfair_Display',serif] text-(--c-dark)"
        >
          Featured
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="item in featured"
            :key="item.id"
            class="bg-(--c-surface) border border-(--c-divider)"
          >
            <div class="relative aspect-video overflow-hidden">
              <div
                v-if="!loadedImages.has(item.id)"
                class="absolute inset-0 skeleton-pulse"
              ></div>
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover transition-opacity duration-300"
                :class="loadedImages.has(item.id) ? 'opacity-100' : 'opacity-0'"
                @load="onImageLoad(item.id)"
              />
            </div>
            <div class="p-4">
              <p
                class="font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
              >
                {{ item.name }}
              </p>
              <p class="text-sm mt-1 text-(--c-muted)">
                ${{ item.price.toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
