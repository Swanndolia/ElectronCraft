import { createRouter, createWebHashHistory } from "vue-router";
import * as storage from "../modules/storage";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/sign",
    name: "Sign",
    component: () => import("../views/Sign.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
//redirect to sign if user is not
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!storage.getStorage("username")) {
      next({ name: "Sign" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
