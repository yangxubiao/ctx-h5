
<template>
  <div>
  <van-cell-group>
    <van-cell 
      v-for="(gasItem, gasIndex) in gasRecord"
      :key="gasIndex"
      :title="gasItem.oilName"
    >
    加油日期: {{timeFormat(gasItem.createdAt)}}
    加油升数: {{gasItem.oilLnum}}
    <van-uploader 
      v-model="gasItem.oilImg" disabled 
      max-count="1"
      :deletable="false"
    />
    </van-cell>
  </van-cell-group>`
    <div>
    <p>已经使用升数: {{ alreadyUsedLnum }} </p>
    <p>剩余可用升数: {{ availableLnum }}</p>
  </div>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getCurrentCarOwnerGasRecord } from '@/api/carOwner/oil'
import dayjs from 'dayjs';
import { queryCarOwnerGasInfo } from '@/api/carOwner/summary'
import { BigNumber } from 'bignumber.js';

@Component
export default class Gas extends Vue {

  private gasRecord: any = [];

  private gasInfo: any = null;

  private async created() {
    this.getAllOilSitesList();
    const gasInfo = await queryCarOwnerGasInfo();
    this.gasInfo = gasInfo;
  }

  // 已经使用升数
  get alreadyUsedLnum() {
    return new BigNumber(this.gasInfo?.totalLnum || 0).minus(this.gasInfo?.avaliableLnum || 0).toFixed(2);
  }

    // 剩余可用升数
  get availableLnum() {
    return this.gasInfo?.avaliableLnum || 0;
  }

  private timeFormat(str: string) {
    return dayjs(str).format('YYYY-MM-DD HH:mm:ss');
  }

  private async getAllOilSitesList() {
    let result: any =await getCurrentCarOwnerGasRecord();
    result = result.map((item: any) => {
      item.oilImg = [
        {
          url: item.oilImg
        }
      ]
      return item;
    })
    this.gasRecord = result
  }

}

</script>
<style lang='stylus' scoped>
</style>