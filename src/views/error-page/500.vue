<!--
 * @Descripttion: error 500
 * @version:
 * @Author: Lqi
 * @Date: 2021-07-26 16:29:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 10:42:16
-->
<template>
  <div class="error-page-wrap">
    <img
      src="../../assets/svg/500-error.svg"
      class="err-img-layout"
      alt=""
    >
    <h3 class="err-title">您访问的服务器开小差了</h3>
    <el-button>返回首页</el-button>
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
<style lang="scss" scoped>
</style>
