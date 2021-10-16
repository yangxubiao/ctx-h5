import Ax from '@/utils/axios';

// 获取所有的充值记录
// eslint-disable-next-line import/prefer-default-export
export async function getCurrentUserRechargesList(
  pramas: any,
) {
  const result = await Ax.post('/recharges/getCurrentUserRechargesList', pramas);
  return result;
}
