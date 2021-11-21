
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper common-list">
    <van-swipe-cell
        v-for="(oilItem, oilIndex) in allOilList"
        :key="oilIndex"
    >
      <van-cell :title="oilItem.gasName" :value="oilItem.phone"/>
    </van-swipe-cell>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import Loading from '@/components/loading.vue';
import { getAllUserList } from '@/api/users'

@Component({
  components: {
    Loading,
  }
})
export default class DriverOil extends Vue {

  private loading: boolean = true;

  private allOilList: any = [];

  private async created() {
    const result =  await getAllUserList({
      isWhole: true,
      roleNo: '3',
    });
    this.allOilList = result
    this.loading = false;
  }
}

</script>
<style lang='stylus' scoped>
.add-gas
  color #00f
  font-size 16px

.tips
  font-size 16px
  text-align center
  padding 12px
</style>