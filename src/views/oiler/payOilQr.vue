
<template>
  <div class="pay-oil-qr">
    <vue-qr colorDark="#4994df"  :text="getQrInfo()" :size="300"></vue-qr>
  </div>
</template>

<script lang='ts'>
import {
Vue,  Component,
} from 'vue-property-decorator';
import { getLocalData } from '@/utils/local';
import VueQr from 'vue-qr'

@Component({
  components: {
    VueQr,
  }
})
export default class PayOilQr extends Vue {

  private getQrInfo() {
    const userInfo = getLocalData('userInfo');
    return (process.env.VUE_APP_API_SCAN_GALLING_LINK + userInfo._id)
  }

}

</script>
<style lang='stylus' scoped>
.pay-oil-qr
  height 100vh
  display flex
  justify-content center
  align-items center
</style>