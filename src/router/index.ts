import { createRouter, createWebHistory } from "vue-router";
import EntryGradeVue from "../pages/EntryGrade.vue";
import LoginVue from "../pages/Login.vue";
import ResultPageVue from "../pages/ResultPage.vue";
import SpaceVue from "../pages/space/Space.vue";

const routes = [
  { path: "/", component: LoginVue },
  { path: "/login", component: LoginVue },
  { path: "/space", component: SpaceVue },
  { path: "/course/:cid/grade/entry", component: EntryGradeVue },
  { path: "/:catchAll(.*)", component: ResultPageVue },
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory('/StudentSystem/'), // 静态页面配置
  routes,
});

export default router;
