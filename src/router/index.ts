import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { Toast } from 'vant';
import { adminRoutes } from '@/router/routes/admin';
import { carOwnerRoutes } from '@/router/routes/carOwner';
import { driversRoutes } from '@/router/routes/driver';
import { oilersRoutes } from '@/router/routes/oiler';
import { getLocalData } from '@/utils/local';

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

router.beforeEach(async (to: any, from: any, next: any) => {
  if (!['login', 'home', 'password'].includes(to.name)) {
    const routerJurisdictionMap: any = {
      管理员: 'admin',
      车队: 'car',
      驾驶员: 'driver',
      加油工: 'oiler',
    };
    const userInfo = getLocalData('userInfo');
    if (!userInfo) {
      Toast('登录失效，请重新登录');
      router.replace({ name: 'login' });
      return;
    }
    if (to.name.indexOf(routerJurisdictionMap[userInfo.roleName]) > -1) {
      next();
      return;
    }
    router.replace({ path: '/' });
    return;
  }
  next();
});

export default router;
