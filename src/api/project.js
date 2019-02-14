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

// 修改项目信息 { "projectId" : 1, "name": "xx", "host": "xxx", enable: true or false }
export function changeProjectInfo(params) {
  return request({
    url: '/api/admin/project/update',
    method: 'post',
    data: params
  })
}

// 删除项目 { "projectId" : 1 }
export function deleteProject(params) {
  return request({
    url: '/api/admin/project/delete',
    method: 'post',
    data: params
  })
}
