import Vue, { AsyncComponent } from 'vue';

export { RouteConfig } from 'vue-router/types';

export interface RouteCustom {
  /**
   * 路径
   * @type {string}
   */
  path: string
  /**
   * 重定向
   * @type {string | object}
   */
  redirect?: string | object
  /**
   * route name
   * @type {string}
   */
  name?: string
  /**
   * route 别名
   * @type {string | string[]}
   */
  alias?: string | string[]
  /**
   * 页面对应的组件
   * @type {AsyncComponent}
   */
  component: AsyncComponent
  /**
   * 附加信息
   * @type {object}
   */
  meta: {
    /**
     * 页面标题
     * @type {string}
     */
    title: string
    /**
     * 是否展示在底部tab中
     * @type {boolean}
     */
    tab?: boolean
    /**
     * 在底部tab中的位置
     * @type {number}
     */
    tabIndex?: number
    /**
     * 登陆控制
     */
    ignoreLogin?: boolean
    /*
     * 返回埋点
    */
    trace?: {
      routeBackInfo?: {
        [k: string]: string | number | boolean
      },
      pageStayInfo?: {
        [k: string]: string
      }
    }
  }
  /**
   * 子路由
   */
  children?: RouteCustom[]
}
