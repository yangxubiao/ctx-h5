<template>
  <div>
    <div>
      我的升数: {{ avaliableLnum }}
    </div>
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
import { getCurrentLoginederRechargesList } from '@/api/recharges'
import { queryCarOwnerGasInfo } from '@/api/carOwner/summary'

@Component
export default class CarOwnIndex extends Vue {

  private grids = [
    {
      name: '驾驶员',
      page: 'carDrives',
    },
    {
      name: '加油记录页',
      page: 'carDriverGas',
    },
    {
      name: '修改密码',
      page: 'password',
    },
    {
      name: '充值记录页',
      page: 'carRecharge',
    },
  ]

  private gasInfo: any = null;

  get avaliableLnum() {
    return this.gasInfo?.avaliableLnum || 0;
  }

  private async created() {
    const result = await getCurrentLoginederRechargesList();
    const gasInfo = await queryCarOwnerGasInfo();
    this.gasInfo = gasInfo;
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