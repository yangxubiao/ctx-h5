<template>
  <div class="wrapper">
    <van-form @submit="throttleSubmit" class="container">
      <van-field
        v-model="formObj.name"
        name="name"
        label="车队名"
        placeholder="请输入车队名"
        class="field"
        :rules="[{ required: true, message: '请输入车队名' }]"
      />
      <van-field 
        v-model="formObj.proxyFee" 
        type="number" 
        label="代加费" 
        placeholder="请输入代加费"
        class="field"
        :rules="[{ required: true, message: '请输入代加费' }]"
      >
        <template #extra>
          毛
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <JumpToPageVue :pageInfo="pageInfo"/>
    </van-form>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { createCarOwner } from '@/api/cars'
import debounce from 'lodash/debounce';
import JumpToPageVue from '@/components/jumpToPage.vue'

@Component({
  components: {
    JumpToPageVue,
  }
})
export default class addCarOwner extends Vue {

  get pageInfo() {
    return {
      name: 'adminCarOwners',
      title: '车队记录'
    }
  }
  private formObj: any = {
    proxyFee: '',
    name: '',
  };

  private throttleSubmit = debounce(() => {
    this.onSubmit()
  }, 500)

  private async onSubmit() {
    if (Number(this.formObj.proxyFee) <= 0) {
      this.$toast('代加费不能小于0')
      return;
    }
    this.$dialog.confirm({
      title: '',
      message: `<div>确认要添加: <span class="focus-text">${this.formObj.name}</span></div><div>代加费为: <span class="focus-text">${this.formObj.proxyFee}</span> 毛 ?</div>`,
      beforeClose: this.beforeCloseDialog,
    })
  }

  private async beforeCloseDialog(action: any, done: any) {
    if (action === 'confirm') {
      try {
        await createCarOwner({
          isEncrypt: true,
          jsonObject: this.formObj
        });
        this.$toast('添加成功');
        done();
        this.$router.push({
          name: 'adminCarOwners'
        })
      } catch (error) {
        done();
      }
    } else {
      done();
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '~@/stylus/mixin.styl'
.wrapper
  height 100%
  width 100%
  flexStyle(flexDirection: column)

.container
  width 90%

.field
  margin-top 20px
</style>
<style lang='stylus'>
.focus-text
  color #f00
  font-size 18px
  font-weight bold
</style>