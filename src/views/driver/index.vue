<template>
  <div>
    驾驶员
      <van-grid>
      <van-grid-item
        v-for="(gridItem, gridIndex) in grids"
        :key="gridIndex"
        icon="photo-o" 
        @click='jumpPage(gridItem.page)' 
        :text="gridItem.name" 
      />
    </van-grid>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
@Component
export default class DriverIndex extends Vue {
  private grids = [
    {
      name: '加油',
      page: 'driverGas',
    },
    {
      name: '修改密码',
      page: 'password',
    },
  ]

  private jumpPage(str: string) {
    this.$router.push({
      name: str
    })
  };
}

</script>
<style lang='stylus' scoped>
</style>