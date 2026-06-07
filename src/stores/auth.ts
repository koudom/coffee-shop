import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@roastandrye.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Customer",
    email: "jane@example.com",
    role: "customer",
  },
];

const MOCK_PASSWORDS: Record<string, string> = {
  "admin@roastandrye.com": "admin123",
  "jane@example.com": "password",
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));

  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  async function login(email: string, password: string): Promise<void> {
    const found = MOCK_USERS.find((u) => u.email === email);
    if (!found || MOCK_PASSWORDS[email] !== password) {
      throw new Error("Invalid email or password");
    }
    const mockToken = btoa(
      JSON.stringify({ id: found.id, email: found.email })
    );
    token.value = mockToken;
    user.value = found;
    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(found));
  }

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const exists = MOCK_USERS.find((u) => u.email === email);
    if (exists) throw new Error("Email already registered");
    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      role: "customer",
    };
    MOCK_USERS.push(newUser);
    MOCK_PASSWORDS[email] = password;
    const mockToken = btoa(
      JSON.stringify({ id: newUser.id, email: newUser.email })
    );
    token.value = mockToken;
    user.value = newUser;
    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  async function fetchMe(): Promise<void> {
    if (!token.value) return;
    const stored = localStorage.getItem("user");
    if (stored) {
      user.value = JSON.parse(stored);
    } else {
      logout();
    }
  }

  function logout(): void {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return { user, token, isLoggedIn, isAdmin, login, register, logout, fetchMe };
});
