<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import type { MenuItem } from "@/data/mockMenu";
import { X } from "@lucide/vue";

const props = defineProps<{
  item: MenuItem | null;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const imageLoaded = ref(false);

watch(
  () => props.item,
  (val) => {
    document.body.style.overflow = val ? "hidden" : "";
    if (val) {
      imageLoaded.value = false;
    }
  }
);

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="item"
        class="fixed inset-0 z-500 bg-black/55 flex items-center justify-center p-6"
        @click.self="emit('close')"
      >
        <div
          class="bg-(--c-surface) w-full max-w-105 relative overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Item details"
        >
          <button
            class="absolute top-3 right-3 z-1 bg-black/50 text-white border-none cursor-pointer w-8 h-8 flex items-center justify-center transition-colors duration-150 hover:bg-black/70"
            @click="emit('close')"
            aria-label="Close"
          >
            <X :size="20" stroke-width="2" />
          </button>

          <div class="relative aspect-video overflow-hidden">
            <div
              v-if="!imageLoaded"
              class="absolute inset-0 skeleton-pulse"
            ></div>
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover block transition-opacity duration-300"
              :class="imageLoaded ? 'opacity-100' : 'opacity-0'"
              @load="imageLoaded = true"
            />
          </div>

          <div class="p-6">
            <h2
              class="font-['Playfair_Display',serif] font-semibold text-[22px] text-(--c-dark) m-0 mb-1.5"
            >
              {{ item.name }}
            </h2>
            <span
              class="font-['DM_Sans',sans-serif] font-medium text-lg text-(--c-accent) inline-block mb-3"
              >${{ item.price.toFixed(2) }}</span
            >
            <p
              class="font-['DM_Sans',sans-serif] font-normal text-sm text-(--c-muted) leading-[1.6] m-0"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active {
  transition: opacity 250ms ease;
}
.modal-enter-active > div:last-child {
  transition:
    transform 250ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 250ms ease;
}
.modal-leave-active {
  transition: opacity 200ms ease;
}
.modal-leave-active > div:last-child {
  transition:
    transform 200ms ease,
    opacity 200ms ease;
}
.modal-enter-from {
  opacity: 0;
}
.modal-enter-from > div:last-child {
  opacity: 0;
  transform: scale(0.92) translateY(12px);
}
.modal-leave-to {
  opacity: 0;
}
.modal-leave-to > div:last-child {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
</style>
