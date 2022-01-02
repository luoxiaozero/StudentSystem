import { createRouter, createWebHistory } from "vue-router";
import EntryGradeVue from "../pages/EntryGrade.vue";
import LoginVue from "../pages/Login.vue";
import ResultPageVue from "../pages/ResultPage.vue";
import SpaceVue from "../pages/space/Space.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    component: LoginVue,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/login",
    component: LoginVue,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/space",
    component: SpaceVue,
    meta: {
      title: "空间",
      isLogin: true,
    },
  },
  {
    path: "/course/:cid/grade/entry",
    component: EntryGradeVue,
    meta: {
      title: "录入成绩",
      isLogin: true,
    },
  },
  {
    path: "/500",
    component: ResultPageVue,
    name: "500",
    meta: {
      title: "服务器错误",
    },
  },
  {
    path: "/:catchAll(.*)",
    component: ResultPageVue,
    meta: {
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory('/StudentSystem/'), // 静态页面配置
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  if (to.meta.isLogin && !store.userToken) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else if (to.meta.roles) {
    if ((to.meta.roles as string[]).includes(store.userType)) {
      next();
    } else {
      next({
        path: from.fullPath,
      });
    }
  } else {
    next();
  }
});
export default router;
