import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("@/views/HomeView.vue") },
  {
    path: "/menu",
    name: "menu",
    component: () => import("@/views/MenuView.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("@/views/CheckoutView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/confirmation",
    name: "confirmation",
    component: () => import("@/views/ConfirmationView.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/OrderHistoryView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/AdminView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else if (to.meta.requiresAdmin && !auth.isAdmin) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
