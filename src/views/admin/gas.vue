
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
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllGasRecords } from '@/api/oils'
import dayjs from 'dayjs';

@Component
export default class Gas extends Vue {

  private gasRecord: any = [];

  private created() {
    this.getAllOilSitesList();
  }

  private timeFormat(str: string) {
    return dayjs(str).format('YYYY-MM-DD HH:mm:ss');
  }

  private async getAllOilSitesList() {
    let result: any =await getAllGasRecords();
    result = result.map((item: any) => {
      item.oilImg = [
        {
          url: item.oilImg
        }
      ]
      return item;
    })
    console.log(result, 'result')
    this.gasRecord = result
  }

}

</script>
<style lang='stylus' scoped>
</style>