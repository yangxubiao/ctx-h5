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

// 添加一个加油点结清记录
export async function createOilCleanRecord(
  parmas: any,
) {
  const result = await Ax.post('/oil/createOilCleanRecord', parmas);
  return result;
}

// 修改加油点结清记录
export async function updateOilCleanRecord(
  parmas: any,
) {
  const result = await Ax.put('/oil/updateOilCleanRecord', parmas);
  return result;
}

// 删除加油点结清记录
export async function delOilCleanRecord(
  id: string,
) {
  const result = await Ax.delete(`/oil/delOilCleanRecord/${id}`);
  return result;
}

// 获取加油点结清记录
export async function getAllOilRecordRecords(
  parmas: any,
) {
  const { perPage = 10, queryPage = 1, ...rest } = parmas.jsonObject;
  const result = await Ax.post(`/oil/getAllOilRecordRecords?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}

// 根据 id 获取结清记录
export async function getOilCleanRecordById(id: string) {
  const result = await Ax.get(`/oil/getOilCleanRecordById/${id}`);
  return result;
}

// 根据 id 获取结清记录
export async function getOilRecordById(id: string) {
  const result = await Ax.get(`/oil/getOilRecordById/${id}`);
  return result;
}

// 根据 id 获取结清记录
export async function updataOilRecord(pramas: any) {
  const result = await Ax.put('/oil/updataOilRecord', pramas);
  return result;
}

