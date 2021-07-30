/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 11:33:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-20 10:47:38
 */
const errorLog = {
  state: {
    logs: []
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    },
    CLEAR_ERROR_LOG: (state) => {
      state.logs.splice(0)
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    },
    clearErrorLog({ commit }) {
      commit('CLEAR_ERROR_LOG')
    }
  }
}

export default errorLog
