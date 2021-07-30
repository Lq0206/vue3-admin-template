<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 10:45:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-26 15:55:13
-->
<template>
  <div
    style="padding: 0 12px"
    @click="click"
  >
    <i class="iconfont icon-fullscreen navbar-icon"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { defineComponent, onMounted, onBeforeMount, toRefs, reactive, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'Screenfull',
  setup() {
    const state = reactive({
      isFullscreen: false
    })
    const app = getCurrentInstance()

    onMounted(() => {
      init()
    })

    onBeforeMount(() => {
      destroy()
    })

    /* methods */
    const click = () => {
      const instance = app.appContext.config.globalProperties
      if (!screenfull.isEnabled) {
        instance.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }

    const change = () => {
      state.isFullscreen = screenfull.isFullscreen
    }

    const init = () => {
      if (screenfull.isEnabled) {
        screenfull.on('change', change)
      }
    }

    const destroy = () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', change)
      }
    }

    return { ...toRefs(state), click, change }
  }
})
</script>

<style scoped>
.screenfull-icon {
  transform: rotate(45deg);
}
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
