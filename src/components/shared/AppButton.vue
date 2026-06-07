<script setup lang="ts">
const props = defineProps({
  variant: { type: String, default: "primary" },
  loading: Boolean,
  full: Boolean,
});
</script>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' ? 'btn-primary' : '',
      variant === 'secondary'
        ? 'border-2 font-semibold border-(--c-accent) text-(--c-accent) bg-transparent !rounded-none'
        : '',
      variant === 'ghost'
        ? 'bg-transparent font-medium text-(--c-muted) !rounded-none'
        : '',
      full ? 'w-full' : '',
    ]"
    :disabled="loading"
    v-bind="$attrs"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <slot />
  </button>
</template>
