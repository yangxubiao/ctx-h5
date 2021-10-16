import Ax from '@/utils/axios';

// 获取当前加油点的总的加油升数
// eslint-disable-next-line import/prefer-default-export
export async function getCurrentGasSiteRecord(
) {
  const result = await Ax.get('/oil/getCurrentGasSiteRecord');
  return result;
}
