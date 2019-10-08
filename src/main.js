import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import api from './utils/api'
import utils from './utils/utils'

// css
import './assets/css/common.css'

// ElementUI 全局引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
