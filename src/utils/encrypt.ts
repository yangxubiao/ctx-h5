import CryptoJS from 'crypto-js';

/**
 * AES 加密 : 和后端交互用户
 * @param data 需要加密的数据
 * @param key 加密的密钥
 */
export const encryptToJava = (
  data: string,
  key = process.env.VUE_APP_API_CRYPTO_CODE,
) => CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
}).toString();

/**
 *  AES 解密：和后端交互用
 * @param data
 * @param key
 */
export const decryptToJava = (
  data: string,
  key = process.env.VUE_APP_API_CRYPTO_CODE,
) => {
  try {
    return CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  } catch (e) {
    return '';
  }
};

// 加密对象
export const encryptToObj = (obj: object) => {
  try {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [encryptToJava(key), encryptToJava(value)]),
    );
  } catch (e) {
    return {};
  }
};

// 解密对象
export const decryptToObj = (obj: object) => {
  try {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [decryptToJava(key), decryptToJava(value)]),
    );
  } catch (e) {
    return {};
  }
};
