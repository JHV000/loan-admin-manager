import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Service} from '../config/service'
Vue.prototype.$axios= Service
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; 


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
