
<template>
  <Loading v-if="loading" />
  <div  v-else class="wrapper">
    <van-dropdown-menu>
      <van-dropdown-item @change="nameChange" v-model="nameValue" :options="newNameOption" />
    </van-dropdown-menu>
    <van-list
      v-model="userLoading"
      :finished="userFinished"
      @load="onLoad"
      class="common-list"
    >
      <van-swipe-cell  
        v-for="(userItem, userIndex) in usersList"
        :key="userIndex"
      >
        <van-cell :title="userItem.name" :label="userItem.carNo">
          <div class="extra-info">
              <a :href="'tel:'+userItem.phone">{{ userItem.phone }}</a>
              <span class="gas-mode-class">
                {{userItem.gasModeName}}
              </span>
          </div>
        </van-cell>
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
import { getCurrentUserAllDrivesList } from '@/api/carOwner/users'
import { delUserItemById } from '@/api/users'
import Loading from '@/components/loading.vue';
import pickBy from 'lodash/pickBy';
import BigNumber from 'bignumber.js';
import { getLocalData } from '@/utils/local';
import { divideOil } from '@/api/carOwner/oil';

@Component({
  components: {
    Loading,
  }
})
export default class adminCarOwners extends Vue {

  private usersList: any = [];

  private usersALl: any = [];

  private nameValue: string = '';

  private roleVlue: string = '';

  private loading: boolean = true;

  private userLoading: boolean = false;

  private userFinished: boolean = false;

  private nameOption: any = [
    { text: '全部', value: '' },
  ];

  get newNameOption() {
    let defaultList = [{ text: '全部', value: '' }];
    if(this.usersALl.length) {
      defaultList = [...defaultList, ...this.usersALl.map((item: any)=> ({ text: item.name, value: item.name }))];
    }
    return defaultList;
  }

  private serachform: any = {
    perPage: 10,
    queryPage: 1,
    name: '',
  }

  private nameChange(value: any) {
    this.serachform.name = value;
    this.getUsersByCondition({
      isWhole: true,
      name: value,
    })
  }

  private async getUsersByCondition(prarams: any) {
    if (prarams.isWhole) {
      this.serachform = {
        perPage: 10,
        queryPage: 1,
        name: this.serachform.name,
      }
    }
    const result: any = await getCurrentUserAllDrivesList(this.serachParams);
    if (result && result.length < this.serachform.perPage) {
      this.userFinished = true;
    } else {
      this.userFinished = false;
    }
    this.usersList = result;
  }

  get serachParams() {
    return pickBy(this.serachform);
  }

  private onLoad() {
    this.serachform.queryPage+=1;
    this.getAllUserList();
  }

  private async created() {
    const result = await getCurrentUserAllDrivesList(this.serachParams);
    const allUsers = await getCurrentUserAllDrivesList({
      isWhole: true,
    });
    this.usersALl = allUsers;
    this.usersList = result;
    this.loading = false;
  }

  private async getAllUserList() {
    try {
        const result: any = await getCurrentUserAllDrivesList(this.serachParams);
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

  private async delUserItemById(userItem: any){
    this.$dialog.confirm({
      title: '删除用户',
      message: `确定要删除 ${userItem.name} 用户吗 ?`,
    })
    .then(async () => {
      let availableLum = new BigNumber(userItem.availableLum).toNumber();
      if (userItem.gasMode === 'divide' &&  availableLum > 0) {
        const userInfo = getLocalData('userInfo');
        await divideOil({
          carId: userInfo.carId,
          lnum: String(availableLum),
          gasMode: 'div'
        })
      }
      await delUserItemById(userItem._id);
        this.$toast('删除成功')
        this.getUsersByCondition({
          isWhole: true,
        })
      const allUsers = await getCurrentUserAllDrivesList({
        isWhole: true,
      });
      this.usersALl = allUsers;
    }).catch(()=>{})
  }

  private addUser() {
    this.$router.push({ path: '/car-manage-drives', query: {scene: 'add'}})
  }

  private editUserItemById(id: string){
    this.$router.push({ path: '/car-manage-drives', query: {id, scene: 'update'}})
  }

}

</script>
<style lang='stylus' scoped>
.wrapper
  background-color: #fff

.add-user
  color #00f

.extra-info
  display flex
  flex-direction column

.gas-mode-class
  margin-top 4px
  color #969799
  font-size:16px
</style>