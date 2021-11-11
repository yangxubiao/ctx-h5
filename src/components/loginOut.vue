<template>
  <div>
    <van-button class="login-out" type="default" size="large" @click="loginOut">退出登录</van-button>
  </div>
</template>

<script lang='ts'>
import { setLocalData } from '@/utils/local';
import {
Vue,  Component,
} from 'vue-property-decorator';

@Component
export default class LoginOutVue extends Vue {
  private loginOut() {
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
.login-out
  width 90vw
  height 45px
</style>