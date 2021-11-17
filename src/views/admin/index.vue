<template>
  <div class="wrapper">
    <van-grid :column-num="3" :gutter="20">
      <van-grid-item
        v-for="(gridItem, gridIndex) in grids"
        :key="gridIndex"
        :icon="gridItem.img" 
        @click='jumpPage(gridItem.page)' 
        :text="gridItem.name" 
      />
    </van-grid>
    <div class="password">
      <van-cell title="修改密码" is-link @click="jumpPage('password')" />
    </div>
    <LoginOut />
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import LoginOut from '@/components/loginOut.vue'

@Component({
  components: {
    LoginOut
  }
})
export default class adminIndex extends Vue {

  private usersIcon = require('@/assets/svg/users.svg');

  private oilsIcon = require('@/assets/svg/oils.svg');

  private recordsIcon = require('@/assets/svg/records.svg');

  private trucksIcon = require('@/assets/svg/trucks.svg');

  private chargesIcon = require('@/assets/svg/charges.svg');

  private oilCleanIcon = require('@/assets/svg/oilClean.svg');

  private grids = [
    {
      name: '用户',
      page: 'adminManageUsers',
      img: this.usersIcon,
    },
    {
      name: '车队',
      page: 'adminAddCarOwner',
      img: this.trucksIcon,
    },
    {
      name: '加油',
      page: 'adminAddOil',
      img: this.oilsIcon,
    },
    {
      name: '充值页',
      page: 'adminManageRecharge',
      img: this.chargesIcon,
    },
    {
      name: '加油记录页',
      page: 'adminGas',
      img: this.recordsIcon,
    },
    {
      name: ' 进油记录页',
      page: 'adminOilCleanManage',
      img: this.oilCleanIcon,
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
@import '~@/stylus/mixin.styl'
.wrapper
  height 100%
  width 100%
  flexStyle(flexDirection: column, justifyContent: space-around)

.password
  width 100%
  padding 20px
</style>