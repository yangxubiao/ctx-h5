import Ax from '@/utils/axios';
// 获取当前登录人的所有的加油记录
// eslint-disable-next-line import/prefer-default-export
export async function getCurrentCarOwnerGasRecord(
  pramas: any,
) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas.jsonObject;
  const result = await Ax.post(`/oil/getCurrentCarOwnerGasRecord?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}
