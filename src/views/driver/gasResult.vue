<template>
  <Loading v-if="pageLoading" />
  <div  v-else class="wrapper">
    <div class="icon">
      <div class="img-container">
        <img  class="img" :src="successImg" alt="">
      </div>
      <p class="l-num">
        {{ gasRecord.oilLnum }}升
      </p>
    </div>
    <div class="container">
      <van-cell title="加油点" class="cell-item" :value="gasRecord.oilName" />
      <van-cell title="车牌号" class="cell-item" :value="gasRecord.carNo" />
      <van-cell title="加油时间" class="cell-item" :value="timeFormat(gasRecord.createdAt, 'MM月DD号 HH:mm')" />
    </div>
    <div class="btn">
      <van-button type="info" size="large" to="/">确定</van-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { getOilRecordById } from '@/api/oils';
import {
Vue,  Component,
} from 'vue-property-decorator';
import Loading from '@/components/loading.vue';
import dayjs from 'dayjs';

@Component({
  components: {
    Loading,
  }
})
export default class GasResult extends Vue {

  private pageLoading: boolean = true;

  private successImg = require('@/assets/img/success.png');

  private timeFormat(str: string, format: string) {
    return dayjs(str).format(format);
  }

  private gasRecord: any = {};

  private async created() {
      const result: any = await getOilRecordById(this.$route.query.id as string);
      this.gasRecord = result;
      this.pageLoading = false;
  }

}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'
.wrapper
  height 100%
  width 100%
  color #fff
  flexStyle(flexDirection: column, justifyContent: flex-start)

.icon
  margin-top 50px
  text-align center

.img-container
  width 150px
  height 150px
  .img
    width 100%
    height 100%

.l-num
  font-size 40px
  margin-top 10px


.container
  width 100%
  padding 10px

.cell-item
  margin-top 20px

.btn
  width 90%
  margin-top 10px

</style>