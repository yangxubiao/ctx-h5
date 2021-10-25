<template>
  <div class="wrapper">
    <van-form @submit="throttleSubmit" class="container">
  <van-field
    v-model="formObj.name"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="formObj.phone"
    name="手机号"
    label="手机号"
    placeholder="手机号"
    :rules="[{ required: true, message: '请输入手机号' }]"
  />
  <van-field
    readonly
    clickable
    name="picker"
    :value="formObj.freeName"
    label="冻结状态"
    placeholder="点击选择冻结状态"
    @click="handlerPicker('10')"
    :rules="[{ required: true, message: '请选择冻结状态' }]"
  />
  <van-field
    v-if="scene !== 'update'"
    v-model="formObj.password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <van-field
    v-if="scene !== 'update'"
    v-model="formObj.confirmPassWord"
    type="password"
    name="确认密码"
    label="确认密码"
    placeholder="确认密码"
    :rules="[{ required: true, message: '确认密码' }]"
  />
  <van-field
    v-model="formObj.carNo"
    name="车牌号"
    label="车牌号"
    placeholder="车牌号"
    :rules="[{ required: true, message: '请填写车牌号' }]"
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
</van-form>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { createUser, getUserById, updateUser } from '@/api/users'
import { getCurrentUser } from '@/api/carOwner/users'
import debounce from 'lodash/debounce';

@Component
export default class adminRegister extends Vue {

  private showPicker: boolean = false

  private loading: boolean = false

  private columns: any = [];

  private currentUserInfo: any;

  private defaultRoleColumns() {
    return [{
      text: '未冻结',
      value: {
        freeName: '未冻结',
        freeStatus: '0',
      }
    },
    {
      text: '已冻结',
      value: {
        freeName: '已冻结',
        freeStatus: '1',
      }
    }]
  }

  get dynamicColumns() {
    return this.columns;
  }

  private value: string = ''

  private formObj: any = {
    name: '', // 必填
    phone: '', // 必填
    freeName: '未冻结',
    freeStatus: '0', // 0 未冻结, 1已冻结
    password: '', // 必填
    confirmPassWord: '', // 必填
    roleName: '驾驶员', // 必填
    roleNo: '2', // 必填
    carNo: '', // 车牌号
    carName: '', // (对与驾驶员和车老板必填)
    carId: '', // (对与驾驶员和车老板必填)
  }

  private throttleSubmit = debounce(() => {
    this.onSubmit()
  }, 500)

  private async onSubmit() {
    const { confirmPassWord, ...rest } = this.formObj;
    if (this.scene === 'add') {
      if (this.formObj.password.trim() !== this.formObj.confirmPassWord.trim()) {
        return this.$toast('密码不一致,请重新填写');
      }
      await createUser({
        isEncrypt: true,
        jsonObject: {
          ...rest,
          carId: this.currentUserInfo.carId,
          carName: this.currentUserInfo.carName,
        }
      })
    } else {
      await updateUser({
        isEncrypt: true,
        jsonObject: rest
      })
    }

    this.$router.push({
      name: 'carDrives'
    })

  }

  //  当前角色
  get currentRole() {
    return this.formObj.roleNo;
  }

  private onConfirm(obj: any) {
    this.formObj = {...this.formObj, ...obj.value}
    this.showPicker = !this.showPicker;
  }

  private async handlerPicker(str: string) {
    this.columns = [];
    this.loading = true;
    this.showPicker = !this.showPicker;
    let result: any = this.defaultRoleColumns();
    this.columns = result;
    this.loading = false;
  }

  get scene() {
    return this.$route.query.scene;
  }

  private async created() {
    if (this.scene === 'update') {
      const result = await getUserById((this.$route.query.id as string));
      this.formObj = result;
    } else {
      this.currentUserInfo =  await getCurrentUser();
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