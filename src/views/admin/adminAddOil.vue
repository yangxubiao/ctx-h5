<template>
  <div class="wrapper"> 
    <van-form @submit="throttleSubmit" class="container">
      <van-field
        v-model="formObj.name"
        name="name"
        label="加油点名称"
        placeholder="请输入加油点名称"
        class="field"
        :rules="[{ required: true, message: '请输入加油点名称' }]"
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
import { createOilSite } from '@/api/oils'
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
      name: 'adminOil',
      title: '加油点记录'
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
    await createOilSite({
      isEncrypt: true,
      jsonObject: this.formObj
    });
    this.$toast('添加成功');
    this.$router.push({
      name: 'adminOil'
    })
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