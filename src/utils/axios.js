// axios封装文件，定义全局API接口格式，在main.js中调用执行

import axios from 'axios'
import { Toast } from 'vant'
import store from '../store'

// 添加请求拦截器，在发送请求之前做些什么
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
    // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可
    return response.data
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 封装axios
function apiAxios(method, url, params, data) {
  const httpDefault = {
    method: method,
    url: url,
    params: params, // `params` 是即将与请求一起发送的 URL 参数
    data: JSON.stringify(data), // `data` 是作为请求主体被发送的数据
    timeout: 1000 * 60, // 超时响应
    withCredentials: false, // axios 默认不发送cookie，需要全局设置true发送cookie
    headers: {
      // 配置请求头
      'content-type': 'application/json',
      Authorization: store.getters.token
    }
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      // 封装数据返回成功提示函数
      .then(res => {
        resolve(res)
        return res
      })
      .catch(error => {
        let message = ''
        if (error.response) {
          if (error.response.data) {
            if (error.response.data.errors) {
              message = JSON.stringify(error.response.data.errors)
            } else if (error.response.data.error) {
              message = error.response.data.error
            } else if (error.response.data.detail) {
              message = error.response.data.detail
            } else {
              message = error.response.data
            }
          } else if (error.response.statusText) {
            message = error.response.statusText
          }
        } else {
          message = error.message
        }

        Toast(message)
        reject(message)
      })
  })
}

// 输出函数getAxios、postAxios、putAxios、patchAxios、deleteAxios，供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  install: function(Vue) {
    Vue.prototype.getAxios = (url, params, data) => apiAxios('GET', url, params, data)
    Vue.prototype.postAxios = (url, params, data) => apiAxios('POST', url, params, data)
    Vue.prototype.putAxios = (url, params, data) => apiAxios('PUT', url, params, data)
    Vue.prototype.patchAxios = (url, params, data) => apiAxios('PATCH', url, params, data)
    Vue.prototype.deleteAxios = (url, params, data) => apiAxios('DELETE', url, params, data)
  }
}
