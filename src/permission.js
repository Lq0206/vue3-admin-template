/*
 * @Descripttion: 项目权限控制
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 09:54:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 11:20:00
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'
import getPageTitle from '@/utils/get-page-title'
import { TOKEN } from './store/mutation-types'
import { whiteList } from '@/router/routeList'
import ls from '@/utils/local-ls'

NProgress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = ls.get(TOKEN)
  if (hasToken) {
    console.log(typeof hasToken)
  }
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      // greet()
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('GetInfo')
          const accessRoutes = await store.dispatch('generateRoutes', roles)
          /* vue-router 4 不只支持数组添加 */
          if (accessRoutes.length > 0) {
            router.addRoute(...accessRoutes)
            next({ ...to, replace: true })
          } else {
            next()
          }
        } catch (error) {
          await store.dispatch('resetToken')
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    const flag = whiteList.indexOf(to.path) !== -1
    if (flag) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

