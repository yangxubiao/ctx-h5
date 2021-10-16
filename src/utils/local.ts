export function setLocalData(obj: {key: string, value: any}, storage = window.localStorage) {
  const type = Object.prototype.toString.call(obj.value);
  if (type === '[object Function]') {
    throw new Error('浏览器缓存中不允许存入函数');
  }
  storage.setItem(obj.key, JSON.stringify(obj.value));
}

export function getLocalData(name: string, storage = window.localStorage) {
  const val = storage.getItem(name);
  if (!val || val === 'undefined') {
    return null;
  }
  return JSON.parse(val);
}
