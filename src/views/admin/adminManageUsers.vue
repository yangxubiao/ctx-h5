<template>
  <div class="wrapper">
  <van-form @submit="throttleSubmit" class="container">
  <van-field
    v-model="formObj.name"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    class="field"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="formObj.phone"
    name="手机号"
    label="手机号"
    placeholder="手机号"
    class="field"
    :rules="[{ required: true, message: '请输入手机号' }]"
  />
  <van-field
    readonly
    clickable
    name="picker"
    :value="formObj.freeName"
    label="冻结状态"
    placeholder="点击选择冻结状态"
    @click="handlerPicker('10')"
    class="field"
    :rules="[{ required: true, message: '请选择冻结状态' }]"
  />
  <van-field
    v-if="scene !== 'update'"
    v-model="formObj.password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    class="field"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <van-field
    v-if="scene !== 'update'"
    v-model="formObj.confirmPassWord"
    type="password"
    name="确认密码"
    label="确认密码"
    placeholder="确认密码"
    class="field"
    :rules="[{ required: true, message: '确认密码' }]"
  />
  <van-field
    readonly
    clickable
    name="picker"
    :value="formObj.roleName"
    label="角色"
    placeholder="点击选择角色"
    @click="handlerPicker('11')"
    class="field"
    :rules="[{ required: true, message: '请选择角色' }]"
  />
  <van-field
    v-if="['1', '2'].includes(currentRole)"
    readonly
    clickable
    name="picker"
    :value="formObj.carName"
    label="车队"
    placeholder="点击选择车队"
    class="field"
    @click="handlerPicker('1')"
    :rules="[{ required: true, message: '请选择车队' }]"
  />
  <van-field
    v-if="currentRole === '3'"
    readonly
    clickable
    name="picker"
    :value="formObj.gasName"
    label="加油点"
    placeholder="点击选择加油点"
    @click="handlerPicker('3')"
    class="field"
    :rules="[{ required: true, message: '请选择加油点' }]"
  />
  <van-field
    v-if="currentRole === '2'"
    v-model="formObj.carNo"
    name="车牌号"
    label="车牌号"
    placeholder="车牌号"
    class="field"
    :rules="[{ required: true, message: '请填写车牌号' }]"
  />
  <van-popup v-model="showPicker" position="bottom">
    <van-picker
      show-toolbar
      :columns="dynamicColumns"
      :loading="loading"
      @confirm="onConfirm"
      @cancel="showPicker = false"
    />
  </van-popup>
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
import { getAllCarsList } from '@/api/cars'
import { getAllOilSitesList } from '@/api/oils'
import { createUser, getUserById, updateUser } from '@/api/users'
import debounce from 'lodash/debounce';
import JumpToPageVue from '@/components/jumpToPage.vue'

@Component({
  components: {
    JumpToPageVue,
  }
})
export default class adminRegister extends Vue {

  get pageInfo() {
    return {
      name: 'adminUsers',
      title: '用户记录'
    }
  }

  private showPicker: boolean = false

  private loading: boolean = false

  private columns: any = [];

  private defaultRoleColumns(str: string) {
    return (str === '10' ?
    [{
      text: '未冻结',
      value: {
        freeName: '未冻结',
        freeStatus: '0',
      }
    },
    {
      text: '已冻结',
      value: {
        freeName: '已冻结',
        freeStatus: '1',
      }
    }] :
    [{
      text: '管理员',
      value: {
        roleName: '管理员',
        roleNo: '0',
      }
    },
    {
      text: '车队',
      value: {
        roleName: '车队',
        roleNo: '1',
      }
    },
    {
      text: '驾驶员',
      value: {
        roleName: '驾驶员',
        roleNo: '2',
      }
    },
    {
      text: '加油工',
      value: {
        roleName: '加油工',
        roleNo: '3',
      }
    }])
  }

  get dynamicColumns() {
    return this.columns;
  }

  private  value: string = ''

  private formObj: any = {
    name: '', // 必填
    phone: '', // 必填
    freeName: '未冻结',
    freeStatus: '0', // 0 未冻结, 1已冻结
    password: '', // 必填
    confirmPassWord: '', // 必填
    roleName: '', // 必填
    roleNo: '', // 必填
    carNo: '', // 车牌号
    carName: '', // (对与驾驶员和车老板必填)
    carId: '', // (对与驾驶员和车老板必填)
    carProxyFee: '', //  (车老板必填)
    gasName: '', // (对于加油工必填）
    gasId: '',  // (对于加油工必填）
    gasProxyFee: '', // (对于加油工必填）
  }

  private throttleSubmit = debounce(() => {
    this.onSubmit()
  }, 500)

  private async onSubmit() {
    if (this.scene !== 'update') {
      if (this.formObj.password.trim() !== this.formObj.confirmPassWord.trim()) {
        return this.$toast('密码不一致,请重新填写');
      }
    }
    this.$dialog.confirm({
      title: '',
      message: `<div>${this.scene !== 'update' ? '添加' : '修改'} <span class="focus-text">${this.formObj.name}</span> 吗?</div>`,
      beforeClose: this.beforeCloseDialog,
    })
  }

  private async beforeCloseDialog(action: any, done: any) {
    const { confirmPassWord, ...rest } = this.formObj;
    if (action === 'confirm') {
      try {
        if (this.scene !== 'update') {
          const result = await createUser({
            isEncrypt: true,
            jsonObject: rest
          })
          this.$toast('添加成功');
        } else {
          const result = await updateUser({
            isEncrypt: true,
            jsonObject: rest
          })
        }
        done();
        this.$toast('编辑成功');
        this.$router.push({
          name: 'adminUsers'
        })
      } catch (error) {
        done();
      }
    } else {
      done();
    }
  }

  //  当前角色
  get currentRole() {
    return this.formObj.roleNo;
  }

  private onConfirm(obj: any) {
    this.formObj = {...this.formObj, ...obj.value}
    if (!['未冻结', '已冻结'].includes(obj.text)) {
      if(this.currentRole === '0') {
        this.formObj = {
          ...this.formObj,
          ...{
          carName: '',
          carId: '',
          carNo: '',
          carProxyFee: '',
          gasName: '',
          gasId: '',
          gasProxyFee: '',
        }}
      } else if (this.currentRole === '1') {
        this.formObj = {
          ...this.formObj,
          ...{
          carNo: '',
          gasName: '',
          gasId: '',
          gasProxyFee: '',
        }}
      } else if (this.currentRole === '2') {
        this.formObj = {
          ...this.formObj,
          ...{
          gasName: '',
          gasId: '',
          gasProxyFee: '',
        }}
      } else if (this.currentRole === '3') {
        this.formObj = {
          ...this.formObj,
          ...{
          carName: '',
          carId: '',
          carNo: '',
          carProxyFee: '',
        }}
      }
    }
    this.showPicker = !this.showPicker;
  }

  private async handlerPicker(str: string) {
    this.columns = [];
    this.loading = true;
    this.showPicker = !this.showPicker;
    let result: any = this.defaultRoleColumns(str);
    if (str === '1') {
      result = await getAllCarsList();
    } else if (str === '3'){
      result = await getAllOilSitesList();
    }

    if (['1', '3'].includes(str)) {
      result = result.map((item: any) => (
        {
          text: item.name,
          value: {
            [(str === '1' ? 'carName' : 'gasName')]: item.name,
            [(str === '1' ? 'carId' : 'gasId')]: item._id,
            [(str === '1' ? 'carProxyFee' : 'gasProxyFee')]: item.proxyFee,
          }
        }
      ))
    }

    this.columns = result;
    this.loading = false;
  }

  get scene() {
    return this.$route.query.scene;
  }

  private async created() {
    if (this.scene === 'update') {
      const result = await getUserById((this.$route.query.id as string));
      this.formObj = result;
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
</style>
<style lang='stylus'>
.focus-text
  color #f00
  font-size 18px
  font-weight bold
</style>