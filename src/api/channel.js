import request from '@/utils/request.js'

export function apiChannelList () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}
