/*
 * @Author: helei
 * @Date: 2021-09-28 14:48:54
 * @LastEditors: helei
 * @LastEditTime: 2021-09-28 16:00:56
 * @msg: 路由文件
 */

import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      keepAlive: true,
      title: "首页",
    },
    component: () => import("../views/home"),
    // component: (resolve) => require(["../views/home"], resolve),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // to 跳转的路由地址
    // from 离开的路由地址
    // savedPosition 之前页面的滚动位置信息
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  // 更新页面的title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
