import {request} from './base'

export function login(formData) {
  return request.post('/login',formData)
}

export function getListData() {
  return request.get('/users/getList/all')
}
