<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper">
    <van-dropdown-menu>
      <van-dropdown-item @change="settleChange" v-model="settleCalue" :options="settleOption" :key="1" />
      <van-dropdown-item @change="oilChange" v-model="oilvalue" :options="oilOption" :key="2" />
    </van-dropdown-menu>
    <div class="form-date"  @click="toggleDate">
      <div>
        <span>{{timeFormat(nowDate, 'YYYY年MM月')}}</span>
        <van-icon name="arrow-down" />
      </div>
      <span>{{getProxyPree}}</span>
    </div>
    <van-list
      v-model="rechargeLoading"
      :finished="rechargeFinished"
      @load="onLoad"
      class="container common-list"
    >
      <van-swipe-cell  
        v-for="(rechargeItem, rechargeIndex) in rechargesList"
        :key="rechargeIndex"
      >
        <van-cell :title="rechargeItem.name" :value="rechargeItem.chargeTunnage + '吨'" :label="timeFormat(rechargeItem.createdAt, 'YYYY-MM-DD HH:mm:ss')"/>
        <template #right>
          <div class="more">
            <van-button square type="danger" text="删除" @click="delOilCleanRecord(rechargeItem)" />
            <van-button square type="primary" text="编辑" @click="editReachrgeItemById(rechargeItem._id)" />
          </div>
        </template>
      </van-swipe-cell>
      <template #finished>
        没有更多了, <span @click="manageOil" class="add-recharge">点击这里添加</span>
      </template>
    </van-list>
    <van-popup
    v-model="isShowDate"
    round
    position="bottom"
  >
    <van-datetime-picker
      v-model="currentDate"
      type="year-month"
      title="选择年月日"
      @confirm="confirm"
      @cancel="cancel"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </van-popup>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllOilRecordRecords, delOilCleanRecord } from '@/api/oils'
import dayjs from 'dayjs';
import { getAllOilSitesList } from '@/api/oils'
import { BigNumber } from 'bignumber.js';
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';

@Component({
  components: {
    Loading,
  }
})
export default class AdminRecharge extends Vue {

  private loading: boolean = true;

  private isShowDate: boolean = false;

  private rechargeLoading: boolean = false;

  private rechargeFinished: boolean = false;

  private settleCalue: string = '';

  private oilvalue: string = '';

  private nowDate: Date = new Date();

  private currentDate: Date = dayjs().toDate();

  private minDate: Date = dayjs().subtract(2, 'year').toDate();

  private maxDate: Date = dayjs().toDate();

  get getProxyPree() {
    return this.settleCalue === '1' ? '' :  `应还代加费${this.shouldRepayAmount}元`
  }

  private settleOption: any = [
    { text: '结清状态', value: '' },
    { text: '未结清', value: '0' },
    { text: '已结清', value: '1' },
  ];

  private toggleDate() {
    this.isShowDate = true;
  }

  private onLoad() {
    this.serachObj.queryPage+=1;
    this.getAllOilRecordRecords();
  }

  // 总吨数
  get totalTunnage() {
    const num = this.rechargesList.reduce((pre: any, next: any)=> {
      return new BigNumber(pre).plus(next.chargeTunnage)
    }, 0)
    return num;
  }

  // 总应还代加金额
  get shouldRepayAmount(){
    const num = this.rechargesList.filter((item: any) => item.settleStatus === '0').reduce((pre: any, next: any)=> {
      return (
          (
            new BigNumber(pre).plus(new BigNumber(next.chargeLnum).multipliedBy(next.proxyFee).div(10).toString())
          ).toString()
        )
    },0)
    return num;
  }

  private serachObj: any = {
    perPage: 10,
    queryPage: 1,
    settleName: '',
    settleStatus: '',
    carName: '',  // 车队名称
    carId: '',  // 车队Id
  }

  private rechargesList: any = [];

  private oilList: any = [];

  private oilChange(value: any) {
    let serachObj = this.oilList.find((item: any) => item._id === value) || {};
    if(serachObj) {
      serachObj = {
        oilName: serachObj.name,
        oilId: serachObj._id,
      }
    };
    this.serachObj = {
      ...this.serachObj,
      ...serachObj,
      isWhole: true,
    }
    this.getAllOilRecordRecords();
  }

  private manageOil() {
    this.$router.push({ path: '/admin-oil-clean-manage', query: {scene: 'add'}})
  }

  private confirm(date: Date) {
    this.nowDate = dayjs(date).toDate();
    this.isShowDate = false;
    this.serachObj.isWhole = true;
    this.getAllOilRecordRecords();
  }

  private cancel() {
    this.isShowDate = false;
  }

  private timeFormat(str: string, format: 'string') {
    return dayjs(str).format(format);
  }

  get serachParams() {
    return pickBy(this.serachObj);
  }

  private async created() {
    this.serachObj.isWhole = true;
    this.getAllOilRecordRecords();
    this.oilList = await getAllOilSitesList();
  }

  private async delOilCleanRecord(rechargeItem: any) {
    this.$dialog.confirm({
      title: '删除用户',
      message: `确定要删除 ${rechargeItem.name} 吗 ?`,
    })
    .then(async () => {
      await delOilCleanRecord(rechargeItem._id);
      this.$toast('删除成功')
      this.serachObj.isWhole = true;
      this.getAllOilRecordRecords()
    }).catch(()=>{})
  }

  private async getAllOilRecordRecords() {
    if(this.serachObj.settleName === '结清状态') {
      delete this.serachObj.settleName
    }

    if(this.serachObj.oilName === '加油点名称') {
      delete this.serachObj.oilName
    }

    let isWhole: boolean = this.serachObj.isWhole;
    if (this.serachObj.isWhole) {
        this.serachObj.perPage = 10;
        this.serachObj.queryPage = 1;
        delete this.serachObj.isWhole
    }
    if (isWhole) {
      this.loading = true;
    }
    try {
      const result: any = await getAllOilRecordRecords({
        isEncrypt: true,
        jsonObject: {
          ...this.serachParams,
          time: dayjs(this.nowDate).valueOf(),
        }
      });
      if (isWhole) {
        this.loading = false;
      }
      if (result && result.length < this.serachObj.perPage) {
        this.rechargeFinished = true;
      } else {
        this.rechargeFinished = false;
      }
      this.rechargeLoading = false;
      if (isWhole) {
        this.rechargesList = result;
      } else {
        this.rechargesList = [...this.rechargesList, ...result];
      }
    } catch (error) {
      if (isWhole) {
        this.loading = false;
      }
      console.log(error, 'error')
    }
  }

  get oilOption() {
    return [
      {
        text: '加油点名称',
        value: ''
      },
      ...this.oilList.map((item: any) => ({
        text: item.name,
        value: item._id
      }))
    ];
  }

  private editReachrgeItemById(id: string) {
    this.$router.push({ path: '/admin-oil-clean-manage', query: {id, scene: 'update'}})
  }

  private settleChange(value: any) {
    let serachObj = this.settleOption.find((item: any) => item.value === value) || {};
    if(serachObj) {
      serachObj = {
        settleName: serachObj.text,
        settleStatus: serachObj.value,
      }
    };
    this.serachObj = {
      ...this.serachObj,
      ...serachObj,
      isWhole: true,
    }
    this.getAllOilRecordRecords();
  }

}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'
.wrapper
  width 100vw
  height: 100%
  background-color: #fff
  overflow hidden
  display flex
  flex-direction column

.container
  width 100%
  flex auto
  overflow-y auto

.add-recharge
  color #00f

.more
  width 100%
  height: 100%
  flexStyle()

.form-date
  flexStyle(justifyContent: space-between)
  padding 16px
  font-size 14px
  background-color #fff
  color #323233
</style>