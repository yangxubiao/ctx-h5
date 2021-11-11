<template>
    <div class="wrapper">
    <div class="lnum">
      加油总升数: {{ tweeningValue }}
    </div>
    <div class="container">
      <van-cell class="cell-item" title="加油" is-link @click="jumpPage('driverGas')" />
      <van-cell class="cell-item"   title="修改密码" is-link @click="jumpPage('password')" />
    </div>
    <LoginOut />
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getCurrentLoginGasRecord } from '@/api/driver/oil'
import tween from '@/utils/tween';
import { stringToNumber } from '@/utils/string';
import { BigNumber } from 'bignumber.js';
import LoginOut from '@/components/loginOut.vue'

@Component({
  components: {
    LoginOut,
  }
})
export default class DriverIndex extends Vue {

  //值
  private tweeningValue: string = '0'

  private gasRecord: any = [];

  /**
   * 数字每一帧滚动触发的回调
   */
  updateValue(tweenobj: { object: { tweeningValue: string } }) {
    this.tweeningValue = stringToNumber(tweenobj.object.tweeningValue).toFixed(0);
  }

  get totalLum() {
      const num = this.gasRecord.reduce((pre: any, next: any)=> {
      return new BigNumber(pre).plus(next.oilLnum)
    }, 0)
    return num;
  }

  private async getCurrentLoginGasRecord() {
    const result = await getCurrentLoginGasRecord({
        isEncrypt: true,
        jsonObject: {
          isWhole: true
        }
    });
    this.gasRecord = result;
    // 动画开始
    tween(0, this.totalLum, this.updateValue);
  }

  private mounted() {
    this.getCurrentLoginGasRecord();
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
  color #fff

.container
  width 100%
  padding 40px

.cell-item
  margin-top 20px
</style>