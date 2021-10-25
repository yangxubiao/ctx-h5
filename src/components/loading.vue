<template>
  <div
    class="loading"
  >
    <van-loading
      size="24px"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
}
</script>

<style lang="stylus" scoped>
.loading
  height 100vh
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  display flex
  flex-direction column
  justify-content center
  align-items center
  .logo
    width 200px
    margin-top 20px
    img
      width 100%
</style>
