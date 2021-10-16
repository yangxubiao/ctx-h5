<template>
  <div>
    <div @click="manageRearge">
      添加
    </div>
    <van-dropdown-menu>
      <van-dropdown-item @change="settleChange" v-model="settleCalue" :options="settleOption" :key="1" />
      <van-dropdown-item @change="carChange" v-model="carValue" :options="carsOption" :key="2"  />
    </van-dropdown-menu>
      <van-cell-group>
    <van-cell 
      v-for="(rechargeItem, rechargeIndex) in rechargesList"
      :key="rechargeIndex"
      :title="rechargeItem.name"
    >
      {{rechargeItem.chargeLnum}}
      {{rechargeItem.settleName}}
      {{timeFormat(rechargeItem.createdAt)}}
      <div @click="editReachrgeItemById(rechargeItem._id)">
        编辑
      </div>
      <div @click="delRechargeItemById(rechargeItem._id)">
        删除
      </div>
    </van-cell>
  </van-cell-group>
  <div>
    <p>总 {{totalTunnage}} 吨数</p>
    <p>总 {{totalLnum}} 升数</p>
    <p>总应还代加费金额: {{shouldRepayAmount}} 元</p>
  </div>
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

@Component
export default class AdminRecharge extends Vue {

  private settleCalue: string = '';

  private carValue: string = '';

  private settleOption: any = [
    { text: '结清状态', value: '' },
    { text: '未结清', value: '0' },
    { text: '已结清', value: '1' },
  ];

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
</style>