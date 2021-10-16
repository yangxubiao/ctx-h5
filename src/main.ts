import Vue from 'vue';
import {
  Button,
  Grid,
  GridItem,
  Form,
  Field,
  CellGroup,
  Cell,
  Picker,
  Popup,
  DropdownMenu,
  DropdownItem,
  Uploader,
  Lazyload,
} from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/utils/axios';
import '@/utils/encrypt';
import 'vant/lib/index.css';

Vue.use(Lazyload);
Vue.use(Uploader);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
