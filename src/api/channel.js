import request from '@/utils/request.js'

import store from '@/store' // 导入vuex模块，以便知道当前用户是否登录系统

// 本地持久化存储频道设置的key(游客 和 登录用户 分别设置)
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客key
const CHANNEL_KET_VIP = 'hm-channel-vip' // 登录用户Key

export function apiChannelAll () {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}

export function apiChannelList () {
  return new Promise(async (resolve) => {
    // 判断用户是否登录，并执行不同的key(localStorage)
    const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL

    // 获取本地频道数据
    const localChannels = localStorage.getItem(key)

    // localStorage内部存储的频道数据样子
    // [{id:xx,name:xx},{id:xx,name:xx}……]

    if (localChannels) {
      // 输出频道数据给外部
      resolve({ channels: JSON.parse(localChannels) })
    } else {
      // 频道没有被缓存
      const result = await request({
        url: '/app/v1_0/user/channels',
        method: 'get'
      })
      // 本地存储频道数据
      localStorage.setItem(key, JSON.stringify(result.channels))
      // 输出频道数据给外部
      resolve(result)
    }
  })
}

// 添加频道
export function apiChannelAdd (channel) {
  return new Promise(function (resolve) {
    const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL // 获取缓存的key
    const localChannels = localStorage.getItem(key) // 获取缓存
    if (localChannels) {
      // 缓存有数据
      const channels = JSON.parse(localChannels)
      channels.push(channel) // 添加
      // 重新写入缓存
      localStorage.setItem(key, JSON.stringify(channels))
      resolve() // 成功执行
    }
  })
}
// 删除频道
export function apiChannelDel (id) {
  return new Promise(function (resolve) {
    const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL // 获取缓存的key

    // 频道不能通过localStorage直接对"某个项目"做删除，必须取出来操作
    // 操作完毕再把数据更新给localStorage
    const localChannels = localStorage.getItem(key) // 获取缓存

    // 缓存有数据
    let channels = JSON.parse(localChannels)
    // 通过id，把被删除的频道中全部的数据里边排除出去
    channels = channels.filter(item => item.id !== id)

    // 重新写入缓存
    localStorage.setItem(key, JSON.stringify(channels))
    resolve() // 成功执行
  })
}
