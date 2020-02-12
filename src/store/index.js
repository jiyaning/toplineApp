import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const USER_KEY = 'hm-toutiao-m-user'

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(USER_KEY) || '{}')
  },
  mutations: {
    // 更改用户信息
    updateUser (state, data) {
      state.user = data
      localStorage.setItem(USER_KEY, JSON.stringify(data))
    },
    // 清空用户信息
    clearUser (state, data) {
      state.user = {}
      localStorage.removeItem(USER_KEY)
    }
  },
  actions: {},
  modules: {}
})
