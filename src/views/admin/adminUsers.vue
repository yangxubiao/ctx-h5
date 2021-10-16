
<template>
  <div>
    <div @click="addUser">
      添加
    </div>
  <van-cell-group>
    <van-cell 
      v-for="(userItem, userIndex) in usersList"
      :key="userIndex"
      :title="userItem.name"
    >
      <div @click="delUserItemById(userItem._id)">
        删除
      </div>
      <div @click="editUserItemById(userItem._id)">
        编辑
      </div>
    </van-cell>
  </van-cell-group>`
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getAllUserList, delUserItemById } from '@/api/users'

@Component
export default class adminCarOwners extends Vue {

  private usersList: any = [];

  private created() {
    this.getAllUserList();
  }

  private async getAllUserList() {
    const result =await getAllUserList();
    this.usersList = result;
  }

  private async delUserItemById(id: string){
    await delUserItemById(id);
    this.getAllUserList();
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
</style>