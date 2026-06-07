<script setup lang="ts">
import { Minus, Plus } from "@lucide/vue";

const props = defineProps<{
  modelValue: number;
  min?: number;
  max?: number;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", val: number): void;
}>();

function dec() {
  if (props.modelValue > (props.min ?? 1))
    emit("update:modelValue", props.modelValue - 1);
}
function inc() {
  if (props.modelValue < (props.max ?? 99))
    emit("update:modelValue", props.modelValue + 1);
}
</script>

<template>
  <div
    class="inline-flex items-center border border-(--c-divider) bg-transparent"
  >
    <button
      class="flex items-center justify-center cursor-pointer border-none bg-transparent w-8 h-8 text-(--c-bg)"
      :disabled="modelValue <= (min ?? 1)"
      @click="dec"
    >
      <Minus :size="14" stroke-width="2" />
    </button>
    <span
      class="w-8 text-center text-sm select-none font-['DM_Mono',monospace] text-(--c-bg) leading-8"
      >{{ modelValue }}</span
    >
    <button
      class="flex items-center justify-center cursor-pointer border-none bg-transparent w-8 h-8 text-(--c-bg)"
      :disabled="modelValue >= (max ?? 99)"
      @click="inc"
    >
      <Plus :size="14" stroke-width="2" />
    </button>
  </div>
</template>
