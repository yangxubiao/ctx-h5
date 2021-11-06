
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper common-list">
    <van-swipe-cell
        v-for="(carsItem, carsIndex) in allCarsList"
        :key="carsIndex"
    >
      <van-cell :title="carsItem.name" :value="'代价费: '+ carsItem.proxyFee + '毛'"/>
      <template #right>
        <van-button square type="danger" text="删除" @click="delCarItemById(carsItem)" />
      </template>
    </van-swipe-cell>
    <div class="tips">
      没有更多了, <span @click="addCar" class="add-car">点击这里添加更多车队</span>
    </div>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllCarsList, delCarItemById } from '@/api/cars'
import Loading from '@/components/loading.vue';

@Component({
  components: {
    Loading,
  }
})
export default class adminCarOwners extends Vue {

  private allCarsList: any = [];

  private loading: boolean = true;

  private async created() {
    const result = await getAllCarsList();
    this.allCarsList = result
    this.loading = false;
  }

  private async getAllCarsList() {
    const result = await getAllCarsList();
    this.allCarsList = result
  }

  private async delCarItemById(carItem: any) {
    this.$dialog.confirm({
      title: '删除用户',
      message: `确定要删除 ${carItem.name} 吗 ?`,
    })
    .then(async () => {
      await delCarItemById(carItem._id);
      this.$toast('删除成功')
      this.getAllCarsList();
    }).catch(()=>{})
  }

  private addCar() {
    this.$router.push({ path: '/admin-add-car-owner'})
  }
}

</script>
<style lang='stylus' scoped>
.wrapper
  background-color #fff

.add-car
  color #00f
  font-size 16px

.tips
  font-size 16px
  text-align center
  padding 12px
</style>