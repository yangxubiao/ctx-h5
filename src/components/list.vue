<template>
<div></div>
  <!-- <van-list
    v-if="listData"
    v-model="loading"
    class="list"
    :error.sync="error"
    :error-text="errorText"
    :finished="finished"
    finished-text="没有更多了"
    @load="$emit('recommendCardsListLoad')"
  >
    <div
      v-for="(listItem, listIndex) in listData"
      :key="listIndex"
    >
      hasukhdsakhdaskdashhdaskdhksa
    </div>
  </van-list> -->
</template>

<script lang='ts'>
import {
  Vue, Component,
} from 'vue-property-decorator';
// import { List } from 'vant';
// import { Getter, Action } from 'vuex-class';
// import {
//   UPDATE_CREDIT_CARD_RANK_LIST_LOADING,
// } from '@/store/modules/creditCardRank';

@Component({
  name: 'RecommendCardsList',
  components: {
    // 'van-list': List,
  },
})
export default class ListComponent extends Vue {
  // // 获取排行榜记录
  // @Action('getRankList', {
  //   namespace: 'creditCardRank',
  // })
  // private getRankList: (params: Pagination) => Promise<ResponseData<Store.CreditCardRankResponse>>;

  // // 获取渠道数据
  // @Getter('getCreditCardList', {
  //   namespace: 'creditCardRank',
  // })
  // private listData: Store.CreditCardRankItem[];

  // // 获取 creditCardList 组件状态
  // @Getter('getCreditCardListStatusInfo', {
  //   namespace: 'creditCardRank',
  // })
  // private creditCardListStatusInfo: Store.CreditCardRankListConfig;

  // // 获取 loading
  // get loading() {
  //   return this.creditCardListStatusInfo.creditCardRankListLoading;
  // }

  // // 设置 loading
  // set loading(val) {
  //   this.$store.commit(`creditCardRank/${UPDATE_CREDIT_CARD_RANK_LIST_LOADING}`, val);
  // }

  // // 获取状态
  // get finished() {
  //   return this.creditCardListStatusInfo.creditCardRankListFinished;
  // }

  // // 获取错误状态
  // get error() {
  //   return this.creditCardListStatusInfo.creditCardRankListError;
  // }

  // // 获取错误信息
  // get errorText() {
  //   return this.creditCardListStatusInfo.creditCardRankListErrorText;
  // }

}
</script>
