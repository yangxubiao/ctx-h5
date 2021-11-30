// 驾驶员
import { RouteCustom } from '@/types/route';

// eslint-disable-next-line import/prefer-default-export
export const driversRoutes: RouteCustom[] = [
  {
    path: '/driver',
    name: 'driver',
    component: () => import(/* webpackChunkName: "driver" */ '@/views/driver/index.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/driver-gas',
    name: 'driverGas',
    component: () => import(/* webpackChunkName: "driverGas" */ '@/views/driver/gas.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/driver-gas-info',
    name: 'driverGasInfo',
    component: () => import(/* webpackChunkName: "gasInfo" */ '@/views/driver/gasInfo.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/driver-gas-manage',
    name: 'driverGasManage',
    component: () => import(/* webpackChunkName: "driverGasManage" */ '@/views/driver/gasManage.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/driver-gas-result',
    name: 'driverGasResult',
    component: () => import(/* webpackChunkName: "driverGasResult" */ '@/views/driver/gasResult.vue'),
    meta: {
      title: '车行通',
    },
  },
];
