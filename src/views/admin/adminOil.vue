
<template>
  <div>
    <router-link v-text="'添加'" to='admin-add-oil' />
  <van-cell-group>
    <van-cell 
      v-for="(oilItem, oilIndex) in allOilList"
      :key="oilIndex"
      :title="oilItem.name"
    >
      <div @click="delOilItemById(oilItem._id)">
      删除
    </div>
    </van-cell>
  </van-cell-group>`
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllOilSitesList, delOilItemById } from '@/api/oils'

@Component
export default class AdminOil extends Vue {

  private allOilList: any = [];

  private created() {
    this.getAllOilSitesList();
  }

  private async getAllOilSitesList() {
    const result =await getAllOilSitesList();
    this.allOilList = result
  }

  private async delOilItemById(id: string) {
    await delOilItemById(id);
    this.getAllOilSitesList();
  }

}

</script>
<style lang='stylus' scoped>
</style>