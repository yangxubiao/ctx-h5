import Ax from '@/utils/axios';

// 创建用户
export async function createUser(
  parmas: any,
) {
  const result = await Ax.post('/users/createUser', parmas);
  return result;
}

// 获取所有的车队
export async function getAllUserList() {
  const result = await Ax.get('/users/findAllUsersList');
  return result;
}

// 删除指定用户根据 id
export async function delUserItemById(id: string) {
  const result = await Ax.delete(`/users/${id}`);
  return result;
}

// 登录
export async function login(parmas: any) {
  const result = await Ax.post('/users/login', parmas);
  return result;
}

// 修改密码
export async function updataPassword(parmas: any) {
  const result = await Ax.put('/users/updataPassword', parmas);
  return result;
}

// 获取用户根据 id
export async function getUserById(id: string) {
  const result = await Ax.get(`/users/${id}`);
  return result;
}

// 修改用户信息
export async function updateUser(parmas: any) {
  const result = await Ax.put('/users/updateUser', parmas);
  return result;
}

// 获取所有的车队
export async function getAllCarslist() {
  const result = await Ax.post('/users/getAllCarslist');
  return result;
}
