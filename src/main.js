import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import MyIcon from '@/components/MyIcon'
import '@/style/index.less'
import FollowUser from '@/components/FollowUser'
import './components'
// 过滤器的作用：将已有的数据进行格式化处理
// 一次性把filter/index.js中所有的按需导出全部导出
// 作为obj的属性
// 批量创建过滤器，好处：创建新的过滤器，代码简单，只需要写一个普通的函数按需导出就可以了
import * as obj from '@/filter'
Vue.component(FollowUser.name, FollowUser)// 全局组件注册方式，前面是组件名，后面是组件的实例
console.log(obj)

Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.config.productionTip = false

Vue.use(Vant)
Vue.component('MyIcon', MyIcon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
