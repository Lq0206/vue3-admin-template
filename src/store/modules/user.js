/*
 * @Descripttion: use store
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-07 10:43:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 15:39:44
 */
// import { createStore } from 'vuex'
import { TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem(TOKEN, token)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        commit(`SET_${TOKEN}`, userInfo.username)
        resolve(true)
      })
    },
    LoginOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit(`SET_${TOKEN}`, '')
        localStorage.setItem(TOKEN, '')
        resolve()
      })
    },
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', ['admin', 'user'])
        resolve({ roles: ['admin', 'user'] })
      })
    },
    resetToken() {
      console.log('resetToken')
    }
  }
}
export default user
