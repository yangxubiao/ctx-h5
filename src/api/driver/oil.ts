import Ax from '@/utils/axios';

// 创建加油点
export async function createOilRecord(
  parmas: any,
) {
  const result = await Ax.post('/oil/createOilRecord', parmas);
  return result;
}

// 获取所有的加油点
export async function getAllOilSitesList() {
  const result = await Ax.get('/gases/findAllOilSitesList');
  return result;
}

// 获取当前登录人的所有的加油记录
export async function getCurrentLoginGasRecord(
  pramas: any,
) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas.jsonObject;
  const result = await Ax.post(`/oil/getCurrentLoginGasRecord?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}
