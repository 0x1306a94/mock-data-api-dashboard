import request from '@/utils/request'

export function getProject(pageNo, pageSize, type) {
  return request({
    url: '/api/admin/project/list',
    method: 'get',
    params: {
      pageNo,
      pageSize,
      type
    }
  })
}
