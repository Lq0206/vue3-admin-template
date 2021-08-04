/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-22 14:23:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 15:14:56
 */
import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
// import { getCurrentInstance } from 'vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

const err = (error) => {
  if (error.response) {
    // const data = error.response.data
    console.log('err', error)
  }
  return Promise.reject(error)
}

/* request */
service.interceptors.request.use(config => {
  const token = store.getters.token
  if (token) {
    config.headers['access-token'] = token
  }
  return config
}, err)

/* response */
service.interceptors.response.use(response => {
  if (!response.status && !response.data.status) {
    ElMessage({
      type: 'error',
      message: response.data.message,
      duration: 4000
    })
  }
  return response.data
}, err)

export default service
