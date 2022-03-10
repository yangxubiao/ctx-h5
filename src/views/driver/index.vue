<template>
  <div class="wrapper">
    <div class="logo-text">
      车行通
    </div>
    <div class="lnum" v-if="isPrivateCar">
      我的升数: {{ tweeningValue }}
    </div>
    <!-- <div class="lnum" v-else>
      加油总升数: {{ tweeningValue }}
    </div> -->
    <div class="container">
      <van-cell class="cell-item" title="加油" is-link @click="jumpPage('driverGasManage')" />
      <van-cell class="cell-item" title="加油点信息" is-link @click="jumpPage('driverGasInfo')" />
      <van-cell class="cell-item"   title="修改密码" is-link @click="jumpPage('password')" />
    </div>
    <LoginOut />
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
// import { getCurrentLoginGasRecord } from '@/api/driver/oil'
import tween from '@/utils/tween';
import { queryCarOwnerGasInfo } from '@/api/carOwner/summary'
import { stringToNumber } from '@/utils/string';
import { BigNumber } from 'bignumber.js';
import LoginOut from '@/components/loginOut.vue'
import { getLocalData } from '@/utils/local';

@Component({
  components: {
    LoginOut,
  }
})
export default class DriverIndex extends Vue {

  //值
  private tweeningValue: string = '0'

  private gasRecord: any = [];

  private isPrivateCar: boolean = false;

  private gasInfo: any = null;

  get avaliableLnum() {
    return this.gasInfo?.avaliableLnum || 0;
  }

  /**
   * 数字每一帧滚动触发的回调
   */
  updateValue(tweenobj: { object: { tweeningValue: string } }) {
    this.tweeningValue = stringToNumber(tweenobj.object.tweeningValue).toFixed(2);
  }

  get totalLum() {
      const num = this.gasRecord.reduce((pre: any, next: any)=> {
      return new BigNumber(pre).plus(next.oilLnum)
    }, 0)
    return num;
  }

  // private async getCurrentLoginGasRecord() {
  //   const result = await getCurrentLoginGasRecord({
  //       isEncrypt: true,
  //       jsonObject: {
  //         isWhole: true
  //       }
  //   });
  //   this.gasRecord = result;
  //   // 动画开始
  //   tween(0, this.totalLum, this.updateValue);
  // }

  private handleDivideMode(avaliableLnum: number) {
    this.isPrivateCar = true;
    tween(0, avaliableLnum, this.updateValue);
  }

  private async mounted() {
    // const userInfo = getLocalData('userInfo');
    // if(userInfo.gasMode === 'divide') {
    //   this.handleDivideMode(new BigNumber(userInfo.availableLum).toNumber());
    // } else {
    //   this.getCurrentLoginGasRecord();
    // }
    const userInfo = getLocalData('userInfo');
    if(userInfo.gasMode === 'divide') {
      this.handleDivideMode(new BigNumber(userInfo.availableLum).toNumber());
    } else {
      const gasInfo: any = await queryCarOwnerGasInfo({
        isEncrypt: true,
        jsonObject: {
          carId: userInfo.carId,
          carName: userInfo.carName,
        }
      });
      // 动画开始
      this.handleDivideMode(new BigNumber(gasInfo?.avaliableLnum || 0).toNumber());
    }
  }

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
  font-size 30px
  color #fff
  margin-top 20px

.container
  width 100%
  padding 40px

.cell-item
  margin-top 20px
</style>