/*
 * @Descripttion: use store
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-07 10:43:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 11:25:39
 */
// import { createStore } from 'vuex'
import { TOKEN } from '@/store/mutation-types'
import { postReq } from '@/api'
import router, { resetRouter } from '@/router'
import ls from '@/utils/local-ls'
// import { useStore } from '@/store'

const user = {
  state: {
    token: '',
    roles: [],
    userInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      ls.set(TOKEN, token)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, info) => {
      state.userInfo = info
    }
  },
  actions: {
    Login({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        postReq('/user/login', userInfo).then((res) => {
          commit(`SET_${TOKEN}`, res.data.token)
          dispatch('GetInfo')
          resolve(true)
        })
      })
    },
    LoginOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit(`SET_${TOKEN}`, '')
        ls.set(TOKEN, '')
        resetRouter()
        resolve()
      })
    },
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        postReq('/user/userInfo', { token: state.token }).then((res) => {
          commit('SET_ROLES', res.data.roles)
          commit('SET_USER_INFO', res.data)
          resolve(res.data)
        })
      })
    },
    async RolesChange({ commit, dispatch }, role) {
      /* token */
      const token = role + '-token'
      commit('SET_TOKEN', token)
      ls.set(TOKEN, token)
      resetRouter()
      /* roles */
      const { roles } = await dispatch('GetInfo')
      const accessRoutes = await dispatch('generateRoutes', roles)
      accessRoutes.forEach((item) => {
        router.addRoute(item)
      })
      dispatch('delAllViews', null)
    },
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        ls.remove('token')
        resolve()
      })
    }
  }
}
export default user
