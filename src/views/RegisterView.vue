<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppInput from "@/components/shared/AppInput.vue";
import { Coffee } from "@lucide/vue";

const auth = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleRegister() {
  error.value = "";
  loading.value = true;
  try {
    await auth.register(name.value, email.value, password.value);
    router.push("/menu");
  } catch (e: unknown) {
    error.value = (e as Error).message;
  }
  loading.value = false;
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-sm w-full">
      <div class="text-center mb-8">
        <Coffee
          :size="32"
          stroke-width="1.75"
          class="mx-auto mb-2 text-(--c-accent)"
        />
        <h1
          class="text-xl font-semibold font-['Playfair_Display',serif] text-(--c-dark)"
        >
          Create Account
        </h1>
      </div>
      <form class="space-y-4" @submit.prevent="handleRegister">
        <AppInput v-model="name" label="Name" placeholder="Your name" />
        <AppInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <AppInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <p v-if="error" class="text-xs text-(--c-error)">{{ error }}</p>
        <button class="btn-primary w-full" :disabled="loading" type="submit">
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
          Create Account
        </button>
      </form>
      <p class="text-center text-sm mt-6 text-(--c-muted)">
        Already have an account?
        <RouterLink to="/login" class="text-(--c-accent) font-medium"
          >Sign in</RouterLink
        >
      </p>
    </div>
  </div>
</template>
