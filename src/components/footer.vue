<template>
  <div class="footer">
      <a class="footer-text" href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021032936号-1</a>
  </div>
</template>

<script lang='ts'>
import {
  Vue,
  Component,
} from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
}

</script>

<style lang='stylus' scoped>

.footer
  position absolute
  bottom 5px
  left 0
  right 0
  text-align center

.footer-text
  display inline-block
  font-size 14px
  color #8590a6
</style>