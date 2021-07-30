/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-22 15:40:10
 */
import { createStore } from 'vuex'
// import user from './modules/user'
import getters from './getters'
// import createPersistedState from 'vuex-persistedstate'

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  modules,
  getters
})
