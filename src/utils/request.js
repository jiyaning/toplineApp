import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
// 导入路由，使得可以执行路由跳转
import router from '@/router/index.js'

// 创建一个axios实例 和原来的axios没有关系
const instance = axios.create({
  // 请求根地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 请求完毕的数据【转换器】，超大整型数字多转换处理的
  transformResponse: [function (data) {
    try {
      // 报错，就说明data是空字符串，parse处理不来，会被catch捕捉处理
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
// 配置【请求拦截器】
instance.interceptors.request.use(function (config) {
  // 判断token存在再做配置(vuex判断)
  if (store.state.user.token) {
    // 注意：token前边有 'Bearer ' 的信息前缀
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 配置【响应拦截器】
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (err) {
    return response.data
  }
}, function (error) {
  if (error.response.status === 401) {
    router.push('/login')
    return new Promise(function () {}) // 空的Promise对象，没有机会执行catch，进而不做错误提示了
  }
  return Promise.reject(error)
})

export default instance
