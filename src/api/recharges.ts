import Ax from '@/utils/axios';

// 创建充值记录
export async function createRecharge(
  parmas: any,
) {
  const result = await Ax.post('/recharges/createdRecharge', parmas);
  return result;
}

// 获取所有的充值记录
export async function getAllRechargesList(
  pramas: any,
) {
  const result = await Ax.post('/recharges/findAllRechargesList', pramas);
  return result;
}

// 删除充值记录根据 id
export async function delRechargeItemById(id: string) {
  const result = await Ax.delete(`/recharges/${id}`);
  return result;
}

// 根据 id 获取充值记录
export async function getRechargeById(id: string) {
  const result = await Ax.get(`/recharges/${id}`);
  return result;
}

// 修改用户信息
export async function updateRecharge(parmas: any) {
  const result = await Ax.put('/recharges/updateRecharge', parmas);
  return result;
}

// 获取当前登录人的所有充值记录
export async function getCurrentLoginederRechargesList() {
  const result = await Ax.post('/recharges/getCurrentLoginederRechargesList');
  return result;
}

