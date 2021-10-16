interface ResponseData<T = any> {
  /**
   * 是否成功
   * @type { boolean }
   */
  success: boolean;

  /**
   * 数据
   */
  result: T;

  /**
   * 消息
   * @type { string }
   */
  errorMsg: string;
  /**
   * 错误码
   * @type { string }
   */
  errorCode?: string;
}
