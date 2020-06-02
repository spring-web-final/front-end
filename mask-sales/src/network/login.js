import {request} from './request'

export function login(formData) {
  return request.post('/login',formData)
}