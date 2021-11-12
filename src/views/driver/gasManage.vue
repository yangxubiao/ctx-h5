<template>
  <div class="wrapper">
  <van-form @submit="throttleSubmit" class="container">
  <van-field
    readonly
    clickable
    name="picker"
    :value="formObj.oilName"
    label="加油点"
    placeholder="点击选择加油点"
    @click="handlerPicker"
    :rules="[{ required: true, message: '请选择加油点' }]"
  />
  <van-field 
    v-model="formObj.oilLnum" 
    type="number" 
    label="加油升数" 
    placeholder="请输入加油升数"
    :rules="[{ required: true, message: '请输入加油升数' }]"
  />
  <van-field 
    name="uploader" 
    label="加油图片"
    :rules="[{ required: true, message: '请上传加油图片' }]"
  >
  <template #input>
    <van-uploader max-count='1' v-model="uploader"  :after-read="afterRead"/>
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

@Component({
  components: {
    JumpToPageVue,
  }
})
export default class GasVue extends Vue {

  get pageInfo() {
    return {
      name: 'driverGas',
      title: '加油记录'
    }
  }

  private showPicker: boolean = false

  private loading: boolean = false

  private columns: any = [];

  private uploader: any = [];

  get dynamicColumns() {
    return this.columns;
  }

  private uploader1: any =[];

  private  value: string = ''

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
  }

  private throttleSubmit = debounce(() => {
    this.onSubmit()
  }, 500)

  private async onSubmit() {
    if (!this.formObj.oilImg) {
      this.$toast('加油图片未上传')
    }
    await createOilRecord({
      ...this.formObj,
    });
    this.$toast('加油成功')
    this.$router.push({
      name: 'driverGas'
    });
  }

  private async afterRead(files: any) {
    files.status = 'uploading';
    files.message = '上传中...';
    var formData = new FormData();
    formData.append("file", files.file);
    const result: any = await uploadFile(formData)
    files.status = 'done';
    this.formObj.oilImg = result.url;
  }

  private onConfirm(obj: any) {
    this.formObj = {...this.formObj, ...obj.value}
    this.showPicker = !this.showPicker;
  }

  private async handlerPicker() {
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

  private async created() {
    const result: any = await getCurrentUser();
    this.formObj.carNo = result.carNo;
    this.formObj.carName = result.carName;
    this.formObj.carId = result.carId;
    this.formObj.carProxyFee = result.carProxyFee;
    this.formObj.userId = result._id;
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