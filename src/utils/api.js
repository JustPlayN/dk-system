import axios from 'axios'
import utils from './utils'
import store from '../store'

let request = axios.create()
request.defaults.withCredentials = true
request.defaults.headers = {
  'Access-Control-Allow-Origin': '*'
}
request.interceptors.response.use((response) => {
  let res = response.data
  if (res.code === '00000') {
    return res
  } else if (res.code === '-1') {
    utils.setCookie('userInfo', '')
    utils.setCookie('token', '', 86400)
    utils.setCookie('roleId', '', 86400)
    store.dispatch('putUserInfo', {})
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
