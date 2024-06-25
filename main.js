import App from './App'
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from './store';
import {setStorage} from './common/storage.js';

import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.$store = store;
Vue.config.productionTip = false;
setStorage('initialState', store.state);
App.mpType = 'app';
const app = new Vue({
	store,
  ...App
})


// 引入请求封装，将app参数传递到配置中，需要在new Vue得到Vue实例之后
require('common/request.js')(app);

app.$mount()