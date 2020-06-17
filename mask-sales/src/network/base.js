import axios from 'axios'

const instance = axios.create({
  //接口地址待定
  baseURL: 'http://localhost:8081/ssm',
  timeout: 5000
});
export default instance;
