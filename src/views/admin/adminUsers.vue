
<template>
  <Loading v-if="loading" />
  <div 
    class="wrapper"
    v-else
  >
    <van-dropdown-menu>
      <van-dropdown-item @change="roleChange" v-model="roleVlue" :options="roleOption" />
    </van-dropdown-menu>
    <van-list
      class="common-list"
      v-model="userLoading"
      :finished="userFinished"
      @load="onLoad"
    >
      <van-swipe-cell  
        v-for="(userItem, userIndex) in usersList"
        :key="userIndex"
      >
        <van-cell :title="userItem.name " :value="userItem.roleName"/>
        <template #right>
          <van-button square type="danger" text="删除" @click="delUserItemById(userItem)" />
          <van-button square type="primary" text="编辑" @click="editUserItemById(userItem._id)" />
        </template>
      </van-swipe-cell>

      <template #finished>
        没有更多了, <span @click="addUser" class="add-user">点击这里添加更多用户</span>
      </template>
    </van-list>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllUserList, delUserItemById } from '@/api/users'
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';

@Component({
  components: {
    Loading,
  }
})
export default class adminCarOwners extends Vue {

  private usersList: any = [];

  private roleVlue: string = '';

  private loading: boolean = true;

  private userLoading: boolean = false;

  private userFinished: boolean = false;

  private serachform: any = {
    perPage: 10,
    queryPage: 1,
    roleNo: '',
  }

  private onLoad() {
    this.serachform.queryPage+=1;
    this.getAllUserList();
  }

  get serachParams() {
    return pickBy(this.serachform);
  }

  private async getAllUserList() {
    try {
        const result: any = await getAllUserList(this.serachParams);
        if (result && result.length < this.serachform.perPage) {
          this.userFinished = true;
        } else {
          this.userFinished = false;
        }
        this.userLoading = false;
        this.usersList = [...this.usersList, ...result];
    } catch (error) {
      console.log(error, 'error')
    }
  }

  private roleChange(value: any) {
    this.serachform.roleNo = value;
    this.getUsersByCondition({
      isWhole: true,
      roleNo: value,
    })
  }

  private async getUsersByCondition(prarams: any) {
    if (prarams.isWhole) {
      this.serachform = {
        perPage: 10,
        queryPage: 1,
        roleNo: this.serachform.roleNo,
      }
    }
    const result: any = await getAllUserList(this.serachParams);
    if (result && result.length < this.serachform.perPage) {
      this.userFinished = true;
    } else {
      this.userFinished = false;
    }
    this.usersList = result;
  }

  private roleOption: any = [
    { text: '全部', value: '' },
    { text: '管理员', value: '0' },
    { text: '车队', value: '1' },
    { text: '驾驶员', value: '2' },
    { text: '加油工', value: '3' },
  ];

  private async delUserItemById(userItem: any){
    this.$dialog.confirm({
      title: '删除用户',
      message: `确定要删除 ${userItem.name} 用户吗 ?`,
    })
    .then(async () => {
      await delUserItemById(userItem._id);
      this.$toast('删除成功')
      this.getUsersByCondition({
        isWhole: true,
      })
    }).catch(()=>{})
  }

  private async mounted() {
    const result = await getAllUserList(this.serachParams);
    this.usersList = result;
    this.loading = false;
  }

  private async editUserItemById(id: string){
    this.$router.push({ path: '/admin-manage-users', query: {id, scene: 'update'}})
  }

  private async addUser(){
    this.$router.push({ path: '/admin-manage-users', query: {scene: 'add'}})
  }

}

</script>
<style lang='stylus' scoped>
.wrapper
  background-color #fff

.add-user
  color #00f
</style>