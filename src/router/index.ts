import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { adminRoutes } from '@/router/routes/admin';
import { carOwnerRoutes } from '@/router/routes/carOwner';
import { driversRoutes } from '@/router/routes/driver';
import { oilersRoutes } from '@/router/routes/oiler';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue'),
  },
  {
    path: '/password',
    name: 'password',
    component: () => import(/* webpackChunkName: "password" */ '@/views/password.vue'),
  },
  ...adminRoutes, // 管理员
  ...carOwnerRoutes, // 车老板
  ...driversRoutes, // 驾驶员
  ...oilersRoutes, // 加油工
];

const router = new VueRouter({
  routes,
});

export default router;
