import axios from 'axios'

export function request() {
  const instance = axios.create({
    //接口地址待定
    baseURL:'http://127.0.0.1:8000',
    timeout:5000
  });
  return instance;
}
