/*
 * @Descripttion: 全局数据持久化
 * @version: Vue实例挂载时执行该函数将本地存在的数据同步到vuex中
 * @Author: Lqi
 * @Date: 2020-10-16 10:23:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 11:21:35
 */
import store from '@/store/'
import ls from '@/utils/local-ls'

import { TOKEN } from '@/store/mutation-types'

export default function Initializer() {
  store.commit('SET_TOKEN', ls.get(TOKEN))
  ls.get('theme') !== 'null' && store.commit('settings/CHANGE_SETTING', { key: 'theme', value: ls.get('theme') })
}
