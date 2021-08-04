<!--
 * @Descripttion:
 * @version:
 * @Author: Lqi
 * @Date: 2020-10-19 10:45:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-02 10:55:01
-->
<template>
  <div style="padding: 0 12px">
    <el-dropdown
      trigger="click"
      @command="handleSetSize"
    >
      <a>
        <i class="iconfont icon-font-size navbar-icon"></i>
      </a>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :disabled="size===item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, nextTick, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  setup(props, cxt) {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const app = getCurrentInstance()

    const state = reactive({
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    })

    const size = computed(() => store.getters.size)

    const handleSetSize = (size) => {
      app.appContext.config.globalProperties.$ELEMENT.size = size
      store.dispatch('setSize', size)
      refreshView()
      app.appContext.config.globalProperties.$message({
        message: '配置成功',
        type: 'success'
      })
    }

    const refreshView = () => {
      store.dispatch('delAllCachedViews', route)

      const { fullPath } = route
      nextTick(() => {
        router.replace({
          path: '/redirect' + fullPath
        })
      })
    }

    return { ...toRefs(state), handleSetSize, size }
  }
})
</script>
<style lang="scss" scoped>
.select-size-btn {
  display: block;
  padding: 0 12px;
  line-height: 50px;
  &:hover {
    background-color: #f5f5f5;
  }
}
</style>
