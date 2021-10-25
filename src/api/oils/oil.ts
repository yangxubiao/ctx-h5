import Ax from '@/utils/axios';

// 获取当前加油点的总的加油升数
// eslint-disable-next-line import/prefer-default-export
export async function getCurrentGasSiteRecord(
  pramas: any,
) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas.jsonObject;
  const result = await Ax.post(`/oil/getCurrentGasSiteRecord?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}
