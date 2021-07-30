/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-22 14:23:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 17:13:12
 */
import axios from 'axios'
import store from '@/store'
// import { getCurrentInstance } from 'vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    console.log('err', data)
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
  if (!response.data.status) {
    console.log('res', response)
  }
  return response.data
}, err)

export default service
