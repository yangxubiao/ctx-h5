import Ax from '@/utils/axios';

// 创建加油点
export async function createOilSite(
  parmas: any,
) {
  const result = await Ax.post('/gases/createOilSite', parmas);
  return result;
}

// 获取所有的加油点
export async function getAllOilSitesList() {
  const result = await Ax.get('/gases/findAllOilSitesList');
  return result;
}

// 删除指定加油点根据 id
export async function delOilItemById(id: string) {
  const result = await Ax.delete(`/gases/${id}`);
  return result;
}

// 获取所有的加油记录
export async function getAllGasRecords(pramas: any) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas.jsonObject;
  const result = await Ax.post(`/oil/getAllGasRecords?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}

