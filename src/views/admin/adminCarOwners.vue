
<template>
  <div>
    <router-link v-text="'添加'" to='admin-add-car-owner' />
    <van-cell-group>
    <van-cell 
      v-for="(CarsItem, CarsIndex) in allCarsList"
      :key="CarsIndex"
      :title="CarsItem.name"
    >
    <div @click="delCarItemById(CarsItem._id)">
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
import { getAllCarsList, delCarItemById } from '@/api/cars'

@Component
export default class adminCarOwners extends Vue {

  private allCarsList: any = [];

  private created() {
    this.getAllCarsList();
  }

  private async getAllCarsList() {
    const result = await getAllCarsList();
    console.log(result, 'result')
    this.allCarsList = result
  }

  private async delCarItemById(id: string) {
    await delCarItemById(id);
    this.getAllCarsList();
  }

}

</script>
<style lang='stylus' scoped>
</style>