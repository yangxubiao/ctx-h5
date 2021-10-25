
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper">
    <van-dropdown-menu>
      <van-dropdown-item @change="oilChange" v-model="oilvalue" :options="oilOption" :key="1" />
      <van-dropdown-item @change="carChange" v-model="carValue" :options="carsOption" :key="2"  />
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
      class="container"
    >
      <van-swipe-cell  
        v-for="(gasItem, gasIndex) in gasRecord"
        :key="gasIndex"
      >
        <van-collapse v-model="activeName">
          <van-collapse-item :name="gasIndex">
            <template #title>
              <div class="title">
                <div>
                  {{gasItem.carNo}}
                </div>
                <div>
                  {{gasItem.oilLnum + '升'}}
                </div>
              </div>
            </template>
                <van-field label="车队名称" :value="gasItem.carName" readonly />
                <van-field label="加油点" :value="gasItem.oilName" readonly />
                <van-field label="加油时间" :value="timeFormat(gasItem.createdAt, 'YYYY年MM月DD号 HH:mm:ss')" readonly />
                <van-field name="uploader" label="加油图片" readonly>
                  <template #input>
                    <van-uploader 
                      v-model="gasItem.oilImg" 
                      disabled 
                      max-count="1"
                      :deletable="false"
                    />
                  </template>
                </van-field>
          </van-collapse-item>
        </van-collapse>
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
import { getAllGasRecords } from '@/api/oils'
import dayjs from 'dayjs';
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';
import { getAllCarsList } from '@/api/cars';
import { getAllOilSitesList } from '@/api/oils'

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

  private carValue: string = '';

  private oilvalue: string = '';

  private gasRecord: any = [];

  private nowDate: Date = new Date();

  private activeName: string[] = [];

  private currentDate: Date = dayjs().toDate();

  private minDate: Date = dayjs().subtract(2, 'year').toDate();

  private maxDate: Date = dayjs().toDate();

  private carsList: any = [];

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

  private async created() {
    this.serachObj.isWhole = true;
    this.carsList = await getAllCarsList();
    this.oilList = await getAllOilSitesList();
  }

  private onLoad() {
    this.serachObj.queryPage+=1;
    this.getAllOilSitesList();
  }

    private serachObj: any = {
    perPage: 10,
    queryPage: 1,
    carName: '',  // 车队名称
    carId: '',  // 车队Id
    oilName: '',
    oilId: '',
  }

  get serachParams() {
    return pickBy(this.serachObj);
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

    if(this.serachObj.carName === '车队名称') {
      delete this.serachObj.carName
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
      let result: any = await getAllGasRecords({
        isEncrypt: true,
        jsonObject: {
          ...this.serachParams,
          time: dayjs(this.nowDate).valueOf(),
        }
      });
      result = result.map((item: any) => {
        item.oilImg = [
          {
            url: item.oilImg
          }
        ]
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

  private carChange(value: any) {
    let serachObj = this.carsList.find((item: any) => item._id === value) || {};
    if(serachObj) {
      serachObj = {
        carName: serachObj.name,
        carId: serachObj._id,
      }
    };
    this.serachObj = {
      ...this.serachObj,
      ...serachObj,
      isWhole: true,
    }
    this.getAllOilSitesList();
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
  font-size 14px
  background-color #fff
  color #323233
</style>