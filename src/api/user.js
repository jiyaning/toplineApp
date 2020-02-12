import request from '@/utils/request.js'

export function apiUserLogin ({ mobile, code }) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: {
      // 对象成员简易赋值
      mobile, // mobile:mobile
      code // code:code
    }
  })
}
