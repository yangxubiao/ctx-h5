<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item @change="settleChange" v-model="settleCalue" :options="settleOption" :key="1" />
    </van-dropdown-menu>
      <van-cell-group>
    <van-cell 
      v-for="(rechargeItem, rechargeIndex) in rechargesList"
      :key="rechargeIndex"
      :title="rechargeItem.name"
    >
      {{rechargeItem.chargeLnum}}
      {{rechargeItem.settleName}}
      {{timeFormat(rechargeItem.createdAt)}}
    </van-cell>
  </van-cell-group>
  <div>
    <p>总 {{totalTunnage}} 吨数</p>
    <p>总 {{totalLnum}} 升数</p>
    <p>总应还代加费金额: {{shouldRepayAmount}} 元</p>
  </div>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getCurrentUserRechargesList } from '@/api/carOwner/recharges'
import dayjs from 'dayjs';
import { BigNumber } from 'bignumber.js';

@Component
export default class AdminRecharge extends Vue {

  private settleCalue: string = '';

  private settleOption: any = [
    { text: '结清状态', value: '' },
    { text: '未结清', value: '0' },
    { text: '已结清', value: '1' },
  ];

  // 总吨数
  get totalTunnage() {
    const num = this.rechargesList.reduce((pre: any, next: any)=> {
      return new BigNumber(pre).plus(next.chargeTunnage)
    }, 0)
    return num;
  }

  // 总升数
  get totalLnum() {
    return new BigNumber(this.totalTunnage).multipliedBy(process.env.VUE_APP_API_DEFAULT_L_NUM).toString();
  }

  // 总应还代加金额
  get shouldRepayAmount(){
    const num = this.rechargesList.filter((item: any) => item.settleStatus === '0').reduce((pre: any, next: any)=> {
      return (
          (
            new BigNumber(pre).plus(new BigNumber(next.chargeLnum).multipliedBy(next.proxyFee).div(10).toString())
            ).toString()
        )
    },0)
    return num;
  }

  private serachObj: any = {
    settleName: '',
    settleStatus: '',
  }

  private rechargesList: any = [];

  private timeFormat(str: string) {
    return dayjs(str).format('YYYY-MM-DD');
  }

  private async created() {
    this.getAllRechargesList();
  }
  private async getAllRechargesList() {
    let serachObj: any = {};

    for(let key  in this.serachObj) {
      if(
        this.serachObj.hasOwnProperty(key) && !['', undefined].includes(this.serachObj[key])
        ) {
        serachObj[key] = this.serachObj[key];
      }
    }

    if(serachObj.settleName === '结清状态') {
      delete serachObj.settleName
    }

    const result = await getCurrentUserRechargesList({
      isEncrypt: true,
      jsonObject: serachObj
    });
    this.rechargesList = result;
  }

  private settleChange(value: any) {
    let serachObj = this.settleOption.find((item: any) => item.value === value) || {};
    if(serachObj) {
      serachObj = {
        settleName: serachObj.text,
        settleStatus: serachObj.value,
      }
    };
    this.serachObj = {...this.serachObj, ...serachObj}
    this.getAllRechargesList();
  }
}

</script>
<style lang='stylus' scoped>
</style>