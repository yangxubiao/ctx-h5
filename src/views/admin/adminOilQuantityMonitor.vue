
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper common-list">
    <van-swipe-cell
        v-for="(summaryItem, summaryIndex) in summaryList"
        :key="summaryIndex"
    >
      <van-cell :title="summaryItem.leaderName" :label="summaryItem.carName">
        <div class="default-lnum" v-if="!isSmallMinimumLitres(summaryItem.avaliableLnum)">
            {{ summaryItem.avaliableLnum + '升' }}
        </div>
        <div class="min-lnum" v-else>
            {{ summaryItem.avaliableLnum + '升' }}
        </div>
      </van-cell>
      <template #right>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { findAllSummaryList } from '@/api/carOwner/summary'
import Loading from '@/components/loading.vue';

@Component({
  components: {
    Loading,
  }
})
export default class adminCarOwners extends Vue {

  private summaryList: any = [];

  private loading: boolean = true;

  private isSmallMinimumLitres(lNum: string) {
    return Number(lNum) < process.env.VUE_APP_API_MIN_L_NUM
  }

  private async created() {
    this.summaryList = await findAllSummaryList();
    this.loading = false;
  }
}

</script>
<style lang='stylus' scoped>
.wrapper

.add-car
  color #00f
  font-size 16px

.tips
  font-size 16px
  text-align center
  padding 12px

.default-lnum
  color #333

.min-lnum
  color #ee0a24
</style>