
<template>
  <Loading v-if="loading" />
  <div v-else class="wrapper">
    <div class="form-date"  @click="toggleDate">
      <div>
        <span>{{timeFormat(nowDate, 'YYYY年MM月')}}</span>
        <van-icon name="arrow-down" />
      </div>
      <span>{{getTotalLnum}}</span>
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
                <van-field label="加油时间" :value="timeFormat(gasItem.createdAt, 'YYYY年MM月DD号 HH:mm:ss')" readonly />
                <van-field
                  v-if="gasItem.oilImg"
                  name="uploader"
                  label="加油图片"
                  readonly
                >
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
import { getCurrentGasSiteRecord } from '@/api/oils/oil'
import dayjs from 'dayjs';
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';
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

  private gasRecord: any = [];

  private nowDate: Date = new Date();

  private activeName: string[] = [];

  private currentDate: Date = dayjs().toDate();

  private minDate: Date = dayjs().subtract(2, 'year').toDate();

  private maxDate: Date = dayjs().toDate();

  private async created() {
    this.serachObj.isWhole = true;
  }

  private addOilRecord() {
    this.$router.push({ path: '/driver-gas-manage'})
  }

  private onLoad() {
    this.serachObj.queryPage+=1;
    this.getAllOilSitesList();
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

  private serachObj: any = {
    perPage: 10,
    queryPage: 1,
    userId: '', // 用户id
    carNo: '', // 车牌号
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
      let result: any = await getCurrentGasSiteRecord({
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

.add-oil-record
  color #00f
</style>