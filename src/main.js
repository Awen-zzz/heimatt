import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import MyIcon from '@/components/MyIcon'
import '@/style/index.less'
Vue.config.productionTip = false

Vue.use(Vant)
Vue.component('MyIcon', MyIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
