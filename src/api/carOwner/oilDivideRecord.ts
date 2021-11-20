import Ax from '@/utils/axios';

// 获取当前用户下的所有驾驶员
// eslint-disable-next-line import/prefer-default-export
export async function insertMany(pramas: any) {
  const result = await Ax.post('/oilDivideRecord/insertMany', pramas);
  return result;
}
