/* 这里面进行axios的封装(携带Token) */
import axios from 'axios'
/* 根据需要来确定，使用formData的方式提交的数据是否需要进行序列化的操作 */
import QS from 'qs' // npm i qs --save
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 公共请求前缀
  timeout: 60000, // 请求超时时间
  method: 'POST', // 请求方法(deafult值)
  transformRequest: [
    // 对当前请求的格式进行判断
    function(data, headers) {
      headers['Content-Type'] = headers['Content-Type'] || 'application/json'
      if (headers['Content-Type']) {
        if (headers['Content-Type'] === 'muitipart/form-data') {
          return data
        } else if (headers['Content-Type'].includes('application/json')) {
          return JSON.stringify(data)
        }
      }
      return QS.stringify(data, { indices: false })
    }
  ]
})
// 请求拦截
service.interceptors.request.use(config => {
  // const token = getItem('token')
  // if (token) {
  //   config.headers['Authorization'] = `Bearer ${token}`
  // }
  return config
}, error)
// 响应拦截
service.interceptors.response.use(response => {
  const { custom } = response.data
  if (custom && custom.code !== 0) {
    return Promise.resolve(response.data)
  } else {
    // Promise.reject()
  }
}, error)
// 错误集中处理方法
const error = error => {
  return Promise.reject(error)
}
export default service
