import axios from 'axios'

let request = axios.create()
request.defaults.withCredentials = true
request.interceptors.response.use((response) => {
  let res = response.data
  if (res.code === 0) {
    return res
  } else if (res.status && res.status.code === 401) {
    // 登录
  } else {
    return res
  }
}, (error) => {
  return Promise.reject(error)
})

const api = {}

/**
 * @function post请求
 * @param body: post请求参数
 */
api.post = (url, data = {}) => {
  return request.post(url, data)
}

/**
 * @function get请求
 * @param params: get请求参数
 */
api.get = async (url, params = {}) => {
  return request.get(process.env.VUE_APP_API + url, params)
}

export default api
