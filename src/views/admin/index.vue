<template>
  <div>
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
export default class adminIndex extends Vue {

  private grids = [
    {
      name: '用户',
      page: 'adminUsers',
    },
        {
      name: '车队',
      page: 'adminCarOwners',
    },
    {
      name: '加油',
      page: 'adminOil',
    },
    {
      name: '修改密码',
      page: 'password',
    },
    {
      name: '充值页',
      page: 'adminRecharge',
    },
    {
      name: '加油记录页',
      page: 'adminGas',
    },
  ]

  private pageMark: string = '';

  private jumpPage(str: string) {
    this.$router.push({
      name: str
    })
  };

}

</script>
<style lang='stylus' scoped>
</style>