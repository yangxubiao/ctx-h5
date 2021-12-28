import Ax from '@/utils/axios';
// 获取当前登录人的所有的加油记录
export async function queryCarOwnerGasInfo(pramas: any) {
  const result = await Ax.post('/summary/queryCarOwnerGasInfo', pramas);
  return result;
}

// 查询所有的车队剩余可用升数
export async function findAllSummaryList() {
  const result = await Ax.post('/summary/findAllSummaryList');
  return result;
}
