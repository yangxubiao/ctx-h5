<template>
  <div>
    加油累计升数: {{ totalLum }}
    <van-grid>
      <van-grid-item
        v-for="(gridItem, gridIndex) in grids"
        :key="gridIndex"
        icon="photo-o" 
        @click='jumpPage(gridItem.page)' 
        :text="gridItem.name" 
      />
    </van-grid>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import dayjs from 'dayjs';
import { getCurrentGasSiteRecord } from '@/api/oils/oil'
import { BigNumber } from 'bignumber.js';

@Component
export default class OilerIndex extends Vue {
  private grids = [
    {
      name: '加油',
      page: 'oilerGas',
    },
    {
      name: '修改密码',
      page: 'password',
    },
  ]

  private gasRecord: any = [];

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

  private async getCurrentGasSiteRecord() {
    const result = await getCurrentGasSiteRecord();
    this.gasSiteRecord = result;
  }

  private created() {
    this.getCurrentGasSiteRecord();
  }

  private jumpPage(str: string) {
    this.$router.push({
      name: str
    })
  };
}

</script>
<style lang='stylus' scoped>
</style>