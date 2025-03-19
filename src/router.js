import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "./pages/UserProfile.vue";
import HomePage from "./pages/HomePage.vue";
import CreateProfile from "./pages/CreateProfile.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/user/:username",
    name: "user",
    component: UserProfile,
  },
  {
    path: "/register",
    name: "register",
    component: CreateProfile,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
