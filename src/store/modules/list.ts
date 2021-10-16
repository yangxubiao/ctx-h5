// /* eslint-disable eqeqeq */
// import {
//   ActionTree, MutationTree, GetterTree, Module,
// } from 'vuex';
// import { Toast } from 'vant';
// import { CreditCardPlublicParamsClass } from '@/classes/creditWIthdraw';
// import {
//   queryWholCreditCardt, queryRankList,
// } from '@/api/creditCardRank';
// import { isArrayNotEmpty, isObjectNotEmpty } from '@/utils/isEmpty';
// import { randomString } from '@/utils/func';
// import { getLocalData } from '@/utils/local';

// function getLocationInfo() {
//   const creditCardLocation = getLocalData('creditCardLocation');
//   return {
//     provinceCode: creditCardLocation.parentCode,
//     cityCode: creditCardLocation.code,
//   };
// }

// // 追加提额记录数据
// export const SET_CREDIT_CARD_RANK_DATA = 'SET_CREDIT_CARD_RANK_DATA';
// // 重置信用卡排行榜数据
// export const RESET_CREDIT_CARD_RANK_DATA = 'RESET_CREDIT_CARD_RANK_DATA';
// // creditCardRanklist 组件 loading 状态
// export const UPDATE_CREDIT_CARD_RANK_LIST_LOADING = 'UPDATE_CREDIT_CARD_RANK_LIST_LOADING';
// // creditCardRanklist 组件完成状态
// export const UPDATE_CREDIT_CARD_RANK_LIST_FINISHED = 'UPDATE_CREDIT_CARD_RANK_LIST_FINISHED';
// // creditCardRanklist 组件下拉状态
// export const UPDATE_CREDIT_CARD_RANK_LIST_REFRESHING = 'UPDATE_CREDIT_CARD_RANK_LIST_REFRESHING';
// // 重置 creditCardRanklist 组件配置项
// export const RESET_CREDIT_CARD_RANK_LIST_CONFIG = 'RESET_CREDIT_CARD_RANK_LIST_CONFIG';
// // 设置报错信息
// export const SET_CREDIT_CARD_RANK_ERROR_DATA = 'SET_CREDIT_CARD_RANK_ERROR_DATA';
// // 设置 activityCode
// export const SET_ACTIVITY_CODE = 'SET_ACTIVITY_CODE';
// // 设置信用卡全部数据
// export const SET_WHOLE_CREDIT_CARD_DATA = 'SET_WHOLE_CREDIT_CARD_DATA';

// const activityCode: string = randomString(6);

// const getDefaultState = (): Store.CreditCardRankState => ({
//   creditCardRankListConfig: {
//     // 是否加完成
//     creditCardRankListFinished: false,
//     // 列表 loading
//     creditCardRankListLoading: false,
//     // 下拉变量
//     creditCardRankListRefreshing: false,
//     // 报错状态
//     creditCardRankListError: false,
//     //  报错信息
//     creditCardRankListErrorText: '系统繁忙, 请稍后重试！！！',
//   },
//   // 当前点击的类型卡标识
//   activityCode: randomString(6),
//   // 全部的信用卡数据
//   wholeCreditCardData: [],
//   // 列表数据
//   creditCardRankList: [],
// });

// const mutations: MutationTree<Store.CreditCardRankState> = {
//   // 修改 loading 状态
//   [UPDATE_CREDIT_CARD_RANK_LIST_LOADING](state, data) {
//     state.creditCardRankListConfig.creditCardRankListLoading = data;
//   },
//   // 修改下拉状态
//   [UPDATE_CREDIT_CARD_RANK_LIST_REFRESHING](state, data) {
//     if (data) {
//       state.creditCardRankList = [];
//     }
//     state.creditCardRankListConfig.creditCardRankListRefreshing = data;
//   },
//   // 修改完成状态
//   [UPDATE_CREDIT_CARD_RANK_LIST_FINISHED](state, data) {
//     state.creditCardRankListConfig.creditCardRankListFinished = data;
//   },
//   // 追加信用卡排行榜数据
//   [SET_CREDIT_CARD_RANK_DATA](state, data) {
//     state.creditCardRankList = state.creditCardRankList.concat(data);
//   },
//   // 重置信用卡排行榜数据
//   [RESET_CREDIT_CARD_RANK_DATA](state, data) {
//     state.creditCardRankList = data;
//   },
//   // 重置 creditCardRanklist 组件配置项
//   [RESET_CREDIT_CARD_RANK_LIST_CONFIG](state, data) {
//     state.creditCardRankListConfig = {
//       ...state.creditCardRankListConfig,
//       ...data,
//     };
//   },
//   // 设置 activityCode
//   [SET_ACTIVITY_CODE](state, data) {
//     // 设置 activityCode
//     state.activityCode = data;
//     // 根据 activityCode 进行过滤
//     const targetArr = state.wholeCreditCardData.filter(
//       elem => elem.activityCode === data,
//     );
//     // 判断是否为空数组, 不为空设置排行榜数据, 反之设置默认值
//     if (isArrayNotEmpty(targetArr)) {
//       state.creditCardRankList = (targetArr[0].list as []);
//     } else if (targetArr) {
//       state.activityCode = state.wholeCreditCardData[0].activityCode;
//       state.creditCardRankList = (state.wholeCreditCardData[0].list as []);
//     }
//   },
//   // 设置信用卡全部数据
//   [SET_WHOLE_CREDIT_CARD_DATA](state, data) {
//     state.wholeCreditCardData = data;
//   },
//   // 设置报错信息
//   [SET_CREDIT_CARD_RANK_ERROR_DATA](state, data: {
//     creditCardRankSuccess: boolean;
//     creditCardRankListErrorText: string;
//   }) {
//     state.creditCardRankListConfig.creditCardRankListError = data.creditCardRankSuccess;
//     state.creditCardRankListConfig.creditCardRankListErrorText = data.creditCardRankListErrorText;
//   },
// };
// const actions: ActionTree<Store.CreditCardRankState, Store.RootModules> = {
//   // 获取排行榜记录
//   async getRankList({ commit }, params: { offset?: number, limit?: number, activityCode?: string}) {
//     const {
//       success: creditCardRankSuccess,
//       result: creditCardRankResult,
//       errorMsg: creditCardRankRrrorMsg,
//     } = await queryRankList<Store.CreditCardRankResponse>(
//       new CreditCardPlublicParamsClass(
//         {
//           noEncrypt: true,
//           code: 'bcCreditCardConfigQueryHandler',
//           jsonObject: {
//             ...params,
//             ...getLocationInfo(),
//           },
//         },
//       ),
//     );
//     if (!creditCardRankSuccess) {
//       // 设置报错信息
//       commit(SET_CREDIT_CARD_RANK_ERROR_DATA, {
//         creditCardRankListErrorText: creditCardRankRrrorMsg,
//         creditCardRankSuccess: !creditCardRankSuccess,
//       });
//       Toast(creditCardRankRrrorMsg);
//       return;
//     }
//     // 安全校验
//     creditCardRankResult.list = isArrayNotEmpty(creditCardRankResult.list) ? creditCardRankResult.list : [];
//     // 重置 creditCardRanklist 组件配置项
//     commit(RESET_CREDIT_CARD_RANK_LIST_CONFIG, {
//       creditCardRankListLoading: false,
//       creditCardRankListRefreshing: false,
//       creditCardRankListFinished: false,
//       creditCardRankListError: false,
//       creditCardRankListErrorText: '',
//     });
//     // 判断是否加载完数据
//     if (
//       isObjectNotEmpty(params)
//       && (params.limit as number) > creditCardRankResult.list.length
//     ) {
//       // 设置已经完成加载状态
//       commit(UPDATE_CREDIT_CARD_RANK_LIST_FINISHED, true);
//     }
//     //  判断是否有 activityCode 字段， 如果有，设置完成加载状态
//     if (params.activityCode) {
//       commit(UPDATE_CREDIT_CARD_RANK_LIST_FINISHED, true);
//       commit(RESET_CREDIT_CARD_RANK_DATA, []);
//     }
//     // 如果是首次加载
//     if (params && params.limit === 0) {
//       // 重置排行榜数据
//       commit(RESET_CREDIT_CARD_RANK_DATA, creditCardRankResult.list);
//       return;
//     }
//     // 追加排行榜记录数据
//     commit(SET_CREDIT_CARD_RANK_DATA, creditCardRankResult.list);
//   },
//   // 获取全部信用卡
//   async getWholCreditCards({ commit, rootState }) {
//     // 先清空信用卡数据
//     commit(RESET_CREDIT_CARD_RANK_DATA, []);
//     const {
//       success: wholCreditCardtSuccess,
//       result: wholCreditCardtResult,
//       errorMsg: wholCreditCardtErrorMsg,
//     } = await queryWholCreditCardt<Store.WholeCreditCardResponse>(
//       new CreditCardPlublicParamsClass(
//         {
//           noEncrypt: true,
//           code: 'bcCreditCardActivityAndCardQueryHandler',
//           jsonObject: {
//             activityType: 'rightsInterests',
//             ...getLocationInfo(),
//           },
//         },
//       ),
//     );
//     if (!wholCreditCardtSuccess) {
//       // 设置报错信息
//       commit(SET_CREDIT_CARD_RANK_ERROR_DATA, {
//         creditCardRankListErrorText: wholCreditCardtErrorMsg,
//         creditCardRankSuccess: !wholCreditCardtSuccess,
//       });
//       Toast(wholCreditCardtErrorMsg);
//     }
//     // 重置 creditCardRanklist 组件配置项
//     commit(RESET_CREDIT_CARD_RANK_LIST_CONFIG, {
//       creditCardRankListLoading: false,
//       creditCardRankListRefreshing: false,
//       creditCardRankListFinished: true,
//       creditCardRankListError: false,
//       creditCardRankListErrorText: '',
//     });
//     // 安全校验
//     wholCreditCardtResult.list = isArrayNotEmpty(wholCreditCardtResult.list) ? wholCreditCardtResult.list : [];
//     wholCreditCardtResult.allCardList = isArrayNotEmpty(
//       wholCreditCardtResult.allCardList ? wholCreditCardtResult.allCardList : [],
//     ) ? wholCreditCardtResult.allCardList : [];
//     // 数据改造
//     wholCreditCardtResult.list.unshift(
//       {
//         activityCode,
//         contentName: '全部',
//         activityType: 'theme',
//         exhibitionSort: 0,
//         state: '',
//         list: wholCreditCardtResult.allCardList,
//       },
//     );
//     // 设置信用卡数据
//     commit(SET_WHOLE_CREDIT_CARD_DATA, wholCreditCardtResult.list);
//     // 设置 activityCode
//     commit(SET_ACTIVITY_CODE, rootState.creditCardRank.activityCode);
//   },
//   // 修改 loading 状态
//   [UPDATE_CREDIT_CARD_RANK_LIST_LOADING]({ commit }, params: {creditCardRankListLoading: boolean}) {
//     commit(UPDATE_CREDIT_CARD_RANK_LIST_LOADING, params.creditCardRankListLoading);
//   },
//   // 修改下拉状态
//   [UPDATE_CREDIT_CARD_RANK_LIST_REFRESHING]({ commit }, params: {creditCardRankListRefreshing: boolean}) {
//     commit(UPDATE_CREDIT_CARD_RANK_LIST_REFRESHING, params.creditCardRankListRefreshing);
//   },
//   // 修改完成状态
//   [UPDATE_CREDIT_CARD_RANK_LIST_FINISHED]({ commit }, params: {creditCardRankListFinished: boolean}) {
//     commit(UPDATE_CREDIT_CARD_RANK_LIST_FINISHED, params.creditCardRankListFinished);
//   },
//   // 重置 creditCardRanklist 组件配置项
//   [RESET_CREDIT_CARD_RANK_LIST_CONFIG]({ commit }, params: Store.CreditCardRankListConfig) {
//     commit(RESET_CREDIT_CARD_RANK_LIST_CONFIG, params);
//   },
//   // 重置信用卡排行榜数据
//   [RESET_CREDIT_CARD_RANK_DATA]({ commit }, data: Store.CreditCardRankItem[]) {
//     commit(RESET_CREDIT_CARD_RANK_DATA, data);
//   },
//   // 设置 activityCode
//   [SET_ACTIVITY_CODE]({ commit }, code: string) {
//     commit(SET_ACTIVITY_CODE, code);
//   },
//   // 设置信用卡全部数据
//   [SET_WHOLE_CREDIT_CARD_DATA]({ commit }, data: Store.CreditCardRankItem[]) {
//     commit(SET_WHOLE_CREDIT_CARD_DATA, data);
//   },
// };

// export const getters: GetterTree<Store.CreditCardRankState, Store.RootModules> = {
//   // 获取列表数据集合
//   getCreditCardList(state) {
//     return state.creditCardRankList;
//   },
//   // 获取 creditCardList 组件状态
//   getCreditCardListStatusInfo(state) {
//     return state.creditCardRankListConfig;
//   },
//   // 获取 activityCode
//   getActivityCode(state) {
//     return state.activityCode;
//   },
//   // 获取全部的信用卡数据
//   getWholeCreditCardData(state) {
//     return state.wholeCreditCardData;
//   },
// };

// const namespaced: boolean = true;
// export const list: Module<Store.List, Store.RootModules> = {
//   namespaced,
//   state: getDefaultState(),
//   mutations,
//   actions,
//   getters,
// };
