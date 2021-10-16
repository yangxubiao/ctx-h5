import axios, { Axios } from 'axios';
import { Toast } from 'vant';
import { encryptToObj, decryptToJava } from '@/utils/encrypt';
import { getLocalData } from '@/utils/local';
import Router from '@/router/index';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER, // api 的 base_url
  timeout: process.env.VUE_APP_API_TIMEOUT, // 请求超时时间
});
// request拦截器
service.interceptors.request.use(
  (config: any) => {
    const token = getLocalData('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.url.indexOf('upload') > -1) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    if (config?.data?.isEncrypt) {
      config.data.jsonObject = encryptToObj(config.data.jsonObject);
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  },
);

// respone拦截器
service.interceptors.response.use(
  (response: any) => {
    /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
    if (response.status !== 204) {
      response.data = JSON.parse(decryptToJava(response.data));
      if (!response?.data?.success) {
        Toast(response?.data?.errorMas || '请稍后重试');
        return Promise.reject();
      }
      console.log(response.data.result, 'result');
      return response.data.result;
    }
    return response;
  },

  error => {
    console.log(error?.response, 'error?.response?.status');

    if (error?.response?.status === 401) {
      Toast(error?.response?.data?.message || '用户名或密码不正确');
    }

    if (error?.response?.status === 403) {
      Toast('登录失效，请重新登录');
      Router.replace({ name: 'login' });
    }

    if (error?.response?.status === 404) {
      Toast('请求资源不存在');
    }

    if (error?.response?.status === 405) {
      Toast('没找到对应的请求方法');
    }

    if (error?.response?.status === 409) {
      Toast('用户已经存在, 请重新输入姓名');
    }

    if (error?.response?.status === 422) {
      Toast('参数校验不通过');
    }

    if (error?.response?.status === 500) {
      Toast('服务器出错');
    }

    return Promise.reject(error);
  },
);

export default service;
