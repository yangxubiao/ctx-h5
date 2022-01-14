// 管理员
import { RouteCustom } from '@/types/route';

// eslint-disable-next-line import/prefer-default-export
export const carOwnerRoutes: RouteCustom[] = [
  {
    path: '/car-owner',
    name: 'carOwner',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/index.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/car-drives',
    name: 'carDrives',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/drives.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/car-0il-divide-manage',
    name: 'carOilDivideManage',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/oilDivideManage.vue'),
    meta: {
      title: '车行通',
    },
  },

  {
    path: '/car-divide-oil',
    name: 'carDivideOil',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/divideOil.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/car-driver-gas',
    name: 'carDriverGas',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/gas.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/car-manage-drives',
    name: 'carManageDrives',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/manageDrives.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/car-recharge',
    name: 'carRecharge',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/recharge.vue'),
    meta: {
      title: '车行通',
    },
  },
];
