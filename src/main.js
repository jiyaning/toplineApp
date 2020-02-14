import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.min.js'
import '@/utils/validate.js' // 验证相关
import '@/assets/css/global.css'
import { Lazyload } from 'vant' // 导入懒加载模块
Vue.use(Lazyload) // 注册懒加载指令
Vue.use(Vant)
Vue.config.productionTip = false

// 创建一个延迟器，
// 给Vue增加继承成员，名称$sleep，
Vue.prototype.$sleep = time => {
    // 返回一个Promise对象，应用端可以设置async/await使得异步顺序执行
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve()
        }, time)
    })
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')