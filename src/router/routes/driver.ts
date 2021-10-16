// 驾驶员
import { RouteCustom } from '@/types/route';

// eslint-disable-next-line import/prefer-default-export
export const driversRoutes: RouteCustom[] = [
  {
    path: '/driver',
    name: 'driver',
    component: () => import(/* webpackChunkName: "driver" */ '@/views/driver/index.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/driver-gas',
    name: 'driverGas',
    component: () => import(/* webpackChunkName: "driverGas" */ '@/views/driver/gas.vue'),
    meta: {
      title: '',
    },
  },
  {
    path: '/driver-gas-manage',
    name: 'driverGasManage',
    component: () => import(/* webpackChunkName: "driverGasManage" */ '@/views/driver/gasManage.vue'),
    meta: {
      title: '',
    },
  },
];
