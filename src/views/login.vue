<template>
<div class="wrapper">
  <div class="logo-text">
    车行通
  </div>
  <div class="container">
    <van-form @submit="throttleSubmit()">
      <van-field
        v-model="name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        class="field"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        class="field"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</div>

</template>

<script lang='ts'>
import {
Vue,  Component
} from 'vue-property-decorator';
import { login } from '@/api/users'
import { setLocalData } from '@/utils/local'
import debounce from 'lodash/debounce';
import { getCurrentUser } from '@/api/carOwner/users'

@Component
export default class Login extends Vue {

  private name: string = '';

  private password: string = '';

  private throttleSubmit = debounce(() => {
    this.onSubmit()
  }, 500)

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
    const userInfo: {
      [key: string]: any;
    } = await getCurrentUser();
    setLocalData(
        {
          key: 'userInfo',
          value: userInfo,
        },
    );
    if (this.$route?.query?.toPage) {
      this.$router.replace({
        name: (this.$route.query.toPage as string),
        query: {
          ...this.$route.query,
          from: 'login'
        }
      });
    } else {
      this.$router.replace({path: '/'});
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
  .title
    margin-bottom 30px
    color #fff

.container
  width 90%

.field
  margin-top 20px
</style>