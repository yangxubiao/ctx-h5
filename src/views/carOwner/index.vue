<template>
  <div class="wrapper">
    <div class="lnum">
      我的升数: {{ tweeningValue }}
    </div>
    <div class="container">
      <van-grid :column-num="3" :gutter="20">
          <van-grid-item
            v-for="(gridItem, gridIndex) in grids"
            :key="gridIndex"
            :icon="gridItem.img" 
            @click='jumpPage(gridItem.page)' 
            :text="gridItem.name" 
          />
      </van-grid>
    </div>
    <div class="password">
      <van-cell class="updata-password" title="修改密码" is-link @click="jumpPage('password')" />
    </div>
      <LoginOut />
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getCurrentLoginederRechargesList } from '@/api/recharges'
import { queryCarOwnerGasInfo } from '@/api/carOwner/summary'
import tween from '@/utils/tween';
import { stringToNumber } from '@/utils/string';
import LoginOut from '@/components/loginOut.vue'
import { getLocalData } from '@/utils/local';

@Component({
  components: {
    LoginOut,
  }
})
export default class CarOwnIndex extends Vue {

  private usersIcon = require('@/assets/svg/users.svg');

  private recordsIcon = require('@/assets/svg/records.svg');

  private chargesIcon = require('@/assets/svg/charges.svg');

  // 额度值
  private tweeningValue: string = '0'

  private grids = [
    {
      name: '驾驶员',
      page: 'carManageDrives',
      img: this.usersIcon,
    },
    {
      name: '加油记录页',
      page: 'carDriverGas',
      img: this.recordsIcon,
    },
    {
      name: '充值记录页',
      page: 'carRecharge',
      img: this.chargesIcon,
    },
  ]

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

  private created() {
    getCurrentLoginederRechargesList();
  }

  private async mounted() {
    const userInfo = getLocalData('userInfo');
    const gasInfo = await queryCarOwnerGasInfo({
      isEncrypt: true,
      jsonObject: {
        carId: userInfo.carId,
        carName: userInfo.carName,
      }
    });
    this.gasInfo = gasInfo;
    // 动画开始
    tween(0, this.avaliableLnum, this.updateValue);
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
  flexStyle(flexDirection: column, justifyContent: space-around)

.lnum
  color #fff

.container
  width 100%

.password
  width 100%
  padding 20px
</style>