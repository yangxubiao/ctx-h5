import Ax from '@/utils/axios';
// 获取当前登录人的所有的加油记录
export async function getCurrentCarOwnerGasRecord(
  pramas: any,
) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas.jsonObject;
  const result = await Ax.post(`/oil/getCurrentCarOwnerGasRecord?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}

export async function divideOil(
  pramas: any,
) {
  const result = await Ax.post('/oil/divideOil', pramas);
  return result;
}
