<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getLocalData } from '@/utils/local'

@Component
export default class Home extends Vue {
  private created() {
  const userInfo = getLocalData('userInfo');
    if (!userInfo) {
      this.$toast("登录失效，请重新登录")
      this.$router.replace({ name: 'login' });
    }
    const routerMap: any = {
      '0': 'admin',
      '1': 'carOwner',
      '2': 'driver',
      '3': 'oiler',
    };
    this.$router.replace({
      name: routerMap[userInfo['roleNo']]
    })
  }
}
</script>
