import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  showSpinner: false,
});
import Login from "../views/Login";
import home from "./home";
import user from "./user";

import { useUserStore } from "@/store/user";

export const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: {
      hide: true,
      title: "登录",
    },
  },
  {
    path: "/",
    redirect: "/login",
    meta: {
      hide: true,
    },
  },
  home,
  user,
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/views/Result/404.vue"),
    meta: {
      hide: true,
      title: "404",
    },
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
    meta: {
      hide: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const user = useUserStore();
  const token = user.token;
  NProgress.start();
  if (to.name !== "Login" && !token) {
    next({ name: "Login" });
  } else if (to.name === "Login" && token) {
    next({ name: "Home" });
  } else {
    next();
  }
  NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});

router.onError((err) => {
  console.log("router error", err);
});

export default router;
