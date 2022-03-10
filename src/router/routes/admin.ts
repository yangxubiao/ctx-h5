// 管理员
import { RouteCustom } from '@/types/route';

// eslint-disable-next-line import/prefer-default-export
export const adminRoutes: RouteCustom[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/index.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-car-owners',
    name: 'adminCarOwners',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminCarOwners.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-add-car-owner',
    name: 'adminAddCarOwner',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminAddCarOwner.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-oil-quantity-monitor',
    name: 'adminOilQuantityMonitor',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminOilQuantityMonitor.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-oil',
    name: 'adminOil',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminOil.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-recharge',
    name: 'adminRecharge',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminRecharge.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-manage-recharge',
    name: 'adminManageRecharge',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminManageRecharge.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-oil-clean',
    name: 'adminOilClean',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/oilClean.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-oil-clean-manage',
    name: 'adminOilCleanManage',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/oilCleanManage.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-add-oil',
    name: 'adminAddOil',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminAddOil.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-gas',
    name: 'adminGas',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/gas.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-gas-manage',
    name: 'adminGasManage',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminGasManage.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-users',
    name: 'adminUsers',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminUsers.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/admin-manage-users',
    name: 'adminManageUsers',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/adminManageUsers.vue'),
    meta: {
      title: '车行通',
    },
  },
];
