<script setup lang="ts">
defineProps({
  status: { type: String, default: "pending" },
});
</script>

<template>
  <span :class="['badge', `badge-${status}`]">
    {{ status }}
  </span>
</template>
