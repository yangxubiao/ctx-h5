<template>
  <div class="wrapper">
    <div class="logo-text">
      车行通
    </div>
    <!-- <div class="lnum">
      加油总升数: {{ tweeningValue }}
    </div> -->
    <div class="container">
      <van-cell class="cell-item" title="加油记录" is-link @click="jumpPage('oilerGas')" />
      <van-cell class="cell-item" title="二维码" is-link @click="jumpPage('oilerPayOilQr')" />
      <van-cell class="cell-item"   title="修改密码" is-link @click="jumpPage('password')" />
    </div>
    <LoginOut />
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import dayjs from 'dayjs';
// import { getCurrentGasSiteRecord } from '@/api/oils/oil'
import { BigNumber } from 'bignumber.js';
import tween from '@/utils/tween';
import { stringToNumber } from '@/utils/string';
import LoginOut from '@/components/loginOut.vue'

@Component({
  components: {
    LoginOut
  }
})
export default class OilerIndex extends Vue {
  //值
  // private tweeningValue: string = '0'

  /**
   * 数字每一帧滚动触发的回调
   */
  // updateValue(tweenobj: { object: { tweeningValue: string } }) {
  //   this.tweeningValue = stringToNumber(tweenobj.object.tweeningValue).toFixed(2);
  // }

  private gasSiteRecord: any = [];

  get totalLum() {
      const num = this.gasSiteRecord.reduce((pre: any, next: any)=> {
      return new BigNumber(pre).plus(next.oilLnum)
    }, 0)
    return num;
  }

  private timeFormat(str: string) {
    return dayjs(str).format('YYYY-MM-DD HH:mm:ss');
  }

  // private async getCurrentGasSiteRecord() {
  //   const result = await getCurrentGasSiteRecord({
  //     isEncrypt: true,
  //       jsonObject: {
  //         isWhole: true
  //       }
  //   });
  //   this.gasSiteRecord = result;
  //   // 动画开始
  //   tween(0, this.totalLum, this.updateValue);
  // }

  // private mounted() {
    // this.getCurrentGasSiteRecord();
  // }

  private jumpPage(str: string) {
    this.$router.push({
      name: str
    })
  };
}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'
.wrapper
  height 100%
  width 100%
  flexStyle(flexDirection: column)

.lnum
  font-size 28px
  color #fff

.container
  width 100%
  padding 40px

.cell-item
  margin-top 20px
</style>