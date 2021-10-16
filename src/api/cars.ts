import Ax from '@/utils/axios';

// 创建车队
export async function createCarOwner(
  parmas: any,
) {
  const result = await Ax.post('/cars/create', parmas);
  return result;
}

// 获取所有的车队
export async function getAllCarsList() {
  const result = await Ax.get('/cars/findAllCarsList');
  return result;
}

// 删除指定车队根据 id
export async function delCarItemById(id: string) {
  const result = await Ax.delete(`/cars/${id}`);
  return result;
}
