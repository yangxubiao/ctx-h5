<template>
  <Loading v-if="pageLoading" />
  <div v-else class="wrapper">
  <van-form @submit="throttleSubmit" class="container">
  <van-field
    v-if="!isFromScan"
    readonly
    clickable
    name="picker"
    :value="formObj.oilName"
    label="加油点"
    class="field"
    placeholder="点击选择加油点"
    :disabled="isFromScan"
    @click="handlerPicker"
    :rules="[{ required: true, message: '请选择加油点' }]"
  />
  <van-field 
    v-model="formObj.oilLnum" 
    type="number" 
    label="加油升数" 
    class="field"
    placeholder="请输入加油升数"
    :rules="[{ required: true, message: '请输入加油升数' }]"
  />
  <van-field 
    name="uploader" 
    label="加油图片"
    class="field"
  >
  <template #input>
    <van-uploader max-count='1' v-model="uploader" :after-read="afterRead"/>
  </template>
</van-field>
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
import { getAllOilSitesList } from '@/api/oils'
import { getCurrentUser } from '@/api/carOwner/users'
import { createOilRecord } from '@/api/driver/oil'
import { uploadFile } from '@/api/home'
import debounce from 'lodash/debounce';
import JumpToPageVue from '@/components/jumpToPage.vue'
import { getUserById, updateUser } from '@/api/users'
import Loading from '@/components/loading.vue';
import BigNumber from 'bignumber.js';

@Component({
  components: {
    JumpToPageVue,
    Loading,
  }
})
export default class GasVue extends Vue {

  get pageInfo() {
    return {
      name: 'driverGas',
      title: '加油记录'
    }
  }

  private pageLoading: boolean = true

  private showPicker: boolean = false

  private loading: boolean = false

  private columns: any = [];

  private uploader: any = [];

  get dynamicColumns() {
    return this.columns;
  }

  private uploader1: any =[];

  private value: string = ''

  private userInfo: any = {};

  private formObj: any = {
    userId: '', // 用户id
    carNo: '', // 车牌号
    carName: '', // (对与驾驶员和车老板必填)
    carId: '', // (对与驾驶员和车老板必填)
    carProxyFee: '', //  (车老板必填)
    oilName: '', // (对于加油工必填）
    oilId: '',  // (对于加油工必填）
    oilProxyFee: '', // (对于加油工必填）
    oilLnum: '', // 加油升数
    oilImg: '', // 加油图片
    phone: '', // 手机号
    gasMode: '', // 加油模式
  }

  private throttleSubmit = debounce(() => {
    this.onSubmit()
  }, 500)

  private async onSubmit() {
    if (Number(this.formObj.oilLnum) <= 0) {
      this.$toast('加油升数不能小于0')
      return;
    }
    // if (!this.formObj.oilImg) {
    //   this.$toast('加油图片未上传')
    // }
    if (this.userInfo?.gasMode === 'divide') {
        if (new BigNumber(this.userInfo?.availableLum || 0).minus(this.formObj.oilLnum).toNumber() < 0) {
          this.$toast('可用升数不足，请先充值 !')
          return;
        }
    }

    this.$dialog.confirm({
      title: '',
      message: `<div>加油点: <span class="oil-text">${this.formObj.oilName} </span></div><div>加油升数: <span class="oil-text">${this.formObj.oilLnum}</span> 升 ?</div>`,
      beforeClose: this.beforeCloseDialog,
    })
  }

  private async beforeCloseDialog(action: any, done: any) {
    if (action === 'confirm') {
        try {
        if (this.userInfo?.gasMode === 'divide') {
          const result = await updateUser({
            isEncrypt: true,
            jsonObject: {
              _id: this.userInfo?._id,
              availableLum: (new BigNumber(this.userInfo?.availableLum || 0).minus(this.formObj.oilLnum).toFixed(2).toString()),
            }
          })
        }
        const result: any = await createOilRecord({
          ...this.formObj,
        });
        this.$toast('加油成功')
        done();
        this.$router.push({
          name: 'driverGasResult',
          query: {
            id: result._id,
          }
        });
      } catch (error) {
        done();
      }
    } else {
      done();
    }
  }

  private async afterRead(files: any) {
    files.status = 'uploading';
    files.message = '上传中...';
    var formData = new FormData();
    const newFile: any = await (this as any).$compression(files.file);
    formData.append("file", newFile.file);
    const result: any = await uploadFile(formData)
    files.status = 'done';
    this.formObj.oilImg = result.url;
  }

  private onConfirm(obj: any) {
    this.formObj = {...this.formObj, ...obj.value}
    this.showPicker = !this.showPicker;
  }

  private async handlerPicker() {
    if (this.isFromScan) {
      this.$toast('扫码不能手动修改加油点')
      return;
    }
    this.columns = [];
    this.loading = true;
    this.showPicker = !this.showPicker;
    let result: any = await getAllOilSitesList();
      result = result.map((item: any) => (
        {
          text: item.name,
          value: {
            oilName: item.name,
            oilId: item._id,
            oilProxyFee: item.proxyFee,
          }
        }
      ))
    this.columns = result;
    this.loading = false;
  }
  get isFromScan() {
    return (this.$route.query?.userId && this.$route.query?.toPage === 'driverGasManage')
  }

  private async created() {
    if (this.isFromScan) {
      const gasInfo: any = await getUserById((this.$route.query.userId as string));
      this.formObj.oilName = gasInfo.gasName;
      this.formObj.oilId = gasInfo.gasId;
      this.formObj.oilProxyFee = gasInfo.gasProxyFee;
    }
    const result: any = await getCurrentUser();
    this.userInfo = result;
    this.formObj.carNo = result.carNo;
    this.formObj.carName = result.carName;
    this.formObj.carId = result.carId;
    this.formObj.carProxyFee = result.carProxyFee;
    this.formObj.userId = result._id;
    this.formObj.gasMode = result.gasMode;
    this.formObj.phone = result.phone;
    this.pageLoading = false;
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

.field
  margin-top 20px
</style>
<style lang='stylus'>
.oil-text
  color #f00
  font-size 18px
  font-weight bold
</style>