import { createWebHistory, createRouter, type RouterOptions } from "vue-router";

import App from "./App.vue";
import Login from "./views/Login.vue";

const routes: RouterOptions["routes"] = [
  { path: "/", component: App },
  { path: "/login", component: Login },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
