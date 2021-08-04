/*
 * @Descripttion: 全局数据持久化
 * @version: Vue实例挂载时执行该函数将本地存在的数据同步到vuex中
 * @Author: Lqi
 * @Date: 2020-10-16 10:23:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 16:15:54
 */
import store from '@/store/'

import { TOKEN } from '@/store/mutation-types'

export default function Initializer() {
  store.commit('SET_TOKEN', localStorage.getItem(TOKEN))
  localStorage.getItem('theme') !== 'null' && store.commit('settings/CHANGE_SETTING', { key: 'theme', value: localStorage.getItem('theme') })
}
