// 管理员
import { RouteCustom } from '@/types/route';

// eslint-disable-next-line import/prefer-default-export
export const adminRoutes: RouteCustom[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "adminIndex" */ '@/views/admin/index.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-car-owners',
    name: 'adminCarOwners',
    component: () => import(/* webpackChunkName: "adminCarOwners" */ '@/views/admin/adminCarOwners.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-add-car-owner',
    name: 'adminAddCarOwner',
    component: () => import(/* webpackChunkName: "adminAddCarOwner" */ '@/views/admin/adminAddCarOwner.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-oil',
    name: 'adminOil',
    component: () => import(/* webpackChunkName: "adminOil" */ '@/views/admin/adminOil.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-recharge',
    name: 'adminRecharge',
    component: () => import(/* webpackChunkName: "adminRecharge" */ '@/views/admin/adminRecharge.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-manage-recharge',
    name: 'adminManageRecharge',
    component: () => import(/* webpackChunkName: "adminManageRecharge" */ '@/views/admin/adminManageRecharge.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/oil-clean',
    name: 'oilClean',
    component: () => import(/* webpackChunkName: "oilClean" */ '@/views/admin/oilClean.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/oil-clean-manage',
    name: 'oilCleanManage',
    component: () => import(/* webpackChunkName: "oilCleanManage" */ '@/views/admin/oilCleanManage.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-add-oil',
    name: 'adminAddOil',
    component: () => import(/* webpackChunkName: "adminAddOil" */ '@/views/admin/adminAddOil.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-gas',
    name: 'adminGas',
    component: () => import(/* webpackChunkName: "adminGas" */ '@/views/admin/gas.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-users',
    name: 'adminUsers',
    component: () => import(/* webpackChunkName: "adminUsers" */ '@/views/admin/adminUsers.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/admin-manage-users',
    name: 'adminManageUsers',
    component: () => import(/* webpackChunkName: "adminManageUsers" */ '@/views/admin/adminManageUsers.vue'),
    meta: {
      title: '',
    },
  },
];
