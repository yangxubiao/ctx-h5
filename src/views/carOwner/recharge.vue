<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper" >
    <van-dropdown-menu>
      <van-dropdown-item @change="settleChange" v-model="settleCalue" :options="settleOption" :key="1" />
    </van-dropdown-menu>
    <van-cell 
      class="form-date" 
      @click="toggleDate"
      icon="arrow-down" 
      :title="timeFormat(nowDate, 'YYYY年MM月')" 
      :value="getProxyPree"
    />
    <van-list
      v-model="rechargeLoading"
      :finished="rechargeFinished"
      @load="onLoad"
      class="container"
    >
      <van-swipe-cell  
        v-for="(rechargeItem, rechargeIndex) in rechargesList"
        :key="rechargeIndex"
      >
        <van-cell :title="rechargeItem.name" :value="rechargeItem.chargeTunnage + '吨'" :label="timeFormat(rechargeItem.createdAt, 'YYYY-MM-DD HH:mm:ss')"/>
      </van-swipe-cell>
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
import { getCurrentUserRechargesList } from '@/api/carOwner/recharges'
import dayjs from 'dayjs';
import { BigNumber } from 'bignumber.js';
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';

@Component({
  components: {
    Loading,
  }
})
export default class DriverRecharge extends Vue {

  private loading: boolean = true;

  private settleCalue: string = '';

  private isShowDate: boolean = false;

  private rechargeLoading: boolean = false;

  private rechargeFinished: boolean = false;

  private nowDate: Date = new Date();

  private currentDate: Date = dayjs().toDate();

  private minDate: Date = dayjs().subtract(2, 'year').toDate();

  private maxDate: Date = dayjs().toDate();

  private onLoad() {
    this.serachObj.queryPage+=1;
    this.getAllRechargesList();
  }

  get getProxyPree() {
    return this.settleCalue === '1' ? '' :  `应还代加费${this.shouldRepayAmount}元`
  }

  private toggleDate() {
    this.isShowDate = true;
  }

  private confirm(date: Date) {
    this.nowDate = dayjs(date).toDate();
    this.isShowDate = false;
    this.serachObj.isWhole = true;
    this.getAllRechargesList();
  }

  private cancel() {
    this.isShowDate = false;
  }

  private settleOption: any = [
    { text: '结清状态', value: '' },
    { text: '未结清', value: '0' },
    { text: '已结清', value: '1' },
  ];

  // 总吨数
  get totalTunnage() {
    const num = this.rechargesList.reduce((pre: any, next: any)=> {
      return new BigNumber(pre).plus(next.chargeTunnage)
    }, 0)
    return num;
  }

  // 总升数
  get totalLnum() {
    return new BigNumber(this.totalTunnage).multipliedBy(process.env.VUE_APP_API_DEFAULT_L_NUM).toString();
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
  }

  get serachParams() {
    return pickBy(this.serachObj);
  }

  private rechargesList: any = [];

  private timeFormat(str: string, format: string) {
    return dayjs(str).format(format);
  }

  private async created() {
    this.serachObj.isWhole = true;
    this.getAllRechargesList();
  }

  private async getAllRechargesList() {
    if(this.serachObj.settleName === '结清状态') {
      delete this.serachObj.settleName
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
      const result: any = await getCurrentUserRechargesList({
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
    } catch (error){
      if (isWhole) {
        this.loading = false;
      }
      console.log(error, 'error')
    }
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
    this.getAllRechargesList();
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

.container
  width 100%
  height 565px
  overflow-y auto
</style>