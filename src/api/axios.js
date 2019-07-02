import Axios from 'axios'
import Cookies from 'js-cookie'
import { API_BASE_URL, TOKEN_KEY } from '../config/api'
import { Message } from 'element-ui'
class httpRequest {
  constructor() {
    this.options = {
      method: '',
      url: ''
    }
  }
  // 请求拦截
  interceptors(instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // var token = Cookies.get(TOKEN_KEY)
      // if(token){
      //   config.params = {'token':token}
      // }
      // config.data = JSON.stringify(config.data);
      // config.headers = {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // }
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      const { data } = res
      if (res.status !== 200) {
        if (res.status === 401) {
          Cookies.remove(TOKEN_KEY)
        } else {
          if (data.msg) {
            console.log('data.msg', data.msg);
            Message({
              message: data.msg,
              duration: 1000,
              type: 'error'
            })
          }
        }
        return false
      }
      return data
    }, (error) => {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }

  // 创建实例
  create() {
    let conf = {
      baseURL: API_BASE_URL,
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }
    return Axios.create(conf)
  }
  // 请求实例
  request(options) {
    const instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    return instance(options)
  }
}

export default httpRequest
