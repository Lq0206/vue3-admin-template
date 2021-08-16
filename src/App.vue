<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-16 11:09:50
-->
<template>
  <router-view/>
</template>
<script>
import { defineComponent, getCurrentInstance } from 'vue'
import bootstrap from './core/bootstrap'

export default defineComponent({
  setup() {
    bootstrap()
    const ls = getCurrentInstance().appContext.config.globalProperties.$ls
    // const ls = app
    console.log(ls.get('TOKEN'))
  }
})
</script>

<style>
</style>
