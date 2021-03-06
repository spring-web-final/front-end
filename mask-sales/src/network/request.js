import request from './base'

export function login(formData) {
  return request.post('/login',formData);
}

export function getListData() {
  return request.post('/news/getList');
}

export function postAddForm(formData) {
  return request.post('/users/add',formData);
}

export function searchByOption(url, data) {
  return request.get(url,data);
}
