import request from '@/utils/request'

export function login(userName, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/admin/user/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
