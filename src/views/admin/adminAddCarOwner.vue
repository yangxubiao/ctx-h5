<template>
  <van-form @submit="onSubmit">
  <van-field
    v-model="formObj.name"
    name="name"
    label="车队名"
    placeholder="请输入车队名"
    :rules="[{ required: true, message: '请输入车队名' }]"
  />
  <van-field 
    v-model="formObj.proxyFee" 
    type="number" 
    label="代加费" 
    placeholder="请输入代加费"
    :rules="[{ required: true, message: '请输入代加费' }]"
  >
    <template #extra>
      毛
    </template>
  </van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { createCarOwner } from '@/api/cars'

@Component
export default class addCarOwner extends Vue {
  private formObj: any = {
    proxyFee: '',
    name: '',
  };

  private async onSubmit() {
    const result = await createCarOwner({
      isEncrypt: true,
      jsonObject: this.formObj
    });
  }
}

</script>
<style lang='stylus' scoped>
</style>