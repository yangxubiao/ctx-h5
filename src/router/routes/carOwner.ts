// 管理员
import { RouteCustom } from '@/types/route';

// eslint-disable-next-line import/prefer-default-export
export const carOwnerRoutes: RouteCustom[] = [
  {
    path: '/car-owner',
    name: 'carOwner',
    component: () => import(/* webpackChunkName: "carOwner" */ '@/views/carOwner/index.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/car-drives',
    name: 'carDrives',
    component: () => import(/* webpackChunkName: "carDirves" */ '@/views/carOwner/drives.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/car-driver-gas',
    name: 'carDriverGas',
    component: () => import(/* webpackChunkName: "carDriverGas" */ '@/views/carOwner/gas.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/car-manage-drives',
    name: 'carManageDrives',
    component: () => import(/* webpackChunkName: "carManageDrives" */ '@/views/carOwner/manageDrives.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/car-recharge',
    name: 'carRecharge',
    component: () => import(/* webpackChunkName: "carRecharge" */ '@/views/carOwner/recharge.vue'),
    meta: {
      title: '',
    },
  },
];
