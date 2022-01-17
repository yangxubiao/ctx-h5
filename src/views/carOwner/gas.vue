
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper">
    <van-dropdown-menu>
      <van-dropdown-item @change="oilChange" v-model="oilvalue" :options="oilOption"/>
    </van-dropdown-menu>
    <div class="form-date"  @click="toggleDate">
      <div>
        <span>{{timeFormat(nowDate, 'YYYY年MM月')}}</span>
        <van-icon name="arrow-down" />
      </div>
      <span>{{getTotalLnum}}</span>
    </div>
    <div>
        <van-field
          v-model="valueKey"
          center
          class="field"
          clearable
          placeholder="请输入关键字"
        >
        <template #button>
          <van-button  @click="onConfirm" type="danger">搜索</van-button>
        </template>
      </van-field>
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
      <div class="gas-item">
        <div class="top-info">
          <div class="gas-name">
            加油点：{{gasItem.oilName}}
          </div>
          <div class="gas-oil-num">
            {{gasItem.oilLnum }}升
          </div>
        </div>
        <div class="bottom-info">
          <div class="gas-time">
            {{timeFormat(gasItem.createdAt, 'YYYY-MM-DD HH:mm:ss')}}
          </div>
          <div class="car-no">
            {{gasItem.carNo}}
          </div>
        </div>
      </div>
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
import { getCurrentCarOwnerGasRecord } from '@/api/carOwner/oil'
import dayjs from 'dayjs';
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';
import { getAllOilSitesList } from '@/api/oils'
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

  private oilvalue: string = '';

  private gasRecord: any = [];

  private nowDate: Date = new Date();

  private activeName: string[] = [];

  private valueKey: string = '';

  private onConfirm() {
    this.serachObj = {
      isWhole: true,
      ...this.serachObj,
    }
    this.getAllOilSitesList();
  };

  private currentDate: Date = dayjs().toDate();

  private minDate: Date = dayjs().subtract(2, 'year').toDate();

  private maxDate: Date = dayjs().toDate();

  private oilList: any = [];

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

  get getTotalLnum() {
    if (this.gasRecord?.length) {
      const num = this.gasRecord.reduce((pre: any, next: any)=> {
        return new BigNumber(pre).plus(next.oilLnum)
      }, 0)
      return ('总共' + num + '升');
    }
    return '';
  }

  private async created() {
    this.serachObj.isWhole = true;
    this.oilList = await getAllOilSitesList();
  }

  private onLoad() {
    this.serachObj.queryPage+=1;
    this.getAllOilSitesList();
  }

  private serachObj: any = {
    perPage: 10,
    queryPage: 1,
    oilName: '',
    oilId: '',
    userId: '', // 用户id
    carNo: '', // 车牌号
  }

  get serachParams() {
    let obj: any = pickBy(this.serachObj);
    if (this.valueKey) {
      obj.valueKey = this.valueKey
    }
    return obj;
  }

  private confirm(date: Date) {
    this.nowDate = dayjs(date).toDate();
    this.isShowDate = false;
    this.serachObj.isWhole = true;
    this.getAllOilSitesList();
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

  private async getAllOilSitesList() {
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
      let result: any = await getCurrentCarOwnerGasRecord({
        isEncrypt: true,
        jsonObject: {
          ...this.serachParams,
          time: dayjs(this.nowDate).valueOf(),
        }
      });
      result = result.map((item: any) => {
        if (item.oilImg) {
          item.oilImg = [
            {
              url: item.oilImg
            }
          ]
        }
        return item;
      })
      if (isWhole) {
        this.loading = false;
      }
      if (result && result.length < this.serachObj.perPage) {
        this.gasFinished = true;
      } else {
        this.gasFinished = false;
      }
      this.gasLoading = false;
      if (isWhole) {
        this.gasRecord = result;
      } else {
        this.gasRecord = [...this.gasRecord, ...result];
      }
    } catch (error) {
      if (isWhole) {
        this.loading = false;
      }
      console.log(error, 'error')
    }
  }

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
    this.getAllOilSitesList();
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

.gas-item
  font-size 18px
  margin 0 16px
  padding 12px 0
  color #333
  border-bottom 1px solid #e8e8e8

.top-info, .bottom-info
  display flex
  justify-content space-between

.bottom-info
  margin-top 12px

.gas-oil-num
  color #f00

.field
  height 50px
</style>