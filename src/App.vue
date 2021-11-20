<template>
  <div id="app">
    <router-view />
    <van-tabbar v-if="isNotShowTabbar" v-model="active" class="tabbar">
      <van-tabbar-item   to="/" icon="home-o">首页</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang='ts'>
import {
  Vue,
  Component,
  Watch
} from 'vue-property-decorator';
@Component
export default class App extends Vue {

  private active: number = 0;

  private isNotShowTabbar: boolean = false;

  @Watch('$route')
  private routerChange(to: any) {
    this.isNotShowTabbar = !(['login', 'admin', 'carOwner', 'driver', 'oiler', 'carOilDivideManage'].includes(to.name))
  }
}
</script>
<style scoped lang="stylus">
#app
  background-image url('./assets/img/bg.jpeg')
  background-size 100% 100%
  width 100%
  height 100%
</style>