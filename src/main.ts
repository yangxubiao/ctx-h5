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
  SwipeCell,
  Dialog,
  Loading,
  List,
  Icon,
  DatetimePicker,
  Collapse,
  CollapseItem,
  Tabbar,
  TabbarItem,
  Tabs,
  Tab,
} from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/utils/axios';
import '@/utils/encrypt';
import '@/utils/compressionImg';
import 'assets/css/global.css';
import 'vant/lib/index.css';
import 'vant/lib/index.less';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Lazyload);
Vue.use(Icon);
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
Vue.use(SwipeCell);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(List);
Vue.use(DatetimePicker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
