/*
 * @Descripttion: 系统路由
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 10:50:33
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layouts'

export const routes = [
  {
    path: '/redirect',
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
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
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
    path: '/testHeader',
    component: Layout,
    name: 'testHeader',
    meta: { title: '测试TEST', icon: 'el-icon-cpu' },
    children: [
      {
        path: '/test1',
        component: () => import('@/views/test/index'),
        name: 'Test1',
        meta: { title: 'Test1', icon: '', roles: ['admin', 'user'] }
      },
      {
        path: '/test2',
        component: () => import('@/views/test/index'),
        name: 'Test2',
        meta: { title: 'Test2', icon: '', roles: ['admin', 'user'] }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    name: 'table',
    meta: { title: 'Table', icon: 'el-icon-date' },
    children: [
      {
        path: '/normalTable',
        component: () => import('@/views/table/normalTable'),
        name: 'normalTable',
        meta: { title: '普通表格', icon: '', roles: ['admin', 'user'] }
      },
      {
        path: '/proTable',
        component: () => import('@/views/table/proTable'),
        name: 'proTable',
        meta: { title: 'proTable', icon: '', roles: ['admin', 'user'] }
      }
    ]
  },
  {
    path: '/userCenter',
    component: Layout,
    meta: { title: '个人页', icon: 'el-icon-user' },
    children: [
      {
        path: '/userManage',
        name: 'UserManage',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: '', roles: ['admin', 'user'] }
      },
      {
        path: '/setting',
        name: 'Setting',
        props: true,
        component: () => import('@/views/user/setting'),
        meta: { title: '个人设置', icon: '' }
      }
    ]
  },
  {
    path: '/errorPage',
    component: Layout,
    meta: { title: '异常页', icon: 'el-icon-cherry' },
    children: [
      {
        path: '/403',
        component: () => import('@/views/error-page/403.vue'),
        name: '403',
        meta: { title: '403', icon: '' }
      },
      {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        name: '404',
        meta: { title: '404', icon: '' }
      },
      {
        path: '/500',
        component: () => import('@/views/error-page/500.vue'),
        name: '500',
        meta: { title: '500', icon: '' }
      }
    ]
  },
  {
    path: '/detailPage',
    component: Layout,
    meta: { title: '详情页', icon: 'el-icon-tickets' },
    children: [
      {
        path: '/details',
        component: () => import('@/views/details/index'),
        meta: { title: '详情页', icon: '' }
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
    meta: { title: '结果页', icon: 'el-icon-tickets' },
    children: [
      {
        path: '/success',
        component: () => import('@/views/result/success'),
        meta: { title: '成功页', icon: '' }
      },
      {
        path: '/failed',
        component: () => import('@/views/result/failed'),
        meta: { title: '失败页', icon: '' }
      }
    ]
  }
]

export const asyncRoutes = [{ path: '*', redirect: '/404', hidden: true }]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
