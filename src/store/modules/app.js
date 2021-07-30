/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-16 18:08:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 16:56:39
 */
// import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: localStorage.getItem('sidebarStatus')
        ? !!+localStorage.getItem('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: localStorage.getItem('size') || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        localStorage.setItem('sidebarStatus', 1)
      } else {
        localStorage.setItem('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      localStorage.setItem('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
      localStorage.setItem('size', size)
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

