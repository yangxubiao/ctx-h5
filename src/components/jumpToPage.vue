<template>
  <div class="jump-to-page">
    <van-cell :title="pageInfo.title" is-link @click="jumpToPage" />
  </div>
</template>

<script lang='ts'>
import {
  Vue,
  Component,
  Prop,
} from 'vue-property-decorator';

@Component
export default class JumpToPageVue extends Vue {
  @Prop({
    type: Object,
  })
  private pageInfo: any;

  private jumpToPage() {
    this.$router.push({
        name: this.pageInfo.name,
    })
  }
}

</script>

<style lang="stylus" scoped>
.jump-to-page {
  position: fixed;
  bottom 80px;
  left 20px;
  right 20px;
}
</style>