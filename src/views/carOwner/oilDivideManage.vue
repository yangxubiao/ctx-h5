
<template>
  <Loading v-if="loading" />
  <div  v-else class="wrapper">
    <van-grid :column-num="2" class="grid">
        <van-grid-item
          v-for="(gridItem, gridIndex) in grids"
          :key="gridIndex"
        >
          <template #icon>
            <p class="title"> {{ gridItem.name }}</p>
          </template>
          <template #text>
            <p v-if="gridItem.name==='可分配'" class="subtitle">{{ ableUseValue }}升</p>
            <p v-else class="subtitle"> {{ alredyUseValue }}升</p>
          </template>
        </van-grid-item>
    </van-grid>
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
    <ul
      class="common-list list"
    >
      <li
        v-for="(userItem, userIndex) in usersList"
        :key="userIndex"
        @click="clickUserItem(userItem)"
        class="item"
        :class="{'item-activited': isActivited(userItem._id)}"
      >
          <div 
              class="cars"
            >
              <p 
                class="card-title"
              > {{ userItem.carNo }}
              </p>
              <p class="card-title"> 剩余<span class="focus-text">{{carAvaliableLnum(userItem.availableLum)}}</span>升</p>
              <p 
                class="card-title"
              > {{ userItem.name }}
              </p>
            </div>
      </li>
    </ul>
    <div class="btns">
      <van-button class="btn" size="large" @click="submit('add')" type="danger">分油</van-button>
      &nbsp;&nbsp;&nbsp;&nbsp; 
      <van-button class="btn" size="large" @click="submit('div')" type="danger">扣油</van-button>
    </div>
      <van-dialog v-model="dialogShow" :title="dialogInfo.title" show-cancel-button @confirm="dialogConfirm">
          <div class="dialog-content">
            <van-cell 
              v-for="(contentItem, contentIndex) in dialogInfo.contentData"
              :key="contentIndex"
              :title="contentItem.name" 
              :value="contentItem.carNo"
            />
          </div>
          <van-field 
            v-model="lnum" 
            type="number" 
            input-align="right"
            :label="dialogInfo.title + '升数'" 
            class="field"
            :placeholder="'请输入'+ dialogInfo.title + '升数'"
          />
      </van-dialog>
    </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getCurrentUserAllDrivesList, updateMany } from '@/api/carOwner/users'
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';
import { stringToNumber } from '@/utils/string';
import { getLocalData } from '@/utils/local';
import { queryCarOwnerGasInfo } from '@/api/carOwner/summary';
import tween from '@/utils/tween';
import BigNumber from 'bignumber.js';
import { divideOil } from '@/api/carOwner/oil';
import { insertMany } from '@/api/carOwner/oilDivideRecord'

@Component({
  components: {
    Loading,
  }
})
export default class CarOilDivideManage extends Vue {

  private grids = [
    {
      name: '可分配',
    },
    {
      name: '已分配',
    },
  ]

  get getTotalLnum() {
    if (this.usersList?.length) {
      const num = this.usersList.reduce((pre: any, next: any)=> {
        return new BigNumber(pre).plus(next.availableLum)
      }, 0).toNumber()
      return num;
    }
    return 0;
  }
  private valueKey: string = '';

  private onConfirm() {
    this.getUsersByCondition();
  };
  // 额度值
  private ableUseValue: string = '0'

  // 额度值
  private alredyUseValue: string = '0'

  private usersList: any = [];

  private lnum: string = '';

  private usersALl: any = [];

  private dialogShow: boolean = false;

  private roleVlue: string = '';

  private loading: boolean = true;

  private gasInfo: any = null;

  private selectedIdx: string[] = [];

  private oilFlag: string = '';

  get avaliableLnum() {
    return this.gasInfo?.avaliableLnum || 0;
  }

  private nameOption: any = [
    { text: '全部', value: '' },
  ];

  private carAvaliableLnum(lum: any) {
    return (new BigNumber(lum).toFixed(2).toString())
  }

  /**
   * 数字每一帧滚动触发的回调
   */
  updateValue(tweenobj: { object: { tweeningValue: string } }) {
    this.ableUseValue = stringToNumber(tweenobj.object.tweeningValue).toFixed(2);
  }

  updateValue1(tweenobj: { object: { tweeningValue: string } }) {
    this.alredyUseValue = stringToNumber(tweenobj.object.tweeningValue).toFixed(2);
  }

  private mounted() {
    this.queryCarOwnerGasInfo();
  }

  private async queryCarOwnerGasInfo() {
    const userInfo = getLocalData('userInfo');
    const gasInfo = await queryCarOwnerGasInfo({
      isEncrypt: true,
      jsonObject: {
        carId: userInfo.carId,
        carName: userInfo.carName,
      }
    });
    this.loading = false
    this.gasInfo = gasInfo;
    // 动画开始
    tween(0, this.avaliableLnum, this.updateValue);
  }

  private submit(flag: string) {
    this.oilFlag = flag;
    if (!this.selectedIdx.length) {
      this.$toast('没有选中车辆')
      return ;
    }

    if (flag !== 'div') {
      if (Number(this.ableUseValue) <= 0) {
        this.$toast('对不起！请先充值 !')
        return;
      }
    }
    this.dialogShow = true;
  }

  get dialogInfo() {
    return {
      title: this.oilFlag === 'div' ? '扣油' : '分油',
      contentData: this.usersList.filter((item: any) => this.selectedIdx.includes(item._id))
    }
  }

  private async dialogConfirm() {
    if (!this.lnum) {
      this.$toast(`请输入${this.dialogInfo.title}升数`)
      return;
    }

    if (Number(this.lnum) <= 0) {
      this.$toast(`${this.dialogInfo.title}升数不能小于0`)
      return;
    }

    await this.getUsersByCondition();

    if (this.oilFlag !== 'div') {
      // 处理分油
      this.handleAddOil();
    } else {
      // 处理扣油
      this.handleDivOil();
    }
  }

  // 处理分油
  private async handleAddOil() {
    // 可分配的油
    let ableUseValue = new BigNumber(this.ableUseValue);
    let divideTotal = new BigNumber(this.lnum).multipliedBy(this.selectedIdx.length).toNumber();
    let num = ableUseValue.minus(divideTotal).toNumber();
    if (num < 0) {
      this.$toast('可分配的升数不足，请先充值 !')
      return;
    }

    const updateUsersInfo = this.usersList.filter((item: any) => this.selectedIdx.includes(item._id))
    this.loading = true;
    await updateMany({
      data: updateUsersInfo.map((item: any)=>({
        _id: item._id,
        availableLum: (new BigNumber(this.lnum).plus(item.availableLum).toFixed(2).toString()),
      }))
    })

    const userInfo = getLocalData('userInfo');
    await divideOil({
      carId: userInfo.carId,
      lnum: String(divideTotal),
      gasMode: 'divide'
    })

    await insertMany({
      data: updateUsersInfo.map((item: any)=>({
        mode: 'divide',
        lum: this.lnum,
        name: item.name,
        phone: item.phone,
        roleName: item.roleName,
        roleNo: item.roleNo,
        carName: item.carName,
        carId: item.carId,
        carProxyFee: item.carProxyFee,
        carNo: item.carNo,
      }))
    })
    await this.getUsersByCondition()
    await this.queryCarOwnerGasInfo();
    this.selectedIdx = [];
    this.lnum = ''
    this.$toast('分油成功')
    this.loading = false;
  }

  // 处理扣油
  private async handleDivOil() {
    // 选中的用户
    let updateUsersInfo = this.usersList.filter((item: any) => this.selectedIdx.includes(item._id));
    // 如果 扣除升数 大于 驾驶员的 剩余 可用升数 的 话，提示弹出
    const arr = updateUsersInfo.filter((item: any) => Number(item.availableLum) < Number(this.lnum));
    if (arr.length) {
      let html = '';
      for (let i = 0; i < arr.length; i ++) {
        html +=`<div class="handle-div-oil"><span class="focus-text">${arr[i].carNo}</span>剩余升数不足</div>`
      }
      this.$dialog.alert({
        title: '扣油失败原因',
        message: html,
        theme: 'round-button',
      }).then(() => {
      });
    } else {
      this.loading = true;
      await updateMany({
        data: updateUsersInfo.map((item: any)=>({
          _id: item._id,
          availableLum: (new BigNumber(item.availableLum).minus(this.lnum).toFixed(2).toString()),
        }))
      })
      const userInfo = getLocalData('userInfo');
      let divTotal = new BigNumber(this.lnum).multipliedBy(this.selectedIdx.length).toString();
      await divideOil({
        carId: userInfo.carId,
        lnum: divTotal,
        gasMode: 'div'
      })
      await insertMany({
        data: updateUsersInfo.map((item: any)=>({
          mode: 'div',
          lum: this.lnum,
          name: item.name,
          phone: item.phone,
          roleName: item.roleName,
          roleNo: item.roleNo,
          carName: item.carName,
          carId: item.carId,
          carProxyFee: item.carProxyFee,
          carNo: item.carNo,
        }))
      })
      await this.getUsersByCondition()
      await this.queryCarOwnerGasInfo();
      this.selectedIdx = [];
      this.lnum = ''
      this.$toast('扣油成功')
      this.loading = false;
    }
  }

  private serachform: any = {
    perPage: 10,
    queryPage: 1,
    name: '',
    gasMode: 'divide',
  }

  private isActivited(_id: string) {
    return this.selectedIdx.some((id: string) => id === _id)
  }

  private clickUserItem(user: any) {
    if(this.selectedIdx.some((id: string) => id === user._id)) {
      this.selectedIdx = this.selectedIdx.filter((id: string) => id !== user._id)
    } else {
      this.selectedIdx.push(user._id)
    }

  }

  private async getUsersByCondition() {
      this.serachform = {
        isWhole: true,
        name: this.serachform.name,
        gasMode: 'divide',
    }
    const result: any = await getCurrentUserAllDrivesList(this.serachParams);
    this.usersList = result;
    if (!this.usersALl.length) {
      this.usersALl = result;
    }
    tween(0, this.getTotalLnum, this.updateValue1);
  }

  get serachParams() {
    let obj: any = pickBy(this.serachform);
    if (this.valueKey) {
      obj.valueKey = this.valueKey
    }
    return obj;
  }

  private async created() {
    this.getUsersByCondition();
  }
}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'

.add-user
  color #00f

.title
  color #969799
  font-size 16px

.subtitle
  color #e1251b
  font-size 30px

.btns
  position fixed
  bottom 50px
  right 0
  left 0
  background-color #ffffff
  flexStyle(justifyContent: space-around)
  padding 20px 20px 0 20px
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)

.btn
  margin-bottom 20px

.list
  padding 20px
  height 60vh
  overflow-y auto
  flexStyle(justifyContent: space-between, alignItems: flex-start)
  flex-wrap wrap
  .item
    width 45%
    padding 20px
    margin-bottom 20px
    background-color #ffffff
    border-radius 12px

.focus-text
  color #f00
  font-size 18px
  font-weight bold

.cars
  flexStyle(flexDirection: column, justifyContent: space-around)

.card-title
  font-size 18px

.item-activited
  background-color: #fff4ee !important;
  border-radius 12px
  border 2px solid #ff663c
  color #ff663c !important

.dialog-content
  overflow-y auto
  max-height 200px

</style>
<style lang='stylus'>
.handle-div-oil
  .focus-text
    color #f00
    font-size 18px
    font-weight bold
</style>
