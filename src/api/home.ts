import Ax from '@/utils/axios';
// 福利配置数据
export async function getTest(
  params: any,
) {
  const { data } = await Ax.get('/get', params);
  return data;
}

// 福利配置数据
export async function uploadFile(
  params: any,
) {
  const result = await Ax.post('/upload', params);
  return result;
}
