<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getCurrentUser } from '@/api/carOwner/users'

@Component
export default class Home extends Vue {
  private async created() {
    const result: {
      [key: string]: any;
    } = await getCurrentUser();
    const routerMap: any = {
      '0': 'admin',
      '1': 'carOwner',
      '2': 'driver',
      '3': 'oiler',
    };
    this.$router.replace({
      name: routerMap[result['roleNo']]
    })
  }
}
</script>
