<script setup lang="ts">
import AppNav from "@/components/shared/AppNav.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const auth = useAuthStore();
const hideNav =
  route.path === "/admin" ||
  route.path === "/login" ||
  route.path === "/register";

if (auth.token) {
  auth.fetchMe();
}
</script>

<template>
  <AppNav v-if="!hideNav" />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
