import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);
const rejectAuthUser = (to, from, next) => {
  if (store.isLogin === true) {
    //이미로그인된 유저는 막아야함
    alert("로그인 상태입니다.");
    next("/");
  } else {
    next();
  }
};
const onlyAuthUser = (to, from, next) => {
  if (store.isLogin === false) {
    //아직 로그인 안함
    alert("로그인이 필요합니다.");
    next("/");
  } else {
    next();
  }
};
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: rejectAuthUser,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/mypage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
