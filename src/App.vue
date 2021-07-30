<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2021-04-01 09:30:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-30 11:29:27
-->
<template>
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue'
import bootstrap from './core/bootstrap'

export default defineComponent({
  setup() {
    bootstrap()
  }
})
</script>

<style>
</style>
