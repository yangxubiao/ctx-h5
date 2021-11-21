
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper common-list">
    <van-swipe-cell
        v-for="(oilItem, oilIndex) in allOilList"
        :key="oilIndex"
    >
      <van-collapse v-model="activeName">
          <van-collapse-item :name="oilIndex">
            <template #title>
              <div class="title">
                <div>
                  {{oilItem.gasName}}
                </div>
                <div>
                  代价费: {{oilItem.gasProxyFee}} 毛
                </div>
              </div>
            </template>
            <div class="qr">
              <vue-qr colorDark="#4994df"  :text="getQrInfo(oilItem._id)" :size="200"></vue-qr>
            </div>
          </van-collapse-item>
        </van-collapse>
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
import { delOilItemById } from '@/api/oils'
import { getAllUserList } from '@/api/users'
import Loading from '@/components/loading.vue';
import VueQr from 'vue-qr'

@Component({
  components: {
    Loading,
    VueQr,
  }
})
export default class AdminOil extends Vue {

  private loading: boolean = true;

  private activeName: string[] = [];

  private allOilList: any = [];

  private async delOilItemById(oilItem: any) {
    this.$dialog.confirm({
      title: '删除用户',
      message: `确定要删除 ${oilItem.name} 吗 ?`,
    })
    .then(async () => {
      await delOilItemById(oilItem._id);
      this.$toast('删除成功')
    }).catch(()=>{})
  }

  private addGasSite() {
    this.$router.push({ path: '/admin-add-oil'})
  }

  private getQrInfo(id: string) {
    return (process.env.VUE_APP_API_SCAN_GALLING_LINK + id)
  }

  private async mounted() {
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
@import '~@/stylus/mixin.styl'

.wrapper
  background-color #fff

.title
  flexStyle(justifyContent: space-between)
  margin-right 10px

.add-gas
  color #00f
  font-size 16px

.tips
  font-size 16px
  text-align center
  padding 12px

.qr
  flexStyle()
</style>