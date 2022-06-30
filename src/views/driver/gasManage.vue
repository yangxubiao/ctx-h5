<template>
  <div class="wrapper">
    系统正在维护，于7月1号凌晨，开启服务，请耐心等待！！！
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
  width 100%
  color #ffffff
  display flex
  justify-items center
  align-items center
  text-align center
</style>