<!--
 * @Descripttion: error 404
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 15:24:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-29 15:45:58
-->
<template>
  <div class="error-page-wrap">
    <img src="../../assets/svg/404-error.svg" class="err-img-layout" alt="">
    <h3 class="err-title">您访问的页面不存在</h3>
    <el-button @click="backToHome">返回首页</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const backToHome = () => {
      router.push('/dashboard')
    }
    return { backToHome }
  }
})

</script>
<style lang="scss">
</style>
