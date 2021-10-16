
<template>
  <div>
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
import { getCurrentUserAllDrivesList } from '@/api/carOwner/users'
import { delUserItemById } from '@/api/users'

@Component
export default class adminCarOwners extends Vue {

  private usersList: any = [];

  private created() {
    this.getAllUserList();
  }

  private async getAllUserList() {
    const result =await getCurrentUserAllDrivesList();
    this.usersList = result;
  }

  private async delUserItemById(id: string){
    await delUserItemById(id);
    this.getAllUserList();
  }

  private async editUserItemById(id: string){
    this.$router.push({ path: '/car-manage-drives', query: {id, scene: 'update'}})
  }

}

</script>
<style lang='stylus' scoped>
</style>