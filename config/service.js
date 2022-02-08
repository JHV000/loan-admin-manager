import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'
// const ConfigBaseURL = 'https://api.fmujie.cn' //默认路径，这里也可以使用env来判断环境
const ConfigBaseURL = 'https://sale.fmujie.cn'
let loadingInstance = null //这里是loading
var dd = localStorage.getItem('login_info')
console.log(dd);
// var access_token = dd ? "" : JSON.parse(dd).access_token 
//使用create方法创建axios实例


export var Service = axios.create({
  timeout: 10000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})
export function createService(access_token) {

  Service.defaults.headers.common["Authorization"] = "Bearer " + access_token
  // Service.defaults.headers = {
  //   "Authorization": "Bearer " + access_token,
  //   'content-type': 'application/x-www-form-urlencoded'
  // }


}

// 添加请求拦截器
Service.interceptors.request.use(config => {

  loadingInstance = Loading.service({
    lock: true,
    text: '加载中...'
  })
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  loadingInstance.close()
  // console.log(response)
  return response.data
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})