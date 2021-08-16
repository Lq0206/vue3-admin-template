/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 11:33:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 11:22:01
 */
import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import ls from '@/utils/local-ls'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
      ls.set(key, value)
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
