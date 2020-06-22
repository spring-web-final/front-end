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

export function search(url) {
  return request.get(url);
}

export function register(formData) {
  return request.post('/register',formData);
}

export function change(formData) {
  return request.put('/update',formData);
}