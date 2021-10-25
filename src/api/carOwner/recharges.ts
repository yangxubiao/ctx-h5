import Ax from '@/utils/axios';

// 获取所有的充值记录
// eslint-disable-next-line import/prefer-default-export
export async function getCurrentUserRechargesList(
  pramas: any,
) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas.jsonObject;
  const result = await Ax.post(`/recharges/getCurrentUserRechargesList?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}
