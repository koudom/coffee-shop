<script setup lang="ts">
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  error: String,
  type: { type: String, default: "text" },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label
      v-if="label"
      class="block text-sm font-medium mb-1.5"
      style="color: var(--c-text-primary)"
      >{{ label }}</label
    >
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="input-field"
      :style="error ? { borderColor: 'var(--c-error)' } : {}"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      v-bind="$attrs"
    />
    <p v-if="error" class="text-xs mt-1" style="color: var(--c-error)">
      {{ error }}
    </p>
  </div>
</template>
