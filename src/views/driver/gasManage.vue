<template>
  <div class="wrapper">
    请截图保存，使用微信扫一扫即可加油
    <img class="applet-qr" src="../../assets/img/appletQr.jpeg" alt="">
    <JumpToPageVue class="bottom-jump" :pageInfo="pageInfo"/>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
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

.bottom-jump
  width 690px
  position relative
  top -40px
</style>