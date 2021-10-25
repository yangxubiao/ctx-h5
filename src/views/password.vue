<template>
  <div class="wrapper">
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="passwordObj.oldPassword"
        type="password"
        name="原密码"
        label="原密码"
        placeholder="原密码"
        class="field"
        :rules="[{ required: true, message: '请填写原密码' }]"
      />
      <van-field
        v-model="passwordObj.password"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        class="field"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
        <van-field
        v-model="passwordObj.confirmPassWord"
        type="password"
        name="确认新密码"
        label="确认新密码"
        placeholder="确认新密码"
        class="field"
        :rules="[{ required: true, message: '请填写确认新密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form >
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { updataPassword } from '@/api/users';
import { setLocalData } from '@/utils/local'

@Component
export default class Password extends Vue {

  private passwordObj: any = {
    oldPassword: '',
    password: '',
    confirmPassWord: '',
  }

  private async onSubmit() {

    if (this.passwordObj.password.trim() !== this.passwordObj.confirmPassWord.trim()) {
      return this.$toast('密码不一致,请重新填写');
    }

    await updataPassword({
      isEncrypt: true,
      jsonObject: this.passwordObj
    });

    this.$toast('更新密码成功，请重新登录');
    setLocalData(
      {
        key: 'token',
        value: null,
      },
    );

    this.$router.replace({
      name: 'login'
    })
  }

}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'
.wrapper
  height 100%
  width 100%
  flexStyle(flexDirection: column)
  .form
    width 90%
    .field
      margin-top 20px
</style>