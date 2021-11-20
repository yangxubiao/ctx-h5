import Ax from '@/utils/axios';

// 获取当前用户下的所有驾驶员
export async function getCurrentUserAllDrivesList(pramas: any) {
  const { perPage = 10, queryPage = 1, ...rest } = pramas;
  const result = await Ax.post(`/users/getCurrentUserAllDrivesList?per_page=${perPage}&query_page=${queryPage}`, rest);
  return result;
}

// 获取所有的车队
export async function getAllCarslist() {
  const result = await Ax.post('/users/getAllCarslist');
  return result;
}

// 获取当前用户
export async function getCurrentUser() {
  const result = await Ax.post('/users/getCurrentUser');
  return result;
}

// 批量更改用户
export async function updateMany(pramas: any) {
  const result = await Ax.post('/users/updateMany', pramas);
  return result;
}
