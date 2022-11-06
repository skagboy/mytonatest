import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Table from "../views/Table.vue";
import Charts from "../views/Charts.vue";
import NotFound from "../views/NotFound.vue";
import { store } from "../store/store";

let routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
    async beforeEnter(from: any, to: any, next: any) {
      await store.getters["auth/isLoginPromise"];
      store.getters["auth/isLogin"] ? next({ name: "main" }) : next();
    },
  },
  {
    name: "main",
    path: "/",
    component: Table,
    meta: { isAuth: true },
  },
  {
    name: "charts",
    path: "/charts",
    component: Charts,
    meta: { isAuth: true },
  },
  {
    path: "/:any(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.isAuth) {
    await store.getters["auth/isLoginPromise"];
    store.getters["auth/isLogin"] ? next() : next({ name: "login" });
  } else {
    next();
  }
});

export default router;
