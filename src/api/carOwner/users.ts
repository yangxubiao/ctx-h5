import Ax from '@/utils/axios';

// 获取当前用户下的所有驾驶员
export async function getCurrentUserAllDrivesList() {
  const result = await Ax.post('/users/getCurrentUserAllDrivesList');
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
