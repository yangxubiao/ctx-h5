import Ax from '@/utils/axios';

// 获取当前用户下的所有驾驶员
export async function insertMany(pramas: any) {
  const result = await Ax.post('/oilDivideRecord/insertMany', pramas);
  return result;
}

export async function getOilDivideRecord(pramas: any) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas.jsonObject;
  const result = await Ax.post(`/oilDivideRecord/getOilDivideRecord?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}

