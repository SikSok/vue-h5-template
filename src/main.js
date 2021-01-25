// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false

// axios包装
import axiosAPI from '@/utils/axios'
Vue.use(axiosAPI) // axios包装
// 引入自定义 字符串format方法
import '@/utils/format.js'
// 引入全局过滤器
import '@/utils/filters.js'
// 引入全局事件
import '@/utils/function.js'
// 全局引入UI库 vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
// 引入css编译器
import 'less'
// 引入svg
import SvgIcon from '@/components/SvgIcon/index.vue' // svg组件
Vue.component('svg-icon', SvgIcon)
import '@/components/SvgIcon/index.js'
if (process.env.NODE_ENV === 'development') {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
} else {
  document.addEventListener(
    'deviceready',
    function() {
      new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
      })
    },
    false
  )
}
