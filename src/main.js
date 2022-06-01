import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/style/style.scss";

import App from './App.vue'
import router from './router'
import store from './store'
import Service from './utils'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.Service = Service

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
