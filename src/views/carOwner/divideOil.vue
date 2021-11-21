
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper">
    <van-dropdown-menu>
      <van-dropdown-item @change="dirverChange" v-model="dirverValue" :options="drivesOption" :key="1" />
      <van-dropdown-item @change="divideChange" v-model="divideValue" :options="divideOption" :key="2" />
    </van-dropdown-menu>
    <div class="form-date"  @click="toggleDate">
      <div>
        <span>{{timeFormat(nowDate, 'YYYY年MM月')}}</span>
        <van-icon name="arrow-down" />
      </div>
    </div>
    <van-list
      v-model="gasLoading"
      :finished="gasFinished"
      @load="onLoad"
      finished-text="没有更多了"
      class="container common-list"
    >
        <van-swipe-cell  
        v-for="(gasItem, gasIndex) in gasRecord"
        :key="gasIndex"
      >
        <van-cell :title="gasItem.carNo" :value="lnumText(gasItem)" :label="timeFormat(gasItem.createdAt, 'YYYY-MM-DD HH:mm:ss')"/>
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
import dayjs from 'dayjs';
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';
import { getCurrentUserAllDrivesList } from '@/api/carOwner/users'
import { getOilDivideRecord } from '@/api/carOwner/oilDivideRecord';
import { getLocalData } from '@/utils/local';
import BigNumber from 'bignumber.js';

@Component({
  components: {
    Loading,
  }
})
export default class Gas extends Vue {

  private loading: boolean = false;

  private isShowDate: boolean = false;

  private gasLoading: boolean = false;

  private gasFinished: boolean = false;

  private divideValue: string = '';

  private dirverValue: string = '';

  private gasRecord: any = [];

  private nowDate: Date = new Date();

  private activeName: string[] = [];

  private currentDate: Date = dayjs().toDate();

  private minDate: Date = dayjs().subtract(2, 'year').toDate();

  private maxDate: Date = dayjs().toDate();

  private oilList: any = [];

  private dirversList: any = [];

  private lnumText(gasItem: any) {
    return ((gasItem.mode === 'div' ? '+' : '-') + new BigNumber(gasItem.lum).toFixed(2).toString() + '升');
  }

  get divideOption() {
    return [
      {
        text: '扣-分油',
        value: ''
      },
      {
        text: '扣油',
        value: 'div'
      },
      {
        text: '分油',
        value: 'divide'
      },
    ];
  }

  get drivesOption() {
    return [
      {
        text: '车牌号',
        value: ''
      },
      ...this.dirversList.map((item: any) => ({
        text: item.carNo,
        value: item._id
      }))
    ];
  }

  private async created() {
    this.dirversList = await getCurrentUserAllDrivesList({gasMode: 'divide'});
  }

  private onLoad() {
    this.serachObj.queryPage+=1;
    this.getOilDivideRecord();
  }

  private serachObj: any = {
    perPage: 10,
    queryPage: 0,
    mode: '',
    carNo: '', // 车牌号
  }

  get serachParams() {
    return pickBy(this.serachObj);
  }

  private confirm(date: Date) {
    this.nowDate = dayjs(date).toDate();
    this.isShowDate = false;
    this.serachObj.queryPage = 1;
    this.getOilDivideRecord();
  }

  private cancel() {
    this.isShowDate = false;
  }

  private getDetails(gasItem: any) {
    return `${gasItem.carNo} ${this.timeFormat(gasItem.createdAt, 'MM月DD号 HH:mm')}`
  }

  private timeFormat(str: string, format: string) {
    return dayjs(str).format(format);
  }

  private toggleDate() {
    this.isShowDate = true;
  }

  private async getOilDivideRecord() {
    if(this.serachObj.oilName === '加油点名称') {
      delete this.serachObj.oilName
    }
    const userInfo = getLocalData('userInfo');
    try {
      let result: any = await getOilDivideRecord({
        isEncrypt: true,
        jsonObject: {
          ...this.serachParams,
          time: dayjs(this.nowDate).valueOf(),
          carId: userInfo.carId,
        }
      });
      if (result && result.length < this.serachObj.perPage) {
        this.gasFinished = true;
      } else {
        this.gasFinished = false;
      }
      this.gasLoading = false;
      if (this.serachObj.queryPage === 1) {
        this.gasRecord = result;
      } else {
        this.gasRecord = [...this.gasRecord, ...result];
      }
    } catch (error) {
    }
  }

  private divideChange(value: any) {
    this.serachObj = {
      ...this.serachObj,
      mode: value,
    }
    this.serachObj.queryPage = 1
    this.getOilDivideRecord();
  }

  private dirverChange(value: any) {
    let serachObj = this.dirversList.find((item: any) => item._id === value) || {};
    if(serachObj) {
      serachObj = {
        carNo: serachObj.carNo,
      }
    };
    this.serachObj.queryPage = 1
    this.serachObj = {
      ...this.serachObj,
      ...serachObj,
    }
    this.getOilDivideRecord();
  }

}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'
.title
  flexStyle(justifyContent: space-between)

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
  font-size 18px
  background-color #fff
  color #323233
</style>