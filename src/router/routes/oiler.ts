// 加油工
import { RouteCustom } from '@/types/route';

// eslint-disable-next-line import/prefer-default-export
export const oilersRoutes: RouteCustom[] = [
  {
    path: '/oiler',
    name: 'oiler',
    component: () => import(/* webpackChunkName: "oiler" */ '@/views/oiler/index.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/oiler-gas',
    name: 'oilerGas',
    component: () => import(/* webpackChunkName: "oilerGas" */ '@/views/oiler/gas.vue'),
    meta: {
      title: '车行通',
    },
  },
  {
    path: '/oiler-pay-oil-qr',
    name: 'oilerPayOilQr',
    component: () => import(/* webpackChunkName: "payOilQr" */ '@/views/oiler/payOilQr.vue'),
    meta: {
      title: '车行通',
    },
  },

];
