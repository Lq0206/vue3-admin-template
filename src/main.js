/*
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 10:35:54
 */
import 'normalize.css'
import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus/lib'
import '@/styles/index.scss'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/display.css'
/* 按需加载 */
// import 'element-plus/packages/theme-chalk/src/base.scss'
// import { components, plugins } from '@/core/lazy_lib/components_use'
import store from './store'
import 'nprogress/nprogress.css'
import './permission'
import './mock/mock'
const app = createApp(App)

app.config.globalProperties.$ELEMENT = { size: 'medium', zIndex: 3000 }
// 装载组件（按需加载暂时存在性能问题）
// components.forEach(component => {
//   app.component(component.name, component)
// })

// plugins.forEach(plugin => {
//   app.use(plugin)
// })
app.use(ElementPlus)
app.use(store).use(router).mount('#app')
