<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper">
    <div @click="manageRearge">
      添加
    </div>
    <van-dropdown-menu>
      <van-dropdown-item @change="settleChange" v-model="settleCalue" :options="settleOption" :key="1" />
      <van-dropdown-item @change="carChange" v-model="carValue" :options="carsOption" :key="2"  />
    </van-dropdown-menu>
    
    <div class="form-date" @click="toggleDate">
      222   
    </div>
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
        <van-cell :title="rechargeItem.name " :value="rechargeItem.chargeLnum" :label="timeFormat(rechargeItem.createdAt)"/>
        <template #right>
          <van-button square type="danger" text="删除" @click="editReachrgeItemById(rechargeItem)" />
          <van-button square type="primary" text="编辑" @click="delRechargeItemById(rechargeItem._id)" />
        </template>
      </van-swipe-cell>

      <template #finished>
        没有更多了, <span @click="addUser" class="add-user">点击这里充值</span>
      </template>
    </van-list>
  <!-- <div>
    <p>总 {{totalTunnage}} 吨数</p>
    <p>总 {{totalLnum}} 升数</p>
    <p>总应还代加费金额: {{shouldRepayAmount}} 元</p>
  </div> -->
  <van-datetime-picker
    v-if="isShowDate"
    v-model="currentDate"
    type="year-month"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
  />
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllRechargesList, delRechargeItemById } from '@/api/recharges'
import dayjs from 'dayjs';
import { getAllCarsList } from '@/api/cars';
import { BigNumber } from 'bignumber.js';
import Loading from '@/components/loading.vue';

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

  private carValue: string = '';

  private currentDate: Date = dayjs().toDate();

  private minDate: Date = dayjs().subtract(2, 'year').toDate();

  private maxDate: Date = dayjs().toDate();

  private settleOption: any = [
    { text: '结清状态', value: '' },
    { text: '未结清', value: '0' },
    { text: '已结清', value: '1' },
  ];

  private toggleDate() {
    this.isShowDate = true;
  }

  private onLoad() {
  }

  get carsOption() {
    return [
      {
        text: '车队名称',
        value: ''
      },
      ...this.carsList.map((item: any) => ({
        text: item.name,
        value: item._id
      }))
    ];
  }

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
    settleName: '',
    settleStatus: '',
    carName: '',  // 车队名称
    carId: '',  // 车队Id
  }

  private rechargesList: any = [];

  private carsList: any = [];

  private manageRearge() {
    this.$router.push({ path: '/admin-manage-recharge', query: {scene: 'add'}})
  }

  private timeFormat(str: string) {
    return dayjs(str).format('YYYY-MM-DD HH:mm:ss');
  }

  private async created() {
    this.getAllRechargesList();
    this.carsList = await getAllCarsList();
    this.loading = false;
  }

  private async delRechargeItemById(id: string) {
    await delRechargeItemById(id);
    this.getAllRechargesList();
  }

  private async getAllRechargesList() {
    let serachObj: any = {};

    for(let key  in this.serachObj) {
      if(this.serachObj.hasOwnProperty(key) && !['', undefined].includes(this.serachObj[key])) {
        serachObj[key] = this.serachObj[key];
      }
    }

    if(serachObj.settleName === '结清状态') {
      delete serachObj.settleName
    }

    if(serachObj.carName === '车队名称') {
      delete serachObj.carName
    }

    const result = await getAllRechargesList({
      isEncrypt: true,
      jsonObject: serachObj
    });
    this.rechargesList = result;
  }

  private editReachrgeItemById(id: string) {
    this.$router.push({ path: '/admin-manage-recharge', query: {id, scene: 'update'}})
  }

  private settleChange(value: any) {
    let serachObj = this.settleOption.find((item: any) => item.value === value) || {};
    if(serachObj) {
      serachObj = {
        settleName: serachObj.text,
        settleStatus: serachObj.value,
      }
    };
    this.serachObj = {...this.serachObj, ...serachObj}
    this.getAllRechargesList();
  }

  private carChange(value: any) {
    let serachObj = this.carsList.find((item: any) => item._id === value) || {};
    if(serachObj) {
      serachObj = {
        carName: serachObj.name,
        carId: serachObj._id,
      }
    };
    this.serachObj = {...this.serachObj, ...serachObj}
    this.getAllRechargesList();
  }
}

</script>
<style lang='stylus' scoped>
.wrapper
  width 100vw
  height: 100%
  background-color: #fff
  overflow hidden

.container
  width 100%
  height 100%
  overflow-y auto
</style>