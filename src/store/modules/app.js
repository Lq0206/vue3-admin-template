/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-16 18:08:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 11:19:07
 */
// import Cookies from 'js-cookie'
import ls from '@/utils/local-ls'

const app = {
  state: {
    sidebar: {
      opened: ls.get('sidebarStatus')
        ? !!+ls.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: ls.get('size') || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        ls.set('sidebarStatus', 1)
      } else {
        ls.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      ls.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
      ls.set('size', size)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app

