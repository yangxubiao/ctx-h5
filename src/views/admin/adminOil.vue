
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper">
    <van-swipe-cell
        v-for="(oilItem, oilIndex) in allOilList"
        :key="oilIndex"
    >
      <van-cell :title="oilItem.name" :value="'代价费: '+ oilItem.proxyFee + '毛'"/>
      <template #right>
        <van-button square type="danger" text="删除" @click="delOilItemById(oilItem)" />
      </template>
    </van-swipe-cell>
    <div class="tips">
      没有更多了, <span @click="addGasSite" class="add-gas">点击这里添加更多加油点</span>
    </div>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllOilSitesList, delOilItemById } from '@/api/oils'
import Loading from '@/components/loading.vue';

@Component({
  components: {
    Loading,
  }
})
export default class AdminOil extends Vue {

  private loading: boolean = true;

  private allOilList: any = [];

  private async created() {
    const result =  await getAllOilSitesList();
    this.allOilList = result
    this.loading = false;
  }

  private async getAllOilSitesList() {
    const result = await getAllOilSitesList();
    this.allOilList = result
  }

  private async delOilItemById(oilItem: any) {
    this.$dialog.confirm({
      title: '删除用户',
      message: `确定要删除 ${oilItem.name} 吗 ?`,
    })
    .then(async () => {
      await delOilItemById(oilItem._id);
      this.$toast('删除成功')
      this.getAllOilSitesList();
    }).catch(()=>{})
  }

  private addGasSite() {
    this.$router.push({ path: '/admin-add-oil'})
  }

}

</script>
<style lang='stylus' scoped>
.wrapper
  background-color #fff

.add-gas
  color #00f
  font-size 16px

.tips
  font-size 16px
  text-align center
  padding 12px
</style>