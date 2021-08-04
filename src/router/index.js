/*
 * @Descripttion: 系统路由
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 17:54:51
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layouts'
// import Power from '@/views/power/index.vue'

export const routes = [
  {
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  /* 全屏 */
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { roles: ['admin', 'visitor'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'el-icon-s-data', affix: true }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    name: 'table',
    meta: { title: 'Table', icon: 'el-icon-date', roles: ['admin', 'visitor'] },
    children: [
      {
        path: '/table/normalTable',
        component: () => import('@/views/table/normalTable'),
        name: 'normalTable',
        meta: { title: '普通表格', icon: '', roles: ['admin', 'visitor'] }
      },
      {
        path: '/table/proTable',
        component: () => import('@/views/table/proTable'),
        name: 'proTable',
        meta: { title: 'proTable', icon: '', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/userCenter',
    component: Layout,
    meta: {
      title: '个人页',
      icon: 'el-icon-user',
      roles: ['admin', 'visitor']
    },
    children: [
      {
        path: '/userManage',
        name: 'UserManage',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: '', roles: ['admin', 'visitor'] }
      },
      {
        path: '/setting',
        name: 'Setting',
        props: true,
        component: () => import('@/views/user/setting'),
        meta: { title: '个人设置', icon: '', roles: ['admin', 'visitor'] }
      }
    ]
  },
  {
    path: '/errorPage',
    component: Layout,
    meta: {
      title: '异常页',
      icon: 'el-icon-cherry',
      roles: ['admin', 'visitor']
    },
    children: [
      {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        name: '404',
        meta: { title: '404', icon: '', roles: ['admin', 'visitor'] }
      },
      {
        path: '/500',
        component: () => import('@/views/error-page/500.vue'),
        name: '500',
        meta: { title: '500', icon: '', roles: ['admin', 'visitor'] }
      }
    ]
  },
  {
    path: '/detailPage',
    component: Layout,
    meta: {
      title: '详情页',
      icon: 'el-icon-tickets',
      roles: ['admin', 'visitor']
    },
    children: [
      {
        path: '/details',
        component: () => import('@/views/details/index'),
        meta: { title: '详情页', icon: '', roles: ['admin', 'visitor'] }
      }
      // {
      //   path: '/adv-details',
      //   component: () => import('@/views/details/advanced'),
      //   meta: { title: '高级详情页', icon: '' }
      // }
    ]
  },
  {
    path: '/result',
    component: Layout,
    meta: {
      title: '结果页',
      icon: 'el-icon-tickets',
      roles: ['admin', 'visitor']
    },
    children: [
      {
        path: '/success',
        component: () => import('@/views/result/success'),
        meta: { title: '成功页', icon: '', roles: ['admin', 'visitor'] }
      },
      {
        path: '/failed',
        component: () => import('@/views/result/failed'),
        meta: { title: '失败页', icon: '', roles: ['admin', 'visitor'] }
      }
    ]
  },
  {
    path: '/power',
    component: Layout,
    name: 'power',
    meta: { title: '权限控制', icon: 'el-icon-cpu', roles: ['admin', 'visitor'] },
    children: [
      {
        path: '/role',
        component: () => import('@/views/power/index.vue'),
        name: 'Power',
        meta: { title: '权限控制', icon: '', roles: ['admin', 'visitor'] }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
    component: () => import('@/views/error-page/404.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/powerTest',
    component: Layout,
    name: 'powerTest',
    meta: { title: '权限控制测试页', icon: 'el-icon-cpu', roles: ['admin'] },
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/power/test'),
        meta: { title: '权限测试页', icon: '', roles: ['admin'] }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export function resetRouter() {
  const newRouter = router
  router.matcher = newRouter.matcher // reset router
}

export default router
