<template>
  <div class="wrapper">
    请截图保存，使用微信扫一扫即可加油
    <img class="applet-qr" src="../../assets/img/appletQr.jpeg" alt="">
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';

@Component
export default class GasVue extends Vue {
}
</script>
<style lang='stylus' scoped>
.wrapper
  height 100vh
  width 100vw
  display flex
  justify-content center
  align-items center
  font-size 24px
  color #ffffff
  flex-direction column
  text-align center
  padding 0 40px

.applet-qr
  width 240px
  height 440px
  margin-top 10px
</style>