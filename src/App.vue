<template>
  <div id="app">
    <router-view />
    <van-tabbar v-if="isNotShowTabbar" v-model="active" class="tabbar">
      <van-tabbar-item   to="/" icon="home-o">首页</van-tabbar-item>
    </van-tabbar>
    <Footer />
  </div>
</template>

<script lang='ts'>
import {
  Vue,
  Component,
  Watch
} from 'vue-property-decorator';
import Footer from './components/footer.vue';

@Component({
  components: {
    Footer,
  }
})
export default class App extends Vue {

  private active: number = 0;

  private isNotShowTabbar: boolean = false;

  @Watch('$route')
  private routerChange(to: any) {
    this.isNotShowTabbar = !(['login', 'admin', 'carOwner', 'driver', 'oiler'].includes(to.name))
  }
}
</script>
<style scoped lang="stylus">
#app
  background-color #000
  background-size 100% 100%
  width 100%
  height 100%

.tabbar
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
</style>