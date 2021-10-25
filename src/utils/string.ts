// 字符转数字
// eslint-disable-next-line import/prefer-default-export
export function stringToNumber(str: string): number {
  return Number.isNaN(Number(str)) ? 0 : Number(str);
}
