<template>
<div class="wrapper">
    <van-form @submit="throttleSubmit" class="container">
    <van-field
      readonly
      clickable
      name="picker"
      :value="formObj.name"
      label="车队负责人"
      placeholder="点击选择车队负责人"
      @click="handlerPicker('1')"
      :rules="[{ required: true, message: '请选择车队负责人' }]"
    />
    <van-field
      readonly
      clickable
      name="picker"
      :value="formObj.carName"
      label="车队名"
      placeholder="车队名"
      @click="handlerPicker('2')"
      :rules="[{ required: true, message: '请选择车队名' }]"
    />
    <van-field 
      v-model="formObj.chargeTunnage" 
      type="digit" 
      label="吨数" 
      @input="chargeTunnageInput"
      placeholder="请输入吨数"
      :rules="[{ required: true, message: '请输入吨数' }]"
    />
    <van-field
      readonly
      clickable
      name="picker"
      :value="formObj.settleName"
      label="结清状态"
      placeholder="点击选择结清状态"
      @click="handlerPicker('3')"
      :rules="[{ required: true, message: '请选择结清状态' }]"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="dynamicColumns"
        :loading="loading"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
  <JumpToPageVue :pageInfo="pageInfo"/>
</van-form>
</div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllCarslist } from '@/api/users'
import { BigNumber } from 'bignumber.js';
import { createRecharge, getRechargeById, updateRecharge } from '@/api/recharges'
import debounce from 'lodash/debounce';
import JumpToPageVue from '@/components/jumpToPage.vue'

@Component({
  components: {
    JumpToPageVue,
  }
})
export default class adminManageRecharge extends Vue {

  get pageInfo() {
    return {
      name: 'adminRecharge',
      title: '充值记录'
    }
  }

  private columns: any = [];

  private loading: boolean = false

  private defaultRoleColumns() {
    return [{
      text: '未结清',
      value: {
        settleName: '未结清',
        settleStatus: '0',
      }
    },
    {
      text: '已结清',
      value: {
        settleName: '已结清',
        settleStatus: '1',
      }
    }];
  }

  get dynamicColumns() {
    return this.columns;
  }

  private async handlerPicker(str: string) {
    this.columns = [];
    this.loading = true;
    this.showPicker = !this.showPicker;
    let result: any = this.defaultRoleColumns();
    if (['1', '2'].includes(str)) {
      result = await getAllCarslist();
      result = result.map((item: any) => (
        {
          text: str === '1' ? item.name : item.carName,
          value: {
            name: item.name,
            nameId: item._id,
            carName: item.carName,
            carId: item.carId,
            proxyFee: item.carProxyFee,
          }
        }
      ))
    }

    this.columns = result;
    this.loading = false;
  }

  get scene() {
    return this.$route.query.scene;
  }

  private throttleSubmit = debounce(() => {
    this.onSubmit()
  }, 500)

  private async onSubmit() {
    if (this.scene !== 'update') {
      const result = await createRecharge({
        isEncrypt: true,
        jsonObject: this.formObj
      });
      this.$toast('添加成功')
    } else {
      const result = await updateRecharge({
        isEncrypt: true,
        jsonObject: this.formObj
      })
      this.$toast('编辑成功')
    }
    this.$router.push({
      name: 'adminRecharge'
    })
  }

  private onConfirm(obj: any) {
    this.formObj = {...this.formObj, ...obj.value};
    this.showPicker = !this.showPicker;
  }

  private showPicker: boolean = false;

  private formObj = {
    name: '', // 负责人姓名
    nameId: '', // 负责人Id
    carName: '',  // 车队姓名
    carId: '',  // 车队Id
    proxyFee: '', // 代加费
    chargeTunnage: '',
    chargeLnum: '',
    settleName: '',
    settleStatus: '',
  }

  private chargeTunnageInput(value: string) {
    this.formObj.chargeLnum = ((new BigNumber(value).multipliedBy(process.env.VUE_APP_API_DEFAULT_L_NUM)).toString())
  }

  private async created(){
    if (this.scene === 'update') {
      const result: any = await getRechargeById((this.$route.query.id as string));
      this.formObj = result;
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'
.wrapper
  height 100%
  width 100%
  flexStyle(flexDirection: column)

.container
  width 90%
</style>