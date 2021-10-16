import Ax from '@/utils/axios';
// 获取当前登录人的所有的加油记录
// eslint-disable-next-line import/prefer-default-export
export async function getCurrentCarOwnerGasRecord() {
  const result = await Ax.get('/oil/getCurrentCarOwnerGasRecord');
  return result;
}
