<template>
    <van-form @submit="onSubmit">
  <van-field
    v-model="name"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { login } from '@/api/users'
import { setLocalData } from '@/utils/local'

@Component
export default class Login extends Vue {

  private name: string = '';

  private password: string = '';

  private async onSubmit() {
    const result: any = await login({
      isEncrypt: true,
      jsonObject: {
        name: this.name,
        password: this.password
      }
    });
    setLocalData(
      {
        key: 'token',
        value: result.token,
      },
    );
    this.$router.push({path: '/'});
  }

}

</script>
<style lang='stylus' scoped>
</style>